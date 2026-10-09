import { NextResponse } from "next/server";
import {
  getCoffeeBySlug,
  pickupTotal,
  shippingTotal,
  GRINDS,
  type Grind,
} from "@/lib/products";

/**
 * Maakt een Mollie-betaling aan voor de winkelwagen en geeft de checkout-URL
 * terug. De totaalprijs wordt hier server-side berekend uit lib/products.ts,
 * zodat een aangepaste request nooit een ander bedrag kan afrekenen.
 *
 * Vereist MOLLIE_API_KEY als omgevingsvariabele (test_... of live_...).
 * Zonder sleutel geeft deze route 503 en valt de afrekenpagina terug op de
 * bestelling-per-e-mail.
 */

interface CheckoutItem {
  slug: string;
  grind: Grind;
  qty: number;
}

interface CheckoutBody {
  items: CheckoutItem[];
  fulfilment: "afhalen" | "verzenden";
  naam: string;
  email: string;
  telefoon?: string;
  straat?: string;
  postcode?: string;
  plaats?: string;
  opmerking?: string;
}

const SITE_URL = process.env.SITE_URL ?? "https://www.coffeegarden.nl";

export async function POST(req: Request) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (
    !Array.isArray(body.items) ||
    body.items.length === 0 ||
    body.items.length > 50 ||
    (body.fulfilment !== "afhalen" && body.fulfilment !== "verzenden") ||
    typeof body.naam !== "string" ||
    body.naam.trim() === "" ||
    typeof body.email !== "string" ||
    !body.email.includes("@")
  ) {
    return NextResponse.json({ error: "invalid_order" }, { status: 400 });
  }

  // Regels valideren en bedrag server-side berekenen
  const regels: string[] = [];
  let bagCount = 0;
  for (const item of body.items) {
    const coffee = getCoffeeBySlug(item.slug);
    const qty = Number(item.qty);
    if (
      !coffee ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > 30 ||
      !GRINDS.includes(item.grind)
    ) {
      return NextResponse.json({ error: "invalid_item" }, { status: 400 });
    }
    bagCount += qty;
    regels.push(`${qty}x ${coffee.name} (500 gr, ${item.grind})`);
  }

  const verzenden = body.fulfilment === "verzenden";
  if (
    verzenden &&
    (!body.straat?.trim() || !body.postcode?.trim() || !body.plaats?.trim())
  ) {
    return NextResponse.json({ error: "missing_address" }, { status: 400 });
  }

  const totaal = verzenden ? shippingTotal(bagCount) : pickupTotal(bagCount);

  const payment = {
    amount: { currency: "EUR", value: totaal.toFixed(2) },
    description: `Coffee Garden bestelling: ${bagCount} ${bagCount === 1 ? "zak" : "zakken"} koffie`,
    redirectUrl: `${SITE_URL}/afrekenen/bedankt`,
    ...(SITE_URL.startsWith("https://")
      ? { webhookUrl: `${SITE_URL}/api/checkout/webhook` }
      : {}),
    locale: "nl_NL",
    metadata: {
      naam: body.naam.slice(0, 100),
      email: body.email.slice(0, 100),
      telefoon: body.telefoon?.slice(0, 30) ?? "",
      bezorging: verzenden
        ? `Verzenden: ${body.straat}, ${body.postcode} ${body.plaats}`.slice(0, 200)
        : "Afhalen in de winkel",
      bestelling: regels.join(" | ").slice(0, 700),
      opmerking: body.opmerking?.slice(0, 200) ?? "",
    },
  };

  const res = await fetch("https://api.mollie.com/v2/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Mollie payment aanmaken mislukt:", res.status, detail);
    return NextResponse.json({ error: "mollie_error" }, { status: 502 });
  }

  const data = await res.json();
  const checkoutUrl = data?._links?.checkout?.href;
  if (!checkoutUrl) {
    console.error("Mollie-antwoord zonder checkout-URL:", JSON.stringify(data).slice(0, 500));
    return NextResponse.json({ error: "mollie_error" }, { status: 502 });
  }

  return NextResponse.json({ checkoutUrl });
}

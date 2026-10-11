import { NextResponse } from "next/server";
import {
  getCoffeeBySlug,
  getGift,
  giftPrijs,
  berekenTotalen,
  GRINDS,
  WEBSHOP_OPEN,
  type CartLine,
} from "@/lib/products";

/**
 * Maakt een Mollie-betaling aan voor de winkelwagen (koffie en cadeaus)
 * en geeft de checkout-URL terug. Alle prijzen en totalen worden hier
 * server-side berekend uit lib/products.ts, zodat een aangepaste
 * request nooit een ander bedrag kan afrekenen. Producten die alleen
 * af te halen zijn, blokkeren de verzendoptie ook aan deze kant.
 */

interface CheckoutBody {
  lines: CartLine[];
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

/** Vrije tekst ontdoen van regeleindes en control characters, zodat
 *  niemand via naam of opmerking valse regels in de bestelmail zet. */
function clean(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.replace(/[\r\n\t\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/;

function regelOmschrijving(line: CartLine): string | null {
  if (line.soort === "koffie") {
    const coffee = getCoffeeBySlug(line.slug);
    if (!coffee || !GRINDS.includes(line.grind)) return null;
    return `${line.qty}x ${coffee.name} (500 gr, ${line.grind})`;
  }
  const gift = getGift(line.id);
  if (!gift || giftPrijs(gift, line.variant) === undefined) return null;
  const variant = gift.varianten?.find((v) => v.id === line.variant)?.label;
  return `${line.qty}x ${gift.naam}${variant ? ` (${variant})` : ""}`;
}

export async function POST(req: Request) {
  if (!WEBSHOP_OPEN) {
    return NextResponse.json({ error: "webshop_closed" }, { status: 503 });
  }
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
    !Array.isArray(body.lines) ||
    body.lines.length === 0 ||
    body.lines.length > 60 ||
    (body.fulfilment !== "afhalen" && body.fulfilment !== "verzenden") ||
    typeof body.naam !== "string" ||
    body.naam.trim() === "" ||
    typeof body.email !== "string" ||
    !EMAIL_RE.test(body.email.trim())
  ) {
    return NextResponse.json({ error: "invalid_order" }, { status: 400 });
  }

  // Dubbele regels samenvoegen (de site doet dit al, directe API-calls niet)
  const samengevoegd = new Map<string, CartLine>();
  for (const line of body.lines) {
    if (!line || (line.soort !== "koffie" && line.soort !== "cadeau")) {
      return NextResponse.json({ error: "invalid_item" }, { status: 400 });
    }
    const key =
      line.soort === "koffie"
        ? `koffie:${line.slug}:${line.grind}`
        : `cadeau:${line.id}:${line.variant ?? ""}`;
    const bestaand = samengevoegd.get(key);
    if (bestaand) bestaand.qty += line.qty;
    else samengevoegd.set(key, { ...line });
  }
  const lines = [...samengevoegd.values()];

  // Regels valideren; bedragen rekent berekenTotalen server-side uit
  const regels: string[] = [];
  for (const line of lines) {
    const omschrijving = regelOmschrijving(line);
    if (omschrijving === null) {
      return NextResponse.json({ error: "invalid_item" }, { status: 400 });
    }
    regels.push(omschrijving);
  }

  const totalen = berekenTotalen(lines);
  if (totalen === null) {
    return NextResponse.json({ error: "invalid_item" }, { status: 400 });
  }

  // De bestelling moet volledig in de Mollie-metadata (en dus in de
  // bestelmail) passen: dat is de enige administratie van de winkel.
  const artikelen = lines.reduce((n, l) => n + l.qty, 0);
  const bestelling = regels.join(" | ");
  if (artikelen > 60 || bestelling.length > 700) {
    return NextResponse.json({ error: "order_too_large" }, { status: 400 });
  }

  const verzenden = body.fulfilment === "verzenden";
  if (verzenden && totalen.verzenden === null) {
    return NextResponse.json({ error: "pickup_only_items" }, { status: 400 });
  }
  if (
    verzenden &&
    (!body.straat?.trim() || !body.postcode?.trim() || !body.plaats?.trim())
  ) {
    return NextResponse.json({ error: "missing_address" }, { status: 400 });
  }

  const totaal = verzenden ? (totalen.verzenden as number) : totalen.afhalen;
  const onderdelen: string[] = [];
  if (totalen.zakken > 0) {
    onderdelen.push(`${totalen.zakken} ${totalen.zakken === 1 ? "zak" : "zakken"} koffie`);
  }
  const cadeauAantal = lines
    .filter((l) => l.soort === "cadeau")
    .reduce((n, l) => n + l.qty, 0);
  if (cadeauAantal > 0) {
    onderdelen.push(`${cadeauAantal} ${cadeauAantal === 1 ? "cadeau" : "cadeaus"}`);
  }

  const payment = {
    amount: { currency: "EUR", value: totaal.toFixed(2) },
    description: `Coffee Garden bestelling: ${onderdelen.join(" en ")}`,
    redirectUrl: `${SITE_URL}/afrekenen/bedankt`,
    ...(SITE_URL.startsWith("https://")
      ? { webhookUrl: `${SITE_URL}/api/checkout/webhook` }
      : {}),
    locale: "nl_NL",
    metadata: {
      naam: clean(body.naam, 100),
      email: body.email.trim().slice(0, 100),
      telefoon: clean(body.telefoon, 30),
      bezorging: verzenden
        ? `Verzenden: ${clean(body.straat, 100)}, ${clean(body.postcode, 10)} ${clean(body.plaats, 60)}`
        : "Afhalen in de winkel",
      bestelling,
      opmerking: clean(body.opmerking, 200),
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

  // Het betaal-id gaat mee zodat de bedankt-pagina de status kan checken
  return NextResponse.json({ checkoutUrl, paymentId: data.id ?? null });
}

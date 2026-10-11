import { NextResponse } from "next/server";

/**
 * Mollie-webhook: wordt aangeroepen zodra een betaalstatus verandert.
 * Bij een betaalde bestelling sturen we een bestelmail naar de winkel
 * (via Resend, zodra RESEND_API_KEY in Vercel staat). De bestelling
 * staat daarnaast altijd volledig in het Mollie-dashboard (metadata).
 *
 * Omgevingsvariabelen:
 * - RESEND_API_KEY   sleutel van resend.com; zonder sleutel geen mail
 * - ORDER_MAIL_TO    ontvanger (standaard info@coffeegarden.nl)
 * - ORDER_MAIL_FROM  afzender, een bij Resend geverifieerd adres
 *                    (standaard onboarding@resend.dev voor de start)
 */

interface MolliePayment {
  id: string;
  status: string;
  amount?: { value: string; currency: string };
  metadata?: {
    naam?: string;
    email?: string;
    telefoon?: string;
    bezorging?: string;
    bestelling?: string;
    opmerking?: string;
    /** Gezet zodra de bestelmail is verstuurd, tegen dubbele mails. */
    mailVerstuurd?: boolean;
  };
}

/** Geeft true terug wanneer de mail verstuurd is (of mailen uit staat). */
async function stuurBestelmail(p: MolliePayment): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return true;

  const naar = process.env.ORDER_MAIL_TO ?? "info@coffeegarden.nl";
  const van = process.env.ORDER_MAIL_FROM ?? "onboarding@resend.dev";
  const m = p.metadata ?? {};
  const regels = (m.bestelling ?? "").split(" | ").filter(Boolean);

  const tekst = [
    `Nieuwe betaalde bestelling via coffeegarden.nl`,
    ``,
    `Naam: ${m.naam ?? "-"}`,
    `E-mail: ${m.email ?? "-"}`,
    m.telefoon ? `Telefoon: ${m.telefoon}` : null,
    ``,
    `Bestelling:`,
    ...regels.map((r) => `- ${r}`),
    ``,
    `Bezorging: ${m.bezorging ?? "-"}`,
    m.opmerking ? `Opmerking: ${m.opmerking}` : null,
    ``,
    `Betaald: ${p.amount?.value ?? "?"} ${p.amount?.currency ?? ""}`,
    `Mollie-betaling: ${p.id} (details in het Mollie-dashboard)`,
  ]
    .filter((r) => r !== null)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Coffee Garden webshop <${van}>`,
      to: [naar],
      reply_to: m.email || undefined,
      subject: `Nieuwe bestelling: ${m.naam ?? "onbekend"} (${p.amount?.value ?? "?"} EUR)`,
      text: tekst,
    }),
  });
  if (!res.ok) {
    console.error("Bestelmail versturen mislukt:", res.status, await res.text());
    return false;
  }
  return true;
}

/** Markeert in Mollie dat de bestelmail verstuurd is (idempotentie). */
async function markeerVerstuurd(p: MolliePayment, apiKey: string) {
  try {
    await fetch(`https://api.mollie.com/v2/payments/${p.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ metadata: { ...(p.metadata ?? {}), mailVerstuurd: true } }),
    });
  } catch (e) {
    console.error("Betaling markeren als gemaild mislukt:", e);
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) return new NextResponse(null, { status: 200 });

  let id = "";
  try {
    const form = await req.formData();
    id = String(form.get("id") ?? "");
  } catch {
    return new NextResponse(null, { status: 200 });
  }
  if (!/^tr_[A-Za-z0-9]+$/.test(id)) {
    return new NextResponse(null, { status: 200 });
  }

  try {
    const res = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) {
      // Tijdelijke Mollie-storing: 503 zodat Mollie het later opnieuw probeert
      return new NextResponse(null, { status: res.status >= 500 ? 503 : 200 });
    }
    const p: MolliePayment = await res.json();
    console.log(
      `Mollie ${id}: ${p.status} | ${p.amount?.value} ${p.amount?.currency} | ${p.metadata?.naam ?? ""} | ${p.metadata?.bestelling ?? ""}`,
    );
    if (p.status === "paid" && !p.metadata?.mailVerstuurd) {
      const gelukt = await stuurBestelmail(p);
      if (!gelukt) {
        // Mail mislukt: niet markeren en 503 geven, dan herhaalt Mollie
        return new NextResponse(null, { status: 503 });
      }
      await markeerVerstuurd(p, apiKey);
    }
  } catch (e) {
    console.error("Mollie-webhook verwerken mislukt:", e);
    return new NextResponse(null, { status: 503 });
  }

  return new NextResponse(null, { status: 200 });
}

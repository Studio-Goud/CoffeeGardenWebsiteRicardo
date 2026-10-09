import { NextResponse } from "next/server";

/**
 * Mollie-webhook: wordt aangeroepen zodra een betaalstatus verandert.
 * We halen de betaling op ter verificatie en loggen de uitkomst; de
 * bestelgegevens zelf staan in de metadata van de betaling en zijn
 * terug te vinden in het Mollie-dashboard.
 */
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
    if (res.ok) {
      const p = await res.json();
      console.log(
        `Mollie ${id}: ${p.status} | ${p.amount?.value} ${p.amount?.currency} | ${p.metadata?.naam ?? ""} | ${p.metadata?.bestelling ?? ""}`,
      );
    }
  } catch (e) {
    console.error("Mollie-webhook ophalen mislukt:", e);
  }

  // Altijd 200, anders blijft Mollie de webhook herhalen
  return new NextResponse(null, { status: 200 });
}

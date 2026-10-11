import { NextResponse } from "next/server";

/**
 * Geeft alleen de status van een Mollie-betaling terug (paid, open,
 * canceled, expired, failed). De bedankt-pagina gebruikt dit om de
 * winkelwagen pas te legen wanneer de betaling echt gelukt is.
 */
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^tr_[A-Za-z0-9]+$/.test(id)) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  try {
    const res = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "unknown_payment" }, { status: 502 });
    }
    const p = await res.json();
    return NextResponse.json({ status: typeof p.status === "string" ? p.status : "unknown" });
  } catch {
    return NextResponse.json({ error: "mollie_unreachable" }, { status: 502 });
  }
}

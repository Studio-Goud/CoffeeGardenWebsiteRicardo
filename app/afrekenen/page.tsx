"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart, lineKey } from "@/components/cart/CartContext";
import { ArrowIcon, PinIcon, MailIcon, BagIcon } from "@/components/Icons";
import {
  getCoffeeBySlug,
  getGift,
  giftPrijs,
  giftThumb,
  berekenTotalen,
  euro,
  BAG_PRICE,
  SHIPPING_COST,
  WEBSHOP_OPEN,
  type CartLine,
} from "@/lib/products";

type Fulfilment = "afhalen" | "verzenden";

const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/;

function regelTekst(line: CartLine): { naam: string; detail: string; bedrag: number } | null {
  if (line.soort === "koffie") {
    const coffee = getCoffeeBySlug(line.slug);
    if (!coffee) return null;
    return {
      naam: `${line.qty}× ${coffee.name}`,
      detail: `500 gr · ${line.grind}`,
      bedrag: line.qty * BAG_PRICE,
    };
  }
  const gift = getGift(line.id);
  if (!gift) return null;
  const prijs = giftPrijs(gift, line.variant);
  if (prijs === undefined) return null;
  const variantLabel = gift.varianten?.find((v) => v.id === line.variant)?.label;
  return {
    naam: `${line.qty}× ${gift.naam}`,
    detail: variantLabel ?? gift.categorie,
    bedrag: line.qty * prijs,
  };
}

function regelThumb(line: CartLine): string | null {
  if (line.soort === "koffie") return getCoffeeBySlug(line.slug)?.thumb ?? null;
  return giftThumb(line.id);
}

export default function AfrekenenPage() {
  const { items, hydrated, clear } = useCart();
  const [fulfilment, setFulfilment] = useState<Fulfilment>("afhalen");
  const [form, setForm] = useState({
    naam: "",
    email: "",
    telefoon: "",
    straat: "",
    postcode: "",
    plaats: "",
    opmerking: "",
  });
  const [verstuurd, setVerstuurd] = useState(false);
  const [mailTekst, setMailTekst] = useState("");
  const [gekopieerd, setGekopieerd] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  // Terug via de browserknop vanaf Mollie (bfcache): knop weer vrijgeven
  useEffect(() => {
    const h = (e: PageTransitionEvent) => {
      if (e.persisted) setBezig(false);
    };
    window.addEventListener("pageshow", h);
    return () => window.removeEventListener("pageshow", h);
  }, []);

  const totalen = berekenTotalen(items);
  const verzendenKan = totalen?.verzenden !== null;
  const gekozen: Fulfilment = verzendenKan ? fulfilment : "afhalen";
  const totaal =
    totalen === null ? 0 : gekozen === "afhalen" ? totalen.afhalen : (totalen.verzenden ?? totalen.afhalen);
  const voordeel = totalen && gekozen === "afhalen" ? totalen.koffieLos - totalen.koffieAfhalen : 0;

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const emailOk = EMAIL_RE.test(form.email.trim());
  const compleet =
    form.naam.trim() !== "" &&
    emailOk &&
    (gekozen === "afhalen" ||
      (form.straat.trim() !== "" && form.postcode.trim() !== "" && form.plaats.trim() !== ""));

  function bouwMailtekst(): string {
    const regels = items
      .map((l) => {
        const r = regelTekst(l);
        return r ? `- ${r.naam} (${r.detail})` : null;
      })
      .filter((r) => r !== null)
      .join("\n");
    const bezorging =
      gekozen === "afhalen"
        ? "Afhalen in de winkel (Bergselaan 291-A)"
        : `Verzenden naar: ${form.straat}, ${form.postcode} ${form.plaats} (PostNL ${euro(SHIPPING_COST)})`;
    return [
      `Nieuwe bestelling via coffeegarden.nl`,
      ``,
      `Naam: ${form.naam}`,
      `E-mail: ${form.email}`,
      form.telefoon ? `Telefoon: ${form.telefoon}` : null,
      ``,
      regels,
      ``,
      bezorging,
      `Totaal: ${euro(totaal)}`,
      form.opmerking ? `\nOpmerking: ${form.opmerking}` : null,
    ]
      .filter((r) => r !== null)
      .join("\n");
  }

  /** Terugval: bestelling per e-mail. De wagen blijft bewaard totdat de
   *  klant de mail echt verstuurd heeft (zie het verstuurd-scherm). */
  function bestelPerMail() {
    const tekst = bouwMailtekst();
    setMailTekst(tekst);
    setVerstuurd(true);
    setBezig(false);
    window.location.href = `mailto:info@coffeegarden.nl?subject=${encodeURIComponent(
      `Bestelling van ${form.naam}`,
    )}&body=${encodeURIComponent(tekst)}`;
  }

  async function bestel() {
    setBezig(true);
    setFout(null);

    // Eerst online betalen via Mollie proberen (iDEAL e.d.)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items,
          fulfilment: gekozen,
          naam: form.naam,
          email: form.email,
          telefoon: form.telefoon,
          straat: form.straat,
          postcode: form.postcode,
          plaats: form.plaats,
          opmerking: form.opmerking,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.checkoutUrl) {
          // Betaal-id bewaren zodat de bedankt-pagina de status kan checken
          try {
            if (data.paymentId) sessionStorage.setItem("cg-betaal-id", data.paymentId);
          } catch {
            // geen sessionStorage: de bedankt-pagina toont dan de algemene tekst
          }
          window.location.href = data.checkoutUrl;
          return;
        }
      } else {
        // Validatiefouten netjes tonen in plaats van stil terug te vallen
        const { error } = await res.json().catch(() => ({ error: "onbekend" }));
        const meldingen: Record<string, string> = {
          invalid_order: "Controleer je naam en e-mailadres en probeer het opnieuw.",
          invalid_item:
            "Een product in je winkelwagen is niet meer beschikbaar. Haal het eruit en probeer het opnieuw.",
          pickup_only_items:
            "De producten van de imker zijn alleen af te halen. Kies afhalen in de winkel.",
          missing_address: "Vul je straat, postcode en plaats in om te kunnen verzenden.",
          order_too_large:
            "Deze bestelling is te groot voor de webshop. Mail ons via info@coffeegarden.nl, dan regelen we het persoonlijk.",
          webshop_closed: "De webshop is op dit moment gesloten.",
        };
        if (meldingen[error]) {
          setFout(meldingen[error]);
          setBezig(false);
          return;
        }
        // mollie_error / not_configured: online betalen ligt er even uit
        setFout("mail-optie");
        setBezig(false);
        return;
      }
    } catch {
      // Betaalroute niet bereikbaar: bied de e-mailroute aan
      setFout("mail-optie");
      setBezig(false);
      return;
    }
    setBezig(false);
  }

  if (!WEBSHOP_OPEN) {
    return (
      <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center py-32">
          <BagIcon className="w-12 h-12 text-sage-400 mx-auto mb-6" />
          <h1 className="font-display text-4xl md:text-5xl text-espresso-900 mb-5">
            Bijna <em className="display-italic text-sage-600">open</em>!
          </h1>
          <p className="text-espresso-500 leading-relaxed mb-10">
            We leggen de laatste hand aan de webshop. Online bestellen kan
            binnenkort; tot die tijd is alles gewoon af te halen in de winkel
            aan de Bergselaan 291-A.
          </p>
          <Link
            href="/winkel"
            className="inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors"
          >
            Bezoek de winkel
            <ArrowIcon className="w-4.5 h-4.5" />
          </Link>
        </div>
      </div>
    );
  }

  if (verstuurd) {
    return (
      <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center py-32">
          <BagIcon className="w-12 h-12 text-sage-600 mx-auto mb-6" />
          <h1 className="font-display text-4xl md:text-5xl text-espresso-900 mb-5">
            Bijna <em className="display-italic text-sage-600">klaar</em>!
          </h1>
          <p className="text-espresso-500 leading-relaxed mb-4">
            Als het goed is, opende je mailprogramma met je bestelling. Druk
            daar op versturen en we gaan voor je aan de slag. We bevestigen je
            bestelling zo snel mogelijk per e-mail.
          </p>
          <p className="text-sm text-espresso-400 mb-6">
            Geen mail geopend? Kopieer je bestelling hieronder en stuur hem
            zelf naar{" "}
            <a href="mailto:info@coffeegarden.nl" className="text-sage-700 underline underline-offset-2">
              info@coffeegarden.nl
            </a>
            . Je winkelwagen blijft gewoon bewaard.
          </p>
          <div className="text-left bg-paper-50 border border-espresso-900/8 rounded-3xl p-6 mb-6">
            <pre className="whitespace-pre-wrap text-xs text-espresso-600 leading-relaxed font-sans">
              {mailTekst}
            </pre>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => {
                try {
                  navigator.clipboard.writeText(mailTekst);
                  setGekopieerd(true);
                } catch {
                  // kopiëren niet beschikbaar: tekst staat hierboven om te selecteren
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 text-paper-100 text-sm font-medium rounded-full hover:bg-sage-800 transition-colors"
            >
              {gekopieerd ? "Gekopieerd!" : "Kopieer bestelling"}
            </button>
            <button
              onClick={() => {
                clear();
                setVerstuurd(false);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-sage-700 rounded-full border border-sage-300 hover:border-sage-500 hover:bg-sage-50 transition-colors"
            >
              Mail verstuurd, wagen legen
            </button>
          </div>
          <Link
            href="/assortiment"
            className="inline-flex items-center gap-3 text-sm font-medium text-espresso-500 hover:text-sage-700 transition-colors"
          >
            Terug naar de webshop
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Even wachten tot de wagen uit localStorage geladen is (geen flits)
  if (!hydrated) {
    return <div className="grain bg-paper-100 min-h-svh" />;
  }

  if (items.length === 0 || totalen === null) {
    return (
      <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center py-32">
          <BagIcon className="w-12 h-12 text-sage-400 mx-auto mb-6" />
          <h1 className="font-display text-4xl text-espresso-900 mb-4">
            Je winkelwagen is leeg
          </h1>
          <p className="text-espresso-500 mb-10">
            Kies iets lekkers uit de webshop: koffie per zak van 500 gram, of
            een van onze cadeaus.
          </p>
          <Link
            href="/assortiment"
            className="inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors"
          >
            Naar de webshop
            <ArrowIcon className="w-4.5 h-4.5" />
          </Link>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full px-5 py-3.5 rounded-2xl bg-paper-50 border border-espresso-900/10 text-espresso-900 placeholder:text-espresso-400 focus:outline-none focus:border-sage-500 transition-colors";
  const labelCls = "block text-sm font-medium text-espresso-700 mb-1.5";

  return (
    <div className="grain bg-paper-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-32 md:pt-40 pb-24">
        <h1 className="font-display text-5xl md:text-6xl tracking-tight text-espresso-900 mb-12">
          Af<em className="display-italic text-sage-600">rekenen</em>
        </h1>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14">
          {/* Formulier */}
          <div className="md:col-span-7 space-y-10">
            <section>
              <h2 className="font-display text-2xl text-espresso-900 mb-5">
                Hoe wil je je bestelling ontvangen?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setFulfilment("afhalen")}
                  aria-pressed={gekozen === "afhalen"}
                  className={`text-left p-6 rounded-3xl border transition-colors ${
                    gekozen === "afhalen"
                      ? "bg-sage-100/70 border-sage-500"
                      : "bg-paper-50 border-espresso-900/10 hover:border-sage-400"
                  }`}
                >
                  <PinIcon className="w-5 h-5 text-sage-700 mb-3" />
                  <p className="font-medium text-espresso-900 mb-1">
                    Afhalen in de winkel
                  </p>
                  <p className="text-sm text-espresso-500 leading-relaxed">
                    Bergselaan 291-A, Rotterdam. Gratis, mét bundelvoordeel
                    vanaf 2 zakken koffie.
                  </p>
                </button>
                <button
                  onClick={() => verzendenKan && setFulfilment("verzenden")}
                  disabled={!verzendenKan}
                  aria-pressed={gekozen === "verzenden"}
                  className={`text-left p-6 rounded-3xl border transition-colors ${
                    !verzendenKan
                      ? "bg-paper-100 border-espresso-900/8 opacity-60 cursor-not-allowed"
                      : gekozen === "verzenden"
                        ? "bg-sage-100/70 border-sage-500"
                        : "bg-paper-50 border-espresso-900/10 hover:border-sage-400"
                  }`}
                >
                  <MailIcon className="w-5 h-5 text-sage-700 mb-3" />
                  <p className="font-medium text-espresso-900 mb-1">
                    Verzenden (PostNL)
                  </p>
                  <p className="text-sm text-espresso-500 leading-relaxed">
                    {verzendenKan
                      ? `${euro(SHIPPING_COST)} verzendkosten per bestelling. Koffie ${euro(BAG_PRICE)} per zak, zonder bundelkorting.`
                      : "Niet beschikbaar: de producten van de imker in je wagen zijn alleen af te halen."}
                  </p>
                </button>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-espresso-900 mb-5">
                Jouw gegevens
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="naam" className={labelCls}>
                    Naam <span aria-hidden>*</span>
                  </label>
                  <input id="naam" className={inputCls} required autoComplete="name" value={form.naam} onChange={set("naam")} />
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>
                    E-mailadres <span aria-hidden>*</span>
                  </label>
                  <input id="email" className={inputCls} required type="email" autoComplete="email" value={form.email} onChange={set("email")} />
                  {form.email.trim() !== "" && !emailOk && (
                    <p className="text-xs text-clay-600 mt-1.5">
                      Dit e-mailadres lijkt niet compleet, bijvoorbeeld: naam@voorbeeld.nl
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="telefoon" className={labelCls}>
                    Telefoonnummer <span className="text-espresso-400 font-normal">(optioneel)</span>
                  </label>
                  <input id="telefoon" className={inputCls} type="tel" autoComplete="tel" value={form.telefoon} onChange={set("telefoon")} />
                </div>
                {gekozen === "verzenden" && (
                  <>
                    <div className="sm:col-span-2">
                      <label htmlFor="straat" className={labelCls}>
                        Straat en huisnummer <span aria-hidden>*</span>
                      </label>
                      <input id="straat" className={inputCls} required autoComplete="street-address" value={form.straat} onChange={set("straat")} />
                    </div>
                    <div>
                      <label htmlFor="postcode" className={labelCls}>
                        Postcode <span aria-hidden>*</span>
                      </label>
                      <input id="postcode" className={inputCls} required autoComplete="postal-code" value={form.postcode} onChange={set("postcode")} />
                    </div>
                    <div>
                      <label htmlFor="plaats" className={labelCls}>
                        Plaats <span aria-hidden>*</span>
                      </label>
                      <input id="plaats" className={inputCls} required autoComplete="address-level2" value={form.plaats} onChange={set("plaats")} />
                    </div>
                  </>
                )}
                <div className="sm:col-span-2">
                  <label htmlFor="opmerking" className={labelCls}>
                    Opmerking <span className="text-espresso-400 font-normal">(optioneel)</span>
                  </label>
                  <textarea
                    id="opmerking"
                    className={`${inputCls} min-h-24 resize-y`}
                    value={form.opmerking}
                    onChange={set("opmerking")}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Overzicht */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-28 bg-paper-50 rounded-3xl border border-espresso-900/8 p-7">
              <h2 className="font-display text-2xl text-espresso-900 mb-5">
                Jouw bestelling
              </h2>
              <ul className="divide-y divide-espresso-900/6 mb-5">
                {items.map((line) => {
                  const r = regelTekst(line);
                  if (!r) return null;
                  const thumb = regelThumb(line);
                  return (
                    <li key={lineKey(line)} className="py-3 flex items-center gap-4">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt=""
                          width={120}
                          height={120}
                          sizes="56px"
                          className="w-14 h-14 rounded-xl object-cover bg-paper-200 shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-sage-100 border border-sage-200 flex items-center justify-center shrink-0">
                          <BagIcon className="w-5 h-5 text-sage-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-espresso-900 truncate">{r.naam}</p>
                        <p className="text-xs text-espresso-500">{r.detail}</p>
                      </div>
                      <span className="text-sm text-espresso-900 tabular-nums">
                        {euro(r.bedrag)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-2 text-sm border-t border-espresso-900/8 pt-4">
                <div className="flex justify-between text-espresso-500">
                  <span>Subtotaal</span>
                  <span className="tabular-nums">{euro(totalen.koffieLos + totalen.cadeaus)}</span>
                </div>
                {voordeel > 0 && (
                  <div className="flex justify-between text-sage-700">
                    <span>Bundelvoordeel bij afhalen</span>
                    <span className="tabular-nums">−{euro(voordeel)}</span>
                  </div>
                )}
                {gekozen === "verzenden" && (
                  <div className="flex justify-between text-espresso-500">
                    <span>Verzendkosten (PostNL)</span>
                    <span className="tabular-nums">{euro(SHIPPING_COST)}</span>
                  </div>
                )}
                <div className="flex justify-between font-display text-xl text-espresso-900 pt-2 border-t border-espresso-900/8">
                  <span>Totaal</span>
                  <span className="tabular-nums">{euro(totaal)}</span>
                </div>
              </div>

              {fout && fout !== "mail-optie" && (
                <p role="alert" className="mt-5 text-sm text-clay-600 leading-relaxed">
                  {fout}
                </p>
              )}
              {fout === "mail-optie" && (
                <div role="alert" className="mt-5 rounded-2xl bg-sage-100/70 border border-sage-200 p-4">
                  <p className="text-sm text-espresso-600 leading-relaxed mb-3">
                    Online betalen lukt op dit moment even niet. Probeer het zo
                    opnieuw, of stuur je bestelling per e-mail; dan betaal je
                    bij het afhalen of via een betaalverzoek.
                  </p>
                  <button
                    onClick={bestelPerMail}
                    className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-600 transition-colors"
                  >
                    <MailIcon className="w-4 h-4" />
                    Bestel per e-mail
                  </button>
                </div>
              )}

              <button
                onClick={bestel}
                disabled={!compleet || bezig}
                className="group mt-6 w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {bezig ? "Even geduld..." : "Afrekenen"}
                <ArrowIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="text-xs text-espresso-500 mt-4 leading-relaxed">
                Je rekent veilig af via Mollie, onder andere met iDEAL. Lukt
                online betalen even niet, dan kun je je bestelling per e-mail
                naar de winkel sturen en betaal je bij het afhalen (pin of
                contant) of via een betaalverzoek.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

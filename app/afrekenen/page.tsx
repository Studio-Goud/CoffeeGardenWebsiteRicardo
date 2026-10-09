"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import { ArrowIcon, PinIcon, MailIcon, BagIcon } from "@/components/Icons";
import {
  getCoffeeBySlug,
  pickupTotal,
  shippingTotal,
  BAG_PRICE,
  SHIPPING_COST,
} from "@/lib/products";

function euro(n: number): string {
  return `€${n.toFixed(2).replace(".", ",")}`;
}

type Fulfilment = "afhalen" | "verzenden";

export default function AfrekenenPage() {
  const { items, bagCount, clear } = useCart();
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

  const subtotaalLos = bagCount * BAG_PRICE;
  const totaal =
    fulfilment === "afhalen" ? pickupTotal(bagCount) : shippingTotal(bagCount);
  const voordeel = fulfilment === "afhalen" ? subtotaalLos - totaal : 0;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const compleet =
    form.naam.trim() !== "" &&
    form.email.trim() !== "" &&
    (fulfilment === "afhalen" ||
      (form.straat.trim() !== "" && form.postcode.trim() !== "" && form.plaats.trim() !== ""));

  function bestel() {
    const regels = items
      .map((i) => {
        const c = getCoffeeBySlug(i.slug);
        return `- ${i.qty}x ${c?.name ?? i.slug} (500 gr, ${i.grind})`;
      })
      .join("\n");
    const bezorging =
      fulfilment === "afhalen"
        ? "Afhalen in de winkel (Bergselaan 291-A)"
        : `Verzenden naar: ${form.straat}, ${form.postcode} ${form.plaats} (PostNL ${euro(SHIPPING_COST)})`;
    const body = [
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

    window.location.href = `mailto:info@coffeegarden.nl?subject=${encodeURIComponent(
      `Bestelling — ${form.naam}`,
    )}&body=${encodeURIComponent(body)}`;
    setVerstuurd(true);
    clear();
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
            Je mailprogramma is geopend met je bestelling — druk daar op
            versturen en we gaan voor je aan de slag. We bevestigen je
            bestelling zo snel mogelijk per e-mail.
          </p>
          <p className="text-sm text-espresso-400 mb-10">
            Geen mail geopend? Stuur je bestelling naar{" "}
            <a href="mailto:info@coffeegarden.nl" className="text-sage-700 underline underline-offset-2">
              info@coffeegarden.nl
            </a>{" "}
            of kom gewoon langs in de winkel.
          </p>
          <Link
            href="/assortiment"
            className="inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors"
          >
            Terug naar het assortiment
            <ArrowIcon className="w-4.5 h-4.5" />
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center py-32">
          <BagIcon className="w-12 h-12 text-sage-400 mx-auto mb-6" />
          <h1 className="font-display text-4xl text-espresso-900 mb-4">
            Je winkelwagen is leeg
          </h1>
          <p className="text-espresso-500 mb-10">
            Kies eerst een koffie uit ons assortiment — elke zak is 500 gram.
          </p>
          <Link
            href="/assortiment"
            className="inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors"
          >
            Bekijk de koffies
            <ArrowIcon className="w-4.5 h-4.5" />
          </Link>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full px-5 py-3.5 rounded-2xl bg-paper-50 border border-espresso-900/10 text-espresso-900 placeholder:text-espresso-300 focus:outline-none focus:border-sage-500 transition-colors";

  return (
    <div className="grain bg-paper-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-32 md:pt-40 pb-24">
        <h1 className="font-display text-5xl md:text-6xl tracking-tight text-espresso-900 mb-12">
          Af<em className="display-italic text-sage-600">rekenen</em>
        </h1>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14">
          {/* Formulier */}
          <div className="md:col-span-7 space-y-10">
            {/* Bezorgkeuze */}
            <section>
              <h2 className="font-display text-2xl text-espresso-900 mb-5">
                Hoe wil je je koffie ontvangen?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setFulfilment("afhalen")}
                  className={`text-left p-6 rounded-3xl border transition-colors ${
                    fulfilment === "afhalen"
                      ? "bg-sage-100/70 border-sage-500"
                      : "bg-paper-50 border-espresso-900/10 hover:border-sage-400"
                  }`}
                >
                  <PinIcon className="w-5 h-5 text-sage-700 mb-3" />
                  <p className="font-medium text-espresso-900 mb-1">
                    Afhalen in de winkel
                  </p>
                  <p className="text-sm text-espresso-500 leading-relaxed">
                    Bergselaan 291-A, Rotterdam. Gratis — mét bundelvoordeel
                    vanaf 2 zakken.
                  </p>
                </button>
                <button
                  onClick={() => setFulfilment("verzenden")}
                  className={`text-left p-6 rounded-3xl border transition-colors ${
                    fulfilment === "verzenden"
                      ? "bg-sage-100/70 border-sage-500"
                      : "bg-paper-50 border-espresso-900/10 hover:border-sage-400"
                  }`}
                >
                  <MailIcon className="w-5 h-5 text-sage-700 mb-3" />
                  <p className="font-medium text-espresso-900 mb-1">
                    Verzenden (PostNL)
                  </p>
                  <p className="text-sm text-espresso-500 leading-relaxed">
                    {euro(SHIPPING_COST)} verzendkosten per bestelling.
                    Zakprijs {euro(BAG_PRICE)} per 500 gram.
                  </p>
                </button>
              </div>
            </section>

            {/* Gegevens */}
            <section>
              <h2 className="font-display text-2xl text-espresso-900 mb-5">
                Jouw gegevens
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input className={inputCls} placeholder="Naam *" value={form.naam} onChange={set("naam")} />
                <input className={inputCls} placeholder="E-mailadres *" type="email" value={form.email} onChange={set("email")} />
                <input className={`${inputCls} sm:col-span-2`} placeholder="Telefoonnummer (optioneel)" type="tel" value={form.telefoon} onChange={set("telefoon")} />
                {fulfilment === "verzenden" && (
                  <>
                    <input className={`${inputCls} sm:col-span-2`} placeholder="Straat en huisnummer *" value={form.straat} onChange={set("straat")} />
                    <input className={inputCls} placeholder="Postcode *" value={form.postcode} onChange={set("postcode")} />
                    <input className={inputCls} placeholder="Plaats *" value={form.plaats} onChange={set("plaats")} />
                  </>
                )}
                <textarea
                  className={`${inputCls} sm:col-span-2 min-h-24 resize-y`}
                  placeholder="Opmerking (optioneel)"
                  value={form.opmerking}
                  onChange={set("opmerking")}
                />
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
                {items.map((item) => {
                  const coffee = getCoffeeBySlug(item.slug);
                  if (!coffee) return null;
                  return (
                    <li key={`${item.slug}-${item.grind}`} className="py-3 flex items-center gap-4">
                      <Image
                        src={coffee.thumb}
                        alt={coffee.name}
                        width={120}
                        height={120}
                        className="w-14 h-14 rounded-xl object-cover bg-paper-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-espresso-900 truncate">
                          {item.qty}× {coffee.name}
                        </p>
                        <p className="text-xs text-espresso-400">500 gr · {item.grind}</p>
                      </div>
                      <span className="text-sm text-espresso-900 tabular-nums">
                        {euro(item.qty * BAG_PRICE)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-2 text-sm border-t border-espresso-900/8 pt-4">
                <div className="flex justify-between text-espresso-500">
                  <span>Subtotaal ({bagCount} {bagCount === 1 ? "zak" : "zakken"})</span>
                  <span className="tabular-nums">{euro(subtotaalLos)}</span>
                </div>
                {voordeel > 0 && (
                  <div className="flex justify-between text-sage-700">
                    <span>Bundelvoordeel bij afhalen</span>
                    <span className="tabular-nums">−{euro(voordeel)}</span>
                  </div>
                )}
                {fulfilment === "verzenden" && (
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

              <button
                onClick={bestel}
                disabled={!compleet}
                className="group mt-6 w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Bestelling versturen
                <ArrowIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="text-xs text-espresso-400 mt-4 leading-relaxed">
                Je bestelling gaat per e-mail naar de winkel; wij bevestigen
                &apos;m persoonlijk. Betalen kan bij het afhalen (pin of
                contant) of via een betaalverzoek bij verzending.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowIcon, PinIcon } from "@/components/Icons";
import { Squiggle } from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "Cadeaus & accessoires",
  description:
    "Alle cadeaus en accessoires van Coffee Garden Rotterdam met prijzen: thee, matcha, Delfts blauw, tulpenservies, barista-accessoires en Rotterdam-souvenirs.",
};

/**
 * Prijzen zoals op de prijslijst in de winkel. Eén plek om te beheren:
 * pas hier een bedrag aan en de pagina volgt.
 */
const groepen: Array<{
  titel: string;
  sub?: string;
  img?: { src: string; alt: string };
  items: Array<[string, number]>;
}> = [
  {
    titel: "Thee & chai",
    sub: "Losse thee uit eigen blik, ruim 30 variëteiten",
    items: [
      ["Potje thee 20 gram", 3.95],
      ["3 potjes thee 20 gram", 10.0],
      ["Potje thee 60 gram", 6.95],
      ["David Rio chai (bus 398 gram)", 14.95],
    ],
  },
  {
    titel: "Matcha",
    sub: "Alles om thuis te kloppen zoals het hoort",
    items: [
      ["Matcha poeder", 19.95],
      ["Matcha bowl", 14.95],
      ["Whisk (bamboe klopper)", 7.95],
      ["Whisk-houder", 6.95],
      ["Matcha bowl + houder", 19.95],
      ["Matcha bowl + houder + whisk", 24.95],
    ],
  },
  {
    titel: "Delfts blauw",
    img: { src: "/images/delfts-blauw-vaas.jpg", alt: "Delfts blauwe vaas in geschenkverpakking" },
    items: [
      ["Mok groot", 10.95],
      ["Mok klein", 6.95],
      ["Kom", 10.95],
      ["Peper- & zoutstel", 11.95],
      ["Vaas klein", 12.95],
      ["Vaas groot", 17.95],
    ],
  },
  {
    titel: "Tulpen-servies",
    img: { src: "/images/drinkfles-tulpen.jpg", alt: "Drinkfles met tulpenprint" },
    items: [
      ["Mok groot", 10.95],
      ["Mok klein", 6.95],
      ["Shotglaasje", 3.95],
      ["Onderzetters (set van 6)", 4.95],
    ],
  },
  {
    titel: "Voor de thuisbarista",
    items: [
      ["Melkkan 350 ml", 9.95],
      ["Tamper", 11.95],
      ["Tamper + houder", 17.95],
      ["Thermofles", 14.95],
    ],
  },
  {
    titel: "Souvenirs & cadeaus",
    img: { src: "/images/rotterdam-souvenirs.jpg", alt: "Rotterdam-magneet met skyline" },
    items: [
      ["Magneet Rotterdam", 4.95],
      ["Tote bag (Van Gogh- en tulpenprints)", 7.95],
      ["Memory-kit voor kids", 7.95],
      ["Kaas-set (cheese cutlery)", 11.95],
    ],
  },
  {
    titel: "Lekkers in blik",
    img: { src: "/images/speculaas-blik.jpg", alt: "Speculaas in Delfts blauw blik" },
    items: [
      ["Stroopwafels in blik", 6.95],
      ["Speculaas in blik", 11.95],
    ],
  },
];

function euro(n: number): string {
  return `€${n.toFixed(2).replace(".", ",")}`;
}

export default function CadeausPage() {
  return (
    <div className="grain bg-paper-100">
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-5">
            Prijslijst
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight text-espresso-900 leading-[0.98] mb-4">
            Cadeaus &amp; <em className="display-italic text-sage-600">accessoires</em>
          </h1>
          <Squiggle className="w-28 text-clay-400 mb-6" />
          <p className="text-espresso-500 leading-relaxed max-w-lg">
            Dezelfde prijzen als op de lijst in de winkel. Alles is verkrijgbaar
            aan de Bergselaan; kom langs om te kiezen en uit te zoeken. De
            koffiezakken bestel je gewoon{" "}
            <Link href="/assortiment" className="text-sage-700 underline underline-offset-2 hover:text-sage-600">
              online
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Prijsgroepen */}
      <section className="px-5 sm:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {groepen.map((g, gi) => (
            <Reveal key={g.titel} delay={(gi % 2) * 100}>
              <div
                className={`h-full rounded-3xl bg-paper-50 border border-espresso-900/8 overflow-hidden ${
                  gi % 3 === 0 ? "md:-rotate-[0.4deg]" : gi % 3 === 1 ? "md:rotate-[0.4deg]" : ""
                }`}
              >
                {g.img && (
                  <div className="h-44 bg-paper-200 overflow-hidden">
                    <Image
                      src={g.img.src}
                      alt={g.img.alt}
                      width={900}
                      height={900}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
                <div className="p-7">
                  <h2 className="font-display text-2xl text-espresso-900 mb-1">
                    {g.titel}
                  </h2>
                  {g.sub && (
                    <p className="text-xs text-espresso-400 mb-4">{g.sub}</p>
                  )}
                  <ul className={g.sub ? "" : "mt-4"}>
                    {g.items.map(([naam, prijs], i) => (
                      <li
                        key={naam}
                        className={`flex items-baseline justify-between gap-4 py-2.5 text-sm ${
                          i > 0 ? "border-t border-espresso-900/6" : ""
                        }`}
                      >
                        <span className="text-espresso-600">{naam}</span>
                        <span className="font-medium text-espresso-900 tabular-nums whitespace-nowrap">
                          {euro(prijs)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 pb-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="rounded-[2rem] bg-sage-100/70 border border-sage-200 p-10 md:p-12 md:flex items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl text-espresso-900 mb-3">
                  Kom <em className="display-italic text-sage-600">uitzoeken</em> in de winkel
                </h2>
                <p className="text-sm text-espresso-500 leading-relaxed">
                  Cadeautje nodig? We pakken het mooi voor je in. En wil je
                  zeker weten dat iets op voorraad is, bel of mail ons even.
                </p>
              </div>
              <Link
                href="/winkel"
                className="group mt-6 md:mt-0 inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors duration-300 shrink-0"
              >
                <PinIcon className="w-4.5 h-4.5" />
                Bezoek de winkel
                <ArrowIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

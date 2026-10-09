import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowIcon, PinIcon, SparkIcon } from "@/components/Icons";
import {
  Squiggle,
  MatchaIllustration,
  TeaIllustration,
  CupIllustration,
} from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "Cadeaus & accessoires",
  description:
    "Cadeaus en accessoires van Coffee Garden Rotterdam: Matcha League matcha, David Rio chai, losse thee, Delfts blauw, tulpenservies, thermoflessen, tote bags en Rotterdam-souvenirs.",
};

function euro(n: number): string {
  return `€${n.toFixed(2).replace(".", ",")}`;
}

/** Productkaart met volledige foto, verhaaltje en prijs. */
interface Product {
  naam: string;
  verhaal: string;
  prijs: string;
  img?: string;
  alt?: string;
  badge?: string;
}

const chai: Product[] = [
  {
    naam: "Tiger Spice Chai",
    verhaal:
      "Dé klassieker van David Rio uit San Francisco: zwarte thee met warme specerijen, rijk en romig. Twee schepjes, hete melk erbij, klaar. Een bus is goed voor zo'n 14 koppen.",
    prijs: euro(14.95),
    img: "/cadeaus/chai-tiger.jpg",
    alt: "Bus David Rio Tiger Spice Chai",
  },
  {
    naam: "Tortoise Green Tea Chai",
    verhaal:
      "Dezelfde romige chai, maar dan op basis van groene thee. Iets frisser en zachter dan de Tiger Spice, met dezelfde warme kruiden.",
    prijs: euro(14.95),
    img: "/cadeaus/chai-tortoise.jpg",
    alt: "Bus David Rio Tortoise Green Tea Chai",
  },
  {
    naam: "Flamingo Vanilla Chai",
    verhaal:
      "Chai met vanille, zonder cafeïne en zonder toegevoegde suiker. Voor wie 's avonds nog een warme kop wil zonder wakker te liggen.",
    prijs: euro(14.95),
    img: "/cadeaus/chai-flamingo.jpg",
    alt: "Bus David Rio Flamingo Vanilla Chai",
    badge: "Decaf",
  },
];

const delfts: Product[] = [
  {
    naam: "Vaas",
    verhaal:
      "Een klassieke Delfts blauwe vaas met molen en bloemmotief, netjes in geschenkverpakking. Hét cadeau om mee naar het buitenland te nemen, of gewoon voor je eigen vensterbank.",
    prijs: `klein ${euro(12.95)} · groot ${euro(17.95)}`,
    img: "/cadeaus/delfts-vaas.jpg",
    alt: "Delfts blauwe vaas in geschenkverpakking",
  },
  {
    naam: "Mok met gouden oor",
    verhaal:
      "Delfts blauw bloemmotief met een gouden oor en randje. Je ochtendkoffie smaakt er meteen een beetje feestelijker uit.",
    prijs: `klein ${euro(6.95)} · groot ${euro(10.95)}`,
    img: "/cadeaus/delfts-mok.jpg",
    alt: "Delfts blauwe mok met gouden oor in geschenkdoos",
  },
  {
    naam: "Kom",
    verhaal:
      "Met geschulpte rand en rijk bloemdecor. Voor de yoghurt met granola, het snoepgoed of gewoon mooi op tafel.",
    prijs: euro(10.95),
    img: "/cadeaus/delfts-kom.jpg",
    alt: "Delfts blauwe kom met geschulpte rand",
  },
  {
    naam: "Peper- & zoutstel",
    verhaal:
      "Twee kleine strooiers vol Hollands blauw. Klein cadeau, groot effect op de eettafel.",
    prijs: euro(11.95),
    img: "/cadeaus/delfts-peper-zout.jpg",
    alt: "Delfts blauw peper- en zoutstel in doosje",
  },
];

const tulpen: Product[] = [
  {
    naam: "Mok met gouden oor",
    verhaal:
      "Botanische tulpen naar oude Hollandse prenten, afgemaakt met een goudkleurig oor. In een al even mooie geschenkdoos.",
    prijs: `klein ${euro(6.95)} · groot ${euro(10.95)}`,
    img: "/cadeaus/tulpen-mok.jpg",
    alt: "Tulpenmok met gouden oor in geschenkdoos",
  },
  {
    naam: "Shotglaasje",
    verhaal:
      "Een klein glaasje met gouden rand en tulpenprint. Voor het borreltje, of stiekem als espressokopje.",
    prijs: euro(3.95),
    img: "/cadeaus/tulpen-shotglas.jpg",
    alt: "Shotglaasje met tulpenprint en gouden rand",
  },
  {
    naam: "Onderzetters, set van 6",
    verhaal:
      "Zes onderzetters met wisselende tulpenprints en gouddruk. Beschermt de tafel en fleurt 'm tegelijk op.",
    prijs: euro(4.95),
    img: "/cadeaus/tulpen-onderzetters.jpg",
    alt: "Set van zes onderzetters met tulpenprint",
  },
];

const onderweg: Product[] = [
  {
    naam: "Thermofles · Tulpen",
    verhaal:
      "Dubbelwandig en lekvrij, dus je koffie blijft warm onderweg. Met tulpen van oude botanische prenten.",
    prijs: euro(14.95),
    img: "/cadeaus/thermofles-tulpen.jpg",
    alt: "Thermofles met tulpenprint",
  },
  {
    naam: "Thermofles · Sterrennacht",
    verhaal:
      "Van Goghs beroemde sterrenhemel om mee te nemen. Net zo mooi op je bureau als in je tas.",
    prijs: euro(14.95),
    img: "/cadeaus/thermofles-sterrennacht.jpg",
    alt: "Thermofles met Sterrennacht-print",
  },
  {
    naam: "Thermofles · Rotterdam",
    verhaal:
      "Strak wit met grote letters, voor wie z'n stad graag laat zien. Echt Rotterdams: geen poespas.",
    prijs: euro(14.95),
    img: "/cadeaus/thermofles-rotterdam.jpg",
    alt: "Witte thermofles met Rotterdam-opdruk",
  },
  {
    naam: "Tote bag",
    verhaal:
      "Stevige katoenen tas met kunst erop: kies uit tulpen, de Sterrennacht, Amandelbloesem, Zonnebloemen of een Rotterdam-print.",
    prijs: euro(7.95),
    img: "/cadeaus/tote-bag-tulpen.jpg",
    alt: "Katoenen tote bag met tulpenprint",
  },
  {
    naam: "Magneten & souvenirs",
    verhaal:
      "De Rotterdamse skyline met de Erasmusbrug, kubuswoningen en Euromast voor op de koelkast. Ook als sleutelhanger, vraag ernaar in de winkel.",
    prijs: `magneet ${euro(4.95)}`,
    img: "/cadeaus/magneet-skyline.jpg",
    alt: "Magneet met de skyline van Rotterdam",
  },
];

const blikken: Product[] = [
  {
    naam: "Stroopwafels in blik",
    verhaal:
      "Echte Goudse stroopwafels in een Rotterdams bewaarblik. Als de wafels op zijn, is het blik nog lang niet klaar.",
    prijs: euro(6.95),
    img: "/cadeaus/stroopwafels-blik.jpg",
    alt: "Stroopwafels in Rotterdams blik",
  },
  {
    naam: "Speculaas in blik",
    verhaal:
      "Klassiek Nederlands speculaas in een Delfts blauw blik met molen. Er zijn ook varianten met tulpen, vraag welke er in het schap staan.",
    prijs: euro(11.95),
    img: "/cadeaus/speculaas-blik.jpg",
    alt: "Speculaas in Delfts blauw blik",
  },
  {
    naam: "Losse thee in blik",
    verhaal:
      "Ruim 30 theevariëteiten, geschept uit onze eigen blikken. Proef in de winkel en neem je favoriet mee in een potje, los of in een mooi bewaarblik zoals deze met Van Goghs amandelbloesem.",
    prijs: `20 g ${euro(3.95)} · 3 × 20 g ${euro(10.0)} · 60 g ${euro(6.95)}`,
    img: "/cadeaus/theeblik.jpg",
    alt: "Theeblik met amandelbloesemprint",
  },
];

export default function CadeausPage() {
  return (
    <div className="grain bg-paper-100">
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-5">
            Uit het schap
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight text-espresso-900 leading-[0.98] mb-4">
            Cadeaus &amp; <em className="display-italic text-sage-600">accessoires</em>
          </h1>
          <Squiggle className="w-28 text-clay-400 mb-6" />
          <p className="text-espresso-500 leading-relaxed max-w-lg">
            Alles wat we naast koffie en thee in de winkel hebben staan, met
            dezelfde prijzen als op het bord. Verkrijgbaar aan de Bergselaan,
            en cadeautjes pakken we mooi voor je in.
          </p>
        </div>
      </section>

      {/* ─── Matcha, van Matcha League ────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="rounded-[2rem] bg-sage-100/70 border border-sage-200 overflow-hidden md:grid md:grid-cols-12">
              <div className="md:col-span-7 p-9 md:p-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-4">
                  Matcha League
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-espresso-900 mb-4">
                  Onze <em className="display-italic text-sage-600">matcha</em>
                </h2>
                <p className="text-sm text-espresso-600 leading-relaxed mb-4 max-w-md">
                  De matcha die we in de winkel schenken en verkopen komt van
                  Matcha League: ceremoniële kwaliteit, fijngemalen en fel
                  groen. Dezelfde matcha als in onze iced matcha aan de
                  plantenwand.
                </p>
                <p className="text-sm text-espresso-600 leading-relaxed mb-8 max-w-md">
                  Thuis kloppen doe je met een bamboe whisk in een echte bowl.
                  We verkopen alles los, maar de complete set is het leukste
                  begin (en het voordeligst).
                </p>
                <ul className="max-w-md">
                  {(
                    [
                      ["Matcha poeder", 19.95],
                      ["Matcha bowl", 14.95],
                      ["Whisk (bamboe klopper)", 7.95],
                      ["Whisk-houder", 6.95],
                      ["Bowl + houder", 19.95],
                      ["Complete set: bowl + houder + whisk", 24.95],
                    ] as Array<[string, number]>
                  ).map(([naam, prijs], i) => (
                    <li
                      key={naam}
                      className={`flex items-baseline justify-between gap-4 py-2.5 text-sm ${
                        i > 0 ? "border-t border-sage-200" : ""
                      }`}
                    >
                      <span className="text-espresso-600">{naam}</span>
                      <span className="font-semibold text-espresso-900 tabular-nums whitespace-nowrap">
                        {euro(prijs)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5 relative bg-sage-200/50 flex items-center justify-center p-10 min-h-64">
                <MatchaIllustration draw className="w-40 md:w-52 text-sage-700" />
                <span className="absolute top-6 right-6 rotate-[6deg] inline-flex items-center justify-center w-24 h-24 rounded-full bg-clay-500 text-paper-50 text-center text-[11px] font-semibold uppercase tracking-wider leading-tight shadow-lg shadow-clay-600/30">
                  klop &apos;m<br />thuis
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ProductSectie
        eyebrow="David Rio, San Francisco"
        titel="Chai voor thuis"
        intro="De chai die je bij ons in de winkel drinkt, komt uit deze bussen. Melk of water verwarmen, twee schepjes erdoor, en je huis ruikt meteen naar specerijen."
        producten={chai}
      />

      <ProductSectie
        eyebrow="Hollands blauw"
        titel="Delfts blauw"
        intro="Het klassieke blauw-wit dat nooit verveelt. Alles komt in nette geschenkverpakking, dus het is net zo makkelijk gegeven als gehouden."
        producten={delfts}
        tinted
      />

      <ProductSectie
        eyebrow="Botanische prenten"
        titel="Tulpen-servies"
        intro="Een serie servies met tulpen naar oude Hollandse botanische tekeningen, hier en daar met een gouden randje. Vrolijk, maar net even chiquer dan een souvenirwinkel."
        producten={tulpen}
      />

      <ProductSectie
        eyebrow="Voor onderweg"
        titel="Flessen, tassen & souvenirs"
        intro="Koffie mee, kunst mee, stad mee. De thermoflessen houden je koffie urenlang warm en de tote bags dragen je boodschappen met Van Gogh onder je arm."
        producten={onderweg}
        tinted
      />

      <ProductSectie
        eyebrow="Lekkers & thee"
        titel="Blikken om te bewaren"
        intro="Blikken waar eerst iets lekkers in zit, en daarna jarenlang van alles. Typisch Hollands cadeau om te versturen of mee te nemen."
        producten={blikken}
      />

      {/* ─── Barista & kleine cadeaus ─────────────────────────── */}
      <section className="px-5 sm:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="h-full rounded-3xl bg-paper-50 border border-espresso-900/8 p-8 md:-rotate-[0.4deg]">
              <CupIllustration className="w-16 h-16 text-sage-600 mb-5" />
              <h2 className="font-display text-2xl text-espresso-900 mb-2">
                Voor de thuisbarista
              </h2>
              <p className="text-sm text-espresso-500 leading-relaxed mb-5">
                Zet je espresso thuis zoals wij dat in de winkel doen. Vraag
                gerust om een demonstratie bij de machine.
              </p>
              <ul>
                {(
                  [
                    ["Melkkan 350 ml", 9.95],
                    ["Tamper", 11.95],
                    ["Tamper + houder", 17.95],
                  ] as Array<[string, number]>
                ).map(([naam, prijs], i) => (
                  <li
                    key={naam}
                    className={`flex items-baseline justify-between gap-4 py-2.5 text-sm ${
                      i > 0 ? "border-t border-espresso-900/6" : ""
                    }`}
                  >
                    <span className="text-espresso-600">{naam}</span>
                    <span className="font-semibold text-espresso-900 tabular-nums">
                      {euro(prijs)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl bg-paper-50 border border-espresso-900/8 p-8 md:rotate-[0.4deg]">
              <TeaIllustration className="w-16 h-16 text-sage-600 mb-5" />
              <h2 className="font-display text-2xl text-espresso-900 mb-2">
                Kleine cadeaus
              </h2>
              <p className="text-sm text-espresso-500 leading-relaxed mb-5">
                Voor de kids, voor bij de borrel, of gewoon omdat het kan.
              </p>
              <ul>
                {(
                  [
                    ["Memory-kit voor kids", 7.95],
                    ["Kaas-set (cheese cutlery)", 11.95],
                  ] as Array<[string, number]>
                ).map(([naam, prijs], i) => (
                  <li
                    key={naam}
                    className={`flex items-baseline justify-between gap-4 py-2.5 text-sm ${
                      i > 0 ? "border-t border-espresso-900/6" : ""
                    }`}
                  >
                    <span className="text-espresso-600">{naam}</span>
                    <span className="font-semibold text-espresso-900 tabular-nums">
                      {euro(prijs)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-espresso-400 mt-5 leading-relaxed">
                Niet alles past op deze pagina. In de winkel vind je nog meer,
                van sleutelhangers tot granola van Leanne&apos;s Bakery.
              </p>
            </div>
          </Reveal>
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
                  Alles op deze pagina staat in het schap aan de Bergselaan.
                  Cadeautje? We pakken het mooi voor je in. Zeker weten dat
                  iets op voorraad is? Mail ons even.
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

function ProductSectie({
  eyebrow,
  titel,
  intro,
  producten,
  tinted,
}: {
  eyebrow: string;
  titel: string;
  intro: string;
  producten: Product[];
  tinted?: boolean;
}) {
  return (
    <section className={`px-5 sm:px-8 py-20 ${tinted ? "grain bg-sage-100/60" : ""}`}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-12 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-espresso-900 mb-4">
            {titel}
          </h2>
          <p className="text-sm text-espresso-500 leading-relaxed">{intro}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {producten.map((p, i) => (
            <Reveal key={p.naam} delay={(i % 3) * 100}>
              <div
                className={`group h-full flex flex-col rounded-3xl bg-paper-50 border border-espresso-900/8 overflow-hidden hover:shadow-xl hover:shadow-espresso-900/5 hover:-translate-y-1 transition-all duration-500 ${
                  i % 2 === 0 ? "md:-rotate-[0.5deg]" : "md:rotate-[0.5deg]"
                } hover:rotate-0`}
              >
                {p.img && (
                  <div className="relative aspect-[4/5] bg-paper-200 overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.alt ?? p.naam}
                      width={960}
                      height={1200}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {p.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-espresso-400/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="font-display text-xl text-espresso-900 mb-2">
                    {p.naam}
                  </h3>
                  <p className="text-sm text-espresso-500 leading-relaxed mb-5">
                    {p.verhaal}
                  </p>
                  <p className="mt-auto inline-flex items-center gap-2 text-sm">
                    <SparkIcon className="w-3.5 h-3.5 text-clay-400" />
                    <span className="font-semibold text-espresso-900 tabular-nums">
                      {p.prijs}
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

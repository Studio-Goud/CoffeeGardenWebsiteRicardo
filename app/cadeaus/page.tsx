import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowIcon, PinIcon, SparkIcon } from "@/components/Icons";
import { Squiggle } from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "Cadeaus & accessoires",
  description:
    "Cadeaus en accessoires van Coffee Garden Rotterdam: David Rio chai, losse thee, Delfts blauw, tulpenservies, thermoflessen, tote bags, Rotterdam-souvenirs en honing en bijenwaskaarsen van de imker.",
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

/** Honing & bijenwas van de imker: naam, korte omschrijving, prijs. */
const honingGroepen: Array<{
  titel: string;
  sub?: string;
  items: Array<[string, string, string]>;
}> = [
  {
    titel: "Honing",
    sub: "alle potten 250 gram",
    items: [
      ["Bloemen crèmehoning", "Nederlands, romig en smeerbaar", "€7,95"],
      ["Fruithoning", "Nederlands, zacht en fruitig", "€7,95"],
      ["Lindehoning", "Nederlands, fris en bloemig", "€7,95"],
      ["Biesboschhoning", "uit de regio", "€6,95"],
      ["Acaciahoning", "vloeibaar en mild", "€8,45"],
      ["Kastanjehoning", "donker en licht bitter, heerlijk bij koffie", "€8,45"],
      ["Oranjebloesemhoning", "zoet en aromatisch", "€7,45"],
    ],
  },
  {
    titel: "Koek & snoep",
    items: [
      ["Honingkoek", "500 gram, voorgesneden", "€4,45"],
      ["Honingkoek met kandij", "500 gram", "€6,95"],
      ["Honingwafels", "6 stuks", "€4,45"],
      ["Gemengde honingsnoep", "120 gram, drie smaken", "€3,45"],
      ["Melk & honing snoepjes", "100 gram, romig gevuld", "€3,45"],
      ["Duindoorn honingsnoep", "100 gram, met vitamine C", "€3,45"],
      ["Honinglolly's", "8 stuks", "€4,45"],
      ["Honingdrop", "150 gram, gemengd", "€4,45"],
    ],
  },
  {
    titel: "Kaarsen",
    sub: "van pure bijenwas",
    items: [
      ["Bijenkorfkaars", "klassieke korfvorm", "€6,95"],
      ["Bijenkorfkaars groot", "met bijtjes", "€12,95"],
      ["Koninginnebij", "kaars in bijenvorm", "€4,45"],
      ["Piramidekaars", "met bij", "€5,45"],
      ["Stompkaars", "touwstructuur en bijtjes", "€6,45"],
      ["Bolkaars", "touwstructuur en bijtjes", "€9,95"],
      ["Raatkaars groot", "gegoten honingraat", "€9,95"],
      ["Dinerkaarsen", "2 stuks, gerold", "€7,45"],
      ["Waxinelichtjes hartje", "6 stuks", "€6,95"],
      ["Waxinelichtjes", "18 stuks, zuivere bijenwas", "€19,95"],
      ["Kerstboomkaarsjes", "20 stuks", "€19,95"],
    ],
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

      {/* ─── Honing & bijenwas, van de imker ──────────────────── */}
      <section className="grain px-5 sm:px-8 py-20 bg-sage-100/60">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-3">
              Vers van de imker
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-espresso-900 mb-4">
              Honing &amp; bijenwas
            </h2>
            <p className="text-sm text-espresso-500 leading-relaxed">
              Ambachtelijke honing en pure bijenwaskaarsen, rechtstreeks van de
              imker. Om zelf van te genieten of cadeau te doen, en alleen af te
              halen in de winkel.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {honingGroepen.map((g, gi) => (
              <Reveal key={g.titel} delay={gi * 100}>
                <div
                  className={`h-full rounded-3xl bg-paper-50 border border-espresso-900/8 p-7 ${
                    gi % 2 === 0 ? "md:-rotate-[0.4deg]" : "md:rotate-[0.4deg]"
                  }`}
                >
                  <h3 className="font-display text-2xl text-espresso-900 mb-1">
                    {g.titel}
                  </h3>
                  {g.sub && (
                    <p className="text-xs text-espresso-400 mb-4">{g.sub}</p>
                  )}
                  <ul className={g.sub ? "" : "mt-4"}>
                    {g.items.map(([naam, sub, prijs], i) => (
                      <li
                        key={naam}
                        className={`py-2.5 ${i > 0 ? "border-t border-espresso-900/6" : ""}`}
                      >
                        <div className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="text-espresso-700 font-medium">{naam}</span>
                          <span className="font-semibold text-espresso-900 tabular-nums whitespace-nowrap">
                            {prijs}
                          </span>
                        </div>
                        {sub && (
                          <p className="text-xs text-espresso-400 mt-0.5">{sub}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
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

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-5 overscroll-x-contain no-scrollbar -mx-5 px-5 pb-2 sm:grid sm:gap-5 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {producten.map((p, i) => (
            <div key={p.naam} className="snap-center snap-always shrink-0 w-[72%] sm:w-auto sm:shrink">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

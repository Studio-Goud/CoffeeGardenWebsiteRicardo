import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import RoastScale from "@/components/RoastScale";
import { ArrowIcon, PinIcon, ClockIcon } from "@/components/Icons";
import {
  CupIllustration,
  TeaIllustration,
  MatchaIllustration,
  ChaiIllustration,
  BranchIllustration,
  BeanIllustration,
  SteamLines,
} from "@/components/Illustrations";
import { coffees, startingPrice, PRICE_TABLE, WEIGHTS } from "@/lib/products";

const categories = [
  {
    title: "Koffiebonen",
    subtitle: "13 eigen koffies — single origins en huisblends, vers gebrand.",
    href: "/assortiment",
    Illustration: CupIllustration,
  },
  {
    title: "Thee",
    subtitle: "Ruim 30 variëteiten, van Japanse sencha tot Darjeeling.",
    href: "/assortiment?categorie=thee",
    Illustration: TeaIllustration,
  },
  {
    title: "Matcha",
    subtitle: "Ceremoniële grade uit Uji, Japan. Inclusief advies over bereiding.",
    href: "/assortiment?categorie=matcha",
    Illustration: MatchaIllustration,
  },
  {
    title: "Chai",
    subtitle: "Authentieke masala chai blends, huisgemengd met echte kruiden.",
    href: "/assortiment?categorie=chai",
    Illustration: ChaiIllustration,
  },
];

const localProducts = [
  { name: "Stroopwafels in blik", desc: "Echte Goudse ambacht", img: "/stroopwafel.jpg" },
  { name: "Speculaas in blik", desc: "Klassiek Nederlands gebak", img: "/speculaas.jpg" },
  { name: "Cocosbollen van Madame Cocos", desc: "Handgemaakt, romig en vers", img: "/Madame Cocos.png" },
  { name: "Delfts Blauw", desc: "Authentiek aardewerk als cadeau", img: "/delfts-blauw.jpg" },
];

const marqueeItems = [
  "Specialty koffie",
  "Vers gebrande bonen",
  "Thee & matcha",
  "Masala chai",
  "Lokale lekkernijen",
  "Persoonlijk advies",
];

// Uitgelichte koffies op de homepage: één van elk karakter
const featured = ["ethiopia-yirgacheffe", "fleur-de-miel", "brasil-cerrado"]
  .map((slug) => coffees.find((c) => c.slug === slug)!)
  .filter(Boolean);

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="grain relative min-h-svh flex items-center bg-paper-100 overflow-hidden">
        {/* Decoratieve takken in de hoeken */}
        <BranchIllustration
          draw
          className="absolute -left-16 top-28 w-64 md:w-80 text-sage-300/70 pointer-events-none select-none -scale-x-100"
        />
        <BranchIllustration
          draw
          className="absolute -right-16 bottom-16 w-64 md:w-96 text-sage-300/70 pointer-events-none select-none"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-32 w-full">
          <div className="max-w-3xl">
            <div className="animate-logo-reveal flex items-center gap-4 mb-10">
              <Image
                src="/images/logo.png"
                alt="Coffee Garden logo"
                width={72}
                height={72}
                className="w-16 h-16 md:w-[72px] md:h-[72px] object-contain"
                priority
              />
              <div className="h-px flex-1 max-w-24 bg-espresso-900/20" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700">
                Bergselaan · Rotterdam
              </p>
            </div>

            <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.95] tracking-tight text-espresso-900 mb-8">
              Koffie &amp; thee
              <br />
              met <em className="display-italic text-sage-600">aandacht</em>
            </h1>

            <p className="text-lg md:text-xl text-espresso-500 leading-relaxed max-w-xl mb-12">
              Speciaalzaak in specialty koffie, thee, matcha en chai. Kom
              proeven, ruiken en kiezen — wij nemen de tijd voor je.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/assortiment"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-espresso-900 text-paper-100 font-medium rounded-full hover:bg-sage-700 transition-colors duration-300"
              >
                Ontdek onze koffies
                <ArrowIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/winkel"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-espresso-900/25 text-espresso-800 font-medium rounded-full hover:border-sage-600 hover:text-sage-700 transition-colors duration-300"
              >
                <PinIcon className="w-4.5 h-4.5" />
                Bezoek de winkel
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll-hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-espresso-400">
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-espresso-400 to-transparent" />
        </div>
      </section>

      {/* ─── Marquee ──────────────────────────────────────────── */}
      <section className="bg-espresso-900 py-5 overflow-hidden" aria-hidden>
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeItems.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-8 pr-8">
                  <span className="font-display text-lg md:text-xl text-paper-200 whitespace-nowrap">
                    {item}
                  </span>
                  <BeanIllustration className="w-4 h-4 text-sage-500 shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Ons verhaal ──────────────────────────────────────── */}
      <section className="grain py-28 md:py-36 px-5 sm:px-8 bg-paper-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-14 md:gap-8 items-center">
          <Reveal className="md:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-5">
              Ons verhaal
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-espresso-900 mb-7">
              Meer dan
              <br />
              een <em className="display-italic text-sage-600">kopje</em> koffie
            </h2>
            <p className="text-espresso-500 leading-relaxed mb-5 max-w-md">
              Wij selecteren met passie de beste specialty koffie van kleine,
              duurzame boerderijen wereldwijd — van Ethiopische naturals tot
              Colombiaanse washed lots.
            </p>
            <p className="text-espresso-500 leading-relaxed mb-10 max-w-md">
              In de winkel aan de Bergselaan kun je rustig proeven, vragen
              stellen en je laten adviseren. Geen haast, geen poeha — wél heel
              goede koffie.
            </p>

            <dl className="grid grid-cols-3 gap-6 max-w-md border-t border-espresso-900/10 pt-8">
              {[
                { value: "13", label: "Eigen koffies" },
                { value: "30+", label: "Theevariëteiten" },
                { value: "100%", label: "Specialty grade" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl md:text-4xl text-espresso-900">
                    {s.value}
                  </dd>
                  <dd className="text-xs text-espresso-400 mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={150} className="md:col-span-6 relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <SteamLines className="w-16 text-sage-400" />
              </div>
              <div className="aspect-[4/5] rounded-[2rem] bg-sage-100 border border-sage-200/60 flex items-center justify-center overflow-hidden">
                <CupIllustration draw className="w-2/3 text-sage-700" />
              </div>
              <div className="absolute -bottom-5 -right-3 md:-right-8 bg-espresso-900 text-paper-100 rounded-2xl px-6 py-5 shadow-xl shadow-espresso-900/20">
                <p className="font-display text-lg">Bergselaan 291-A</p>
                <p className="text-paper-300/70 text-sm mt-0.5">
                  Rotterdam Noord · Dagelijks open
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Assortiment-categorieën ──────────────────────────── */}
      <section className="py-28 md:py-36 bg-espresso-900 relative overflow-hidden">
        <BranchIllustration className="absolute -left-20 -bottom-10 w-96 text-espresso-700/60 pointer-events-none select-none" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-16 md:flex items-end justify-between gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-400 mb-4">
                Wat vind je bij ons
              </p>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight text-paper-100">
                Vier werelden,
                <br />
                één <em className="display-italic text-sage-400">winkel</em>
              </h2>
            </div>
            <p className="text-paper-300/60 text-sm leading-relaxed max-w-xs mt-6 md:mt-0">
              Alles is te proeven in de winkel. Twijfel je? Wij schenken een
              kopje in en kiezen samen.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 100}>
                <Link
                  href={cat.href}
                  className="group block h-full p-8 rounded-3xl bg-espresso-800/80 border border-paper-100/8 hover:border-sage-500/50 hover:bg-espresso-800 transition-all duration-500"
                >
                  <cat.Illustration className="w-20 h-20 mb-7 text-sage-300 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:text-sage-200" />
                  <h3 className="font-display text-2xl text-paper-100 mb-2.5">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-paper-300/60 leading-relaxed mb-6">
                    {cat.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-sage-400 group-hover:text-sage-300 group-hover:gap-3 transition-all duration-300">
                    Bekijk
                    <ArrowIcon className="w-4 h-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Uitgelichte koffies ──────────────────────────────── */}
      <section className="grain py-28 md:py-36 px-5 sm:px-8 bg-paper-100">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16 md:flex items-end justify-between gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-4">
                Vers gebrand
              </p>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight text-espresso-900">
                Uit ons <em className="display-italic text-sage-600">assortiment</em>
              </h2>
            </div>
            <Link
              href="/assortiment"
              className="group inline-flex items-center gap-2 text-sm font-medium text-espresso-700 hover:text-sage-700 transition-colors mt-6 md:mt-0"
            >
              Alle 13 koffies
              <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((coffee, i) => (
              <Reveal key={coffee.slug} delay={i * 120}>
                <Link
                  href={`/assortiment/${coffee.slug}`}
                  className="group block bg-paper-50 rounded-3xl overflow-hidden border border-espresso-900/8 hover:border-sage-400/60 hover:shadow-xl hover:shadow-espresso-900/5 transition-all duration-500"
                >
                  <div className="relative aspect-square bg-paper-200 overflow-hidden">
                    <Image
                      src={coffee.thumb}
                      alt={coffee.name}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    {coffee.huisblend && (
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-espresso-900/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full">
                        Huisblend
                      </span>
                    )}
                    {coffee.bio && (
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-sage-600/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full">
                        Bio
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] text-sage-700 font-semibold uppercase tracking-[0.15em] mb-2">
                      {coffee.origin}
                    </p>
                    <h3 className="font-display text-2xl text-espresso-900 mb-2 group-hover:text-sage-700 transition-colors">
                      {coffee.name}
                    </h3>
                    <p className="text-sm text-espresso-400 mb-4">
                      {coffee.notes.join(" · ")}
                    </p>
                    <div className="flex items-center justify-between">
                      <RoastScale roast={coffee.roast} showLabel={false} />
                      <p className="text-sm text-espresso-900">
                        <span className="text-espresso-400 text-xs">vanaf</span>{" "}
                        <span className="font-semibold">
                          €{startingPrice(coffee).toFixed(2).replace(".", ",")}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Menukaart / prijzen ──────────────────────────────── */}
      <section className="py-28 md:py-36 px-5 sm:px-8 bg-sage-100/60 grain">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-4">
              Eerlijke prijzen
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-espresso-900 mb-5">
              De <em className="display-italic text-sage-600">menukaart</em>
            </h2>
            <p className="text-espresso-500 text-sm leading-relaxed max-w-md mx-auto">
              Zelfde prijzen als op het bord in de winkel. Alle bonen malen we
              gratis op jouw zetmethode.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-paper-50 rounded-[2rem] border border-espresso-900/8 p-8 md:p-12 shadow-sm">
              <div className="grid grid-cols-[1fr_repeat(3,minmax(3.5rem,auto))] gap-x-4 md:gap-x-8 text-sm">
                <span />
                {WEIGHTS.map((w) => (
                  <span
                    key={w}
                    className="text-right text-[11px] font-semibold uppercase tracking-[0.15em] text-espresso-400 pb-4"
                  >
                    {w}
                  </span>
                ))}

                {(
                  [
                    ["house-blend", "Huisblends", "Onze eigen espresso-composities"],
                    ["single-origin", "Single origins", "Pure herkomst, 100% arabica"],
                    ["bio-single-origin", "Bio single origins", "Biologisch gecertificeerd"],
                  ] as const
                ).map(([tier, label, sub], row) => (
                  <div key={tier} className="contents">
                    <div className={`py-5 ${row > 0 ? "border-t border-espresso-900/8" : ""}`}>
                      <p className="font-display text-lg text-espresso-900">{label}</p>
                      <p className="text-xs text-espresso-400 mt-0.5">{sub}</p>
                    </div>
                    {WEIGHTS.map((w) => (
                      <div
                        key={w}
                        className={`py-5 flex items-center justify-end ${row > 0 ? "border-t border-espresso-900/8" : ""}`}
                      >
                        <span className="font-medium text-espresso-800 tabular-nums">
                          €{PRICE_TABLE[tier][w]}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Lokale producten ─────────────────────────────────── */}
      <section className="grain py-28 md:py-36 px-5 sm:px-8 bg-paper-100">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-4">
              Lokaal &amp; ambachtelijk
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-espresso-900 mb-5">
              Lekkers van <em className="display-italic text-sage-600">makers</em>
              <br />
              uit de buurt
            </h2>
            <p className="text-espresso-500 text-sm leading-relaxed">
              Naast koffie en thee selecteren we producten van ambachtelijke
              makers uit de regio — alleen verkrijgbaar in de winkel.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {localProducts.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div className="group">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-paper-200 border border-espresso-900/8 mb-4">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="font-display text-lg text-espresso-900 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-sm text-espresso-400 mt-1">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bezoek CTA ───────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 px-5 sm:px-8 bg-sage-800 overflow-hidden">
        <BranchIllustration className="absolute -right-14 -top-8 w-80 text-sage-700/50 pointer-events-none select-none" />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-300 mb-4">
              Kom langs
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-paper-100 leading-[1.02] mb-6">
              Proeven werkt
              <br />
              beter dan <em className="display-italic text-sage-300">lezen</em>
            </h2>
            <p className="text-sage-200/80 leading-relaxed max-w-md mb-10">
              Geen reservering nodig. Schuif aan, drink een kopje en laat je
              adviseren — wij nemen de tijd voor je.
            </p>
            <Link
              href="/winkel"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-paper-100 text-espresso-900 font-medium rounded-full hover:bg-sage-200 transition-colors duration-300"
            >
              Plan je bezoek
              <ArrowIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={150} className="md:col-span-5">
            <div className="bg-sage-900/60 backdrop-blur rounded-3xl border border-paper-100/10 p-8 space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <PinIcon className="w-5 h-5 text-sage-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-paper-100">Bergselaan 291-A</p>
                  <p className="text-sage-300/70">3038 CG Rotterdam</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ClockIcon className="w-5 h-5 text-sage-300 shrink-0 mt-0.5" />
                <div className="text-sage-200/90 space-y-0.5">
                  <p className="flex justify-between gap-8">
                    <span>Ma – za</span>
                    <span className="tabular-nums">08:00 – 15:00</span>
                  </p>
                  <p className="flex justify-between gap-8">
                    <span>Zondag</span>
                    <span className="tabular-nums">10:00 – 15:00</span>
                  </p>
                  <p className="text-sage-300/60 text-xs pt-1">
                    Daarna op afspraak
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

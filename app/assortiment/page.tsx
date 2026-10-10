import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ArrowIcon, PinIcon, ClockIcon } from "@/components/Icons";
import {
  TeaIllustration,
  MatchaIllustration,
  ChaiIllustration,
} from "@/components/Illustrations";
import { coffees, BAG_PRICE, BAG_SIZE, BUNDLES, WEBSHOP_OPEN, type Coffee } from "@/lib/products";

export const metadata: Metadata = {
  title: "Assortiment",
  description:
    "Onze eigen koffies (single origins, huisblends en een decaf) plus thee, matcha en chai. Bekijk het volledige assortiment van Coffee Garden Rotterdam.",
};

const inStoreCategories = [
  {
    id: "thee",
    label: "Thee",
    desc: "Ruim 30 variëteiten, van Japanse sencha tot Darjeeling first flush.",
    Illustration: TeaIllustration,
  },
  {
    id: "matcha",
    label: "Matcha",
    desc: "Ceremoniële grade uit Uji, Japan. Wij leggen je graag de bereiding uit.",
    Illustration: MatchaIllustration,
  },
  {
    id: "chai",
    label: "Chai",
    desc: "David Rio chai in drie smaken: Tiger Spice, Tortoise Green Tea en Flamingo Vanilla (decaf).",
    Illustration: ChaiIllustration,
  },
] as const;

export default function AssortimentPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  return (
    <Suspense>
      <AssortimentContent searchParamsPromise={searchParams} />
    </Suspense>
  );
}

async function AssortimentContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParamsPromise;
  const highlighted = inStoreCategories.find((c) => c.id === categorie);

  const singleOrigins = coffees.filter((c) => c.type === "single-origin");
  const blends = coffees.filter((c) => c.type === "espresso-blend");

  return (
    <div className="grain bg-paper-100">
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-5">
            Webshop
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight text-espresso-900 leading-[0.98] mb-6">
            Onze <em className="display-italic text-sage-600">koffies</em>
          </h1>
          <p className="text-espresso-500 leading-relaxed max-w-lg">
            {coffees.length} eigen koffies, vers gebrand: {singleOrigins.length}{" "}
            single origins en {blends.length} huisblends. In de winkel vind je
            daarnaast thee, matcha, chai en lokale lekkernijen.
          </p>
          {!WEBSHOP_OPEN && (
            <div className="mt-8 inline-flex items-start sm:items-center gap-3 rounded-2xl bg-sage-100/70 border border-sage-200 px-5 py-4 max-w-lg">
              <ClockIcon className="w-5 h-5 text-sage-700 shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-sm text-espresso-600 leading-relaxed">
                We leggen de laatste hand aan de webshop. Online bestellen kan
                binnenkort; tot die tijd is alles af te halen in de winkel.
              </p>
            </div>
          )}

          {/* Staffelprijzen, prominent bovenaan de webshop */}
          <div className="relative mt-10 max-w-2xl">
            <span className="absolute -top-11 right-0 sm:-top-4 sm:-right-4 rotate-[7deg] z-10 inline-flex items-center justify-center w-18 h-18 rounded-full bg-clay-500 text-paper-50 text-center text-[10px] font-semibold uppercase tracking-wider leading-tight shadow-lg shadow-clay-600/30">
              bundel-<br />voordeel!
            </span>
            <div className="grid grid-cols-3 rounded-3xl bg-paper-50 border border-espresso-900/8 divide-x divide-espresso-900/8 shadow-sm rotate-[0.4deg]">
              {BUNDLES.map((b) => (
                <div key={b.qty} className="px-3 py-5 text-center">
                  <p className="font-display text-2xl sm:text-3xl text-espresso-900 tabular-nums">
                    €{b.price},-
                  </p>
                  <p className="text-[11px] sm:text-xs text-espresso-400 mt-1">
                    {b.label} à 500 gr
                  </p>
                  {b.qty * BAG_PRICE > b.price && (
                    <p className="text-[11px] font-medium text-clay-600 mt-0.5">
                      bespaar €{b.qty * BAG_PRICE - b.price},-
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categorie-hint wanneer je via thee/matcha/chai binnenkomt */}
      {highlighted && (
        <section className="px-5 sm:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-sage-100/70 border border-sage-200 rounded-3xl p-8">
              <highlighted.Illustration className="w-16 h-16 text-sage-700 shrink-0" />
              <div className="flex-1">
                <h2 className="font-display text-2xl text-espresso-900 mb-1">
                  {highlighted.label} proef je in de winkel
                </h2>
                <p className="text-sm text-espresso-500 leading-relaxed max-w-xl">
                  {highlighted.desc} Ons {highlighted.label.toLowerCase()}
                  -assortiment is (nog) niet online te bestellen. Kom langs,
                  dan laten we je proeven en kiezen.
                </p>
              </div>
              <Link
                href="/winkel"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 text-paper-100 text-sm font-medium rounded-full hover:bg-sage-800 transition-colors shrink-0"
              >
                <PinIcon className="w-4 h-4" />
                Winkel-info
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Single origins */}
      <CoffeeSection
        eyebrow="Single origins"
        title="Pure herkomst"
        subtitle={`${singleOrigins.length} koffies · 100% arabica`}
        coffees={singleOrigins}
      />

      {/* Blends */}
      <CoffeeSection
        eyebrow="Espresso blends"
        title="Onze huiscomposities"
        subtitle={`${blends.length} blends · van zacht tot intens`}
        coffees={blends}
        tinted
      />

      {/* In de winkel */}
      <section className="py-24 md:py-32 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-4">
              Alleen in de winkel
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-espresso-900">
              Naast onze <em className="display-italic text-sage-600">koffie</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {inStoreCategories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 100}>
                <div className="h-full p-8 rounded-3xl bg-paper-50 border border-espresso-900/8">
                  <cat.Illustration className="w-16 h-16 mb-6 text-sage-600" />
                  <h3 className="font-display text-2xl text-espresso-900 mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-espresso-400 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CoffeeSection({
  eyebrow,
  title,
  subtitle,
  coffees,
  tinted,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  coffees: Coffee[];
  tinted?: boolean;
}) {
  return (
    <section
      className={`py-24 md:py-32 px-5 sm:px-8 ${tinted ? "grain bg-sage-100/60" : ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-3 text-sage-700">
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-espresso-900">
              {title}
            </h2>
          </div>
          <p className="text-sm text-espresso-400">{subtitle}</p>
        </Reveal>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-5 overscroll-x-contain no-scrollbar -mx-5 px-5 pb-2 sm:grid sm:gap-5 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-4">
          {coffees.map((c, i) => (
            <div key={c.slug} className="snap-center snap-always shrink-0 w-[72%] sm:w-auto sm:shrink">
              <Link
                href={`/assortiment/${c.slug}`}
                className="group block h-full rounded-3xl overflow-hidden border transition-all duration-500 bg-paper-50 border-espresso-900/8 hover:border-sage-400/60 hover:shadow-xl hover:shadow-espresso-900/5"
              >
                <div className="relative aspect-square bg-paper-200 overflow-hidden">
                  <Image
                    src={c.thumb}
                    alt={c.name}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {c.bio && (
                      <span className="px-3 py-1 bg-sage-600/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full self-start">
                        Bio
                      </span>
                    )}
                    {c.huisblend && (
                      <span className="px-3 py-1 bg-clay-500/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full self-start">
                        Huisblend
                      </span>
                    )}
                    {c.decaf && (
                      <span className="px-3 py-1 bg-espresso-400/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full self-start">
                        Decaf
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5 text-sage-700">
                    {c.origin}
                  </p>
                  <h3 className="font-display text-xl leading-tight mb-1.5 transition-colors text-espresso-900 group-hover:text-sage-700">
                    {c.name}
                  </h3>
                  <p className="text-xs mb-4 text-espresso-400">
                    {c.notes.join(" · ")}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-espresso-900">
                      <span className="text-xs text-espresso-400">{BAG_SIZE}</span>{" "}
                      <span className="font-semibold">€{BAG_PRICE},-</span>
                    </span>
                    <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-sage-600" />
                  </div>
                  <p className="mt-2 text-[11px] font-medium text-clay-600">
                    {BUNDLES.filter((b) => b.qty > 1)
                      .map((b) => `${b.label} €${b.price},-`)
                      .join(" · ")}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

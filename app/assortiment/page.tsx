import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ArrowIcon, PinIcon } from "@/components/Icons";
import {
  TeaIllustration,
  MatchaIllustration,
  ChaiIllustration,
} from "@/components/Illustrations";
import { coffees, startingPrice, type Coffee } from "@/lib/products";

export const metadata: Metadata = {
  title: "Assortiment",
  description:
    "13 eigen koffies — single origins en huisblends — plus thee, matcha en chai. Bekijk het volledige assortiment van Coffee Garden Rotterdam.",
};

const inStoreCategories = [
  {
    id: "thee",
    label: "Thee",
    desc: "Ruim 30 variëteiten — van Japanse sencha tot Darjeeling first flush.",
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
    desc: "Authentieke masala chai blends met echte kruiden, huisgemengd.",
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
            Assortiment
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight text-espresso-900 leading-[0.98] mb-6">
            Onze <em className="display-italic text-sage-600">koffies</em>
          </h1>
          <p className="text-espresso-500 leading-relaxed max-w-lg">
            {coffees.length} eigen koffies, vers gebrand: {singleOrigins.length}{" "}
            single origins en {blends.length} huisblends. In de winkel vind je
            daarnaast thee, matcha, chai en lokale lekkernijen.
          </p>
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
                  {highlighted.label} — proef het in de winkel
                </h2>
                <p className="text-sm text-espresso-500 leading-relaxed max-w-xl">
                  {highlighted.desc} Ons {highlighted.label.toLowerCase()}
                  -assortiment is (nog) niet online te bestellen — kom langs,
                  dan laten we je proeven en kiezen.
                </p>
              </div>
              <Link
                href="/winkel"
                className="inline-flex items-center gap-2 px-6 py-3 bg-espresso-900 text-paper-100 text-sm font-medium rounded-full hover:bg-sage-700 transition-colors shrink-0"
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
        dark
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
  dark,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  coffees: Coffee[];
  dark?: boolean;
}) {
  return (
    <section
      className={`py-24 md:py-32 px-5 sm:px-8 ${dark ? "bg-espresso-900" : ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.25em] mb-3 ${
                dark ? "text-sage-400" : "text-sage-700"
              }`}
            >
              {eyebrow}
            </p>
            <h2
              className={`font-display text-3xl md:text-4xl tracking-tight ${
                dark ? "text-paper-100" : "text-espresso-900"
              }`}
            >
              {title}
            </h2>
          </div>
          <p className={`text-sm ${dark ? "text-paper-300/50" : "text-espresso-400"}`}>
            {subtitle}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coffees.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 90}>
              <Link
                href={`/assortiment/${c.slug}`}
                className={`group block h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                  dark
                    ? "bg-espresso-800/70 border-paper-100/8 hover:border-sage-500/50"
                    : "bg-paper-50 border-espresso-900/8 hover:border-sage-400/60 hover:shadow-xl hover:shadow-espresso-900/5"
                }`}
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
                      <span className="px-3 py-1 bg-espresso-900/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full self-start">
                        Huisblend
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5 ${
                      dark ? "text-sage-400" : "text-sage-700"
                    }`}
                  >
                    {c.origin}
                  </p>
                  <h3
                    className={`font-display text-xl leading-tight mb-1.5 transition-colors ${
                      dark
                        ? "text-paper-100 group-hover:text-sage-300"
                        : "text-espresso-900 group-hover:text-sage-700"
                    }`}
                  >
                    {c.name}
                  </h3>
                  <p
                    className={`text-xs mb-4 ${dark ? "text-paper-300/50" : "text-espresso-400"}`}
                  >
                    {c.notes.join(" · ")}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm ${dark ? "text-paper-100" : "text-espresso-900"}`}
                    >
                      <span
                        className={`text-xs ${dark ? "text-paper-300/50" : "text-espresso-400"}`}
                      >
                        vanaf
                      </span>{" "}
                      <span className="font-semibold">
                        €{startingPrice(c).toFixed(2).replace(".", ",")}
                      </span>
                    </span>
                    <ArrowIcon
                      className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
                        dark ? "text-sage-400" : "text-sage-600"
                      }`}
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

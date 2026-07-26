import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import RoastScale from "@/components/RoastScale";
import { ArrowIcon, PinIcon, LeafIcon, SparkIcon } from "@/components/Icons";
import { SteamLines } from "@/components/Illustrations";
import {
  coffees,
  getCoffeeBySlug,
  categoryLabel,
  BAG_PRICE,
  BAG_SIZE,
  BUNDLES,
} from "@/lib/products";

export function generateStaticParams() {
  return coffees.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const coffee = getCoffeeBySlug(slug);
  if (!coffee) return {};
  return {
    title: coffee.name,
    description: `${coffee.name} — ${coffee.notes.join(", ")}. ${coffee.description}`,
  };
}

export default async function CoffeeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const coffee = getCoffeeBySlug(slug);
  if (!coffee) notFound();

  // Aanverwante koffies: zelfde type, huidige uitgezonderd
  const related = coffees
    .filter((c) => c.type === coffee.type && c.slug !== coffee.slug)
    .slice(0, 3);

  const specs: Array<[string, string]> = [
    ["Karakter", coffee.origin],
    ...(coffee.process ? ([["Verwerking", coffee.process]] as Array<[string, string]>) : []),
    ...(coffee.altitude ? ([["Hoogte", coffee.altitude]] as Array<[string, string]>) : []),
    ["Bonen", coffee.beans],
    ["Categorie", categoryLabel(coffee)],
    ["Inhoud", "500 gram"],
  ];

  return (
    <div className="grain bg-paper-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-32 md:pt-40 pb-24">
        {/* Breadcrumb */}
        <Link
          href="/assortiment"
          className="group inline-flex items-center gap-2 text-sm text-espresso-400 hover:text-sage-700 transition-colors mb-10"
        >
          <ArrowIcon className="w-4 h-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          Alle koffies
        </Link>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Beeld */}
          <div className="md:col-span-6">
            <div className="relative rounded-[2rem] overflow-hidden bg-paper-200 border border-espresso-900/8">
              <Image
                src={coffee.image}
                alt={coffee.name}
                width={1200}
                height={1500}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute top-5 left-5 flex gap-2">
                {coffee.bio && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sage-600/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full">
                    <LeafIcon className="w-3 h-3" /> Bio
                  </span>
                )}
                {coffee.huisblend && (
                  <span className="px-3.5 py-1.5 bg-sage-800/90 backdrop-blur text-paper-100 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full">
                    Huisblend
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-4">
              {coffee.type === "single-origin" ? "Single origin" : "Espresso blend"}
            </p>
            <h1 className="font-display text-5xl md:text-6xl tracking-tight text-espresso-900 leading-[0.98] mb-5">
              {coffee.name}
            </h1>

            {/* Smaaknoten */}
            <div className="flex flex-wrap gap-2 mb-7">
              {coffee.notes.map((note) => (
                <span
                  key={note}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-sage-100 border border-sage-200 text-sage-800 text-sm rounded-full"
                >
                  <SparkIcon className="w-3 h-3 text-sage-500" />
                  {note}
                </span>
              ))}
            </div>

            <RoastScale roast={coffee.roast} className="mb-7" />

            <p className="text-espresso-500 leading-relaxed mb-4">
              {coffee.description}
            </p>
            <p className="text-sm text-sage-800 bg-sage-100/70 border border-sage-200 rounded-2xl px-5 py-4 mb-10">
              <span className="font-semibold">Zetadvies:</span> {coffee.brewing}
            </p>

            {/* Prijzen */}
            <div className="bg-paper-50 rounded-3xl border border-espresso-900/8 p-7 mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-espresso-400 mb-5">
                Prijzen — zakken van 500 gram
              </p>
              <div className="grid grid-cols-3 divide-x divide-espresso-900/8">
                {BUNDLES.map((b) => (
                  <div key={b.qty} className="text-center px-2">
                    <p className="font-display text-2xl md:text-3xl text-espresso-900 tabular-nums">
                      €{b.price},-
                    </p>
                    <p className="text-xs text-espresso-400 mt-1">{b.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-espresso-400 mt-5 text-center">
                Af te halen in de winkel — gratis gemalen op jouw zetmethode, of
                als hele boon mee naar huis.
              </p>
            </div>

            <Link
              href="/winkel"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors duration-300"
            >
              <PinIcon className="w-4.5 h-4.5" />
              Verkrijgbaar in de winkel
            </Link>

            {/* Specificaties */}
            <dl className="mt-10 border-t border-espresso-900/10">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-6 py-3.5 border-b border-espresso-900/8 text-sm"
                >
                  <dt className="text-espresso-400">{label}</dt>
                  <dd className="text-espresso-800 font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Aanverwant */}
        {related.length > 0 && (
          <section className="mt-28">
            <Reveal className="flex items-end justify-between gap-6 mb-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight text-espresso-900">
                Ook <em className="display-italic text-sage-600">proeven</em>?
              </h2>
              <SteamLines className="w-12 text-sage-400 hidden sm:block" />
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((c, i) => (
                <Reveal key={c.slug} delay={i * 100}>
                  <Link
                    href={`/assortiment/${c.slug}`}
                    className="group flex items-center gap-5 p-4 rounded-3xl bg-paper-50 border border-espresso-900/8 hover:border-sage-400/60 transition-all duration-500"
                  >
                    <Image
                      src={c.thumb}
                      alt={c.name}
                      width={200}
                      height={200}
                      className="w-20 h-20 rounded-2xl object-cover bg-paper-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-display text-lg text-espresso-900 leading-tight truncate group-hover:text-sage-700 transition-colors">
                        {c.name}
                      </h3>
                      <p className="text-xs text-espresso-400 truncate mt-0.5">
                        {c.notes.join(" · ")}
                      </p>
                      <p className="text-sm text-espresso-800 mt-1.5">
                        <span className="text-xs text-espresso-400">{BAG_SIZE}</span>{" "}
                        <span className="font-semibold">€{BAG_PRICE},-</span>
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

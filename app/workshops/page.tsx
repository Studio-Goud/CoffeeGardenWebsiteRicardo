import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowIcon, MailIcon } from "@/components/Icons";
import {
  CupIllustration,
  MatchaIllustration,
  SteamLines,
} from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "Workshops & proeverijen",
  description:
    "Workshops en proeverijen bij Coffee Garden Rotterdam — leer alles over specialty koffie of de kunst van matcha bereiden. Kleine groepen, persoonlijke begeleiding.",
};

const upcoming = [
  {
    title: "Specialty koffie proeverij",
    desc: "Proef het verschil tussen origins, brandingen en zetmethodes. Van Ethiopische naturals tot onze donkerste huisblend.",
    Illustration: CupIllustration,
  },
  {
    title: "De kunst van matcha",
    desc: "Van chasen tot usucha: leer ceremoniële matcha kloppen zoals het hoort — en proef waarom grade uitmaakt.",
    Illustration: MatchaIllustration,
  },
];

export default function WorkshopsPage() {
  return (
    <div className="grain bg-paper-100">
      <section className="relative pt-36 md:pt-44 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-5">
            Beleving
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight text-espresso-900 leading-[0.98] mb-6">
            Workshops &amp;{" "}
            <em className="display-italic text-sage-600">proeverijen</em>
          </h1>
          <p className="text-espresso-500 leading-relaxed max-w-lg">
            Kleine groepen, persoonlijke begeleiding en vooral: heel veel
            proeven. We leggen de laatste hand aan het programma.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {upcoming.map((w, i) => (
              <Reveal key={w.title} delay={i * 120}>
                <div className="relative h-full p-9 rounded-[2rem] bg-paper-50 border border-espresso-900/8 overflow-hidden">
                  <span className="absolute top-6 right-6 px-3.5 py-1.5 bg-sage-100 border border-sage-200 text-sage-800 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full">
                    Binnenkort
                  </span>
                  <w.Illustration className="w-24 h-24 mb-7 text-sage-600" />
                  <h2 className="font-display text-3xl text-espresso-900 mb-3">
                    {w.title}
                  </h2>
                  <p className="text-espresso-400 text-sm leading-relaxed max-w-sm">
                    {w.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="relative rounded-[2rem] bg-espresso-900 p-10 md:p-14 overflow-hidden">
              <SteamLines className="absolute top-8 right-10 w-16 text-sage-600/60" />
              <h2 className="font-display text-3xl md:text-4xl text-paper-100 mb-4 max-w-md">
                Als eerste weten wanneer we{" "}
                <em className="display-italic text-sage-400">starten</em>?
              </h2>
              <p className="text-paper-300/70 text-sm leading-relaxed max-w-md mb-8">
                Stuur een mailtje en we zetten je op de lijst — of kom langs in
                de winkel, dan vertellen we je alles onder het genot van een
                kopje.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:info@coffeegarden.nl?subject=Interesse%20in%20workshops"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-paper-100 text-espresso-900 text-sm font-medium rounded-full hover:bg-sage-200 transition-colors duration-300"
                >
                  <MailIcon className="w-4.5 h-4.5" />
                  Houd mij op de hoogte
                </a>
                <Link
                  href="/winkel"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 border border-paper-100/25 text-paper-100 text-sm font-medium rounded-full hover:border-sage-400 hover:text-sage-300 transition-colors duration-300"
                >
                  Bezoek de winkel
                  <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import {
  PinIcon,
  ClockIcon,
  MailIcon,
  TramIcon,
  BikeIcon,
  CarIcon,
  ArrowIcon,
} from "@/components/Icons";
import {
  CupIllustration,
  TeaIllustration,
  BranchIllustration,
  SteamLines,
} from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "De winkel",
  description:
    "Bezoek Coffee Garden aan de Bergselaan 291-A in Rotterdam Noord. Dagelijks open, geen reservering nodig. Proef specialty koffie, thee, matcha en chai.",
};

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Coffee+Garden+Bergselaan+291A+Rotterdam";

const hours = [
  { day: "Maandag", time: "08:00 – 15:00" },
  { day: "Dinsdag", time: "08:00 – 15:00" },
  { day: "Woensdag", time: "08:00 – 15:00" },
  { day: "Donderdag", time: "08:00 – 15:00" },
  { day: "Vrijdag", time: "08:00 – 15:00" },
  { day: "Zaterdag", time: "08:00 – 15:00" },
  { day: "Zondag", time: "10:00 – 15:00" },
];

const expectations = [
  {
    title: "Proef ter plekke",
    desc: "Schuif aan en ontdek je favoriete koffie of thee — wij schenken in.",
  },
  {
    title: "Persoonlijk advies",
    desc: "Vertel wat je thuis zet en wij vinden de boon die daarbij past.",
  },
  {
    title: "Cadeaupakketten",
    desc: "Stel een persoonlijk pakket samen — mooi ingepakt en klaar om te geven.",
  },
  {
    title: "Lokale producten",
    desc: "Lekkers van makers uit de regio, exclusief in onze winkel.",
  },
];

const travel = [
  {
    Icon: TramIcon,
    label: "Openbaar vervoer",
    desc: "Tram 8 vanaf Rotterdam Centraal, halte Schieweg — 1 minuut lopen. Of metro tot Blijdorp, ± 7 minuten lopen.",
  },
  {
    Icon: BikeIcon,
    label: "Fiets",
    desc: "Fietsstalling direct voor de deur.",
  },
  {
    Icon: CarIcon,
    label: "Auto",
    desc: "Parkeren op de Bergselaan en in omliggende straten.",
  },
];

export default function WinkelPage() {
  return (
    <div className="grain bg-paper-100">
      {/* Header */}
      <section className="relative pt-36 md:pt-44 pb-20 px-5 sm:px-8 overflow-hidden">
        <BranchIllustration
          draw
          className="absolute -right-16 top-32 w-72 md:w-96 text-sage-300/60 pointer-events-none select-none"
        />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sage-700 mb-5">
            Rotterdam Noord
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight text-espresso-900 leading-[0.98] mb-6">
            De <em className="display-italic text-sage-600">winkel</em>
          </h1>
          <p className="text-espresso-500 leading-relaxed max-w-lg">
            Bergselaan 291-A — loop gewoon binnen, een reservering is nooit
            nodig. De koffie staat klaar.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-28 grid md:grid-cols-12 gap-12 md:gap-16">
        {/* Linker kolom */}
        <div className="md:col-span-7">
          {/* Adres & contact */}
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-3xl bg-paper-50 border border-espresso-900/8 hover:border-sage-400/60 transition-all duration-500"
              >
                <PinIcon className="w-6 h-6 text-sage-600 mb-4" />
                <p className="font-display text-lg text-espresso-900 mb-1">
                  Bergselaan 291-A
                </p>
                <p className="text-sm text-espresso-400 mb-4">3038 CG Rotterdam</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 group-hover:gap-3 transition-all">
                  Open in Google Maps
                  <ArrowIcon className="w-4 h-4" />
                </span>
              </a>
              <a
                href="mailto:info@coffeegarden.nl"
                className="group p-6 rounded-3xl bg-paper-50 border border-espresso-900/8 hover:border-sage-400/60 transition-all duration-500"
              >
                <MailIcon className="w-6 h-6 text-sage-600 mb-4" />
                <p className="font-display text-lg text-espresso-900 mb-1">
                  Mail ons
                </p>
                <p className="text-sm text-espresso-400 mb-4">
                  Voor vragen of afspraken buiten openingstijden
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 group-hover:gap-3 transition-all">
                  info@coffeegarden.nl
                  <ArrowIcon className="w-4 h-4" />
                </span>
              </a>
            </div>
          </Reveal>

          {/* Openingstijden */}
          <Reveal delay={100}>
            <div className="flex items-center gap-3 mb-6">
              <ClockIcon className="w-5 h-5 text-sage-600" />
              <h2 className="font-display text-2xl text-espresso-900">
                Openingstijden
              </h2>
            </div>
            <div className="rounded-3xl overflow-hidden border border-espresso-900/8 bg-paper-50 mb-12">
              {hours.map((row, i) => (
                <div
                  key={row.day}
                  className={`flex justify-between px-7 py-3.5 text-sm ${
                    i > 0 ? "border-t border-espresso-900/6" : ""
                  }`}
                >
                  <span className="text-espresso-600">{row.day}</span>
                  <span className="font-medium text-espresso-900 tabular-nums">
                    {row.time}
                  </span>
                </div>
              ))}
              <div className="px-7 py-3.5 text-xs text-espresso-400 border-t border-espresso-900/6 bg-sage-100/40">
                Buiten deze tijden? Op afspraak kan er veel — mail ons even.
              </div>
            </div>
          </Reveal>

          {/* Bereikbaarheid */}
          <Reveal delay={150}>
            <h2 className="font-display text-2xl text-espresso-900 mb-6">
              Bereikbaarheid
            </h2>
            <div className="space-y-4">
              {travel.map((t) => (
                <div key={t.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-sage-100 border border-sage-200 flex items-center justify-center shrink-0">
                    <t.Icon className="w-5 h-5 text-sage-700" />
                  </div>
                  <div className="pt-0.5">
                    <p className="font-medium text-espresso-900 text-sm">{t.label}</p>
                    <p className="text-sm text-espresso-400 leading-relaxed mt-0.5">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Rechter kolom */}
        <div className="md:col-span-5">
          <Reveal delay={100}>
            <div className="relative mb-10">
              <SteamLines className="absolute -top-8 left-10 w-14 text-sage-400" />
              <div className="aspect-[4/3] rounded-3xl bg-sage-100 border border-sage-200/60 flex items-center justify-center gap-6 overflow-hidden">
                <CupIllustration draw className="w-32 text-sage-700" />
                <TeaIllustration draw className="w-24 text-sage-600" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h2 className="font-display text-2xl text-espresso-900 mb-6">
              Wat kun je verwachten?
            </h2>
            <div className="space-y-3 mb-10">
              {expectations.map((exp, i) => (
                <div
                  key={exp.title}
                  className="p-5 rounded-2xl bg-paper-50 border border-espresso-900/8"
                >
                  <p className="font-medium text-espresso-900 text-sm mb-1">
                    <span className="font-display text-sage-600 mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {exp.title}
                  </p>
                  <p className="text-sm text-espresso-400 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="p-6 rounded-3xl bg-sage-100/70 border border-sage-200">
              <h3 className="font-display text-lg text-espresso-900 mb-2">
                Ons pand &amp; Babycrafts
              </h3>
              <p className="text-sm text-espresso-500 leading-relaxed">
                Coffee Garden deelt het pand met{" "}
                <a
                  href="https://www.babycrafts.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-800 font-medium underline underline-offset-2 hover:text-sage-600 transition-colors"
                >
                  Babycrafts
                </a>
                , dat het souterrain gebruikt als atelier voor ambachtelijke
                zwangerschapsbeeldjes. Een fijne samenwerking.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

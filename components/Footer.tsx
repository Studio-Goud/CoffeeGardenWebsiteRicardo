import Link from "next/link";
import Logo from "./Logo";
import { PinIcon, ClockIcon, MailIcon, InstagramIcon } from "./Icons";
import { BranchIllustration } from "./Illustrations";

const nav = [
  { href: "/assortiment", label: "Assortiment" },
  { href: "/workshops", label: "Workshops & high tea" },
  { href: "/winkel", label: "De winkel" },
];

export default function Footer() {
  return (
    <footer className="relative bg-espresso-900 text-paper-300 overflow-hidden">
      {/* Decoratieve tak, half buiten beeld */}
      <BranchIllustration className="absolute -right-10 -top-6 w-72 text-sage-800/60 pointer-events-none select-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <Logo className="w-14 h-14 text-paper-200/90" />
              <span className="font-display font-semibold text-2xl text-paper-100">
                Coffee Garden
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-paper-300/80 mb-6">
              Speciaalzaak in koffie &amp; thee aan de Bergselaan in Rotterdam
              Noord. Koffiebonen, thee, matcha, chai en lokale lekkernijen —
              met aandacht geselecteerd.
            </p>
            <a
              href="https://instagram.com/coffeegarden.rotterdam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-paper-300/70 hover:text-paper-100 transition-colors"
            >
              <InstagramIcon className="w-4.5 h-4.5" />
              @coffeegarden.rotterdam
            </a>
          </div>

          {/* Navigatie */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-400 mb-6">
              Ontdek
            </h3>
            <ul className="space-y-3.5 text-sm">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-paper-300/80 hover:text-paper-100 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bezoek */}
          <div className="md:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-400 mb-6">
              Bezoek ons
            </h3>
            <ul className="space-y-4 text-sm text-paper-300/80">
              <li className="flex items-start gap-3">
                <PinIcon className="w-4.5 h-4.5 shrink-0 mt-0.5 text-sage-400" />
                <span>
                  Bergselaan 291-A
                  <br />
                  3038 CG Rotterdam
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="w-4.5 h-4.5 shrink-0 mt-0.5 text-sage-400" />
                <span>
                  Ma–vrij 08:00–16:00 · Za 10:00–17:00 · Zo 10:00–15:00
                  <br />
                  <span className="text-paper-300/50">Daarna op afspraak</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-4.5 h-4.5 shrink-0 text-sage-400" />
                <a
                  href="mailto:info@coffeegarden.nl"
                  className="hover:text-paper-100 transition-colors"
                >
                  info@coffeegarden.nl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-paper-100/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper-300/40">
          <p>© {new Date().getFullYear()} Coffee Garden, Rotterdam</p>
          <p>
            Pand gedeeld met{" "}
            <a
              href="https://www.babycrafts.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-300/60 hover:text-paper-100 underline underline-offset-2 transition-colors"
            >
              Babycrafts
            </a>
            {" "}· Gemaakt door{" "}
            <a
              href="https://studiogoud.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-300/60 hover:text-paper-100 transition-colors"
            >
              Studio Goud
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

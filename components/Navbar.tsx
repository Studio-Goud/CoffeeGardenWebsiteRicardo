"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { href: "/assortiment", label: "Assortiment" },
  { href: "/workshops", label: "Workshops" },
  { href: "/winkel", label: "De winkel" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sluit mobiel menu bij navigatie
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-paper-100/90 backdrop-blur-md border-b border-espresso-900/8 shadow-[0_1px_20px_rgba(26,22,17,0.05)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Coffee Garden — home">
          <Logo className="w-10 h-10 md:w-11 md:h-11 text-sage-600 transition-transform duration-500 group-hover:rotate-[-6deg]" />
          <span className="font-display font-semibold text-lg tracking-tight text-espresso-900">
            Coffee Garden
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium transition-colors ${
                  active ? "text-sage-700" : "text-espresso-600 hover:text-espresso-900"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-sage-500 transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/winkel"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso-900 text-paper-100 text-sm font-medium rounded-full hover:bg-sage-700 transition-colors duration-300"
          >
            Kom proeven
          </Link>
        </div>

        {/* Mobiel: hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
        >
          <span className={`block w-5 h-[1.5px] bg-espresso-900 transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-espresso-900 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-espresso-900 transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobiel menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          open ? "max-h-72 border-t border-espresso-900/8" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-1 bg-paper-100/95 backdrop-blur-md">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-3 font-display text-xl text-espresso-800 hover:text-sage-700 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/winkel"
            className="mt-2 mb-2 inline-flex self-start items-center gap-2 px-5 py-2.5 bg-espresso-900 text-paper-100 text-sm font-medium rounded-full"
          >
            Kom proeven
          </Link>
        </div>
      </div>
    </header>
  );
}

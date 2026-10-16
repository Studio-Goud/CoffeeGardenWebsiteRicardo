"use client";

/**
 * Vriendelijke cross-sell: zodra er koffie in de winkelwagen zit, wijst
 * dit kaartje op de honing van de imker. Eén keer per browsersessie,
 * niet tijdens het afrekenen en niet zolang de winkelwagen open staat.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { getGift } from "@/lib/products";
import { CloseIcon, SparkIcon } from "../Icons";

export default function HoningNudge() {
  const { items, bagCount, drawerOpen } = useCart();
  const heeftAlHoning = items.some(
    (l) => l.soort === "cadeau" && getGift(l.id)?.categorie === "Honing",
  );
  const pathname = usePathname();
  const [zichtbaar, setZichtbaar] = useState(false);
  const [klaar, setKlaar] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("honing-nudge") === "gezien") setKlaar(true);
    } catch {
      // geen sessionStorage (private mode): nudge kan vaker verschijnen, geen ramp
    }
  }, []);

  useEffect(() => {
    // Alleen op winkelpagina's: niet op info-pagina's of bij het afrekenen
    const winkelt =
      pathname === "/" ||
      pathname === "/assortiment" ||
      pathname.startsWith("/assortiment/");
    if (klaar || heeftAlHoning || bagCount === 0 || drawerOpen || !winkelt) {
      setZichtbaar(false);
      return;
    }
    const timer = setTimeout(() => setZichtbaar(true), 1200);
    return () => clearTimeout(timer);
  }, [klaar, heeftAlHoning, bagCount, drawerOpen, pathname]);

  function sluit() {
    setKlaar(true);
    try {
      sessionStorage.setItem("honing-nudge", "gezien");
    } catch {
      // niet op te slaan: dan onthoudt alleen deze pagina het
    }
  }

  if (!zichtbaar) return null;

  return (
    <div
      role="status"
      aria-label="Tip: honing bij je koffie"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 sm:max-w-sm animate-nudge-in"
    >
      <div className="relative rounded-3xl bg-paper-50 border border-sage-200 shadow-2xl shadow-espresso-900/15 p-5 pr-12 -rotate-[0.6deg]">
        <span className="absolute -top-3 left-5 px-3 py-1 bg-clay-500 text-paper-50 text-[10px] font-semibold uppercase tracking-wider rounded-full -rotate-[3deg] shadow-md shadow-clay-600/30">
          psst...
        </span>
        <button
          onClick={sluit}
          aria-label="Melding sluiten"
          className="absolute top-1.5 right-1.5 w-11 h-11 rounded-full flex items-center justify-center text-espresso-400 hover:bg-sage-100 hover:text-espresso-700 transition-colors"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
        <div className="flex gap-4 mt-1">
          <Image
            src="/cadeaus/honing-acacia.jpg"
            alt="Pot acaciahoning van de imker"
            width={128}
            height={128}
            sizes="64px"
            className="w-16 h-16 rounded-2xl object-cover bg-paper-200 border border-sage-200 shrink-0 rotate-[2deg]"
          />
          <div>
            <p className="font-display text-lg text-espresso-900 mb-1">
              Honing bij je koffie?
            </p>
            <p className="text-sm text-espresso-500 leading-relaxed mb-3">
              Vers van de imker: zeven soorten, vanaf €6,95. Zo meegepakt als
              je je koffie komt ophalen.
            </p>
            <Link
              href="/assortiment#honing"
              onClick={sluit}
              className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-600 transition-colors"
            >
              <SparkIcon className="w-3.5 h-3.5 text-clay-400" />
              Bekijk de honing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

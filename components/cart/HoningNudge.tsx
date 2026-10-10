"use client";

/**
 * Vriendelijke cross-sell: zodra er koffie in de winkelwagen zit, wijst
 * dit kaartje op de honing van de imker. Eén keer per browsersessie,
 * niet tijdens het afrekenen en niet zolang de winkelwagen open staat.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { CloseIcon, SparkIcon } from "../Icons";

export default function HoningNudge() {
  const { bagCount, drawerOpen } = useCart();
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
    if (klaar || bagCount === 0 || drawerOpen || pathname.startsWith("/afrekenen")) {
      setZichtbaar(false);
      return;
    }
    const timer = setTimeout(() => setZichtbaar(true), 1200);
    return () => clearTimeout(timer);
  }, [klaar, bagCount, drawerOpen, pathname]);

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
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-sm animate-nudge-in">
      <div className="relative rounded-3xl bg-paper-50 border border-sage-200 shadow-2xl shadow-espresso-900/15 p-5 pr-12 -rotate-[0.6deg]">
        <span className="absolute -top-3 left-5 px-3 py-1 bg-clay-500 text-paper-50 text-[10px] font-semibold uppercase tracking-wider rounded-full -rotate-[3deg] shadow-md shadow-clay-600/30">
          psst...
        </span>
        <button
          onClick={sluit}
          aria-label="Melding sluiten"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-espresso-400 hover:bg-sage-100 hover:text-espresso-700 transition-colors"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
        <p className="font-display text-lg text-espresso-900 mt-1 mb-1">
          Honing bij je koffie?
        </p>
        <p className="text-sm text-espresso-500 leading-relaxed mb-3">
          Vers van de imker: zeven soorten, vanaf €6,95. Zo meegepakt als je
          je koffie komt ophalen.
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
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { ArrowIcon, BagIcon } from "@/components/Icons";

type Uitkomst = "laden" | "gelukt" | "mislukt" | "onbekend";

/**
 * Landingspagina na de Mollie-betaling. Checkt de echte betaalstatus
 * en leegt de winkelwagen alleen wanneer de betaling gelukt (of nog
 * bezig) is; na een geannuleerde betaling blijft de wagen staan.
 */
export default function BedanktPage() {
  const { clear } = useCart();
  const [uitkomst, setUitkomst] = useState<Uitkomst>("laden");

  useEffect(() => {
    let betaalId: string | null = null;
    try {
      betaalId = sessionStorage.getItem("cg-betaal-id");
    } catch {
      // geen sessionStorage: dan de algemene tekst tonen
    }
    if (!betaalId) {
      // Direct bezoek zonder betaling: niets legen, neutrale tekst
      setUitkomst("onbekend");
      return;
    }
    fetch(`/api/checkout/status?id=${encodeURIComponent(betaalId)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { status?: string }) => {
        if (data.status === "paid" || data.status === "pending" || data.status === "authorized") {
          clear();
          try {
            sessionStorage.removeItem("cg-betaal-id");
          } catch {}
          setUitkomst("gelukt");
        } else if (data.status === "open") {
          // Betaling nog niet afgerond: wagen laten staan
          setUitkomst("onbekend");
        } else {
          try {
            sessionStorage.removeItem("cg-betaal-id");
          } catch {}
          setUitkomst("mislukt");
        }
      })
      .catch(() => setUitkomst("onbekend"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (uitkomst === "laden") {
    return (
      <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center py-32">
          <BagIcon className="w-12 h-12 text-sage-400 mx-auto mb-6 animate-pulse" />
          <p className="text-espresso-500">We checken je betaling even...</p>
        </div>
      </div>
    );
  }

  if (uitkomst === "mislukt") {
    return (
      <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center py-32">
          <BagIcon className="w-12 h-12 text-sage-400 mx-auto mb-6" />
          <h1 className="font-display text-4xl md:text-5xl text-espresso-900 mb-5">
            De betaling is niet <em className="display-italic text-sage-600">gelukt</em>
          </h1>
          <p className="text-espresso-500 leading-relaxed mb-4">
            Geen zorgen: je winkelwagen staat nog helemaal klaar. Probeer het
            gerust opnieuw, of mail ons als het blijft misgaan.
          </p>
          <p className="text-sm text-espresso-400 mb-10">
            Hulp nodig? Mail{" "}
            <a
              href="mailto:info@coffeegarden.nl"
              className="text-sage-700 underline underline-offset-2"
            >
              info@coffeegarden.nl
            </a>
            .
          </p>
          <Link
            href="/afrekenen"
            className="inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors"
          >
            Opnieuw afrekenen
            <ArrowIcon className="w-4.5 h-4.5" />
          </Link>
        </div>
      </div>
    );
  }

  const gelukt = uitkomst === "gelukt";

  return (
    <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
      <div className="max-w-xl mx-auto text-center py-32">
        <BagIcon className="w-12 h-12 text-sage-600 mx-auto mb-6" />
        <h1 className="font-display text-4xl md:text-5xl text-espresso-900 mb-5">
          Bedankt voor je <em className="display-italic text-sage-600">bestelling</em>!
        </h1>
        <p className="text-espresso-500 leading-relaxed mb-4">
          {gelukt
            ? "Je betaling is gelukt en wij gaan voor je aan de slag. Haal je af, dan hoor je van ons zodra je koffie klaarstaat."
            : "Is je betaling gelukt? Dan ontvang je direct een bevestiging per e-mail en gaan wij voor je aan de slag. Haal je af, dan hoor je van ons zodra je koffie klaarstaat."}
        </p>
        <p className="text-sm text-espresso-400 mb-10">
          Betaling afgebroken of mislukt? Probeer het gerust opnieuw, of mail
          ons via{" "}
          <a
            href="mailto:info@coffeegarden.nl"
            className="text-sage-700 underline underline-offset-2"
          >
            info@coffeegarden.nl
          </a>
          .
        </p>
        <Link
          href="/assortiment"
          className="inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors"
        >
          Terug naar de webshop
          <ArrowIcon className="w-4.5 h-4.5" />
        </Link>
      </div>
    </div>
  );
}

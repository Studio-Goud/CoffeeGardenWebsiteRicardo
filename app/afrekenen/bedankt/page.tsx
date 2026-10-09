"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { ArrowIcon, BagIcon } from "@/components/Icons";

/** Landingspagina na de Mollie-betaling. */
export default function BedanktPage() {
  const { clear } = useCart();

  // De klant komt hier terug ná het betaalscherm: wagen leegmaken
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
      <div className="max-w-xl mx-auto text-center py-32">
        <BagIcon className="w-12 h-12 text-sage-600 mx-auto mb-6" />
        <h1 className="font-display text-4xl md:text-5xl text-espresso-900 mb-5">
          Bedankt voor je <em className="display-italic text-sage-600">bestelling</em>!
        </h1>
        <p className="text-espresso-500 leading-relaxed mb-4">
          Is je betaling gelukt? Dan ontvang je direct een bevestiging per
          e-mail en gaan wij voor je aan de slag. Haal je af, dan hoor je van
          ons zodra je koffie klaarstaat.
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
          Terug naar het assortiment
          <ArrowIcon className="w-4.5 h-4.5" />
        </Link>
      </div>
    </div>
  );
}

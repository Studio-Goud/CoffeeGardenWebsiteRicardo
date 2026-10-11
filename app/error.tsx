"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Onverwachte fout op de site:", error);
  }, [error]);

  return (
    <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
      <div className="max-w-xl mx-auto text-center py-32">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-espresso-900 mb-5">
          Er ging iets <em className="display-italic text-sage-600">mis</em>
        </h1>
        <p className="text-espresso-500 leading-relaxed mb-4">
          Onze excuses, er trad een onverwachte fout op. Probeer het opnieuw.
          Blijft het misgaan, mail ons dan even of kom langs in de winkel.
          Je winkelwagen blijft gewoon bewaard.
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
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors"
          >
            Probeer opnieuw
            <ArrowIcon className="w-4.5 h-4.5" />
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 text-sage-700 font-medium rounded-full border border-sage-300 hover:border-sage-500 hover:bg-sage-50 transition-colors"
          >
            Naar de homepagina
          </Link>
        </div>
      </div>
    </div>
  );
}

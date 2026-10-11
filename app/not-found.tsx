import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="grain bg-paper-100 min-h-svh flex items-center px-5 sm:px-8">
      <div className="max-w-xl mx-auto text-center py-32">
        <p className="font-display text-7xl md:text-8xl text-sage-300 mb-6">404</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-espresso-900 mb-5">
          Deze pagina is <em className="display-italic text-sage-600">verdampt</em>
        </h1>
        <p className="text-espresso-500 leading-relaxed mb-10">
          De pagina die je zoekt bestaat niet meer, of heeft nooit bestaan.
          Geen zorgen: de koffie staat gewoon klaar. Neus verder door de
          webshop of kom langs in de winkel aan de Bergselaan.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors"
          >
            Naar de homepagina
            <ArrowIcon className="w-4.5 h-4.5" />
          </Link>
          <Link
            href="/assortiment"
            className="inline-flex items-center gap-2 px-8 py-4 text-sage-700 font-medium rounded-full border border-sage-300 hover:border-sage-500 hover:bg-sage-50 transition-colors"
          >
            Bekijk de webshop
          </Link>
        </div>
      </div>
    </div>
  );
}

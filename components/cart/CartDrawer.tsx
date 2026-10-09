"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";
import { CloseIcon, MinusIcon, PlusIcon, BagIcon, ArrowIcon } from "../Icons";
import {
  getCoffeeBySlug,
  pickupTotal,
  shippingTotal,
  BAG_PRICE,
  SHIPPING_COST,
} from "@/lib/products";

function euro(n: number): string {
  return `€${n.toFixed(2).replace(".", ",")}`;
}

export default function CartDrawer() {
  const { items, bagCount, drawerOpen, closeDrawer, setQty, removeItem } =
    useCart();

  const afhalen = pickupTotal(bagCount);
  const verzenden = shippingTotal(bagCount);
  const voordeel = bagCount * BAG_PRICE - afhalen;

  return (
    <div
      className={`fixed inset-0 z-[60] ${drawerOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!drawerOpen}
    >
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-espresso-900/30 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Paneel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-paper-50 shadow-2xl shadow-espresso-900/20 flex flex-col transition-transform duration-400 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Winkelwagen"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-espresso-900/8">
          <h2 className="font-display text-2xl text-espresso-900">
            Winkelwagen
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Winkelwagen sluiten"
            className="w-10 h-10 rounded-full flex items-center justify-center text-espresso-600 hover:bg-sage-100 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <BagIcon className="w-12 h-12 text-sage-400" />
            <p className="text-espresso-500 text-sm leading-relaxed">
              Je winkelwagen is nog leeg. Alle koffies zijn 500 gram per zak —
              vanaf 2 zakken krijg je bundelvoordeel bij afhalen.
            </p>
            <Link
              href="/assortiment"
              onClick={closeDrawer}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 text-paper-100 text-sm font-medium rounded-full hover:bg-sage-800 transition-colors"
            >
              Bekijk de koffies
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-espresso-900/6">
              {items.map((item) => {
                const coffee = getCoffeeBySlug(item.slug);
                if (!coffee) return null;
                return (
                  <li key={`${item.slug}-${item.grind}`} className="py-4 flex gap-4">
                    <Image
                      src={coffee.thumb}
                      alt={coffee.name}
                      width={160}
                      height={160}
                      className="w-20 h-20 rounded-2xl object-cover bg-paper-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-lg text-espresso-900 leading-tight">
                            {coffee.name}
                          </p>
                          <p className="text-xs text-espresso-400 mt-0.5">
                            500 gr · {item.grind}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.slug, item.grind)}
                          aria-label={`${coffee.name} verwijderen`}
                          className="text-espresso-300 hover:text-espresso-600 transition-colors"
                        >
                          <CloseIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center gap-1 border border-espresso-900/15 rounded-full">
                          <button
                            onClick={() => setQty(item.slug, item.grind, item.qty - 1)}
                            aria-label="Eén minder"
                            className="w-8 h-8 rounded-full flex items-center justify-center text-espresso-600 hover:bg-sage-100 transition-colors"
                          >
                            <MinusIcon className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-espresso-900 tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.slug, item.grind, item.qty + 1)}
                            aria-label="Eén meer"
                            className="w-8 h-8 rounded-full flex items-center justify-center text-espresso-600 hover:bg-sage-100 transition-colors"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-espresso-900 tabular-nums">
                          {euro(item.qty * BAG_PRICE)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-espresso-900/8 px-6 py-5 space-y-3 bg-paper-100">
              <div className="flex justify-between text-sm">
                <span className="text-espresso-500">
                  Afhalen in de winkel
                  {voordeel > 0 && (
                    <span className="text-sage-700"> · {euro(voordeel)} bundelvoordeel</span>
                  )}
                </span>
                <span className="font-semibold text-espresso-900 tabular-nums">
                  {euro(afhalen)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-espresso-500">
                  Verzenden (PostNL {euro(SHIPPING_COST)})
                </span>
                <span className="font-medium text-espresso-700 tabular-nums">
                  {euro(verzenden)}
                </span>
              </div>
              <p className="text-xs text-espresso-400">
                Bundelvoordeel geldt alleen bij afhalen. Definitieve keuze maak
                je bij het afrekenen.
              </p>
              <Link
                href="/afrekenen"
                onClick={closeDrawer}
                className="group flex items-center justify-center gap-3 w-full px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors duration-300"
              >
                Afrekenen
                <ArrowIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <button
                onClick={closeDrawer}
                className="w-full text-center text-sm text-espresso-500 hover:text-sage-700 transition-colors py-1"
              >
                Verder winkelen
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

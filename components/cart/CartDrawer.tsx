"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart, lineKey } from "./CartContext";
import { CloseIcon, MinusIcon, PlusIcon, BagIcon, ArrowIcon } from "../Icons";
import {
  getCoffeeBySlug,
  getGift,
  giftPrijs,
  giftThumb,
  berekenTotalen,
  euro,
  BAG_PRICE,
  SHIPPING_COST,
  type CartLine,
} from "@/lib/products";

function regelInfo(line: CartLine): {
  naam: string;
  detail: string;
  stukprijs: number;
  thumb?: string;
} | null {
  if (line.soort === "koffie") {
    const coffee = getCoffeeBySlug(line.slug);
    if (!coffee) return null;
    return {
      naam: coffee.name,
      detail: `500 gr · ${line.grind}`,
      stukprijs: BAG_PRICE,
      thumb: coffee.thumb,
    };
  }
  const gift = getGift(line.id);
  if (!gift) return null;
  const prijs = giftPrijs(gift, line.variant);
  if (prijs === undefined) return null;
  const variantLabel = gift.varianten?.find((v) => v.id === line.variant)?.label;
  return {
    naam: gift.naam,
    detail: [variantLabel, gift.sub].filter(Boolean).join(" · ") || gift.categorie,
    stukprijs: prijs,
    thumb: giftThumb(line.id) ?? undefined,
  };
}

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, setQty, removeLine } = useCart();
  const asideRef = useRef<HTMLElement>(null);

  // Open: focus naar de drawer, Escape sluit, daarna focus terug
  useEffect(() => {
    if (!drawerOpen) return;
    const vorige = document.activeElement as HTMLElement | null;
    asideRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      vorige?.focus();
    };
  }, [drawerOpen, closeDrawer]);

  const totalen = berekenTotalen(items);

  return (
    <div
      className={`fixed inset-0 z-[60] ${drawerOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!drawerOpen}
      inert={!drawerOpen || undefined}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-espresso-900/30 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        ref={asideRef}
        tabIndex={-1}
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-paper-50 shadow-2xl shadow-espresso-900/20 flex flex-col transition-transform duration-400 ease-out focus:outline-none ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Winkelwagen"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-espresso-900/8">
          <h2 className="font-display text-2xl text-espresso-900">Winkelwagen</h2>
          <button
            onClick={closeDrawer}
            aria-label="Winkelwagen sluiten"
            className="w-10 h-10 rounded-full flex items-center justify-center text-espresso-600 hover:bg-sage-100 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 || !totalen ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <BagIcon className="w-12 h-12 text-sage-400" />
            <p className="text-espresso-500 text-sm leading-relaxed">
              Je winkelwagen is nog leeg. Vanaf 2 zakken koffie krijg je
              bundelvoordeel bij afhalen, en ook de cadeaus leg je zo opzij.
            </p>
            <Link
              href="/assortiment"
              onClick={closeDrawer}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 text-paper-100 text-sm font-medium rounded-full hover:bg-sage-800 transition-colors"
            >
              Naar de webshop
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-espresso-900/6">
              {items.map((line) => {
                const info = regelInfo(line);
                if (!info) return null;
                return (
                  <li key={lineKey(line)} className="py-4 flex gap-4">
                    {info.thumb ? (
                      <Image
                        src={info.thumb}
                        alt={info.naam}
                        width={160}
                        height={160}
                        sizes="80px"
                        className="w-20 h-20 rounded-2xl object-cover bg-paper-200 shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-sage-100 border border-sage-200 flex items-center justify-center shrink-0">
                        <BagIcon className="w-7 h-7 text-sage-600" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-lg text-espresso-900 leading-tight">
                            {info.naam}
                          </p>
                          <p className="text-xs text-espresso-400 mt-0.5">{info.detail}</p>
                        </div>
                        <button
                          onClick={() => removeLine(line)}
                          aria-label={`${info.naam} verwijderen`}
                          className="shrink-0 w-11 h-11 -mt-2.5 -mr-3 flex items-center justify-center text-espresso-500 hover:text-espresso-700 transition-colors"
                        >
                          <CloseIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center gap-1 border border-espresso-900/15 rounded-full">
                          <button
                            onClick={() => setQty(line, line.qty - 1)}
                            aria-label="Eén minder"
                            className="w-11 h-11 rounded-full flex items-center justify-center text-espresso-600 hover:bg-sage-100 transition-colors"
                          >
                            <MinusIcon className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-espresso-900 tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => setQty(line, line.qty + 1)}
                            aria-label="Eén meer"
                            className="w-11 h-11 rounded-full flex items-center justify-center text-espresso-600 hover:bg-sage-100 transition-colors"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-espresso-900 tabular-nums">
                          {euro(info.stukprijs * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-espresso-900/8 px-6 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] space-y-3 bg-paper-100">
              <div className="flex justify-between text-sm">
                <span className="text-espresso-500">
                  Afhalen in de winkel
                  {totalen.koffieLos - totalen.koffieAfhalen > 0 && (
                    <span className="text-sage-700">
                      {" "}· {euro(totalen.koffieLos - totalen.koffieAfhalen)} bundelvoordeel
                    </span>
                  )}
                </span>
                <span className="font-semibold text-espresso-900 tabular-nums">
                  {euro(totalen.afhalen)}
                </span>
              </div>
              {totalen.verzenden !== null ? (
                <div className="flex justify-between text-sm">
                  <span className="text-espresso-500">
                    Verzenden (PostNL {euro(SHIPPING_COST)})
                  </span>
                  <span className="font-medium text-espresso-700 tabular-nums">
                    {euro(totalen.verzenden)}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-espresso-400">
                  Je wagen bevat producten van de imker; die zijn alleen af te
                  halen in de winkel.
                </p>
              )}
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

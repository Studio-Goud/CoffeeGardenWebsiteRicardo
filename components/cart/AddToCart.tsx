"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { BagIcon, MinusIcon, PlusIcon } from "../Icons";
import { GRINDS, type Grind } from "@/lib/products";

/** Maalwijze + aantal + "In winkelwagen" — het hart van de bestelfunnel. */
export default function AddToCart({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [grind, setGrind] = useState<Grind>("Hele bonen");
  const [qty, setQtyState] = useState(1);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-espresso-400 mb-3">
          Maalwijze
        </p>
        <div className="flex flex-wrap gap-2">
          {GRINDS.map((g) => (
            <button
              key={g}
              onClick={() => setGrind(g)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                grind === g
                  ? "bg-sage-700 border-sage-700 text-paper-100"
                  : "border-espresso-900/15 text-espresso-700 hover:border-sage-500 hover:text-sage-700"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="inline-flex items-center gap-1 border border-espresso-900/15 rounded-full self-start">
          <button
            onClick={() => setQtyState(Math.max(1, qty - 1))}
            aria-label="Eén zak minder"
            className="w-12 h-12 rounded-full flex items-center justify-center text-espresso-600 hover:bg-sage-100 transition-colors"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium text-espresso-900 tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQtyState(qty + 1)}
            aria-label="Eén zak meer"
            className="w-12 h-12 rounded-full flex items-center justify-center text-espresso-600 hover:bg-sage-100 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => addItem(slug, grind, qty)}
          className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-sage-700 text-paper-100 font-medium rounded-full hover:bg-sage-800 transition-colors duration-300"
        >
          <BagIcon className="w-4.5 h-4.5" />
          In winkelwagen
        </button>
      </div>
    </div>
  );
}

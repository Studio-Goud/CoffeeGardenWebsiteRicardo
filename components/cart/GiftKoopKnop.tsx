"use client";

/**
 * Koopknop voor cadeauproducten. Op kaarten: variantkeuze (maat of
 * print) plus een "In winkelwagen"-knop. Als compact: een ronde
 * plusknop voor prijslijstregels (honing, koek, kaarsen).
 * Verbergt zichzelf volledig zolang de webshop dicht is.
 */

import { useState } from "react";
import { useCart } from "./CartContext";
import { BagIcon, PlusIcon } from "../Icons";
import { getGift, WEBSHOP_OPEN } from "@/lib/products";

export default function GiftKoopKnop({
  id,
  compact,
}: {
  id: string;
  compact?: boolean;
}) {
  const { addCadeau } = useCart();
  const gift = getGift(id);
  const [variant, setVariant] = useState<string | undefined>(
    gift?.varianten?.[0]?.id,
  );

  if (!WEBSHOP_OPEN || !gift) return null;

  if (compact) {
    return (
      <button
        onClick={() => addCadeau(gift.id)}
        aria-label={`${gift.naam} in winkelwagen`}
        className="relative shrink-0 w-9 h-9 rounded-full bg-sage-700 text-paper-100 flex items-center justify-center hover:bg-sage-800 active:scale-95 transition-all after:absolute after:-inset-1.5 after:content-[''] after:rounded-full"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {gift.varianten && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Uitvoering">
          {gift.varianten.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariant(v.id)}
              aria-pressed={variant === v.id}
              className={`min-h-10 px-4 py-2 text-sm rounded-full border touch-manipulation transition-colors ${
                variant === v.id
                  ? "bg-sage-700 border-sage-700 text-paper-100"
                  : "border-espresso-900/15 text-espresso-700 hover:border-sage-500 hover:text-sage-700"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => addCadeau(gift.id, variant)}
        className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-sage-700 text-paper-100 text-sm font-medium rounded-full hover:bg-sage-800 active:scale-[0.98] transition-all"
      >
        <BagIcon className="w-4 h-4" />
        In winkelwagen
      </button>
    </div>
  );
}

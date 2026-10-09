"use client";

/**
 * Winkelwagen-state voor de bestelfunnel. Client-side met localStorage,
 * zodat de wagen een pagina-refresh en terugkerend bezoek overleeft.
 * Afrekenen gebeurt op /afrekenen; betalen (iDEAL) koppelen we later.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Grind } from "@/lib/products";

export interface CartItem {
  slug: string;
  grind: Grind;
  qty: number;
}

interface CartState {
  items: CartItem[];
  /** Totaal aantal zakken in de wagen. */
  bagCount: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (slug: string, grind: Grind, qty: number) => void;
  setQty: (slug: string, grind: Grind, qty: number) => void;
  removeItem: (slug: string, grind: Grind) => void;
  clear: () => void;
}

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "coffeegarden-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage niet beschikbaar (private mode) — wagen blijft leeg
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // opslaan mislukt — geen probleem, de wagen werkt in-memory door
    }
  }, [items, hydrated]);

  const value = useMemo<CartState>(() => {
    const sameLine = (i: CartItem, slug: string, grind: Grind) =>
      i.slug === slug && i.grind === grind;

    return {
      items,
      bagCount: items.reduce((n, i) => n + i.qty, 0),
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem: (slug, grind, qty) => {
        setItems((prev) => {
          const existing = prev.find((i) => sameLine(i, slug, grind));
          if (existing) {
            return prev.map((i) =>
              sameLine(i, slug, grind) ? { ...i, qty: i.qty + qty } : i,
            );
          }
          return [...prev, { slug, grind, qty }];
        });
        setDrawerOpen(true);
      },
      setQty: (slug, grind, qty) => {
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => !sameLine(i, slug, grind))
            : prev.map((i) => (sameLine(i, slug, grind) ? { ...i, qty } : i)),
        );
      },
      removeItem: (slug, grind) => {
        setItems((prev) => prev.filter((i) => !sameLine(i, slug, grind)));
      },
      clear: () => setItems([]),
    };
  }, [items, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart buiten CartProvider gebruikt");
  return ctx;
}

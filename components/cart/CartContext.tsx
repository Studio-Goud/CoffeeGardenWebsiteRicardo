"use client";

/**
 * Winkelwagen-state voor de bestelfunnel: koffiezakken én cadeaus.
 * Client-side met localStorage, zodat de wagen een refresh en
 * terugkerend bezoek overleeft. Prijzen worden hier nooit opgeslagen;
 * die rekent lib/products.ts uit (en de server nogmaals).
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getCoffeeBySlug,
  getGift,
  giftPrijs,
  GRINDS,
  type CartLine,
  type Grind,
} from "@/lib/products";

interface CartState {
  items: CartLine[];
  /** Aantal koffiezakken (voor bundelvoordeel en de honing-nudge). */
  bagCount: number;
  /** Totaal aantal artikelen, voor het tellertje op het icoon. */
  totalCount: number;
  /** True zodra de wagen uit localStorage is geladen (tegen flikkering). */
  hydrated: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addKoffie: (slug: string, grind: Grind, qty: number) => void;
  addCadeau: (id: string, variant?: string) => void;
  setQty: (line: CartLine, qty: number) => void;
  removeLine: (line: CartLine) => void;
  clear: () => void;
}

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "coffeegarden-cart-v2";
const OUD_STORAGE_KEY = "coffeegarden-cart-v1";

/** Unieke sleutel per regel: zelfde product+optie telt bij elkaar op. */
export function lineKey(line: CartLine): string {
  return line.soort === "koffie"
    ? `koffie:${line.slug}:${line.grind}`
    : `cadeau:${line.id}:${line.variant ?? ""}`;
}

/** Spiegelt de serverchecks: regels die daar afgekeurd zouden worden,
 *  komen hier de wagen niet in (anders lijkt de wagen "leeg" maar vol). */
function geldigeRegel(line: CartLine): boolean {
  if (!line || !Number.isInteger(line.qty) || line.qty < 1 || line.qty > 30) return false;
  if (line.soort === "koffie") {
    return Boolean(getCoffeeBySlug(line.slug)) && GRINDS.includes(line.grind);
  }
  if (line.soort !== "cadeau") return false;
  const gift = getGift(line.id);
  return Boolean(gift) && giftPrijs(gift!, line.variant) !== undefined;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      // Eenmalige migratie van de oude v1-wagen (zelfde regelvorm)
      const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(OUD_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Producten kunnen van de site verdwijnen: bewaarde regels filteren
        if (Array.isArray(parsed)) setItems(parsed.filter(geldigeRegel));
      }
      localStorage.removeItem(OUD_STORAGE_KEY);
    } catch {
      // localStorage niet beschikbaar (private mode): wagen blijft leeg
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // opslaan mislukt: de wagen werkt in-memory gewoon door
    }
  }, [items, hydrated]);

  const value = useMemo<CartState>(() => {
    const voegToe = (nieuw: CartLine) => {
      setItems((prev) => {
        const key = lineKey(nieuw);
        const bestaand = prev.find((l) => lineKey(l) === key);
        if (bestaand) {
          return prev.map((l) =>
            lineKey(l) === key ? { ...l, qty: Math.min(30, l.qty + nieuw.qty) } : l,
          );
        }
        return [...prev, nieuw];
      });
      setDrawerOpen(true);
    };

    return {
      items,
      bagCount: items.reduce((n, l) => n + (l.soort === "koffie" ? l.qty : 0), 0),
      totalCount: items.reduce((n, l) => n + l.qty, 0),
      hydrated,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addKoffie: (slug, grind, qty) => voegToe({ soort: "koffie", slug, grind, qty }),
      addCadeau: (id, variant) => voegToe({ soort: "cadeau", id, variant, qty: 1 }),
      setQty: (line, qty) => {
        const key = lineKey(line);
        setItems((prev) =>
          qty <= 0
            ? prev.filter((l) => lineKey(l) !== key)
            : prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(30, qty) } : l)),
        );
      },
      removeLine: (line) => {
        const key = lineKey(line);
        setItems((prev) => prev.filter((l) => lineKey(l) !== key));
      },
      clear: () => setItems([]),
    };
  }, [items, drawerOpen, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart buiten CartProvider gebruikt");
  return ctx;
}

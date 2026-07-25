/**
 * Statische productdata, gegenereerd vanuit de fysieke labels in de winkel.
 *
 * Waarom statisch en niet Shopify? De Shopify Storefront integratie staat in
 * lib/shopify.ts en is klaar voor zodra producten in Shopify zijn aangemaakt.
 * Tot die tijd serveren we direct uit deze file zodat de site live kan met
 * echte koffies in plaats van mock-data.
 *
 * Migratie: zodra producten in Shopify staan, vervang `getCoffees()` door
 * `getAllProducts()` uit lib/shopify.ts en match op handle (slug).
 *
 * Prijzen volgen het tier-systeem uit de winkel: alle huisblends hebben
 * dezelfde prijs, alle single origins dezelfde, BIO een tier hoger.
 * Zo verander je een tarief op één plek (PRICE_TABLE) ipv 13 keer.
 */

export type RoastLevel = "light" | "medium" | "medium-dark" | "dark";
export type CoffeeType = "single-origin" | "espresso-blend";
export type PriceTier =
  | "house-blend"
  | "single-origin"
  | "bio-single-origin";
export type Weight = "250g" | "500g" | "750g";

/** Prijzen in euro's (zelfde tabel als op het bord in de winkel). */
export const PRICE_TABLE: Record<PriceTier, Record<Weight, number>> = {
  "house-blend": { "250g": 11, "500g": 20, "750g": 28 },
  "single-origin": { "250g": 14, "500g": 25, "750g": 35 },
  "bio-single-origin": { "250g": 17, "500g": 31, "750g": 43 },
};

export const WEIGHTS: Weight[] = ["250g", "500g", "750g"];
export const DEFAULT_WEIGHT: Weight = "500g";

const TIER_LABEL: Record<PriceTier, string> = {
  "house-blend": "Huisblend",
  "single-origin": "Single Origin",
  "bio-single-origin": "BIO · Single Origin",
};

export function priceTierLabel(t: PriceTier): string {
  return TIER_LABEL[t];
}

export interface Coffee {
  slug: string;
  name: string;
  type: CoffeeType;
  /** Single origin: regio + land. Espresso blend: karakter, bv. "Krachtig & vol". */
  origin: string;
  /** Single origin: process methode. Blend: optioneel — bv. "Yellow Bourbon". */
  process?: string;
  /** Single origin: hoogte teelt, bv. "1900 m". */
  altitude?: string;
  /** 3 smaaknoten zoals op het label, bv. ["bloemig", "citrus", "honing"]. */
  notes: [string, string, string];
  roast: RoastLevel;
  /** "100% Arabica" of "Arabica · Robusta". */
  beans: string;
  /** Marketing-paragraaf van ~2-3 zinnen voor de detail-pagina. */
  description: string;
  /** Best brouwadvies — kort, 1 zin. */
  brewing: string;
  /** Hero-afbeelding (1200x1500) in /public/products/. */
  image: string;
  /** Vierkante thumbnail (800x800) voor de productlijst. */
  thumb: string;
  bio?: boolean;
  huisblend?: boolean;
  /** Prijscategorie — bepaalt prijs per gewicht via PRICE_TABLE. */
  priceTier: PriceTier;
}

const NL_ROAST: Record<RoastLevel, string> = {
  light: "Licht",
  medium: "Medium",
  "medium-dark": "Medium-Dark",
  dark: "Donker",
};

export function roastLabel(r: RoastLevel): string {
  return NL_ROAST[r];
}

export function priceFor(coffee: Coffee, weight: Weight): number {
  return PRICE_TABLE[coffee.priceTier][weight];
}

/** Laagste prijs (= 250g) — voor "vanaf €X" labels in de productlijst. */
export function startingPrice(coffee: Coffee): number {
  return PRICE_TABLE[coffee.priceTier]["250g"];
}

export const coffees: Coffee[] = [
  // ─── Single Origins ────────────────────────────────────────────────────
  {
    slug: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    type: "single-origin",
    origin: "Ethiopië · Sidama",
    process: "Washed",
    altitude: "1900 m",
    notes: ["bloemig", "citrus", "honing"],
    roast: "light",
    beans: "100% Arabica",
    description:
      "Een van de meest gevierde origins ter wereld. De Sidama-regio in zuidelijk Ethiopië levert bonen met een sprekend, parfumachtig karakter — bloemig, met heldere citrustonen en een fluweelzachte honing-zoetheid in de afdronk. Licht gebrand zodat de origin alle ruimte krijgt.",
    brewing: "Perfect als filter (V60, Chemex) of als single-origin espresso.",
    image: "/products/ethiopia-yirgacheffe.png",
    thumb: "/products/ethiopia-yirgacheffe-thumb.png",
    priceTier: "single-origin",
  },
  {
    slug: "colombia-supremo",
    name: "Colombia Supremo",
    type: "single-origin",
    origin: "Colombia · Huila",
    process: "Washed",
    altitude: "1700 m",
    notes: ["noot", "rood fruit", "chocolade"],
    roast: "medium",
    beans: "100% Arabica",
    description:
      "Klassiek Colombiaans uit de Huila-regio. Zachte noten van walnoot en hazelnoot, een lichte zoetheid van rood fruit en een rond chocoladelichaam. Medium gebrand voor een vol en uitgebalanceerd kopje, dag in dag uit.",
    brewing: "Sterke allrounder — filter, French press of espresso.",
    image: "/products/colombia-supremo.png",
    thumb: "/products/colombia-supremo-thumb.png",
    priceTier: "single-origin",
  },
  {
    slug: "peru-cajamarca",
    name: "Peru Cajamarca",
    type: "single-origin",
    origin: "Peru · Cajamarca",
    process: "Washed",
    altitude: "1800 m",
    notes: ["karamel", "cacao", "noten"],
    roast: "medium",
    beans: "100% Arabica",
    description:
      "Biologisch gecertificeerd uit de hooglanden van Cajamarca. Een diepe, romige body met karamel-zoetheid, cacao en zachte notentonen. Schone afdronk, ideaal voor wie houdt van een rustig maar vol kopje.",
    brewing: "Mooi als latte of cappuccino — laat de melk z'n karamel binden.",
    image: "/products/peru-cajamarca.png",
    thumb: "/products/peru-cajamarca-thumb.png",
    bio: true,
    priceTier: "bio-single-origin",
  },
  {
    slug: "casa-del-pueblo",
    name: "Casa del Pueblo",
    type: "single-origin",
    origin: "Mexico · Chiapas",
    process: "Washed",
    altitude: "1400 m",
    notes: ["chocolade", "bruine suiker", "amandel"],
    roast: "medium",
    beans: "100% Arabica",
    description:
      "Biologisch en fair-trade uit de Chiapas-regio in Mexico. Een gulle, melkchocolade-rijke smaak met bruine suiker en geroosterde amandel. Een van onze meest geliefde dagelijkse koffies — vriendelijk, vol en eerlijk.",
    brewing: "Heerlijk als espresso of in een AeroPress.",
    image: "/products/casa-del-pueblo.png",
    thumb: "/products/casa-del-pueblo-thumb.png",
    bio: true,
    priceTier: "bio-single-origin",
  },
  {
    slug: "brasil-cerrado",
    name: "Brasil Cerrado",
    type: "single-origin",
    origin: "Brazilië · Minas Gerais",
    process: "Natural",
    altitude: "1100 m",
    notes: ["hazelnoot", "melkchocolade", "karamel"],
    roast: "medium-dark",
    beans: "100% Arabica",
    description:
      "De klassieke Braziliaanse natural uit Minas Gerais. Door het droogproces blijft het fruit-sap in de boon, wat leidt tot een diepe melkchocolade-smaak met hazelnoot en karamel. Medium-dark gebrand voor een romig, espresso-vriendelijk profiel.",
    brewing: "Onze go-to als espresso-basis voor melk-drinks.",
    image: "/products/brasil-cerrado.png",
    thumb: "/products/brasil-cerrado-thumb.png",
    priceTier: "single-origin",
  },

  // ─── Espresso Blends (Huisblend-tarief) ────────────────────────────────
  {
    slug: "fleur-de-miel",
    name: "Fleur de Miel",
    type: "espresso-blend",
    origin: "Zacht & zoet",
    process: "Yellow Bourbon basis",
    notes: ["honing", "amandel", "gele vruchten"],
    roast: "medium",
    beans: "100% Arabica",
    description:
      "Onze huisblend, met zorg samengesteld rond Yellow Bourbon bonen. Een zachte, honingzoete espresso met amandel en hints van gele vruchten — als je 'm 's ochtends bij de croissant zet weet je waarom 'ie zo heet.",
    brewing: "Espresso of moka pot — laat de honing-zoetheid bloeien.",
    image: "/products/fleur-de-miel.png",
    thumb: "/products/fleur-de-miel-thumb.png",
    huisblend: true,
    priceTier: "house-blend",
  },
  {
    slug: "prima-luce",
    name: "Prima Luce",
    type: "espresso-blend",
    origin: "Helder & rond",
    notes: ["karamel", "sinaasappel", "cacao"],
    roast: "medium",
    beans: "100% Arabica",
    description:
      "Een heldere, levendige espresso-blend met karamel, een vleugje sinaasappel en cacao. Genoeg karakter om de melk te dragen, schoon genoeg om puur te drinken.",
    brewing: "Cortado of flat white — de citrus blijft mooi staan.",
    image: "/products/prima-luce.png",
    thumb: "/products/prima-luce-thumb.png",
    priceTier: "house-blend",
  },
  {
    slug: "lessentiel",
    name: "L'Essentiel",
    type: "espresso-blend",
    origin: "Evenwichtig",
    notes: ["noten", "chocolade", "gebrand brood"],
    roast: "medium-dark",
    beans: "Arabica · Robusta",
    description:
      "Het essentiële kopje. Een evenwichtige blend van Arabica en Robusta met een degelijk lichaam van noten, chocolade en gebrand brood. Geen verrassingen — wel pure betrouwbaarheid.",
    brewing: "Klassieke espresso of latte.",
    image: "/products/lessentiel.png",
    thumb: "/products/lessentiel-thumb.png",
    priceTier: "house-blend",
  },
  {
    slug: "reserve-noire",
    name: "Réserve Noire",
    type: "espresso-blend",
    origin: "Krachtig & vol",
    notes: ["pure cacao", "zwarte noten", "rook"],
    roast: "dark",
    beans: "Arabica · Robusta",
    description:
      "Donker gebrand, vol karakter. Pure cacao, zwarte noten en een rokerige diepte. Voor wie houdt van een Italiaanse espresso met body — met crema die blijft staan.",
    brewing: "Espresso, ristretto of moka pot.",
    image: "/products/reserve-noire.png",
    thumb: "/products/reserve-noire-thumb.png",
    priceTier: "house-blend",
  },
  {
    slug: "velours",
    name: "Velours",
    type: "espresso-blend",
    origin: "Fluwelig & diep",
    notes: ["donkere cacao", "zoethout", "pruim"],
    roast: "dark",
    beans: "Arabica · Robusta",
    description:
      "Fluwelig is het woord. Donkere cacao, een lichte zoetheid van zoethout en pruim, en een romige mondgevoel die blijft hangen. Onze meest sensuele espresso.",
    brewing: "Espresso met dichte crema, ook prachtig in een macchiato.",
    image: "/products/velours.png",
    thumb: "/products/velours-thumb.png",
    priceTier: "house-blend",
  },
  {
    slug: "magnifico",
    name: "Magnifico",
    type: "espresso-blend",
    origin: "Romig & klassiek",
    notes: ["melkchocolade", "hazelnoot", "vanille"],
    roast: "dark",
    beans: "Arabica · Robusta",
    description:
      "Een klassieke espresso-blend zoals 'ie bedoeld is. Melkchocolade, geroosterde hazelnoot en een vleugje vanille. Romig, royaal en onmiskenbaar Italiaans van sfeer.",
    brewing: "Cappuccino of caffè latte — de hazelnoot bindt prachtig met melk.",
    image: "/products/magnifico.png",
    thumb: "/products/magnifico-thumb.png",
    priceTier: "house-blend",
  },
  {
    slug: "domaine",
    name: "Domaine",
    type: "espresso-blend",
    origin: "Aards & vol",
    notes: ["cacao", "gedroogd fruit", "kruidnagel"],
    roast: "dark",
    beans: "Arabica · Robusta",
    description:
      "Aards, vol en een tikje kruidig. Cacao, gedroogd fruit en een echo van kruidnagel. Een blend voor wie het Mediterrane karakter zoekt — donker maar nooit verbrand.",
    brewing: "Espresso of als basis voor een sterke cortado.",
    image: "/products/domaine.png",
    thumb: "/products/domaine-thumb.png",
    priceTier: "house-blend",
  },
  {
    slug: "bellissimo",
    name: "Bellissimo",
    type: "espresso-blend",
    origin: "Pittig & intens",
    notes: ["donker fruit", "zwarte peper", "espresso"],
    roast: "dark",
    beans: "Arabica · Robusta",
    description:
      "Onze meest uitgesproken blend. Donker fruit, een spannende vleugje zwarte peper en een pure espresso-finish. Voor wie van het stoere werk houdt — geen halfzachte koffie hier.",
    brewing: "Pure espresso of ristretto, geen melk nodig.",
    image: "/products/bellissimo.png",
    thumb: "/products/bellissimo-thumb.png",
    priceTier: "house-blend",
  },
];

export function getCoffeeBySlug(slug: string): Coffee | undefined {
  return coffees.find((c) => c.slug === slug);
}

export function getCoffeesByType(type: CoffeeType): Coffee[] {
  return coffees.filter((c) => c.type === type);
}

export function getBioCoffees(): Coffee[] {
  return coffees.filter((c) => c.bio);
}

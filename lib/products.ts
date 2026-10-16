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
 * Prijzen zijn bewust simpel: elke koffiezak is standaard 500 gram en kost
 * €15, ongeacht welke koffie. Meerdere zakken zijn voordeliger (2 voor €28,
 * 3 voor €38) — dat bundelvoordeel geldt alleen bij afhalen in de winkel.
 * Verzenden kan ook: €15 per zak plus PostNL-verzendkosten (SHIPPING_COST).
 */

export type RoastLevel = "light" | "medium" | "medium-dark" | "dark";
export type CoffeeType = "single-origin" | "espresso-blend";

/** Standaard zakgrootte en prijs — geldt voor álle koffies. */
export const BAG_SIZE = "500 gr";
export const BAG_PRICE = 15;

/**
 * Webshop-schakelaar. Op false kan er niet online besteld worden:
 * geen winkelwagen, geen afrekenen, geen betalingen; de site toont
 * overal dat alles af te halen is in de winkel. Zet op true zodra
 * de webshop open mag.
 */
export const WEBSHOP_OPEN = true;

/**
 * Staffelprijzen in euro's (zelfde als op het bord in de winkel).
 * De bundelkorting geldt alleen bij afhalen in de winkel.
 */
export const BUNDLES = [
  { qty: 1, label: "1 zak", price: 15 },
  { qty: 2, label: "2 zakken", price: 28 },
  { qty: 3, label: "3 zakken", price: 38 },
] as const;

/**
 * Verzendtarief per bestelling (PostNL pakket t/m 10 kg, binnen NL).
 * LET OP: controleer dit bedrag tegen de actuele PostNL-tarieven.
 */
export const SHIPPING_COST = 7.95;

/** Maalwijzes — gratis gemalen op jouw zetmethode, of als hele boon. */
export const GRINDS = [
  "Hele bonen",
  "Filter",
  "Espresso",
  "French press",
  "Moka pot",
] as const;
export type Grind = (typeof GRINDS)[number];

/* ── Cadeaus & accessoires: bestelbare catalogus ───────────────────
   Dit is de prijswaarheid voor alle niet-koffieproducten. De teksten
   en foto's staan in components/shop/CadeausSecties.tsx; bestellen en
   afrekenen rekenen uitsluitend met deze tabel. */

export interface GiftVariant {
  id: string;
  label: string;
  prijs: number;
}

export interface Gift {
  id: string;
  naam: string;
  categorie: string;
  /** Vaste prijs; ontbreekt wanneer er varianten zijn. */
  prijs?: number;
  varianten?: GiftVariant[];
  /** Korte toelichting voor lijstweergave (honing, koek, kaarsen). */
  sub?: string;
  /** True: niet te verzenden, alleen af te halen in de winkel. */
  afhalenAlleen?: boolean;
}

export const GIFTS: Gift[] = [
  // Chai
  { id: "chai-tiger", naam: "Tiger Spice Chai", categorie: "Chai", prijs: 14.95 },
  { id: "chai-tortoise", naam: "Tortoise Green Tea Chai", categorie: "Chai", prijs: 14.95 },
  { id: "chai-flamingo", naam: "Flamingo Vanilla Chai (decaf)", categorie: "Chai", prijs: 14.95 },

  // Delfts blauw
  {
    id: "delfts-vaas", naam: "Delfts blauwe vaas", categorie: "Delfts blauw",
    varianten: [
      { id: "klein", label: "Klein", prijs: 12.95 },
      { id: "groot", label: "Groot", prijs: 17.95 },
    ],
  },
  {
    id: "delfts-mok", naam: "Delfts blauwe mok met gouden oor", categorie: "Delfts blauw",
    varianten: [
      { id: "klein", label: "Klein", prijs: 6.95 },
      { id: "groot", label: "Groot", prijs: 10.95 },
    ],
  },
  { id: "delfts-kom", naam: "Delfts blauwe kom", categorie: "Delfts blauw", prijs: 10.95 },
  { id: "delfts-peper-zout", naam: "Delfts blauw peper- & zoutstel", categorie: "Delfts blauw", prijs: 11.95 },

  // Tulpen-servies
  {
    id: "tulpen-mok", naam: "Tulpenmok met gouden oor", categorie: "Tulpen-servies",
    varianten: [
      { id: "klein", label: "Klein", prijs: 6.95 },
      { id: "groot", label: "Groot", prijs: 10.95 },
    ],
  },
  { id: "tulpen-shotglas", naam: "Tulpen-shotglaasje", categorie: "Tulpen-servies", prijs: 3.95 },
  { id: "tulpen-onderzetters", naam: "Tulpen-onderzetters (set van 6)", categorie: "Tulpen-servies", prijs: 4.95 },

  // Voor onderweg
  { id: "thermofles-tulpen", naam: "Thermofles Tulpen", categorie: "Voor onderweg", prijs: 14.95 },
  { id: "thermofles-sterrennacht", naam: "Thermofles Sterrennacht", categorie: "Voor onderweg", prijs: 14.95 },
  { id: "thermofles-rotterdam", naam: "Thermofles Rotterdam", categorie: "Voor onderweg", prijs: 14.95 },
  {
    id: "tote-bag", naam: "Tote bag", categorie: "Voor onderweg",
    varianten: [
      { id: "tulpen", label: "Tulpen", prijs: 7.95 },
      { id: "sterrennacht", label: "Sterrennacht", prijs: 7.95 },
      { id: "amandelbloesem", label: "Amandelbloesem", prijs: 7.95 },
      { id: "zonnebloemen", label: "Zonnebloemen", prijs: 7.95 },
      { id: "rotterdam", label: "Rotterdam", prijs: 7.95 },
    ],
  },
  { id: "magneet-rotterdam", naam: "Magneet Rotterdam", categorie: "Voor onderweg", prijs: 4.95 },

  // Blikken
  { id: "stroopwafels-blik", naam: "Stroopwafels in blik", categorie: "Blikken", prijs: 6.95 },
  { id: "speculaas-blik", naam: "Speculaas in blik", categorie: "Blikken", prijs: 11.95 },

  // Honing (alleen afhalen)
  { id: "honing-bloemen-creme", naam: "Bloemen crèmehoning", categorie: "Honing", sub: "Nederlands, romig en smeerbaar", prijs: 7.95, afhalenAlleen: true },
  { id: "honing-fruit", naam: "Fruithoning", categorie: "Honing", sub: "Nederlands, zacht en fruitig", prijs: 7.95, afhalenAlleen: true },
  { id: "honing-linde", naam: "Lindehoning", categorie: "Honing", sub: "Nederlands, fris en bloemig", prijs: 7.95, afhalenAlleen: true },
  { id: "honing-biesbosch", naam: "Biesboschhoning", categorie: "Honing", sub: "uit de regio", prijs: 6.95, afhalenAlleen: true },
  { id: "honing-acacia", naam: "Acaciahoning", categorie: "Honing", sub: "vloeibaar en mild", prijs: 8.45, afhalenAlleen: true },
  { id: "honing-kastanje", naam: "Kastanjehoning", categorie: "Honing", sub: "donker en licht bitter, heerlijk bij koffie", prijs: 8.45, afhalenAlleen: true },
  { id: "honing-oranjebloesem", naam: "Oranjebloesemhoning", categorie: "Honing", sub: "zoet en aromatisch", prijs: 7.45, afhalenAlleen: true },

  // Koek & snoep (alleen afhalen)
  { id: "honingkoek", naam: "Honingkoek", categorie: "Koek & snoep", sub: "500 gram, voorgesneden", prijs: 4.45, afhalenAlleen: true },
  { id: "honingkoek-kandij", naam: "Honingkoek met kandij", categorie: "Koek & snoep", sub: "500 gram", prijs: 6.95, afhalenAlleen: true },
  { id: "honingwafels", naam: "Honingwafels", categorie: "Koek & snoep", sub: "6 stuks", prijs: 4.45, afhalenAlleen: true },
  { id: "honingsnoep-gemengd", naam: "Gemengde honingsnoep", categorie: "Koek & snoep", sub: "120 gram, drie smaken", prijs: 3.45, afhalenAlleen: true },
  { id: "honingsnoep-melk", naam: "Melk & honing snoepjes", categorie: "Koek & snoep", sub: "100 gram, romig gevuld", prijs: 3.45, afhalenAlleen: true },
  { id: "honingsnoep-duindoorn", naam: "Duindoorn honingsnoep", categorie: "Koek & snoep", sub: "100 gram, met vitamine C", prijs: 3.45, afhalenAlleen: true },
  { id: "honinglollys", naam: "Honinglolly's", categorie: "Koek & snoep", sub: "8 stuks", prijs: 4.45, afhalenAlleen: true },
  { id: "honingdrop", naam: "Honingdrop", categorie: "Koek & snoep", sub: "150 gram, gemengd", prijs: 4.45, afhalenAlleen: true },

  // Kaarsen (alleen afhalen)
  { id: "kaars-bijenkorf", naam: "Bijenkorfkaars", categorie: "Kaarsen", sub: "klassieke korfvorm", prijs: 6.95, afhalenAlleen: true },
  { id: "kaars-bijenkorf-groot", naam: "Bijenkorfkaars groot", categorie: "Kaarsen", sub: "met bijtjes", prijs: 12.95, afhalenAlleen: true },
  { id: "kaars-koninginnebij", naam: "Koninginnebij", categorie: "Kaarsen", sub: "kaars in bijenvorm", prijs: 4.45, afhalenAlleen: true },
  { id: "kaars-piramide", naam: "Piramidekaars", categorie: "Kaarsen", sub: "met bij", prijs: 5.45, afhalenAlleen: true },
  { id: "kaars-stomp", naam: "Stompkaars", categorie: "Kaarsen", sub: "touwstructuur en bijtjes", prijs: 6.45, afhalenAlleen: true },
  { id: "kaars-bol", naam: "Bolkaars", categorie: "Kaarsen", sub: "touwstructuur en bijtjes", prijs: 9.95, afhalenAlleen: true },
  { id: "kaars-raat", naam: "Raatkaars groot", categorie: "Kaarsen", sub: "gegoten honingraat", prijs: 9.95, afhalenAlleen: true },
  { id: "kaars-diner", naam: "Dinerkaarsen", categorie: "Kaarsen", sub: "2 stuks, gerold", prijs: 7.45, afhalenAlleen: true },
  { id: "waxine-hartje", naam: "Waxinelichtjes hartje", categorie: "Kaarsen", sub: "6 stuks", prijs: 6.95, afhalenAlleen: true },
  { id: "waxine", naam: "Waxinelichtjes", categorie: "Kaarsen", sub: "18 stuks, zuivere bijenwas", prijs: 19.95, afhalenAlleen: true },
  { id: "kaars-kerstboom", naam: "Kerstboomkaarsjes", categorie: "Kaarsen", sub: "20 stuks", prijs: 19.95, afhalenAlleen: true },
];

export function getGift(id: string): Gift | undefined {
  return GIFTS.find((g) => g.id === id);
}

/** Prijs van een cadeau, met variant waar van toepassing. */
export function giftPrijs(gift: Gift, variantId?: string): number | undefined {
  if (gift.varianten) {
    return gift.varianten.find((v) => v.id === variantId)?.prijs;
  }
  return gift.prijs;
}

/* ── Winkelwagenregels en totalen (gedeeld door site en API) ─────── */

export type CartLine =
  | { soort: "koffie"; slug: string; grind: Grind; qty: number }
  | { soort: "cadeau"; id: string; variant?: string; qty: number };

export interface OrderTotalen {
  zakken: number;
  koffieLos: number;
  koffieAfhalen: number;
  cadeaus: number;
  bevatAfhalenAlleen: boolean;
  /** Totaal bij afhalen (koffie met bundelvoordeel + cadeaus). */
  afhalen: number;
  /** Totaal bij verzenden, of null wanneer verzenden niet kan. */
  verzenden: number | null;
}

/** Rekent alle totalen uit; geeft null bij een ongeldige regel. */
export function berekenTotalen(lines: CartLine[]): OrderTotalen | null {
  let zakken = 0;
  let cadeaus = 0;
  let bevatAfhalenAlleen = false;
  for (const line of lines) {
    if (!Number.isInteger(line.qty) || line.qty < 1 || line.qty > 30) return null;
    if (line.soort === "koffie") {
      if (!getCoffeeBySlug(line.slug) || !GRINDS.includes(line.grind)) return null;
      zakken += line.qty;
    } else {
      const gift = getGift(line.id);
      if (!gift) return null;
      const prijs = giftPrijs(gift, line.variant);
      if (prijs === undefined) return null;
      cadeaus += prijs * line.qty;
      if (gift.afhalenAlleen) bevatAfhalenAlleen = true;
    }
  }
  const koffieLos = zakken * BAG_PRICE;
  const koffieAfhalen = pickupTotal(zakken);
  const afhalen = koffieAfhalen + cadeaus;
  const verzenden = bevatAfhalenAlleen
    ? null
    : koffieLos + cadeaus + (lines.length > 0 ? SHIPPING_COST : 0);
  return { zakken, koffieLos, koffieAfhalen, cadeaus, bevatAfhalenAlleen, afhalen, verzenden };
}

/* ── Weergavehelpers (gedeeld door drawer, afrekenen en secties) ──── */

/** Prijsweergave in huisstijl: hele euro's als €15,-, anders €8,45. */
export function euro(n: number): string {
  const centen = Math.round(n * 100);
  if (centen % 100 === 0) return `€${centen / 100},-`;
  return `€${(centen / 100).toFixed(2).replace(".", ",")}`;
}

/** Cadeaus met een eigen productfoto in public/cadeaus/. */
const CADEAU_FOTOS = new Set([
  "chai-tiger", "chai-tortoise", "chai-flamingo", "delfts-vaas", "delfts-mok",
  "delfts-kom", "delfts-peper-zout", "tulpen-mok", "tulpen-shotglas",
  "tulpen-onderzetters", "thermofles-tulpen", "thermofles-sterrennacht",
  "thermofles-rotterdam", "stroopwafels-blik", "speculaas-blik",
  // Honing & bijenwas, vers van de imker
  "honing-bloemen-creme", "honing-fruit", "honing-linde", "honing-biesbosch",
  "honing-acacia", "honing-kastanje", "honing-oranjebloesem",
  "honingkoek", "honingwafels", "honingsnoep-gemengd", "honingsnoep-melk",
  "honingsnoep-duindoorn", "honinglollys", "honingdrop",
  "kaars-bijenkorf", "kaars-bijenkorf-groot", "kaars-koninginnebij",
  "kaars-piramide", "kaars-stomp", "kaars-bol", "kaars-raat", "kaars-diner",
  "waxine-hartje", "waxine", "kaars-kerstboom",
]);

/** Pad naar de cadeaufoto, of null wanneer er (nog) geen foto is. */
export function giftThumb(id: string): string | null {
  if (id === "tote-bag") return "/cadeaus/tote-bag-tulpen.jpg";
  if (id === "magneet-rotterdam") return "/cadeaus/magneet-skyline.jpg";
  return CADEAU_FOTOS.has(id) ? `/cadeaus/${id}.jpg` : null;
}

/**
 * Totaalprijs bij afhalen: goedkoopste combinatie van staffels
 * (bv. 4 zakken = 3 + 1 = €38 + €15 = €53).
 */
export function pickupTotal(bags: number): number {
  let total = 0;
  let n = bags;
  total += Math.floor(n / 3) * 38;
  n = n % 3;
  if (n === 2) total += 28;
  if (n === 1) total += 15;
  return total;
}

/** Totaalprijs bij verzenden: géén bundelkorting, plus verzendkosten. */
export function shippingTotal(bags: number): number {
  return bags * BAG_PRICE + (bags > 0 ? SHIPPING_COST : 0);
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
  decaf?: boolean;
  /** Nog geen zakfoto: koffie blijft van de site tot de foto er is. */
  fotoVolgt?: boolean;
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

/** Categorie-label voor de detailpagina, bv. "BIO · Single Origin". */
export function categoryLabel(coffee: Coffee): string {
  if (coffee.decaf) return "Decaf · Single Origin";
  if (coffee.bio) return "BIO · Single Origin";
  if (coffee.type === "single-origin") return "Single Origin";
  return "Huisblend";
}

const ALLE_KOFFIES: Coffee[] = [
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
      "Een van de meest gevierde origins ter wereld. De Sidama-regio in zuidelijk Ethiopië levert bonen met een sprekend, parfumachtig karakter: bloemig, met heldere citrustonen en een fluweelzachte honing-zoetheid in de afdronk. Licht gebrand zodat de origin alle ruimte krijgt.",
    brewing: "Perfect als filter (V60, Chemex) of als single-origin espresso.",
    image: "/products/ethiopia-yirgacheffe-bag.jpg",
    thumb: "/products/ethiopia-yirgacheffe-bag-thumb.jpg",
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
    brewing: "Sterke allrounder: filter, French press of espresso.",
    image: "/products/colombia-supremo-bag.jpg",
    thumb: "/products/colombia-supremo-bag-thumb.jpg",
  },
  {
    slug: "colombia-huila-decaf",
    name: "Colombia Huila Decaf",
    type: "single-origin",
    origin: "Colombia · Huila",
    process: "Sugarcane EA (decaf)",
    altitude: "1700 m",
    notes: ["cacao", "amandel", "rood fruit"],
    roast: "medium",
    beans: "100% Arabica",
    description:
      "Alle smaak van Huila, zonder de cafeïne. Deze decaf wordt ontcafeïneerd met het natuurlijke sugarcane-proces (EA), dat de boon met rust laat: een rond, zacht kopje met cacao, geroosterde amandel en een vleugje rood fruit. Ook om tien uur 's avonds een goed idee.",
    brewing: "Espresso of filter, je proeft niet dat er iets mist.",
    image: "/products/colombia-huila-decaf-bag.jpg",
    thumb: "/products/colombia-huila-decaf-bag-thumb.jpg",
    decaf: true,
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
    brewing: "Mooi als latte of cappuccino, laat de melk z'n karamel binden.",
    image: "/products/peru-cajamarca-bag.jpg",
    thumb: "/products/peru-cajamarca-bag-thumb.jpg",
    bio: true,
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
      "Biologisch en fair-trade uit de Chiapas-regio in Mexico. Een gulle, melkchocolade-rijke smaak met bruine suiker en geroosterde amandel. Een van onze meest geliefde dagelijkse koffies: vriendelijk, vol en eerlijk.",
    brewing: "Heerlijk als espresso of in een AeroPress.",
    image: "/products/casa-del-pueblo-bag.jpg",
    thumb: "/products/casa-del-pueblo-bag-thumb.jpg",
    bio: true,
  },
  {
    slug: "brasil-cerrado",
    fotoVolgt: true,
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
  },

  // ─── Espresso Blends ───────────────────────────────────────────────────
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
      "Onze huisblend, met zorg samengesteld rond Yellow Bourbon bonen. Een zachte, honingzoete espresso met amandel en hints van gele vruchten. Als je 'm 's ochtends bij de croissant zet weet je waarom 'ie zo heet.",
    brewing: "Espresso of moka pot, laat de honing-zoetheid bloeien.",
    image: "/products/fleur-de-miel-bag.jpg",
    thumb: "/products/fleur-de-miel-bag-thumb.jpg",
    huisblend: true,
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
    brewing: "Cortado of flat white, de citrus blijft mooi staan.",
    image: "/products/prima-luce-bag.jpg",
    thumb: "/products/prima-luce-bag-thumb.jpg",
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
      "Het essentiële kopje. Een evenwichtige blend van Arabica en Robusta met een degelijk lichaam van noten, chocolade en gebrand brood. Geen verrassingen, wel pure betrouwbaarheid.",
    brewing: "Klassieke espresso of latte.",
    image: "/products/lessentiel-bag.jpg",
    thumb: "/products/lessentiel-bag-thumb.jpg",
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
      "Donker gebrand, vol karakter. Pure cacao, zwarte noten en een rokerige diepte. Voor wie houdt van een Italiaanse espresso met body, met crema die blijft staan.",
    brewing: "Espresso, ristretto of moka pot.",
    image: "/products/reserve-noire-bag.jpg",
    thumb: "/products/reserve-noire-bag-thumb.jpg",
  },
  {
    slug: "velours",
    fotoVolgt: true,
    name: "Velours",
    type: "espresso-blend",
    origin: "Fluwelig & diep",
    notes: ["donkere cacao", "zoethout", "pruim"],
    roast: "dark",
    beans: "Arabica · Robusta",
    description:
      "Fluwelig is het woord. Donkere cacao, een lichte zoetheid van zoethout en pruim, en een romig mondgevoel dat blijft hangen. Onze meest sensuele espresso.",
    brewing: "Espresso met dichte crema, ook prachtig in een macchiato.",
    image: "/products/velours.png",
    thumb: "/products/velours-thumb.png",
  },
  {
    slug: "magnifico",
    fotoVolgt: true,
    name: "Magnifico",
    type: "espresso-blend",
    origin: "Romig & klassiek",
    notes: ["melkchocolade", "hazelnoot", "vanille"],
    roast: "dark",
    beans: "Arabica · Robusta",
    description:
      "Een klassieke espresso-blend zoals 'ie bedoeld is. Melkchocolade, geroosterde hazelnoot en een vleugje vanille. Romig, royaal en onmiskenbaar Italiaans van sfeer.",
    brewing: "Cappuccino of caffè latte, de hazelnoot bindt prachtig met melk.",
    image: "/products/magnifico.png",
    thumb: "/products/magnifico-thumb.png",
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
      "Aards, vol en een tikje kruidig. Cacao, gedroogd fruit en een echo van kruidnagel. Een blend voor wie het Mediterrane karakter zoekt: donker, maar nooit verbrand.",
    brewing: "Espresso of als basis voor een sterke cortado.",
    image: "/products/domaine-bag.jpg",
    thumb: "/products/domaine-bag-thumb.jpg",
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
      "Onze meest uitgesproken blend. Donker fruit, een spannend vleugje zwarte peper en een pure espresso-finish. Voor wie van het stoere werk houdt, geen halfzachte koffie hier.",
    brewing: "Pure espresso of ristretto, geen melk nodig.",
    image: "/products/bellissimo-bag.jpg",
    thumb: "/products/bellissimo-bag-thumb.jpg",
  },
];

/**
 * Alleen koffies met een echte zakfoto staan op de site. Zodra er een
 * foto is: fotoVolgt-vlag bij die koffie weghalen en hij doet weer mee.
 */
export const coffees: Coffee[] = ALLE_KOFFIES.filter((c) => !c.fotoVolgt);

export function getCoffeeBySlug(slug: string): Coffee | undefined {
  return coffees.find((c) => c.slug === slug);
}

export function getCoffeesByType(type: CoffeeType): Coffee[] {
  return coffees.filter((c) => c.type === type);
}

export function getBioCoffees(): Coffee[] {
  return coffees.filter((c) => c.bio);
}

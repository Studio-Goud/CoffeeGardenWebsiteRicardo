# Coffee Garden — coffeegarden.nl

De website van Coffee Garden, speciaalzaak in koffie & thee aan de
Bergselaan 291-A in Rotterdam Noord.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- [Tailwind CSS 4](https://tailwindcss.com)
- Fonts: Fraunces (display) + Inter (tekst), via `next/font`
- Deploy: Vercel, gekoppeld aan `coffeegarden.nl`

## Ontwikkelen

```bash
npm install
npm run dev
```

## Structuur

- `app/` — pagina's: home, assortiment (+ detail per koffie), winkel, workshops
- `lib/products.ts` — alle koffies + prijstabel (zelfde tiers als het bord in de winkel)
- `components/Illustrations.tsx` — bespoke lijn-illustraties (geen emoji, geen icon-library)
- `components/Icons.tsx` — eigen getekende UI-icoontjes in dezelfde stijl

## Prijzen aanpassen

Alle prijzen staan in `PRICE_TABLE` in `lib/products.ts` — één plek,
drie tiers (huisblend / single origin / bio). Een koffie toevoegen of
wijzigen doe je in dezelfde file; de pagina's volgen automatisch.

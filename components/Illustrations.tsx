/**
 * Bespoke lijn-illustraties voor Coffee Garden.
 * Handgetekende stijl: één doorlopende 2px-stroke, ronde uiteinden,
 * bewust net-niet-symmetrisch zodat het ambachtelijk voelt.
 * Elke categorie (koffie, thee, matcha, chai) heeft z'n eigen tekening.
 */

type IllustrationProps = {
  className?: string;
  /** Laat de stroke zichzelf tekenen bij eerste weergave. */
  draw?: boolean;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Koffiekop met schotel en opkringelende stoom. */
export function CupIllustration({ className, draw }: IllustrationProps) {
  const cls = draw ? "draw-path" : undefined;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g {...stroke}>
        {/* stoom */}
        <path className={cls} d="M48 18c-3 5 3 7 0 12m14-14c-3 5 3 7 0 12m14-10c-3 4 2.5 6 0 10" opacity="0.55" />
        {/* kop */}
        <path className={cls} d="M32 46h56c0 16-4 27-13 33-4.5 3-10 4.5-15 4.5S49.5 82 45 79c-9-6-13-17-13-33Z" />
        {/* oor */}
        <path className={cls} d="M88 52c8-1 13 3 12 9-1 7-8 10-15 8" />
        {/* schotel */}
        <path className={cls} d="M26 92c8 4 22 6 34 6s26-2 34-6" />
        {/* koffie-oppervlak */}
        <path className={cls} d="M40 55c6 3 13 4.5 20 4.5S74 58 80 55" opacity="0.55" />
      </g>
    </svg>
  );
}

/** Twee theeblaadjes aan een takje. */
export function TeaIllustration({ className, draw }: IllustrationProps) {
  const cls = draw ? "draw-path" : undefined;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g {...stroke}>
        {/* tak */}
        <path className={cls} d="M60 104C58 78 58 52 66 22" />
        {/* linkerblad */}
        <path className={cls} d="M59 62C38 64 26 52 25 34c18-2 32 8 34 28Z" />
        <path className={cls} d="M31 39c9 5 18 12 26 21" opacity="0.55" />
        {/* rechterblad */}
        <path className={cls} d="M64 44c17-4 28-15 27-32-17 1-28 13-27 32Z" />
        <path className={cls} d="M86 19c-8 7-15 15-21 24" opacity="0.55" />
      </g>
    </svg>
  );
}

/** Matcha-kom met chasen (bamboe-klopper). */
export function MatchaIllustration({ className, draw }: IllustrationProps) {
  const cls = draw ? "draw-path" : undefined;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g {...stroke}>
        {/* chasen-steel */}
        <path className={cls} d="M78 14v22" />
        {/* chasen-tanden */}
        <path className={cls} d="M70 58c-2-10 1-18 4-22m4 22V36m8 21c2-9-1-17-4-21m-16 14c-3-4-4-8-4-12m28 11c3-4 4-7 4-11" opacity="0.8" />
        {/* kom */}
        <path className={cls} d="M28 62h64c-1 14-7 24-17 29-4.6 2.3-10 3.5-15 3.5S49.6 93.3 45 91c-10-5-16-15-17-29Z" />
        {/* voet */}
        <path className={cls} d="M52 95v7h16v-7" />
        {/* matcha-oppervlak */}
        <path className={cls} d="M38 70c7 3.5 14.5 5 22 5s15-1.5 22-5" opacity="0.55" />
      </g>
    </svg>
  );
}

/** Chai-pot (kandhari-stijl) met deksel en stoom. */
export function ChaiIllustration({ className, draw }: IllustrationProps) {
  const cls = draw ? "draw-path" : undefined;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g {...stroke}>
        {/* stoom */}
        <path className={cls} d="M56 12c-3 4 3 6 0 10m12-10c-3 4 3 6 0 10" opacity="0.55" />
        {/* deksel */}
        <path className={cls} d="M50 34h24m-12-6v6" />
        {/* pot */}
        <path className={cls} d="M46 34c-2 8-8 12-8 24 0 14 9 24 22 24s22-10 22-24c0-12-6-16-8-24" />
        {/* tuit */}
        <path className={cls} d="M39 48c-6 0-11 4-11 10 0 4 2 7 6 8" />
        {/* oor */}
        <path className={cls} d="M81 48c7 0 12 5 11 11-1 5-5 8-10 8" />
        {/* kruiden-accent */}
        <path className={cls} d="M52 66c3 2.5 6 3.8 8 3.8s5-1.3 8-3.8" opacity="0.55" />
      </g>
    </svg>
  );
}

/** Koffietak met bessen — decoratief, voor hero en tussensecties. */
export function BranchIllustration({ className, draw }: IllustrationProps) {
  const cls = draw ? "draw-path" : undefined;
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden>
      <g {...stroke}>
        <path className={cls} d="M8 96C56 84 120 56 192 20" />
        {/* bladeren */}
        <path className={cls} d="M52 84c-2-14 4-24 16-28 3 13-3 24-16 28Z" />
        <path className={cls} d="M96 66c-14 3-24-2-29-13 12-5 24 0 29 13Z" />
        <path className={cls} d="M138 46c-2-13 4-22 15-26 3 12-3 22-15 26Z" />
        {/* bessen */}
        <circle className={cls} cx="72" cy="90" r="6" />
        <circle className={cls} cx="86" cy="82" r="6" />
        <circle className={cls} cx="118" cy="62" r="6" />
        <circle className={cls} cx="160" cy="40" r="6" />
      </g>
    </svg>
  );
}

/** Enkele koffieboon — als bullet / accent. */
export function BeanIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <ellipse cx="12" cy="12" rx="7" ry="9" transform="rotate(24 12 12)" />
        <path d="M8.6 6.2c3.2 3.4 3.6 8.2 1 11.8" />
      </g>
    </svg>
  );
}

/** Stoom-lijnen los te gebruiken boven beelden. */
export function SteamLines({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path className="animate-steam" d="M18 50c-4-7 4-10 0-18" />
        <path className="animate-steam-slow" d="M30 52c-4-8 4-11 0-20" />
        <path className="animate-steam" style={{ animationDelay: "0.9s" }} d="M42 50c-4-7 4-10 0-18" />
      </g>
    </svg>
  );
}

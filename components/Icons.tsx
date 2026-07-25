/**
 * Eigen getekende icoontjes — bewust géén icon-library.
 * Alle iconen delen dezelfde taal: 1.5px stroke, ronde uiteinden,
 * licht organische vormen die passen bij de illustraties.
 */

type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 21c-3.8-3.9-6.5-7.2-6.5-10.4C5.5 6.9 8.4 4 12 4s6.5 2.9 6.5 6.6c0 3.2-2.7 6.5-6.5 10.4Z" />
      <circle cx="12" cy="10.4" r="2.3" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.8V12l3 2.2" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <rect x="4" y="6.5" width="16" height="11.5" rx="2.2" />
      <path d="m4.8 8 6.4 5a1.3 1.3 0 0 0 1.6 0l6.4-5" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M4.5 12h14.3m0 0-5.4-5.4M18.8 12l-5.4 5.4" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.9" cy="7.1" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <rect x="6" y="5.5" width="12" height="12" rx="2.4" />
      <path d="M6.5 12.5h11M10 2.8l2 2.7 2-2.7M9.2 20.8l-1.2 1.7m7-1.7 1.2 1.7M9.5 15.2h.01m4.99 0h.01" />
    </svg>
  );
}

export function BikeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="6.2" cy="15.8" r="3.4" />
      <circle cx="17.8" cy="15.8" r="3.4" />
      <path d="M6.2 15.8 9.4 9h5.3m3.1 6.8-2.6-7.6m0 0h-2.1M9.4 9l3.4 6.8h-6" />
    </svg>
  );
}

export function CarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M5 13.5 6.6 8.8A2 2 0 0 1 8.5 7.4h7a2 2 0 0 1 1.9 1.4l1.6 4.7m-14 0h14m-14 0a1.8 1.8 0 0 0-1.4 1.8v2.6a1 1 0 0 0 1 1h1.2a1 1 0 0 0 1-1v-.8h10.4v.8a1 1 0 0 0 1 1h1.2a1 1 0 0 0 1-1v-2.6a1.8 1.8 0 0 0-1.4-1.8" />
      <path d="M7.6 16.2h.01m8.79 0h.01" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M19 5c-8.5 0-13 4.2-13 9.3 0 2.6 1.9 4.7 4.6 4.7C16 19 19 12.4 19 5Z" />
      <path d="M6.8 18.5C9.5 14 13 10.5 16.5 8" />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 4c.6 4.4 3.6 7.4 8 8-4.4.6-7.4 3.6-8 8-.6-4.4-3.6-7.4-8-8 4.4-.6 7.4-3.6 8-8Z" />
    </svg>
  );
}

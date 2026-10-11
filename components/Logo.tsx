/**
 * Coffee Garden logo als echte vector. Het zware pad staat eenmalig in
 * LogoDefs (app/layout.tsx); dit component verwijst er alleen naar.
 * Kleurt mee via currentColor (text-sage-600, text-paper-100, enz.).
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 6250 6250"
      className={className}
      role="img"
      aria-label="Coffee Garden, speciaalzaak in koffie en thee"
    >
      <use href="#cg-logo" />
    </svg>
  );
}

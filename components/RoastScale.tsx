import type { RoastLevel } from "@/lib/products";
import { roastLabel } from "@/lib/products";
import { BeanIllustration } from "./Illustrations";

const LEVELS: RoastLevel[] = ["light", "medium", "medium-dark", "dark"];

/**
 * Brandgraad als rij koffiebonen: gevuld tot aan het niveau.
 * Vervangt de tekst-only "Medium gebrand" labels van de oude site.
 */
export default function RoastScale({
  roast,
  className,
  showLabel = true,
}: {
  roast: RoastLevel;
  className?: string;
  showLabel?: boolean;
}) {
  const index = LEVELS.indexOf(roast);
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <div className="flex items-center gap-1" aria-hidden>
        {LEVELS.map((level, i) => (
          <BeanIllustration
            key={level}
            className={`w-4 h-4 ${i <= index ? "text-espresso-700" : "text-espresso-700/20"}`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-espresso-500 font-medium">
          {roastLabel(roast)} gebrand
        </span>
      )}
    </div>
  );
}

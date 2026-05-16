import { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/Display";

/**
 * Standard section header: eyebrow label + multi-line display heading + optional aside.
 */
export function SectionHeader({
  eyebrow,
  lines,
  emphasizedLine,
  aside,
  light = false,
}: {
  eyebrow: string;
  lines: readonly string[];
  emphasizedLine?: number;
  aside?: ReactNode;
  light?: boolean;
}) {
  return (
    <Reveal>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-14">
        <div>
          <Label light={light}>{eyebrow}</Label>
          <DisplayLines
            as="h2"
            light={light}
            lines={lines}
            emphasizedLine={emphasizedLine}
            className="mt-5"
          />
        </div>
        {aside && (
          <div
            className={`max-w-[320px] text-[14px] font-light leading-[1.8] md:text-right ${
              light ? "text-blue-pale" : "text-text-light"
            }`}
          >
            {aside}
          </div>
        )}
      </div>
    </Reveal>
  );
}

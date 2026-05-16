import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

export function CTA({
  eyebrow = "Et après ?",
  title,
  desc,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section
      className="bg-blue"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "var(--gap)",
        paddingBottom: "var(--gap)",
      }}
    >
      <Reveal>
        <div className="max-w-4xl">
          <Label light>{eyebrow}</Label>
          <h2
            className="display display-light mt-5 mb-6"
            style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}
          >
            {title}
          </h2>
          {desc && (
            <p className="text-[15px] font-light leading-[1.85] text-blue-pale mb-10 max-w-[560px]">
              {desc}
            </p>
          )}
          <div className="flex gap-6 flex-wrap items-center">
            <Link href={primary.href} className="btn btn-light">
              {primary.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn-ghost text-beige opacity-70 hover:opacity-100">
                {secondary.label} <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

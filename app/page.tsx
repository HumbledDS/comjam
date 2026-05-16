import { HeroCinematic } from "@/components/sections/HeroCinematic";
import { Bento } from "@/components/sections/Bento";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/brand/Ornament";
import { Pattern } from "@/components/brand/Pattern";
import { CTA } from "@/components/sections/CTA";
import { home, testimonials } from "@/lib/copy";

export default function HomePage() {
  const featured = testimonials[0];

  return (
    <>
      <HeroCinematic />
      <Marquee items={home.ticker} />
      <Bento />

      {/* Single big testimonial as a typographic break */}
      <section
        className="relative overflow-hidden bg-beige"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <Pattern variant="blue" opacity={0.04} />
        </div>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center relative">
            <Ornament
              kind="apostrophe"
              variant="blue"
              width={48}
              opacity={0.7}
              className="mx-auto mb-6"
            />
            <blockquote
              className="font-display font-light italic text-blue leading-[1.3]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              {featured.quote}
            </blockquote>
            <div className="mt-8 text-[11px] font-medium tracking-[2.5px] uppercase text-blue-light">
              {featured.name} · <span className="text-text-light font-normal">{featured.role}</span>
            </div>
          </div>
        </Reveal>
      </section>

      <CTA
        eyebrow="Et après ?"
        title="Parlons de votre projet."
        desc="Shooting, stratégie, formation ou consulting — un message suffit. Réponse sous 48h."
        primary={{ href: "/contact", label: "Nous contacter" }}
        secondary={{ href: "/reservation", label: "Réserver un shooting" }}
      />
    </>
  );
}

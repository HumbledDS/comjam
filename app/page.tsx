import { headers } from "next/headers";
import { HeroReel } from "@/components/sections/HeroReel";
import { EditorialIntro } from "@/components/sections/EditorialIntro";
import { PortraitGallery } from "@/components/sections/PortraitGallery";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { BootcampPanel } from "@/components/sections/BootcampPanel";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/brand/Ornament";
import { CTA } from "@/components/sections/CTA";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { isLaunched } from "@/lib/launch";
import { home, testimonials } from "@/lib/copy";

export default async function HomePage() {
  const host = (await headers()).get("host");
  if (!isLaunched(host)) return <ComingSoon />;

  const featured = testimonials[0];

  return (
    <>
      <HeroReel />
      <Marquee items={home.ticker} />
      <EditorialIntro />
      <PortraitGallery />
      <ServicesShowcase />
      <BootcampPanel />

      {/* Single editorial testimonial */}
      <section
        className="bg-beige"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <Ornament
              kind="apostrophe"
              variant="blue"
              width={40}
              opacity={0.7}
              className="mx-auto mb-6"
            />
            <blockquote
              className="font-display font-light italic text-blue leading-[1.3]"
              style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}
            >
              {featured.quote}
            </blockquote>
            <div className="mt-8 text-[11px] font-medium tracking-[2.5px] uppercase text-blue-light">
              {featured.name} ·{" "}
              <span className="text-text-light font-normal">{featured.role}</span>
            </div>
          </div>
        </Reveal>
      </section>

      <CTA
        eyebrow="Travaillons ensemble"
        title="Parlons de votre projet."
        desc="Réponse sous 48h."
        primary={{ href: "/contact", label: "Nous contacter" }}
        secondary={{ href: "/reservation", label: "Réserver un shooting" }}
      />
    </>
  );
}

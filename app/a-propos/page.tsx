import Image from "next/image";
import type { Metadata } from "next";
import { about } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/Display";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = {
  title: "À propos — Com'Jam Agency",
  description:
    "Découvrez Com'Jam : agence de communication spécialisée en création de contenu, stratégie digitale et marketing d'influence. Fondée par Jamila à Paris.",
};

// Renders **bold** in paragraphs
function renderRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-blue font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function AboutPage() {
  return (
    <>
      <section
        className="bg-beige pt-[160px] pb-20 grid lg:grid-cols-2 items-start"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          gap: "var(--gap)",
        }}
      >
        <Reveal>
          <Label>{about.eyebrow}</Label>
          <DisplayLines
            as="h1"
            size="lg"
            lines={about.title}
            emphasizedLine={about.emphasizedLine}
            className="mt-5 mb-8"
          />
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] font-light leading-[1.9] text-blue-mid mb-5">
              {renderRichText(p)}
            </p>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-10">
            {about.values.map((v) => (
              <div
                key={v}
                className="px-4 py-[13px] bg-paper border-l-2 border-beige-mid text-[12px] font-normal text-blue hover:border-blue-light hover:bg-beige-dark transition-colors"
              >
                {v}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="bg-paper border-t-[3px] border-blue-light p-12 mb-8"
            style={{ boxShadow: "20px 20px 0 var(--color-beige-dark)" }}
          >
            <p className="font-display text-2xl font-light italic leading-[1.55] text-blue mb-8 pl-5 border-l-2 border-blue-light">
              {about.quote}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue text-beige flex items-center justify-center font-display text-xl shrink-0">
                {about.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-[13px] font-medium text-blue mb-1">
                  {about.author.name}
                </div>
                <div className="text-[11px] font-light text-text-light tracking-wide">
                  {about.author.role}
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] mb-8 overflow-hidden">
            <Image
              src={unsplash.studioWide}
              alt="Studio Com'Jam"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex bg-blue flex-wrap">
            {about.numbers.map((n, i, arr) => (
              <div
                key={n.label}
                className={`flex-1 px-4 py-6 text-center min-w-[50%] sm:min-w-0 ${
                  i < arr.length - 1 ? "border-r border-[rgba(200,220,234,0.1)]" : ""
                }`}
              >
                <div className="font-display text-[28px] font-light text-beige leading-none mb-1">
                  {n.value}
                </div>
                <div className="text-[9px] font-normal tracking-[1.5px] uppercase text-blue-pale">
                  {n.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        className="bg-blue text-center"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Reveal>
          <Label light>Notre mission</Label>
          <p
            className="display display-light max-w-4xl mx-auto mt-7 italic"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            « {about.mission} »
          </p>
        </Reveal>
      </section>

      <Testimonials />

      <CTA
        title="Envie d'écrire la suite ensemble ?"
        desc="Que ce soit pour un shooting, une stratégie complète ou un coaching personnel, je serai ravie de vous accompagner."
        primary={{ href: "/contact", label: "Prendre contact" }}
        secondary={{ href: "/services", label: "Voir nos services" }}
      />
    </>
  );
}

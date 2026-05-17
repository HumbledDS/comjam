import Image from "next/image";
import type { Metadata } from "next";
import { about, brand } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/Display";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Monogram } from "@/components/brand/Monogram";
import { Ornament } from "@/components/brand/Ornament";
import { Pattern } from "@/components/brand/Pattern";
import { media } from "@/lib/media";
import {
  InstagramIcon,
  TikTokIcon,
  LinktreeIcon,
  MailIcon,
} from "@/components/brand/SocialIcon";

export const metadata: Metadata = {
  title: "À propos — Com'Jam Agency",
  description:
    "Découvrez Com'Jam : agence de communication spécialisée en création de contenu, stratégie digitale et marketing d'influence. Fondée par Jamila à Paris.",
};

// Renders **bold** segments in paragraphs.
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
        className="bg-beige pt-[160px] pb-20 grid lg:grid-cols-[1fr_minmax(0,560px)] items-start"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          gap: "var(--gap)",
        }}
      >
        {/* LEFT — editorial copy */}
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
            <p
              key={i}
              className="text-[15px] font-light leading-[1.9] text-blue-mid mb-5"
            >
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

        {/* RIGHT — framed portrait + status pill + side icon rail */}
        <Reveal delay={0.2}>
          <div className="relative pr-12 lg:pr-14">
            {/* Portrait frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(13,32,53,0.35)] bg-beige-dark">
              <Image
                src={media.about.src}
                alt="Portrait Jamila — fondatrice Com'Jam"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 540px"
                className="object-cover"
              />

              {/* "Disponible" status pill — bottom-left of the frame */}
              <div className="absolute left-4 bottom-4 sm:left-5 sm:bottom-5 inline-flex items-center gap-2.5 bg-paper/95 backdrop-blur-sm px-4 py-2 rounded-full text-[11px] font-medium text-blue tracking-wide shadow-md">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                Disponible pour de nouveaux projets
              </div>

              {/* Signature watermark — bottom-right */}
              <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-5 pointer-events-none">
                <span className="font-display italic font-light text-beige/85 text-[22px] sm:text-[26px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] leading-none">
                  Jamila.
                </span>
              </div>
            </div>

            {/* Right-edge icon rail — vertical stack of social channels */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col gap-1.5 bg-paper/95 backdrop-blur-sm rounded-l-xl py-3 px-2 shadow-md">
              {[
                { label: "Instagram", Icon: InstagramIcon, href: brand.instagram.url, external: true },
                { label: "TikTok", Icon: TikTokIcon, href: brand.tiktok.url, external: true },
                { label: "Linktree", Icon: LinktreeIcon, href: brand.linktree.url, external: true },
                { label: "Email", Icon: MailIcon, href: `mailto:${brand.email}`, external: false },
              ].map(({ label, Icon, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center text-blue hover:bg-blue hover:text-beige transition-colors rounded-md"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quote card below the portrait */}
          <div
            className="bg-paper border-t-[3px] border-blue-light p-9 mt-10"
            style={{ boxShadow: "16px 16px 0 var(--color-beige-dark)" }}
          >
            <p className="font-display text-[22px] font-light italic leading-[1.55] text-blue mb-7 pl-5 border-l-2 border-blue-light">
              {about.quote}
            </p>
            <div className="flex items-center gap-4">
              <Monogram variant="blue" size={40} />
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

          {/* Numbers strip */}
          <div className="flex bg-blue flex-wrap mt-6">
            {about.numbers.map((n, i, arr) => (
              <div
                key={n.label}
                className={`flex-1 px-4 py-6 text-center min-w-[50%] sm:min-w-0 ${
                  i < arr.length - 1
                    ? "border-r border-[rgba(200,220,234,0.1)]"
                    : ""
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
        className="relative overflow-hidden bg-blue text-center"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Pattern variant="cream" opacity={0.06} />
        <Reveal>
          <div className="flex justify-center mb-8">
            <Ornament kind="swoosh" variant="cream" width={100} drift opacity={0.8} />
          </div>
          <Label light>Notre mission</Label>
          <p
            className="display display-light max-w-4xl mx-auto mt-7 italic relative"
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

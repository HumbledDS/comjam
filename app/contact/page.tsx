import type { Metadata } from "next";
import { contact } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/Display";
import { ContactForm } from "@/components/sections/ContactForm";
import { Ornament } from "@/components/brand/Ornament";
import { Pattern } from "@/components/brand/Pattern";

export const metadata: Metadata = {
  title: "Contact — Com'Jam Agency",
  description:
    "Parlons de votre projet — shooting photo, stratégie réseaux, bootcamp ou consulting. Réponse sous 48h.",
};

export default function ContactPage() {
  return (
    <section
      className="relative overflow-hidden bg-beige pt-[160px] grid lg:grid-cols-[1fr_minmax(0,540px)] items-start"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingBottom: "var(--gap)",
        gap: "var(--gap)",
      }}
    >
      {/* Decorative bg layer, wrapped so its children don't take grid cells */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Pattern variant="blue" opacity={0.04} />
        <Ornament
          kind="flourish"
          variant="blue"
          width={48}
          opacity={0.4}
          className="hidden lg:block absolute top-[160px] right-[44%] z-0"
          drift
        />
      </div>

      <Reveal>
        <Label>{contact.eyebrow}</Label>
        <DisplayLines
          as="h1"
          size="lg"
          lines={contact.title}
          emphasizedLine={contact.emphasizedLine}
          className="mt-5"
        />
        <p className="text-[15px] font-light leading-[1.85] text-blue-mid mt-4 mb-10 max-w-md">
          {contact.desc}
        </p>

        <div className="flex flex-col gap-2 mt-10">
          {contact.channels.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target={c.kind === "em" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 bg-paper border border-beige-mid text-blue transition-all hover:border-blue-light hover:pl-7 hover:shadow-[0_4px_20px_rgba(27,58,92,0.06)] group"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-beige text-[14px] font-display font-medium text-blue shrink-0 group-hover:bg-blue group-hover:text-beige transition-colors">
                {c.icon}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-blue mb-px">{c.name}</div>
                <div className="text-[12px] font-light text-text-light">{c.handle}</div>
              </div>
              <div className="text-blue-light text-base transition-transform group-hover:translate-x-1">
                →
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="relative">
        <ContactForm subjects={contact.formSubjects} />
      </Reveal>
    </section>
  );
}

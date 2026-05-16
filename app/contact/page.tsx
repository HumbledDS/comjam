import type { Metadata } from "next";
import { contact } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { DisplayLines } from "@/components/ui/Display";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Com'Jam Agency",
  description:
    "Parlons de votre projet — shooting photo, stratégie réseaux, bootcamp ou consulting. Réponse sous 48h.",
};

export default function ContactPage() {
  return (
    <section
      className="bg-blue pt-[160px] grid lg:grid-cols-2 items-start"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingBottom: "var(--gap)",
        gap: "var(--gap)",
      }}
    >
      <Reveal>
        <Label light>{contact.eyebrow}</Label>
        <DisplayLines
          as="h1"
          size="lg"
          light
          lines={contact.title}
          emphasizedLine={contact.emphasizedLine}
          className="mt-5"
        />
        <p className="text-[15px] font-light leading-[1.85] text-blue-pale mt-4 mb-10">
          {contact.desc}
        </p>

        <div className="flex flex-col gap-3 mt-10">
          {contact.channels.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target={c.kind === "em" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-[18px] px-[18px] py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(200,220,234,0.08)] text-beige transition-all hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(200,220,234,0.2)] hover:pl-6 group"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[rgba(200,220,234,0.08)] text-[15px] font-display text-blue-pale shrink-0">
                {c.icon}
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-beige mb-px">{c.name}</div>
                <div className="text-[11px] font-light text-blue-pale">{c.handle}</div>
              </div>
              <div className="text-blue-pale text-base">→</div>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <ContactForm subjects={contact.formSubjects} />
      </Reveal>
    </section>
  );
}

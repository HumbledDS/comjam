import type { Metadata } from "next";
import { bootcamp } from "@/lib/copy";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { Pattern } from "@/components/brand/Pattern";
import { Ornament } from "@/components/brand/Ornament";

export const metadata: Metadata = {
  title: "Content Shift Bootcamp — Com'Jam Agency",
  description: `${bootcamp.date} · En ligne. ${bootcamp.desc.slice(0, 140)}`,
};

export default function BootcampPage() {
  return (
    <>
      <section
        className="bg-paper relative overflow-hidden pt-[160px]"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Pattern on="beige" opacity={0.06} />
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-light text-[rgba(27,58,92,0.04)] whitespace-nowrap pointer-events-none select-none tracking-[8px]"
          style={{ fontSize: "clamp(60px, 14vw, 200px)" }}
        >
          CONTENT SHIFT
        </div>
        <Ornament
          kind="flourish"
          on="beige"
          width={70}
          className="absolute top-[180px] right-[10%] hidden md:block"
          drift
        />

        <div className="relative grid lg:grid-cols-2 gap-12 items-end mb-14">
          <Reveal>
            <Label>{bootcamp.eyebrow}</Label>
            <h1
              className="display mt-5 mb-6"
              style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
            >
              Content <em>Shift</em>
            </h1>
            <div className="inline-flex items-center gap-3 bg-beige border border-beige-mid px-5 py-[10px] text-[11px] font-normal tracking-[2px] text-blue mt-6">
              <span
                className="w-[6px] h-[6px] bg-blue-light rounded-full"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
              {bootcamp.date} · {bootcamp.schedule}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-[15px] font-light leading-[1.85] text-text-light">
              {bootcamp.desc}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="relative grid md:grid-cols-2 gap-5 mb-12" stagger={0.1}>
          {bootcamp.days.map((day) => (
            <div
              key={day.num}
              className="bg-beige p-11 border-t-2 border-transparent hover:border-blue-light transition-colors relative"
            >
              <div
                aria-hidden
                className="absolute top-4 right-6 font-display text-[80px] font-light text-[rgba(27,58,92,0.06)] leading-none pointer-events-none"
              >
                {day.num}
              </div>
              <div className="text-[9px] font-medium tracking-[3px] uppercase text-blue-light mb-3">
                {day.label}
              </div>
              <h3 className="font-display text-2xl font-normal text-blue mb-6 leading-tight">
                {day.title}
              </h3>
              <div className="flex flex-col gap-[14px]">
                {day.modules.map((m) => (
                  <div key={m.time} className="flex gap-4 items-start">
                    <div className="text-[10px] font-medium text-blue-light tracking-wide whitespace-nowrap w-[76px] shrink-0 pt-[2px]">
                      {m.time}
                    </div>
                    <div className="text-[12.5px] font-normal text-blue leading-[1.55]">
                      {m.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </RevealGroup>

        <div className="relative grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          <Reveal>
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-6">
              Ce qui est inclus dans votre inscription
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              {bootcamp.includes.map((inc) => (
                <div
                  key={inc.name}
                  className="flex items-start gap-[14px] p-4 bg-beige border-l-2 border-transparent hover:border-blue-light transition-colors"
                >
                  <div className="w-[14px] text-blue-light text-[11px] shrink-0 mt-px">—</div>
                  <div>
                    <div className="text-[12px] font-medium text-blue mb-px">{inc.name}</div>
                    <div className="text-[11px] font-light text-text-light">{inc.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-blue p-11 lg:sticky lg:top-[110px]">
              <div className="inline-block bg-blue-light text-paper text-[9px] font-medium tracking-[2px] uppercase px-[14px] py-[5px] mb-6">
                {bootcamp.price.label}
              </div>
              <div className="font-display text-[72px] font-light text-beige leading-none mb-1">
                {bootcamp.price.current}€
              </div>
              <div className="text-[13px] font-light text-blue-pale line-through mb-2">
                Tarif normal : {bootcamp.price.original}€
              </div>
              <div className="text-[12px] font-light text-blue-pale leading-[1.7] mb-6">
                Pour les 20 premiers inscrits.
                <br />
                {bootcamp.date} · {bootcamp.schedule}.
              </div>
              <div className="h-px bg-[rgba(200,220,234,0.12)] my-5" />
              <Button href="/contact?subject=bootcamp" variant="light" className="w-full text-center !block">
                Réserver ma place
              </Button>
              <div className="h-px bg-[rgba(200,220,234,0.12)] my-5" />
              <ul className="text-[11px] font-light text-blue-pale leading-[2]">
                {bootcamp.reassurance.map((r) => (
                  <li key={r} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-blue-light">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        eyebrow="Une question ?"
        title="On y répond avec plaisir."
        desc="Vous hésitez, vous voulez en savoir plus sur le programme, ou réserver pour un groupe ? Envoyez-nous un mot."
        primary={{ href: "/contact?subject=bootcamp", label: "Poser une question" }}
        secondary={{ href: "/a-propos", label: "En savoir plus sur Com'Jam" }}
      />
    </>
  );
}

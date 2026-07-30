import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { bootcamp, contentTrip } from "@/lib/copy";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { Pattern } from "@/components/brand/Pattern";
import { Ornament } from "@/components/brand/Ornament";

export const metadata: Metadata = {
  title: "Bootcamp by Com'Jam · 26 et 27 Septembre 2026",
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
        <Pattern variant="blue" opacity={0.04} />
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-light text-[rgba(27,58,92,0.04)] whitespace-nowrap pointer-events-none select-none tracking-[8px]"
          style={{ fontSize: "clamp(60px, 14vw, 200px)" }}
        >
          CONTENT SHIFT
        </div>
        <Ornament
          kind="flourish"
          variant="blue"
          width={50}
          opacity={0.5}
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
                    <div className="text-[10px] font-medium text-blue-light tracking-wide whitespace-nowrap w-[108px] shrink-0 pt-[2px]">
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
                  <div className="w-[14px] text-blue-light text-[11px] shrink-0 mt-px">-</div>
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
              <a
                href={bootcamp.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light w-full text-center block"
              >
                Réserver ma place
              </a>
              <div className="h-px bg-[rgba(200,220,234,0.12)] my-5" />
              <ul className="text-[11px] font-light text-blue-pale leading-[2]">
                {bootcamp.reassurance.map((r) => (
                  <li key={r} className="pl-4 relative before:content-['-'] before:absolute before:left-0 before:text-blue-light">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ AUTRE ÉVÈNEMENT · CONTENT TRIP ============ */}
      <section
        className="bg-paper"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <div className="grid lg:grid-cols-2 items-stretch border border-beige-mid">
          <Reveal className="relative aspect-[5/6] lg:aspect-auto lg:min-h-[560px] overflow-hidden">
            <Image
              src={contentTrip.villaImage}
              alt="Villa du Com'Jam Content Trip à Lanzarote"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue/40 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 text-[10px] font-medium tracking-[3px] uppercase text-beige bg-blue/60 backdrop-blur-sm px-3 py-1.5">
              Voyage créatif
            </div>
          </Reveal>

          <Reveal delay={0.15} className="bg-blue p-10 lg:p-14 flex flex-col justify-between text-beige">
            <div>
              <Label light>Autre évènement</Label>
              <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mt-5 mb-3">
                {contentTrip.name}
              </div>
              <h2
                className="display display-light mb-6"
                style={{ fontSize: "clamp(36px, 4vw, 64px)" }}
              >
                Édition 02 · <em>Lanzarote.</em>
              </h2>
              <div className="text-[12px] font-medium tracking-[2px] uppercase text-blue-pale/90 mb-6">
                {contentTrip.date} · 6 participantes
              </div>
              <p className="text-[15px] font-light leading-[1.8] text-blue-pale max-w-md">
                {contentTrip.heroDesc}
              </p>
            </div>

            <div className="flex items-end justify-between gap-4 mt-10 pt-8 border-t border-[rgba(200,220,234,0.2)]">
              <div>
                <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-2">
                  {contentTrip.pricing.label}
                </div>
                <div className="font-display text-[48px] font-light leading-none">
                  {contentTrip.pricing.price}
                  <span className="text-[15px] font-sans font-light text-blue-pale ml-2">
                    {contentTrip.pricing.priceSuffix}
                  </span>
                </div>
              </div>
              <Link href="/content-trip" className="btn btn-light whitespace-nowrap">
                Découvrir
              </Link>
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

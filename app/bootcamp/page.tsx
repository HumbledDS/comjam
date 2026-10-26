import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { bootcamp, contentTrip } from "@/lib/copy";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { CTA } from "@/components/sections/CTA";
import { Pattern } from "@/components/brand/Pattern";
import { Ornament } from "@/components/brand/Ornament";
import { SpeakerSilhouette } from "@/components/brand/SpeakerSilhouette";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { StickyCta } from "@/components/sections/StickyCta";

export const metadata: Metadata = {
  title: "Content Shift · Bootcamp by Com'Jam · 14 et 15 Novembre 2026",
  description: `${bootcamp.date} · En ligne · 9h-18h. ${bootcamp.tagline}`,
};

const ReserveButton = ({ className = "btn btn-primary" }: { className?: string }) => (
  <a
    href={bootcamp.calendarUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    Réserver ma place
  </a>
);

export default function BootcampPage() {
  const { price } = bootcamp;
  return (
    <>
      {/* ============ HERO ============ */}
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

        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Label>{bootcamp.eyebrow}</Label>
            <h1
              className="display mt-5 mb-3"
              style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
            >
              Content <em>Shift</em>
            </h1>
            <p className="font-display italic text-[16px] text-blue-light mb-6">
              {bootcamp.subTagline}
            </p>
            <div className="inline-flex items-center gap-3 bg-beige border border-beige-mid px-5 py-[10px] text-[11px] font-normal tracking-[2px] text-blue">
              <span
                className="w-[6px] h-[6px] bg-blue-light rounded-full"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
              {bootcamp.date} · {bootcamp.schedule}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className="font-display italic text-blue leading-[1.4] mb-6"
              style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
            >
              {bootcamp.tagline}
            </p>
            {bootcamp.heroIntro.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-[14.5px] font-light leading-[1.85] text-blue-mid mb-4 max-w-xl"
              >
                {p}
              </p>
            ))}
            <div className="mt-6">
              <ReserveButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ À QUI S'ADRESSE CONTENT SHIFT ============ */}
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
          <Label>À qui s&apos;adresse Content Shift ?</Label>
          <h2
            className="display mt-5 mb-12"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
          >
            {bootcamp.forYou.title}
          </h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-[10px]" stagger={0.07}>
          {bootcamp.forYou.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 p-5 bg-paper border-l-2 border-transparent hover:border-blue-light transition-colors"
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue text-beige text-[11px] flex items-center justify-center mt-px">
                ✓
              </span>
              <span className="text-[14px] font-light text-blue leading-[1.6]">
                {item}
              </span>
            </div>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="font-display italic text-[18px] lg:text-[20px] text-blue leading-[1.5] pl-5 border-l-2 border-blue-light mt-10 max-w-2xl">
            {bootcamp.forYou.outro}
          </p>
        </Reveal>
      </section>

      {/* ============ LE PROGRAMME ============ */}
      <section
        className="bg-paper relative overflow-hidden"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Reveal>
          <Label>Le programme</Label>
          <h2
            className="display mt-5 mb-12"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
          >
            Deux journées <em>complètes.</em>
          </h2>
        </Reveal>
        <RevealGroup className="relative grid md:grid-cols-2 gap-5" stagger={0.1}>
          {bootcamp.days.map((day) => (
            <div
              key={day.num}
              className="bg-beige p-8 sm:p-11 border-t-2 border-transparent hover:border-blue-light transition-colors relative"
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
              <div className="flex flex-col gap-[16px]">
                {day.modules.map((m) => (
                  <div key={m.time} className="flex gap-4 items-start">
                    <div className="text-[10px] font-medium text-blue-light tracking-wide whitespace-nowrap w-[108px] shrink-0 pt-[2px]">
                      {m.time}
                    </div>
                    <div>
                      <div className="text-[12.5px] font-normal text-blue leading-[1.55]">
                        {m.name}
                      </div>
                      {"benefit" in m && m.benefit && (
                        <div className="text-[11.5px] font-light italic text-text-light leading-[1.6] mt-1">
                          {m.benefit}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ============ LES INTERVENANTS ============ */}
      <section
        className="bg-blue text-beige relative overflow-hidden"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Pattern variant="cream" opacity={0.04} />
        <Reveal>
          <div className="relative flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div>
              <Label light>{bootcamp.speakers.title}</Label>
              <h2
                className="display display-light mt-5"
                style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
              >
                Ils vous <em>accompagnent.</em>
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] font-light leading-[1.7] text-blue-pale md:text-right">
              {bootcamp.speakers.note}
            </p>
          </div>
        </Reveal>
        <RevealGroup className="relative grid grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
          {bootcamp.speakers.items.map((s, i) => (
            <div
              key={s.role + i}
              className="bg-blue-deep border border-[rgba(200,220,234,0.14)] overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <SpeakerSilhouette variant={s.silhouette} />
              </div>
              <div className="p-5">
                <div className="text-[12px] font-medium text-beige mb-1">
                  {s.role}
                </div>
                <div className="text-[11px] font-light text-blue-pale leading-[1.6]">
                  {s.theme}
                </div>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ============ INCLUS + TARIFS ============ */}
      <section
        className="bg-paper"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <div className="relative grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          <Reveal>
            <Label>Inclus dans votre inscription</Label>
            <h2
              className="display mt-5 mb-10"
              style={{ fontSize: "clamp(26px, 3vw, 44px)" }}
            >
              Bien plus que <em>deux journées.</em>
            </h2>
            <div className="flex flex-col gap-4">
              {bootcamp.includes.map((inc, i) => (
                <div
                  key={inc.name}
                  className="flex items-start gap-5 p-6 sm:p-7 bg-beige border-l-[3px] border-blue-light"
                >
                  <div className="font-display text-[32px] font-light text-blue-light leading-none shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-display text-[20px] font-normal text-blue mb-1 leading-tight">
                      {inc.name}
                    </div>
                    <div className="text-[13px] font-light text-text-light leading-[1.6]">
                      {inc.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-blue p-9 sm:p-11 lg:sticky lg:top-[110px]">
              {price.earlyBirdActive ? (
                <>
                  <div className="inline-block bg-beige text-blue text-[10px] font-semibold tracking-[2px] uppercase px-[14px] py-[6px] mb-6">
                    {price.label}
                  </div>
                  <div className="font-display text-[72px] font-light text-beige leading-none mb-2">
                    {price.current}€
                  </div>
                  <div className="text-[13px] font-normal text-beige mb-1">
                    {price.earlyBirdNote}
                  </div>
                  <div className="text-[13px] font-light text-blue-pale line-through mb-4">
                    Tarif normal : {price.original}€
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-block bg-blue-light text-paper text-[10px] font-medium tracking-[2px] uppercase px-[14px] py-[6px] mb-6">
                    Inscription
                  </div>
                  <div className="font-display text-[72px] font-light text-beige leading-none mb-4">
                    {price.original}€
                  </div>
                </>
              )}
              <div className="text-[12px] font-light text-blue-pale leading-[1.7] mb-6">
                {bootcamp.date}
                <br />
                {bootcamp.schedule}.
              </div>
              <div className="h-px bg-[rgba(200,220,234,0.12)] my-5" />
              <ReserveButton className="btn btn-light w-full text-center block" />
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

      {/* ============ FAQ ============ */}
      <section
        className="bg-beige"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-start">
          <Reveal className="lg:col-span-4">
            <Label>FAQ</Label>
            <h2
              className="display mt-5"
              style={{ fontSize: "clamp(30px, 3.5vw, 48px)" }}
            >
              Vos <em>questions.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-8">
            <FaqAccordion items={bootcamp.faq} />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch border border-beige-mid">
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
                  Sur candidature
                </div>
                <div className="font-display text-[28px] font-light leading-tight text-beige">
                  6 places seulement
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

      {/* Barre CTA sticky mobile */}
      <StickyCta href={bootcamp.calendarUrl} label="Réserver ma place" />
    </>
  );
}

import Image from "next/image";
import type { Metadata } from "next";
import { contentTrip } from "@/lib/copy";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Pattern } from "@/components/brand/Pattern";
import { Ornament } from "@/components/brand/Ornament";
import { ContentTripCountdown } from "@/components/sections/ContentTripCountdown";
import { ContentTripFaq } from "@/components/sections/ContentTripFaq";
import { ContentTripGallery } from "@/components/sections/ContentTripGallery";
import { ContentTripSticky } from "@/components/sections/ContentTripSticky";

export const metadata: Metadata = {
  title: "Com'Jam Content Trip · Édition 02 Lanzarote",
  description: `${contentTrip.date} · 5 jours, 6 participantes, une villa à Lanzarote. ${contentTrip.heroTitle}`,
};

const ApplyButton = ({
  className = "btn btn-primary",
  label = contentTrip.ctaLabel,
}: {
  className?: string;
  label?: string;
}) => (
  <a
    href={contentTrip.formUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    {label} →
  </a>
);

export default function ContentTripPage() {
  return (
    <>
      {/* ============ 01 · HERO ============ */}
      <section
        className="bg-beige relative overflow-hidden pt-[160px]"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Pattern variant="blue" opacity={0.04} />
        <Ornament
          kind="flourish"
          variant="blue"
          width={50}
          opacity={0.5}
          className="absolute top-[180px] right-[6%] hidden lg:block"
          drift
        />

        <div className="relative grid lg:grid-cols-[1fr_minmax(0,520px)] gap-12 items-center">
          <Reveal>
            <Label>{contentTrip.eyebrow}</Label>
            <h1
              className="display mt-5 mb-5"
              style={{ fontSize: "clamp(38px, 4.8vw, 72px)" }}
            >
              Édition 02 · <em>Lanzarote</em>
            </h1>
            <div className="inline-flex items-center gap-3 bg-paper border border-beige-mid px-5 py-[10px] text-[11px] font-normal tracking-[2px] text-blue mb-8">
              <span
                className="w-[6px] h-[6px] bg-blue-light rounded-full"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
              {contentTrip.date}
            </div>
            <p className="font-display italic text-[18px] lg:text-[21px] text-blue leading-[1.5] mb-5 max-w-xl">
              {contentTrip.heroTitle}
            </p>
            <p className="text-[14.5px] font-light leading-[1.85] text-blue-mid mb-9 max-w-xl">
              {contentTrip.heroDesc}
            </p>
            <div className="flex flex-wrap items-end gap-8">
              <ApplyButton />
              <ContentTripCountdown
                deadline={contentTrip.applicationDeadline}
                deadlineLabel={contentTrip.applicationDeadlineLabel}
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden shadow-[0_30px_80px_-20px_rgba(13,32,53,0.35)] bg-beige-dark">
              <Image
                src={contentTrip.villaImage}
                alt="Villa du Content Trip à Lanzarote"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-paper/95 backdrop-blur-sm px-4 py-2 text-[10px] font-medium tracking-[2.5px] uppercase text-blue">
                Lanzarote · Îles Canaries
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 02 · LE CONCEPT ============ */}
      <section
        className="bg-paper"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <Reveal className="lg:col-span-5">
            <Label>02 · Le concept</Label>
            <h2
              className="display mt-5"
              style={{ fontSize: "clamp(32px, 3.8vw, 56px)" }}
            >
              Plus qu&apos;un voyage,
              <br />
              une <em>expérience.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            {contentTrip.concept.paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-[15px] font-light leading-[1.9] text-blue-mid mb-5"
              >
                {p}
              </p>
            ))}
            <p className="font-display italic text-[19px] lg:text-[21px] text-blue leading-[1.5] pl-5 border-l-2 border-blue-light mt-7">
              {contentTrip.concept.highlight}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ 03 · POUR QUI ============ */}
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
          <Label>03 · À qui s&apos;adresse cette expérience ?</Label>
          <h2
            className="display mt-5 mb-12"
            style={{ fontSize: "clamp(30px, 3.5vw, 52px)" }}
          >
            {contentTrip.forYou.title}
          </h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-[10px]" stagger={0.07}>
          {contentTrip.forYou.items.map((item) => (
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
      </section>

      {/* ============ 04 · CE QUE VOUS ALLEZ APPRENDRE ============ */}
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
          <Label light>04 · Ce que vous allez apprendre</Label>
          <h2
            className="display display-light mt-5 mb-12"
            style={{ fontSize: "clamp(30px, 3.5vw, 52px)" }}
          >
            {contentTrip.learn.title}
          </h2>
        </Reveal>
        <RevealGroup className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]" stagger={0.06}>
          {contentTrip.learn.items.map((item, i) => (
            <div
              key={item}
              className="flex items-start gap-4 p-5 bg-[rgba(200,220,234,0.06)] border border-[rgba(200,220,234,0.14)] hover:border-blue-light transition-colors"
            >
              <span className="font-display text-[18px] font-light text-blue-light leading-none mt-px">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13.5px] font-light text-blue-pale leading-[1.6]">
                {item}
              </span>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ============ 05 · LE PROGRAMME ============ */}
      <section
        className="bg-blue-deep text-beige relative overflow-hidden text-center"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "calc(var(--gap) * 0.8)",
          paddingBottom: "calc(var(--gap) * 0.8)",
        }}
      >
        <Pattern variant="cream" opacity={0.05} />
        <Reveal>
          <Label light>05 · Le programme</Label>
          <p
            className="display display-light max-w-3xl mx-auto mt-6 italic"
            style={{ fontSize: "clamp(26px, 3vw, 42px)" }}
          >
            {contentTrip.program.title}
          </p>
          <p className="text-[14px] font-light text-blue-pale mt-5">
            {contentTrip.program.desc}
          </p>
        </Reveal>
      </section>

      {/* ============ 06 · INCLUS + 07 · ACCOMPAGNANTES + 08 · TARIFS ============ */}
      <section
        className="bg-paper"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <div className="grid lg:grid-cols-[1fr_1fr_360px] gap-12 items-start">
          {/* Inclus */}
          <Reveal>
            <Label>06 · Ce qui est inclus</Label>
            <h3 className="font-display text-[26px] font-normal text-blue mt-5 mb-7 leading-tight">
              Votre expérience comprend :
            </h3>
            <ul className="flex flex-col gap-[10px]">
              {contentTrip.includes.map((inc) => (
                <li
                  key={inc}
                  className="flex items-start gap-[14px] p-4 bg-beige border-l-2 border-transparent hover:border-blue-light transition-colors text-[13px] font-light text-blue leading-[1.55]"
                >
                  <span className="text-blue-light shrink-0">-</span>
                  {inc}
                </li>
              ))}
            </ul>
            <p className="text-[11px] font-light text-text-light italic mt-5 leading-[1.7]">
              {contentTrip.includesNote}
            </p>
          </Reveal>

          {/* Accompagnantes */}
          <Reveal delay={0.1}>
            <Label>07 · Les accompagnantes</Label>
            <h3 className="font-display text-[26px] font-normal text-blue mt-5 mb-7 leading-tight">
              Vous serez accompagnée par :
            </h3>
            <div className="flex flex-col gap-6">
              {contentTrip.team.map((t) => (
                <div key={t.name} className="flex gap-5 items-start">
                  <div className="relative w-[88px] h-[88px] shrink-0 rounded-full overflow-hidden bg-beige-dark">
                    <Image
                      src={t.photo}
                      alt={`Portrait de ${t.name}`}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-blue">{t.name}</div>
                    <div className="text-[11px] font-light text-blue-light tracking-wide mb-2">
                      {t.role}
                    </div>
                    <p className="text-[12.5px] font-light text-text-light leading-[1.7]">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tarifs */}
          <Reveal delay={0.2}>
            <div className="bg-blue p-9 lg:sticky lg:top-[110px]">
              <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-5">
                08 · {contentTrip.pricing.label}
              </div>
              <div className="font-display text-[58px] font-light text-beige leading-none">
                {contentTrip.pricing.price}
                <span className="text-[16px] font-sans font-light text-blue-pale ml-2">
                  {contentTrip.pricing.priceSuffix}
                </span>
              </div>
              <p className="text-[12px] font-light text-blue-pale leading-[1.7] mt-4 mb-6">
                {contentTrip.pricing.desc}
              </p>
              <div className="h-px bg-[rgba(200,220,234,0.12)] my-5" />
              <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-blue-light mb-3">
                {contentTrip.pricing.paymentTitle}
              </div>
              <ul className="text-[12px] font-light text-blue-pale leading-[1.9] mb-7">
                {contentTrip.pricing.paymentOptions.map((o) => (
                  <li
                    key={o}
                    className="pl-4 relative before:content-['-'] before:absolute before:left-0 before:text-blue-light"
                  >
                    {o}
                  </li>
                ))}
              </ul>
              <ApplyButton className="btn btn-light w-full text-center block" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 09 · LES PLACES ============ */}
      <section
        className="bg-beige"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-center">
          <Reveal className="lg:col-span-5">
            <Label>09 · Les places</Label>
            <div className="flex items-baseline gap-5 mt-5">
              <span
                className="font-display font-light text-blue leading-none"
                style={{ fontSize: "clamp(72px, 8vw, 120px)" }}
              >
                6
              </span>
              <h2
                className="display leading-[1.05]"
                style={{ fontSize: "clamp(26px, 3vw, 44px)" }}
              >
                participantes
                <br />
                <em>seulement.</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            {contentTrip.spots.paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-[15px] font-light leading-[1.9] text-blue-mid mb-5"
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ GALERIE ÉDITION 01 · AMSTERDAM ============ */}
      <section
        className="bg-paper overflow-hidden"
        style={{
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <div style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}>
          <Reveal>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
              <div>
                <Label>Édition 01 · Amsterdam</Label>
                <h2
                  className="display mt-5"
                  style={{ fontSize: "clamp(30px, 3.5vw, 52px)" }}
                >
                  Retour sur la <em>première édition.</em>
                </h2>
              </div>
              <p className="max-w-[320px] text-[13px] font-light leading-[1.7] text-text-light md:text-right">
                {contentTrip.gallery.desc}
              </p>
            </div>
          </Reveal>
        </div>
        <ContentTripGallery
          photos={contentTrip.gallery.photos}
          videos={contentTrip.gallery.videos}
        />
      </section>

      {/* ============ 10 · FAQ ============ */}
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
            <Label>10 · FAQ</Label>
            <h2
              className="display mt-5"
              style={{ fontSize: "clamp(30px, 3.5vw, 48px)" }}
            >
              Vos <em>questions.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-8">
            <ContentTripFaq items={contentTrip.faq} />
          </Reveal>
        </div>
      </section>

      {/* ============ 11 · APPEL À L'ACTION ============ */}
      <section
        className="bg-blue relative overflow-hidden"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Pattern variant="cream" opacity={0.05} />
        <Reveal>
          <div className="relative max-w-4xl">
            <Label light>Et après ?</Label>
            <h2
              className="display display-light mt-5 mb-6 [text-wrap:balance]"
              style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
            >
              {contentTrip.finalCta.title}
            </h2>
            <p className="text-[15px] font-light leading-[1.85] text-blue-pale mb-10 max-w-[600px]">
              {contentTrip.finalCta.desc}
            </p>
            <div className="flex flex-wrap items-end gap-10">
              <ApplyButton className="btn btn-light" />
              <ContentTripCountdown
                deadline={contentTrip.applicationDeadline}
                deadlineLabel={contentTrip.applicationDeadlineLabel}
                light
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Mobile sticky apply bar */}
      <ContentTripSticky formUrl={contentTrip.formUrl} />
    </>
  );
}

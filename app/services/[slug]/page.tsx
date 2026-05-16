import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, packs } from "@/lib/copy";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { unsplash } from "@/lib/unsplash";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return { title: "Service — Com'Jam Agency" };
  return {
    title: `${s.name} — Com'Jam Agency`,
    description: s.short,
  };
}

const heroImageBySlug: Record<string, string> = {
  "creation-de-contenu": unsplash.shootingPhoto,
  "strategie-digitale": unsplash.strategy,
  "production-de-contenu": unsplash.production,
  consulting: unsplash.consulting,
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const heroImg = heroImageBySlug[slug] ?? unsplash.shootingPhoto;
  const showPacks = slug === "creation-de-contenu";

  return (
    <>
      <section
        className="bg-beige pt-[160px] grid lg:grid-cols-2 items-end"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingBottom: "var(--gap)",
          gap: "var(--gap)",
        }}
      >
        <Reveal>
          <Label>Service · {service.num}</Label>
          <h1
            className="display mt-5 mb-7"
            style={{ fontSize: "clamp(40px, 5vw, 76px)" }}
          >
            {service.name}
          </h1>
          <p className="text-[17px] font-light leading-[1.7] text-blue-mid italic mb-5 font-display">
            {service.short}
          </p>
          <p className="text-[15px] font-light leading-[1.9] text-blue-mid mb-8">
            {service.desc}
          </p>

          {service.for && service.for.length > 0 && (
            <div className="mb-8">
              <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-4">
                Pour qui ?
              </div>
              <div className="flex flex-wrap gap-2">
                {service.for.map((f) => (
                  <span
                    key={f}
                    className="px-4 py-2 bg-paper border border-beige-mid text-[12px] font-light text-blue"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-6 flex-wrap items-center mt-4">
            <Button href={service.ctaHref} variant="primary">
              {service.ctaLabel}
            </Button>
            {service.pricing && (
              <span className="font-display text-[24px] font-light text-blue">
                {service.pricing}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="relative aspect-[5/6] overflow-hidden border-t-[3px] border-blue-light"
            style={{ boxShadow: "20px 20px 0 var(--color-beige-dark)" }}
          >
            <Image
              src={heroImg}
              alt={service.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Reveal>
      </section>

      <section
        className="bg-paper"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Reveal>
          <Label>Ce qui est inclus</Label>
          <h2
            className="display mt-5 mb-10"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            Notre approche <em>concrètement</em>
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-3" stagger={0.08}>
          {service.bullets.map((b) => (
            <Reveal key={b}>
              <div className="flex gap-4 px-5 py-5 bg-beige border-l-2 border-transparent hover:border-blue-light transition-colors">
                <div className="w-4 text-blue-light text-[13px] shrink-0 mt-px">—</div>
                <div className="text-[14px] font-normal text-blue leading-relaxed">{b}</div>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      {showPacks && (
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-14">
              <div>
                <Label>Packs photo</Label>
                <h2
                  className="display mt-5"
                  style={{ fontSize: "clamp(32px, 3.5vw, 48px)" }}
                >
                  Des packs pensés<br />pour <em>chaque besoin</em>
                </h2>
              </div>
              <p className="max-w-[300px] text-[14px] font-light leading-[1.8] text-text-light md:text-right">
                Créateur solo, entrepreneur ou duo — je viens avec mon matériel, vous apportez votre personnalité.
              </p>
            </div>
          </Reveal>

          <RevealGroup
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            stagger={0.08}
          >
            {packs.map((p) => (
              <div
                key={p.id}
                className={`p-9 relative transition-all hover:-translate-y-[5px] ${
                  p.featured
                    ? "bg-blue border-t-[3px] border-blue-light"
                    : "bg-paper hover:shadow-[0_16px_40px_rgba(27,58,92,0.1)]"
                }`}
              >
                {p.topBadge && (
                  <div className="absolute -top-3 left-9 bg-blue-light text-paper text-[9px] font-medium tracking-[2px] uppercase px-[14px] py-[5px]">
                    {p.topBadge}
                  </div>
                )}
                <div className={`font-display text-3xl font-normal mb-2 ${p.featured ? "text-beige" : "text-blue"}`}>
                  {p.name}
                </div>
                <div className={`font-display text-[50px] font-light leading-none mb-6 ${p.featured ? "text-beige" : "text-blue"}`}>
                  {p.priceLabel}
                  {p.unit && (
                    <span className={`text-[18px] font-light ${p.featured ? "text-blue-pale" : "text-text-light"}`}>
                      {" "}{p.unit}
                    </span>
                  )}
                </div>
                <div className={`h-px mb-6 ${p.featured ? "bg-[rgba(200,220,234,0.15)]" : "bg-beige-mid"}`} />
                <ul className="flex flex-col gap-3 mb-8">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`text-[12.5px] font-light flex items-start gap-[10px] leading-[1.5] ${p.featured ? "text-blue-pale" : "text-blue-mid"}`}
                    >
                      <span className={`text-[10px] shrink-0 mt-[2px] ${p.featured ? "text-blue-pale" : "text-blue-light"}`}>
                        —
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/reservation?pack=${p.id}`}
                  className={`block text-center px-4 py-[14px] text-[11px] font-medium tracking-[2px] uppercase transition-colors ${
                    p.featured
                      ? "bg-beige text-blue border border-beige hover:bg-paper"
                      : "border border-blue text-blue hover:bg-blue hover:text-beige"
                  }`}
                >
                  Réserver
                </Link>
              </div>
            ))}
          </RevealGroup>
        </section>
      )}

      <CTA
        eyebrow="Prêt à démarrer ?"
        title={service.ctaLabel.replace("Réserver", "Réservons").replace("Demander", "Demandons")}
        desc={`Que ce soit pour un projet ponctuel ou un accompagnement long terme, on construit ensemble la solution adaptée à votre univers.`}
        primary={{ href: service.ctaHref, label: service.ctaLabel }}
        secondary={{ href: "/services", label: "Voir les autres services" }}
      />
    </>
  );
}

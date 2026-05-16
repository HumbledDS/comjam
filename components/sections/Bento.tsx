"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { unsplash } from "@/lib/unsplash";
import { bootcamp, home } from "@/lib/copy";
import { Monogram } from "@/components/brand/Monogram";

/**
 * Bento mosaic: each tile is one idea, one image, one CTA.
 * Mobile stacks to 1-col; tablet 6-col; desktop 12-col.
 * Tile spans are tuned so the visual rhythm reads like a magazine spread.
 */

type TileProps = {
  span: string; // tailwind: e.g. "col-span-6 row-span-2"
  children: React.ReactNode;
  className?: string;
};

function Tile({ span, children, className = "" }: TileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`${span} relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Image tile — image fills, optional caption overlay */
function ImageTile({
  src,
  alt,
  span,
  caption,
  href,
}: {
  src: string;
  alt: string;
  span: string;
  caption?: string;
  href?: string;
}) {
  const reduce = useReducedMotion();
  const inner = (
    <>
      <motion.div
        className="absolute inset-0"
        whileHover={reduce ? undefined : { scale: 1.04 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
      {caption && (
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-blue/90 via-blue/40 to-transparent">
          <span className="text-[11px] font-medium tracking-[2.5px] uppercase text-beige">
            {caption}
          </span>
        </div>
      )}
    </>
  );

  return (
    <Tile span={span} className="group cursor-pointer">
      {href ? (
        <Link href={href} className="block absolute inset-0">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </Tile>
  );
}

export function Bento() {
  return (
    <section
      className="bg-paper"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "var(--gap)",
        paddingBottom: "var(--gap)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[200px] gap-3">

        {/* Row 1 — Big portrait anchor + about chip + stat */}
        <ImageTile
          src={unsplash.bento.portrait1}
          alt="Portrait éditorial"
          span="md:col-span-3 lg:col-span-5 md:row-span-2"
          href="/services/creation-de-contenu"
          caption="Création de contenu"
        />

        <Tile span="md:col-span-3 lg:col-span-4 md:row-span-1" className="bg-blue p-7 flex flex-col justify-between">
          <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-pale">
            Notre approche
          </div>
          <p className="font-display text-[22px] lg:text-[26px] font-light italic text-beige leading-tight">
            Une communication simple, humaine et efficace.
          </p>
        </Tile>

        <Tile span="md:col-span-3 lg:col-span-3 md:row-span-1" className="bg-beige p-7 flex flex-col justify-between">
          <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light">
            Communauté
          </div>
          <div>
            <div className="font-display text-[56px] font-light text-blue leading-none">
              {home.stats[1].value}
            </div>
            <div className="text-[11px] font-light text-text-light tracking-wide mt-1">
              abonné·e·s sur les réseaux
            </div>
          </div>
        </Tile>

        {/* Row 2 — Right side: behind-the-scenes wide + Instagram chip */}
        <ImageTile
          src={unsplash.bento.behindScenes}
          alt="Behind the scenes"
          span="md:col-span-4 lg:col-span-4 md:row-span-1"
        />

        <Tile span="md:col-span-2 lg:col-span-3 md:row-span-1" className="bg-blue-deep flex items-center justify-center group cursor-pointer">
          <a
            href="https://instagram.com/comjam"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full flex flex-col items-center justify-center text-center p-4 transition-colors hover:bg-blue"
          >
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-pale mb-2">
              Instagram
            </div>
            <div className="font-display text-[26px] text-beige italic">@comjam</div>
            <div className="text-[10px] font-light text-blue-pale/70 mt-2 group-hover:text-blue-pale transition-colors">
              Suivez le quotidien →
            </div>
          </a>
        </Tile>

        {/* Row 3 — Bootcamp full-width tile + service callouts */}
        <Tile span="md:col-span-4 lg:col-span-6 md:row-span-2" className="bg-blue p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-pale mb-4">
              Formation · 14 & 15 juin 2026
            </div>
            <div className="font-display text-[40px] lg:text-[56px] font-light text-beige leading-[1]">
              Content <em className="text-blue-pale italic">Shift</em>
            </div>
            <div className="text-[13px] font-light text-blue-pale leading-[1.7] max-w-sm mt-5">
              2 jours en ligne pour passer de créateur invisible à créateur qui attire, engage et convertit.
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 mt-6">
            <div>
              <div className="font-display text-[44px] font-light text-beige leading-none">
                {bootcamp.price.current}€
              </div>
              <div className="text-[11px] text-blue-pale line-through mt-1">
                Tarif normal {bootcamp.price.original}€
              </div>
            </div>
            <Link
              href="/bootcamp"
              className="px-6 py-3 bg-beige text-blue text-[11px] font-medium tracking-[2.5px] uppercase hover:bg-paper transition-colors"
            >
              Découvrir
            </Link>
          </div>
        </Tile>

        <ImageTile
          src={unsplash.bento.wideLifestyle}
          alt="Shooting éditorial"
          span="md:col-span-2 lg:col-span-3 md:row-span-1"
        />

        <Tile span="md:col-span-2 lg:col-span-3 md:row-span-1" className="bg-beige-dark p-7 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light">
              4 services
            </div>
            <Monogram variant="blue" size={28} />
          </div>
          <Link
            href="/services"
            className="group"
          >
            <div className="font-display text-[24px] text-blue italic leading-tight mb-2">
              Création · Stratégie · Production · Consulting
            </div>
            <div className="text-[11px] font-medium tracking-[2px] uppercase text-blue-light group-hover:text-blue transition-colors">
              Explorer →
            </div>
          </Link>
        </Tile>

        <ImageTile
          src={unsplash.bento.socialContent}
          alt="Création social media"
          span="md:col-span-2 lg:col-span-3 md:row-span-1"
        />

        <ImageTile
          src={unsplash.bento.portrait2}
          alt="Portrait personal branding"
          span="md:col-span-3 lg:col-span-3 md:row-span-1"
          href="/services/creation-de-contenu"
        />

        {/* Row 4 — Booking CTA + work shot + quote */}
        <Tile span="md:col-span-3 lg:col-span-5 md:row-span-1" className="bg-blue p-7 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-pale mb-2">
              Shooting photo
            </div>
            <div className="font-display text-[26px] text-beige italic leading-tight">
              Dès 95€ <span className="text-[14px] text-blue-pale not-italic">/ heure</span>
            </div>
          </div>
          <Link
            href="/reservation"
            className="px-5 py-3 bg-beige text-blue text-[11px] font-medium tracking-[2.5px] uppercase whitespace-nowrap hover:bg-paper transition-colors"
          >
            Réserver
          </Link>
        </Tile>

        <ImageTile
          src={unsplash.bento.detail}
          alt="Détail créatif"
          span="md:col-span-3 lg:col-span-4 md:row-span-1"
        />

      </div>
    </section>
  );
}

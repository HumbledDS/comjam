"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Portfolio gallery — three continuous marquee rows.
 *
 * Photos auto-scroll horizontally in a seamless loop (the row content is
 * duplicated so the wrap is invisible). Adjacent rows scroll in opposite
 * directions at different speeds for an editorial rhythm. No scroll-tied
 * motion: the gallery animates on its own regardless of user scroll position.
 *
 * Mobile/tablet: marquees disabled, photos become a single horizontally
 * swipeable carousel.
 */

type Photo = { src: string; thumb: string };

function MarqueeRow({
  photos,
  direction,
  duration,
}: {
  photos: ReadonlyArray<Photo>;
  direction: "left" | "right";
  duration: number;
}) {
  const reduce = useReducedMotion();
  // Duplicate the set so the loop wraps seamlessly.
  const looped = [...photos, ...photos];

  // Direction-aware translation. Going "left" means content shifts negative X
  // (photos appear to move from right side toward left edge).
  const xFrom = direction === "left" ? "0%" : "-50%";
  const xTo = direction === "left" ? "-50%" : "0%";

  return (
    <div className="overflow-hidden" aria-hidden>
      <motion.div
        className="flex gap-3 sm:gap-4 lg:gap-5"
        style={{ willChange: "transform" }}
        animate={reduce ? undefined : { x: [xFrom, xTo] }}
        transition={
          reduce
            ? undefined
            : { duration, repeat: Infinity, ease: "linear" }
        }
      >
        {looped.map((p, i) => (
          <figure
            key={p.src + i}
            className="shrink-0 bg-beige-dark"
          >
            <Image
              src={p.thumb}
              alt=""
              width={800}
              height={1200}
              sizes="(max-width: 1024px) 30vw, 22vw"
              className="block h-[24vh] sm:h-[26vh] lg:h-[28vh] xl:h-[30vh] w-auto"
            />
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

function MobileCarousel({ photos }: { photos: ReadonlyArray<Photo> }) {
  return (
    <div>
      <div
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          scrollPaddingLeft: "var(--pad)",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {photos.map((p) => (
          <figure
            key={p.src}
            className="shrink-0 snap-center bg-beige-dark"
            style={{ width: "min(72vw, 320px)" }}
          >
            <Image
              src={p.thumb}
              alt=""
              width={800}
              height={1200}
              sizes="72vw"
              className="block w-full h-auto"
            />
          </figure>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-5 text-center text-[10px] tracking-[3px] uppercase text-text-light"
        aria-hidden
      >
        ← Faites glisser →
      </motion.div>
    </div>
  );
}

export function PortraitGallery() {
  const all = media.gallery;
  // Split into 3 rows of 4, alternating order so each row stays varied.
  const row1 = [all[0], all[3], all[6], all[9]];
  const row2 = [all[1], all[4], all[7], all[10]];
  const row3 = [all[2], all[5], all[8], all[11]];

  return (
    <section
      className="bg-beige relative overflow-hidden"
      style={{
        paddingTop: "var(--gap)",
        paddingBottom: "var(--gap)",
      }}
      aria-label="Portfolio"
    >
      <div style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}>
        <Reveal>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-12 lg:mb-16">
            <div>
              <Label>Portfolio</Label>
              <h2
                className="display mt-5"
                style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                Récentes <em>collaborations.</em>
              </h2>
            </div>
            <p className="max-w-[300px] text-[13px] font-light leading-[1.7] text-text-light md:text-right">
              Contenu réalisé pour créateurs, marques et entrepreneurs.
              Paris, Bruxelles.
            </p>
          </div>
        </Reveal>
      </div>

      {/* DESKTOP / TABLET-WIDE: 3 auto-scrolling marquee rows */}
      <div className="hidden md:flex flex-col gap-4 lg:gap-5">
        <MarqueeRow photos={row1} direction="left" duration={55} />
        <MarqueeRow photos={row2} direction="right" duration={70} />
        <MarqueeRow photos={row3} direction="left" duration={45} />
      </div>

      {/* MOBILE: horizontal swipe carousel */}
      <div className="md:hidden">
        <MobileCarousel photos={all} />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Portfolio gallery — 3D-curtain style infinite vertical scroll.
 *
 * Four columns of portraits, each scrolling vertically forever inside a
 * fixed-height frame. Adjacent columns alternate direction (up / down /
 * up / down). Content is duplicated so the wrap is seamless.
 *
 * Uses pure CSS animations (keyframes scroll-up / scroll-down in
 * globals.css). CSS keyframes are GPU-accelerated and untouched by
 * requestAnimationFrame throttling — far more reliable than motion's
 * keyframe arrays for long-running infinite loops.
 *
 * Mobile: vertical columns replaced by a horizontal swipe carousel.
 */

type Photo = { src: string; thumb: string };

function VerticalColumn({
  photos,
  direction,
  duration,
  delay = 0,
}: {
  photos: ReadonlyArray<Photo>;
  direction: "up" | "down";
  duration: number;
  delay?: number;
}) {
  // Duplicate content so animating y from 0 → -50% (or inverse) loops invisibly.
  const looped = [...photos, ...photos];

  return (
    <div className="relative h-full overflow-hidden">
      <div
        data-marquee
        className="flex flex-col gap-3 sm:gap-4 absolute inset-x-0 will-change-transform"
        style={{
          animationName: direction === "up" ? "scroll-up" : "scroll-down",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDelay: `${delay}s`,
        }}
      >
        {looped.map((p, i) => (
          <figure key={p.src + i} className="bg-beige-dark">
            <Image
              src={p.thumb}
              alt=""
              width={800}
              height={1200}
              sizes="(max-width: 1024px) 33vw, 25vw"
              className="block w-full h-auto"
            />
          </figure>
        ))}
      </div>
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
  // Round-robin into 4 columns of 3 so each column mixes outfits/settings.
  const col1 = [all[0], all[4], all[8]];
  const col2 = [all[1], all[5], all[9]];
  const col3 = [all[2], all[6], all[10]];
  const col4 = [all[3], all[7], all[11]];

  return (
    <section
      className="bg-beige relative overflow-hidden"
      aria-label="Portfolio"
    >
      {/* HEADER */}
      <div
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "calc(var(--gap) * 0.5)",
        }}
      >
        <Reveal>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
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

      {/* DESKTOP / TABLET-WIDE: 4 vertical-scroll columns inside a fixed frame */}
      <div
        className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 h-[90vh]"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingBottom: "var(--gap)",
        }}
      >
        <VerticalColumn photos={col1} direction="up"   duration={48} />
        <VerticalColumn photos={col2} direction="down" duration={56} delay={-8} />
        <VerticalColumn photos={col3} direction="up"   duration={44} delay={-16} />
        <VerticalColumn photos={col4} direction="down" duration={60} delay={-4} />
      </div>

      {/* MOBILE: horizontal swipe carousel */}
      <div className="md:hidden" style={{ paddingBottom: "var(--gap)" }}>
        <MobileCarousel photos={all} />
      </div>
    </section>
  );
}

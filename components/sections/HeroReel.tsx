"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { media } from "@/lib/media";

/**
 * Full-bleed hero with the actual content reel. Video auto-plays muted +
 * loops, with a dark blue tint and bottom-gradient for text legibility.
 * Falls back to the poster image on browsers that block autoplay.
 */
export function HeroReel() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-blue">
      {/* Vertical cut — mobile portrait */}
      <video
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster={media.video.poster}
        preload="metadata"
        aria-hidden
      >
        <source src={media.video.mobile} type="video/mp4" />
      </video>
      {/* Horizontal cut — tablet/desktop landscape */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        autoPlay
        muted
        loop
        playsInline
        poster={media.video.poster}
        preload="metadata"
        aria-hidden
      >
        <source src={media.video.desktop} type="video/mp4" />
      </video>

      {/* Blue tint + bottom gradient for text contrast */}
      <div className="absolute inset-0 bg-blue/40 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-blue via-blue/40 to-transparent pointer-events-none" />

      {/* Foreground */}
      <div
        className="relative h-full flex flex-col justify-end pb-20 lg:pb-28"
        style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 text-[10px] font-medium tracking-[3.5px] uppercase text-blue-pale/85 mb-7">
            <span className="block w-7 h-px bg-blue-pale/60" />
            Création de contenu · Paris
          </div>

          <h1
            className="font-display font-light text-beige leading-[1.02] tracking-[-1.5px]"
            style={{ fontSize: "clamp(48px, 7.5vw, 128px)" }}
          >
            Du contenu qui<br />
            <em className="text-blue-pale italic">vous ressemble.</em>
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/services"
              className="inline-block px-8 py-4 bg-beige text-blue text-[11px] font-medium tracking-[2.5px] uppercase transition-all hover:bg-paper hover:tracking-[3px]"
            >
              En savoir plus
            </Link>
            <Link
              href="/reservation"
              className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[2.5px] uppercase text-beige hover:text-paper hover:gap-5 transition-all"
            >
              Réserver un shooting <span>→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[3px] uppercase text-beige/70 flex flex-col items-center gap-3"
      >
        <span>Scroll</span>
        <motion.span
          className="block w-px h-8 bg-beige/50"
          animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

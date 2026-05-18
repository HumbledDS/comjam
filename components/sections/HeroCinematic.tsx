"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { unsplash } from "@/lib/unsplash";
import { Ornament } from "@/components/brand/Ornament";

/**
 * Full-bleed cinematic hero. One image, one editorial statement, one CTA.
 * The image carries the mood; the copy stays restrained.
 * Replace `unsplash.heroFull` with a real client image or short video later.
 */
export function HeroCinematic() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-blue">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={unsplash.heroFull}
          alt="Com'Jam, création de contenu"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark blue tint overlay for readability */}
        <div className="absolute inset-0 bg-blue/55" />
        {/* Subtle gradient anchor at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue/90 via-blue/30 to-transparent" />
      </motion.div>

      {/* Foreground content — bottom-aligned, editorial */}
      <div
        className="relative h-full flex flex-col justify-end pb-20 lg:pb-28"
        style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 text-[10px] font-medium tracking-[3.5px] uppercase text-blue-pale/80 mb-7">
            <span className="block w-7 h-px bg-blue-pale/60" />
            Agence de création de contenu · Paris
          </div>

          <h1
            className="font-display font-light text-beige leading-[1.02] tracking-[-1.5px]"
            style={{ fontSize: "clamp(48px, 7vw, 120px)" }}
          >
            Créons. <em className="text-blue-pale italic">Diffusons.</em> Répétons.
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/reservation"
              className="inline-block px-8 py-4 bg-beige text-blue text-[11px] font-medium tracking-[2.5px] uppercase transition-all hover:bg-paper hover:tracking-[3px]"
            >
              Réserver un shooting
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-[11px] font-normal tracking-[2px] uppercase text-beige/85 hover:text-beige hover:gap-5 transition-all"
            >
              Voir nos services <span>→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative ornament — bottom right */}
      <Ornament
        kind="flourish"
        variant="cream"
        width={56}
        opacity={0.4}
        className="hidden md:block absolute top-[140px] right-[8%]"
        drift
      />

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.4, duration: 0.8 }}
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

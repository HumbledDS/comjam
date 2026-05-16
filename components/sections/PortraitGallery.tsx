"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Asymmetric portrait gallery — Jamila's actual work as visual proof.
 * 8 photos arranged on a 12-col grid with mixed spans for visual rhythm.
 * Each tile reveals with a stagger on scroll and gently zooms on hover.
 */

// Span pattern (desktop). Tuned for a 12-col / 4-row grid feel.
const spans = [
  "lg:col-span-4 lg:row-span-2", // 1 - big
  "lg:col-span-3 lg:row-span-1", // 2
  "lg:col-span-5 lg:row-span-1", // 3 - wide
  "lg:col-span-3 lg:row-span-2", // 4 - tall
  "lg:col-span-5 lg:row-span-1", // 5 - wide
  "lg:col-span-4 lg:row-span-2", // 6 - big
  "lg:col-span-4 lg:row-span-1", // 7
  "lg:col-span-4 lg:row-span-1", // 8
];

export function PortraitGallery() {
  const reduce = useReducedMotion();

  return (
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-12">
          <div>
            <Label>Portfolio</Label>
            <h2
              className="display mt-5"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              Récentes <em>collaborations.</em>
            </h2>
          </div>
          <p className="max-w-[280px] text-[13px] font-light leading-[1.7] text-text-light md:text-right">
            Une sélection de contenus photo réalisés à Paris et Bruxelles.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[260px] gap-3">
        {media.gallery.map((p, i) => (
          <motion.div
            key={p.src}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 4) * 0.08,
            }}
            className={`relative overflow-hidden group ${
              spans[i] ?? "lg:col-span-3 lg:row-span-1"
            } ${
              // mobile fallback spans
              i === 0 ? "md:col-span-4 md:row-span-2" :
              i === 1 ? "md:col-span-2 md:row-span-1" :
              i === 2 ? "md:col-span-6 md:row-span-1" :
              "md:col-span-3 md:row-span-1"
            }`}
          >
            <motion.div
              className="absolute inset-0"
              whileHover={reduce ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={p.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-blue/0 group-hover:bg-blue/15 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

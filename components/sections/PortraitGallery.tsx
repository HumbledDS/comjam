"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Masonry-style portrait gallery — Jamila's and clients' real shoots as
 * visual proof. CSS columns let portrait photos of slightly different
 * aspect ratios pack together naturally without padding/cropping.
 *
 * Each tile reveals with a stagger on scroll and gently zooms on hover.
 */
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
          <p className="max-w-[300px] text-[13px] font-light leading-[1.7] text-text-light md:text-right">
            Une sélection de contenus photo réalisés pour créateurs, marques
            et entrepreneurs — Paris, Bruxelles.
          </p>
        </div>
      </Reveal>

      {/* CSS columns masonry: 1 col mobile, 2 tablet, 3 desktop */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 [&>div]:mb-3 [&>div]:break-inside-avoid">
        {media.gallery.map((p, i) => (
          <motion.div
            key={p.src}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 3) * 0.08,
            }}
            className="relative overflow-hidden group"
          >
            <motion.div
              className="relative w-full"
              whileHover={reduce ? undefined : { scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={p.src}
                alt=""
                width={800}
                height={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="block w-full h-auto object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-blue/0 group-hover:bg-blue/15 transition-colors duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

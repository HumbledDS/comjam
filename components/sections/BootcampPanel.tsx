"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { bootcamp } from "@/lib/copy";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Editorial bootcamp panel — half portrait, half copy. The Content Shift
 * formation gets one strong visual moment instead of being a small tile.
 */
export function BootcampPanel() {
  const reduce = useReducedMotion();

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
      <div className="grid lg:grid-cols-2 items-stretch border border-beige-mid">
        {/* Portrait */}
        <Reveal className="relative aspect-[5/6] lg:aspect-auto lg:min-h-[560px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={reduce ? undefined : { scale: 1.04 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={media.bootcamp.src}
              alt="Bootcamp by Com'Jam, Jamila"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue/40 via-transparent to-transparent" />
          <div className="absolute top-6 left-6 text-[10px] font-medium tracking-[3px] uppercase text-beige bg-blue/60 backdrop-blur-sm px-3 py-1.5">
            Formation
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={0.15} className="bg-blue p-10 lg:p-14 flex flex-col justify-between text-beige">
          <div>
            <Label light>{bootcamp.eyebrow}</Label>
            <h2
              className="display display-light mt-5 mb-6"
              style={{ fontSize: "clamp(40px, 4.5vw, 72px)" }}
            >
              Content <em>Shift.</em>
            </h2>
            <div className="text-[12px] font-medium tracking-[2px] uppercase text-blue-pale/90 mb-6">
              {bootcamp.date} · {bootcamp.schedule}
            </div>
            <p className="text-[15px] font-light leading-[1.8] text-blue-pale max-w-md">
              {bootcamp.desc}
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 mt-10 pt-8 border-t border-[rgba(200,220,234,0.2)]">
            <div>
              <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-2">
                {bootcamp.price.label}
              </div>
              <div className="font-display text-[56px] font-light leading-none">
                {bootcamp.price.current}€
              </div>
              <div className="text-[12px] text-blue-pale line-through mt-1">
                Tarif normal {bootcamp.price.original}€
              </div>
            </div>
            <Link
              href="/bootcamp"
              className="btn btn-light whitespace-nowrap"
            >
              Découvrir
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

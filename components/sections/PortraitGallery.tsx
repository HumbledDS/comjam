"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Three-row parallax gallery. As the user scrolls vertically through the
 * section, each row drifts vertically at a different rate and direction:
 *   row 1 → moves UP (slow)
 *   row 2 → moves DOWN (inverse — gives the diss-sequential feel)
 *   row 3 → moves UP (faster)
 *
 * Photos are shown FULL (no crop) — portrait shots stay portrait.
 * On mobile/tablet the parallax disappears and the rows collapse into a
 * single horizontally swipeable carousel.
 */

type Row = ReadonlyArray<{ src: string; thumb: string }>;

// Split the 12 gallery photos into 3 rows of 4. Shuffled lightly so each
// row mixes outfits/settings instead of clumping similar shots.
function splitRows(all: typeof media.gallery): [Row, Row, Row] {
  return [
    [all[0], all[3], all[6], all[9]],
    [all[1], all[4], all[7], all[10]],
    [all[2], all[5], all[8], all[11]],
  ];
}

function ParallaxRow({
  photos,
  yRange,
  delay = 0,
}: {
  photos: Row;
  yRange: [number, number];
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : yRange);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-4 gap-3"
    >
      {photos.map((p, i) => (
        <motion.figure
          key={p.src + i}
          className="relative overflow-hidden bg-beige-dark"
          whileHover={reduce ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={p.thumb}
            alt=""
            width={800}
            height={1200}
            sizes="(max-width: 1024px) 50vw, 24vw"
            className="block w-full h-auto"
          />
        </motion.figure>
      ))}
    </motion.div>
  );
}

export function PortraitGallery() {
  const [row1, row2, row3] = splitRows(media.gallery);
  const allPhotos = media.gallery;

  return (
    <section
      className="bg-beige overflow-hidden"
      style={{
        paddingTop: "var(--gap)",
        paddingBottom: "calc(var(--gap) * 1.5)",
      }}
    >
      <div style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}>
        <Reveal>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-14">
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
              Contenu réalisé pour créateurs, marques et entrepreneurs —
              Paris, Bruxelles.
            </p>
          </div>
        </Reveal>
      </div>

      {/* DESKTOP / TABLET-WIDE: 3 parallax rows */}
      <div
        className="hidden md:flex flex-col gap-3 lg:gap-4"
        style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        <ParallaxRow photos={row1} yRange={[40, -90]} />
        <ParallaxRow photos={row2} yRange={[-60, 120]} />
        <ParallaxRow photos={row3} yRange={[60, -130]} delay={0.05} />
      </div>

      {/* MOBILE: horizontal swipe carousel */}
      <div className="md:hidden">
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
        >
          {allPhotos.map((p) => (
            <figure
              key={p.src}
              className="relative shrink-0 w-[72vw] max-w-[320px] snap-center overflow-hidden bg-beige-dark"
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
        <div className="mt-4 text-center text-[10px] tracking-[2px] uppercase text-text-light">
          ← Faites glisser →
        </div>
      </div>
    </section>
  );
}

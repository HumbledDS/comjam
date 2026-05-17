"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Portfolio gallery — luxury editorial parallax grid.
 *
 * DESKTOP:
 *   - Bounded section (no infinite scroll). Outer height provides the scroll
 *     runway; the inner stage is pinned (position: sticky) so the gallery
 *     stays visually stable while the 3 rows drift vertically inside it.
 *   - 3 rows × 4 photos. Each photo keeps its natural portrait aspect
 *     (rows have a fixed height, image is `h-full w-auto` → no cropping).
 *   - Alternating row directions (up / down / up) with different ranges.
 *   - useSpring smooths the scroll-tied transform → cinematic motion.
 *
 * MOBILE / TABLET (under md):
 *   - Parallax disabled. The 12 photos become a single horizontally
 *     swipeable carousel with snap points + a "← Faites glisser →" hint.
 */

type Photo = { src: string; thumb: string };

// Y translate ranges per row. Positive = downward, negative = upward.
// Spec values were calibrated for sparser layouts; on a 3-row dense
// viewport-pinned gallery they cause adjacent rows to collide at peak.
// Scaled to ~45% of spec so the alternating motion is clearly visible
// but rows slide past each other without overlapping.
const ROW_RANGES: Array<[number, number]> = [
  [18, -42],  // Row 1 — UP, slow
  [-27, 54],  // Row 2 — DOWN, medium (inverse)
  [27, -58],  // Row 3 — UP, faster
];

function splitRows(all: ReadonlyArray<Photo>): [Photo[], Photo[], Photo[]] {
  // Distribute every 3rd photo across rows so each row mixes outfits/settings.
  return [
    [all[0], all[3], all[6], all[9]],
    [all[1], all[4], all[7], all[10]],
    [all[2], all[5], all[8], all[11]],
  ];
}

function ParallaxRow({
  photos,
  yRange,
  containerRef,
}: {
  photos: Photo[];
  yRange: [number, number];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduce = useReducedMotion();

  // Tie the row's motion to the OUTER section's scroll progress so all 3
  // rows animate in sync with the same scroll window (rather than each row
  // having its own viewport window).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : yRange,
  );

  // Spring damping smooths jitter and adds subtle inertia.
  const y = useSpring(yRaw, {
    damping: 30,
    stiffness: 110,
    restDelta: 0.5,
  });

  return (
    <motion.div
      style={{ y, willChange: "transform" }}
      className="flex items-end justify-center gap-3 sm:gap-4 lg:gap-5"
    >
      {photos.map((p, i) => (
        <figure
          key={p.src + i}
          className="bg-beige-dark overflow-hidden"
          // Fixed-height row, image-driven width = preserves portrait ratio
        >
          <Image
            src={p.thumb}
            alt=""
            width={800}
            height={1200}
            sizes="(max-width: 1024px) 24vw, 18vw"
            priority={i === 0}
            className="block h-[22vh] xl:h-[24vh] w-auto max-w-none"
          />
        </figure>
      ))}
    </motion.div>
  );
}

function ParallaxStage({ rows }: { rows: [Photo[], Photo[], Photo[]] }) {
  const outerRef = useRef<HTMLDivElement>(null);

  return (
    // Outer wrapper provides the scroll runway. Its height controls how
    // much scrolling distance the parallax has to play out over.
    <div ref={outerRef} className="relative" style={{ height: "200vh" }}>
      {/* Sticky stage — pinned at top of viewport while user scrolls past.
          justify-between + py spreads the 3 rows across the viewport with
          enough breathing room that the alternating parallax doesn't
          collide. */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-10 lg:py-14">
        <ParallaxRow photos={rows[0]} yRange={ROW_RANGES[0]} containerRef={outerRef} />
        <ParallaxRow photos={rows[1]} yRange={ROW_RANGES[1]} containerRef={outerRef} />
        <ParallaxRow photos={rows[2]} yRange={ROW_RANGES[2]} containerRef={outerRef} />
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
  const rows = splitRows(media.gallery);
  const allPhotos = media.gallery;

  return (
    <section
      className="bg-beige relative"
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
              Contenu réalisé pour créateurs, marques et entrepreneurs —
              Paris, Bruxelles.
            </p>
          </div>
        </Reveal>
      </div>

      {/* DESKTOP / TABLET-WIDE: pinned 3-row parallax */}
      <div className="hidden md:block">
        <ParallaxStage rows={rows} />
      </div>

      {/* MOBILE: horizontal swipe carousel */}
      <div className="md:hidden">
        <MobileCarousel photos={allPhotos} />
      </div>
    </section>
  );
}

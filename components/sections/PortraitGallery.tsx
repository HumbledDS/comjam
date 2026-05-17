"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Portfolio gallery — cinematic 3D-curtain.
 *
 * Four columns scroll vertically forever in alternating directions. A
 * requestAnimationFrame loop drives the base auto-scroll (so direction +
 * speed are per-column) while wheel and touch input add momentum that
 * decays smoothly via friction — visitors can grab the gallery and shove
 * it without breaking the autoplay.
 *
 * Polish:
 *   - Bluescale filter on photos (.gallery-photo CSS in globals.css)
 *     clears + lifts on hover with a 1.035 scale
 *   - Top + bottom gradient overlays fade photos into the bg at the
 *     viewport edges, giving the curtain a "windowed" cinematic frame
 *
 * Mobile: vertical columns are replaced by a horizontal swipe carousel.
 */

type Photo = { src: string; thumb: string };

function VerticalColumn({
  photos,
  direction,
  baseSpeed,
  wheelVelocityRef,
}: {
  photos: ReadonlyArray<Photo>;
  direction: "up" | "down";
  baseSpeed: number; // px per second (positive)
  wheelVelocityRef: React.MutableRefObject<number>;
}) {
  const reduce = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  // Mutable state held outside React render
  const offsetRef = useRef(0);
  const halfHeightRef = useRef(0);

  // Duplicate content so wrap is seamless.
  const looped = [...photos, ...photos];

  // Measure the half-height (one full set of original photos) once content
  // is laid out. ResizeObserver keeps it accurate across font / image load.
  useEffect(() => {
    if (!contentRef.current) return;
    const measure = () => {
      if (contentRef.current) {
        halfHeightRef.current = contentRef.current.offsetHeight / 2;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [photos.length]);

  // Auto-scroll + wheel momentum loop.
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let last = performance.now();
    const baseDir = direction === "up" ? -1 : 1;
    const basePxPerMs = baseSpeed / 1000;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64); // clamp big jumps (tab switch etc.)
      last = now;

      // Base motion
      offsetRef.current += baseDir * basePxPerMs * dt;
      // Wheel/touch contribution (shared across all columns)
      offsetRef.current += wheelVelocityRef.current * dt;

      // Seamless wrap
      const half = halfHeightRef.current;
      if (half > 0) {
        // Modulo into [-half, 0]
        while (offsetRef.current < -half) offsetRef.current += half;
        while (offsetRef.current > 0) offsetRef.current -= half;
      }

      y.set(offsetRef.current);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [direction, baseSpeed, wheelVelocityRef, y, reduce]);

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        ref={contentRef}
        style={{ y, willChange: "transform" }}
        className="absolute inset-x-0 flex flex-col gap-3 sm:gap-4"
      >
        {looped.map((p, i) => (
          <figure key={p.src + i} className="gallery-photo bg-beige-dark">
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

function DesktopCurtain({
  cols,
}: {
  cols: [Photo[], Photo[], Photo[], Photo[]];
}) {
  // Shared wheel/touch velocity — every column reads from this ref so
  // user input pushes the whole curtain together.
  const wheelVelocityRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const lastTouchY = useRef<number | null>(null);

  // Friction decay so wheel/touch momentum dies down smoothly.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      // Exponential friction. The lower the multiplier, the faster it dies.
      wheelVelocityRef.current *= Math.pow(0.001, dt / 1000);
      // Stop micro-jitter
      if (Math.abs(wheelVelocityRef.current) < 0.0005) wheelVelocityRef.current = 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Wheel: add a small impulse (intentionally not preventDefault'd so the
  // page can still scroll normally — the curtain just gets a nudge in
  // the user's scroll direction).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Scroll up (negative deltaY) → push columns downward, vice versa.
      // Tuned so a typical wheel tick adds ~0.3 px/ms of velocity.
      wheelVelocityRef.current -= e.deltaY * 0.0025;
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Pointer / touch drag — works on tablet hybrids and trackpads.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return; // mouse uses wheel
      lastTouchY.current = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (lastTouchY.current === null) return;
      const dy = e.clientY - lastTouchY.current;
      lastTouchY.current = e.clientY;
      // Map drag distance into velocity contribution
      wheelVelocityRef.current += dy * 0.02;
    };
    const onUp = () => {
      lastTouchY.current = null;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative h-[90vh]"
      style={{ touchAction: "pan-y" }}
    >
      {/* Top + bottom edge fade — photos dissolve into the section bg */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-28 lg:h-32 bg-gradient-to-b from-beige to-transparent z-20 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 lg:h-32 bg-gradient-to-t from-beige to-transparent z-20 pointer-events-none"
      />

      {/* The 4 columns */}
      <div
        className="grid grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 h-full"
        style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        <VerticalColumn
          photos={cols[0]}
          direction="up"
          baseSpeed={28}
          wheelVelocityRef={wheelVelocityRef}
        />
        <VerticalColumn
          photos={cols[1]}
          direction="down"
          baseSpeed={36}
          wheelVelocityRef={wheelVelocityRef}
        />
        <VerticalColumn
          photos={cols[2]}
          direction="up"
          baseSpeed={32}
          wheelVelocityRef={wheelVelocityRef}
        />
        <VerticalColumn
          photos={cols[3]}
          direction="down"
          baseSpeed={24}
          wheelVelocityRef={wheelVelocityRef}
        />
      </div>
    </div>
  );
}

export function PortraitGallery() {
  const all = media.gallery;
  // Round-robin into 4 columns of 3.
  const cols: [Photo[], Photo[], Photo[], Photo[]] = [
    [all[0], all[4], all[8]],
    [all[1], all[5], all[9]],
    [all[2], all[6], all[10]],
    [all[3], all[7], all[11]],
  ];

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
              Paris, Bruxelles. <span className="opacity-60">Faites défiler pour explorer.</span>
            </p>
          </div>
        </Reveal>
      </div>

      {/* DESKTOP / TABLET-WIDE: cinematic 3D curtain */}
      <div
        className="hidden md:block"
        style={{ paddingBottom: "var(--gap)" }}
      >
        <DesktopCurtain cols={cols} />
      </div>

      {/* MOBILE: horizontal swipe carousel */}
      <div className="md:hidden" style={{ paddingBottom: "var(--gap)" }}>
        <MobileCarousel photos={all} />
      </div>
    </section>
  );
}

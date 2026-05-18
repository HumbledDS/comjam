"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { media } from "@/lib/media";
import { Label } from "@/components/ui/Label";

/**
 * Editorial "Approche" section — luxury fashion / premium creator agency feel.
 *
 * Two overlapping portraits float over a soft background, with no frames or
 * borders — depth comes from drop-shadows, layered z, and subtle motion.
 *
 * Motion suite:
 *  - Reveal on viewport entry (image cascade, then text stagger)
 *  - Continuous breathing (primary drifts 0 → -10px, secondary inverse 0 → +12px)
 *  - Scroll-linked parallax (primary slow, secondary faster, 20-30px range)
 *  - Mouse parallax on the image stack (desktop only, max ~10px)
 *  - Hover scale (1 → 1.02) + shadow lift
 *  - CTA underline-expand microinteraction
 *
 * Mobile: same overlapping composition (reduced overlap), no mouse parallax.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function EditorialIntro() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  /* === SCROLL-LINKED PARALLAX === */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const primaryScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [30, -30],
  );
  const secondaryScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [50, -50],
  );

  /* === MOUSE PARALLAX (desktop only) === */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const primaryMx = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), {
    damping: 35,
    stiffness: 90,
  });
  const primaryMy = useSpring(useTransform(mouseY, [-1, 1], [-8, 8]), {
    damping: 35,
    stiffness: 90,
  });
  const secondaryMx = useSpring(useTransform(mouseX, [-1, 1], [12, -12]), {
    damping: 35,
    stiffness: 90,
  });
  const secondaryMy = useSpring(useTransform(mouseY, [-1, 1], [10, -10]), {
    damping: 35,
    stiffness: 90,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !stackRef.current) return;
    const r = stackRef.current.getBoundingClientRect();
    const rx = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const ry = (e.clientY - r.top) / r.height - 0.5;
    mouseX.set(rx * 2); // -1 … 1
    mouseY.set(ry * 2);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper overflow-hidden"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "calc(var(--gap) * 1.3)",
        paddingBottom: "calc(var(--gap) * 1.5)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20 items-center">

        {/* ============ IMAGE STACK ============ */}
        <div
          ref={stackRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="lg:col-span-7 relative w-full aspect-[5/6] sm:aspect-[6/5] lg:aspect-[6/5] max-w-[640px] lg:max-w-none mx-auto lg:mx-0"
        >
          {/* PRIMARY — top-left, larger */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ y: primaryScrollY }}
            className="absolute top-0 left-0 w-[68%] sm:w-[62%] lg:w-[58%] aspect-[3/4]"
          >
            {/* breathing layer */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative w-full h-full"
            >
              {/* mouse-parallax layer + hover */}
              <motion.div
                style={{ x: primaryMx, y: primaryMy }}
                whileHover={reduce ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative w-full h-full will-change-transform"
              >
                <Image
                  src={media.intro.big.src}
                  alt="Editorial Com'Jam"
                  fill
                  sizes="(max-width: 1024px) 60vw, 35vw"
                  className="object-cover shadow-[0_30px_60px_-20px_rgba(13,32,53,0.35)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* SECONDARY — bottom-right, smaller, overlapping */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, delay: 0.22, ease: EASE }}
            style={{ y: secondaryScrollY }}
            className="absolute bottom-0 right-0 w-[52%] sm:w-[48%] lg:w-[44%] aspect-[3/4]"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, 12, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
              }
              className="relative w-full h-full"
            >
              <motion.div
                style={{ x: secondaryMx, y: secondaryMy }}
                whileHover={reduce ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative w-full h-full will-change-transform"
              >
                <Image
                  src={media.intro.small.src}
                  alt="Portrait Jamila, fondatrice Com'Jam"
                  fill
                  sizes="(max-width: 1024px) 45vw, 28vw"
                  className="object-cover shadow-[0_25px_55px_-15px_rgba(13,32,53,0.4)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ============ TEXT COLUMN ============ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
          }}
          className="lg:col-span-5 lg:pl-4"
        >
          {([
            <Label key="eyebrow">L&apos;approche</Label>,
            <h2
              key="title"
              className="display mt-6 mb-8"
              style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}
            >
              Simple, humaine,<br />
              <em>efficace.</em>
            </h2>,
            <p
              key="body"
              className="text-[16px] lg:text-[17px] font-light leading-[1.75] text-blue-mid max-w-md"
            >
              Une agence qui transforme{" "}
              <strong className="text-blue font-medium">
                l&apos;invisibilité en identité
              </strong>
              , et{" "}
              <strong className="text-blue font-medium">
                l&apos;identité en impact
              </strong>
              .
            </p>,
            <div key="cta" className="mt-10">
              <Link
                href="/a-propos"
                className="group inline-flex items-center gap-3 text-[12px] font-medium tracking-[2.5px] uppercase text-blue"
              >
                <span className="relative">
                  En savoir plus
                  <span className="absolute left-0 right-0 -bottom-1 h-px bg-blue origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  <span className="absolute left-0 right-0 -bottom-1 h-px bg-blue origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100" />
                </span>
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>,
          ]).map((node, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
              }}
            >
              {node}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

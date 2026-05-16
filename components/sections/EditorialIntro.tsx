"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Approche" editorial intro — two portraits stacked with offset blue
 * backdrops (collage feel), gently parallaxing at different rates as the
 * user scrolls. Mobile stacks them vertically without overlap.
 *
 * Right column carries the headline + body in a high-contrast editorial
 * voice (decorative italic capital + bold uppercase sub + caps body).
 */
export function EditorialIntro() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Two images move at different rates. Subtle range (~60-110px).
  const yBig = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const ySmall = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [110, -110]);

  return (
    <section
      ref={ref}
      className="relative bg-beige overflow-hidden"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "calc(var(--gap) * 1.3)",
        paddingBottom: "calc(var(--gap) * 1.6)",
      }}
    >
      <div className="grid lg:grid-cols-12 gap-y-16 lg:gap-x-20 items-center">
        {/* IMAGE COLUMN — collage with offset backdrops */}
        <div className="lg:col-span-6 relative">
          {/* Big portrait — blue frame offsets up + left */}
          <motion.div
            style={{ y: yBig }}
            className="relative w-full max-w-[440px] mx-auto lg:mx-0"
          >
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-3 -translate-y-3 sm:-translate-x-4 sm:-translate-y-4 bg-blue"
            />
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={media.intro.big.src}
                alt="Editorial Com'Jam"
                fill
                sizes="(max-width: 1024px) 90vw, 35vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Small portrait — blue frame offsets down + right, overlaps on desktop */}
          <motion.div
            style={{ y: ySmall }}
            className="relative w-[58%] max-w-[280px] ml-auto mr-0 lg:mr-[-30px] lg:mt-[-90px] mt-8 lg:translate-x-[20%]"
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 bg-blue"
            />
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={media.intro.small.src}
                alt="Portrait Jamila — fondatrice Com'Jam"
                fill
                sizes="(max-width: 1024px) 60vw, 25vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* TEXT COLUMN */}
        <Reveal className="lg:col-span-6 lg:pl-4">
          <h2 className="leading-[1.1] mb-8">
            <span className="block font-display italic font-light text-[64px] sm:text-[80px] lg:text-[96px] text-blue tracking-[-3px]">
              <span className="not-italic font-normal">D</span>es créateurs
            </span>
            <span className="block font-sans font-bold uppercase tracking-tight text-[32px] sm:text-[40px] lg:text-[52px] text-blue mt-2">
              authentiques et inspirants
            </span>
          </h2>

          <p className="text-[12.5px] sm:text-[13px] font-normal uppercase tracking-[1.5px] leading-[2] text-blue-mid max-w-md">
            Les créateurs et marques que nous accompagnons partagent bien plus
            que du contenu : ils créent des univers, défendent leurs convictions
            et apportent chaque jour confiance et inspiration à leur communauté.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { media } from "@/lib/media";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Editorial intro: two staggered portraits + minimal manifesto.
 * Subtle parallax — the small portrait drifts slower than the big one as
 * the user scrolls. This is the "personality" moment of the homepage.
 */
export function EditorialIntro() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yBig = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const ySmall = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -160]);

  return (
    <section
      ref={ref}
      className="relative bg-paper overflow-hidden"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "calc(var(--gap) * 1.4)",
        paddingBottom: "calc(var(--gap) * 1.4)",
      }}
    >
      <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-center">
        {/* Big portrait */}
        <motion.div
          style={{ y: yBig }}
          className="lg:col-span-5 lg:col-start-1 relative aspect-[4/5] overflow-hidden"
        >
          <Image
            src={media.intro.big.src}
            alt="Editorial Com'Jam"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </motion.div>

        {/* Text block */}
        <Reveal className="lg:col-span-6 lg:col-start-7 lg:pl-6">
          <Label>L'approche</Label>
          <h2
            className="display mt-6 mb-8"
            style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}
          >
            Photo, vidéo,<br />
            <em>stratégie.</em>
          </h2>
          <p className="text-[16px] lg:text-[17px] font-light leading-[1.75] text-blue-mid max-w-md">
            Une approche <strong className="text-blue font-medium">simple, humaine et efficace</strong>{" "}
            — privilégier des contenus naturels mais esthétiques, à l'image de votre univers.
          </p>
        </Reveal>

        {/* Small portrait — offset, sits lower */}
        <motion.div
          style={{ y: ySmall }}
          className="lg:col-span-4 lg:col-start-8 relative aspect-[4/5] overflow-hidden -mt-6 lg:-mt-32"
        >
          <Image
            src={media.intro.small.src}
            alt="Portrait Jamila — fondatrice Com'Jam"
            fill
            sizes="(max-width: 1024px) 100vw, 30vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

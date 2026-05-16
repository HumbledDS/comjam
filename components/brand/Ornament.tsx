"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Theme = "blue" | "beige";
type Kind = "flourish" | "swoosh" | "apostrophe";

const SRC: Record<Kind, Record<Theme, string>> = {
  flourish: {
    beige: "/brand/flourish-on-beige.jpg",
    blue: "/brand/flourish-on-blue.jpg",
  },
  swoosh: {
    beige: "/brand/swoosh-on-beige.jpg",
    blue: "/brand/swoosh-on-blue.jpg",
  },
  apostrophe: {
    beige: "/brand/apostrophe-on-beige.jpg",
    blue: "/brand/apostrophe-on-blue.jpg",
  },
};

const ASPECT: Record<Kind, number> = {
  flourish: 1.25, // tall
  swoosh: 0.45, // wide
  apostrophe: 1.25, // tall
};

/**
 * Decorative brand ornament that draws itself in on viewport entry.
 * - flourish: vertical S-curve with dots
 * - swoosh: horizontal sweep with dots
 * - apostrophe: outlined open-quote mark
 */
export function Ornament({
  kind,
  on = "beige",
  width = 80,
  delay = 0,
  className = "",
  drift = false,
}: {
  kind: Kind;
  on?: Theme;
  width?: number;
  delay?: number;
  className?: string;
  drift?: boolean;
}) {
  const reduce = useReducedMotion();
  const aspect = ASPECT[kind];
  const height = Math.round(width * aspect);

  return (
    <motion.div
      aria-hidden
      className={`relative overflow-hidden pointer-events-none ${className}`}
      style={{ width, height }}
      initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: -6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.div
        className="absolute inset-0"
        animate={drift && !reduce ? { y: [0, -8, 0] } : undefined}
        transition={drift && !reduce ? { duration: 6, ease: "easeInOut", repeat: Infinity, delay } : undefined}
      >
        <Image
          src={SRC[kind][on]}
          alt=""
          fill
          sizes={`${width}px`}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Theme = "blue" | "cream";
type Kind = "flourish" | "swoosh" | "apostrophe";

const SRC: Record<Kind, Record<Theme, string>> = {
  flourish: {
    blue: "/brand/flourish-blue.png",
    cream: "/brand/flourish-cream.png",
  },
  swoosh: {
    blue: "/brand/swoosh-blue.png",
    cream: "/brand/swoosh-cream.png",
  },
  apostrophe: {
    blue: "/brand/apostrophe-blue.png",
    cream: "/brand/apostrophe-cream.png",
  },
};

// Approximate aspect ratio (height / width) of each ornament after bg trim.
const ASPECT: Record<Kind, number> = {
  flourish: 1.85,
  swoosh: 0.35,
  apostrophe: 1.45,
};

/**
 * Decorative brand ornament — transparent PNG. Fades + scales in on viewport
 * entry. Optional `drift` adds a slow vertical bob.
 */
export function Ornament({
  kind,
  variant = "blue",
  width = 60,
  delay = 0,
  className = "",
  drift = false,
  opacity = 1,
}: {
  kind: Kind;
  variant?: Theme;
  width?: number;
  delay?: number;
  className?: string;
  drift?: boolean;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  const height = Math.round(width * ASPECT[kind]);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{ width, height, opacity }}
      initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: -6 }}
      whileInView={{ opacity, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={drift && !reduce ? { y: [0, -6, 0] } : undefined}
        transition={drift && !reduce ? { duration: 7, ease: "easeInOut", repeat: Infinity, delay } : undefined}
      >
        <Image src={SRC[kind][variant]} alt="" fill sizes={`${width}px`} className="object-contain" />
      </motion.div>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Theme = "blue" | "cream";

/**
 * The "C" monogram. Transparent PNG. Pick `blue` for light bgs, `cream` for dark.
 */
export function Monogram({
  variant = "blue",
  size = 48,
  spin = false,
  className = "",
}: {
  variant?: Theme;
  size?: number;
  spin?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const src = variant === "cream" ? "/brand/monogram-cream.png" : "/brand/monogram-blue.png";

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={spin && !reduce ? { rotate: 360 } : undefined}
      transition={spin && !reduce ? { duration: 40, ease: "linear", repeat: Infinity } : undefined}
      whileHover={reduce ? undefined : { scale: 1.08 }}
    >
      <Image src={src} alt="" aria-hidden fill sizes={`${size}px`} className="object-contain" />
    </motion.div>
  );
}

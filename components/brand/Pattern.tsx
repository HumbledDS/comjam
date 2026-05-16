"use client";

import { motion, useReducedMotion } from "motion/react";

type Theme = "blue" | "cream";

/**
 * Tiled brand pattern as a transparent overlay. Drifts very slowly vertically.
 * Use absolutely positioned inside a relatively positioned section.
 *
 * `variant` is the COLOR of the pattern strokes (not the bg).
 */
export function Pattern({
  variant = "blue",
  opacity = 0.06,
  size = 220,
  className = "",
}: {
  variant?: Theme;
  opacity?: number;
  size?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const src = variant === "cream" ? "/brand/pattern-cream.png" : "/brand/pattern-blue.png";

  return (
    <motion.div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: `${size}px auto`,
        backgroundRepeat: "repeat",
        opacity,
      }}
      animate={reduce ? undefined : { backgroundPositionY: ["0px", `-${size * 2}px`] }}
      transition={reduce ? undefined : { duration: 80, ease: "linear", repeat: Infinity }}
    />
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";

type Theme = "blue" | "beige";

/**
 * Tiled brand pattern as a subtle background overlay. Drifts very slowly
 * vertically for a living-texture effect. Use absolutely positioned
 * inside a relatively positioned section.
 */
export function Pattern({
  on = "beige",
  opacity = 0.08,
  className = "",
}: {
  on?: Theme;
  opacity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const src = on === "blue" ? "/brand/pattern-on-blue.jpg" : "/brand/pattern-on-beige.jpg";

  return (
    <motion.div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "240px auto",
        backgroundRepeat: "repeat",
        opacity,
        mixBlendMode: on === "blue" ? "overlay" : "multiply",
      }}
      animate={reduce ? undefined : { backgroundPositionY: ["0px", "-480px"] }}
      transition={reduce ? undefined : { duration: 60, ease: "linear", repeat: Infinity }}
    />
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Theme = "blue" | "beige";

/**
 * The "C" monogram. Animates with a slow continuous rotation drift,
 * accelerating slightly on hover. Perfect as a decorative seal.
 */
export function Monogram({
  on = "beige",
  size = 96,
  spin = true,
  className = "",
}: {
  on?: Theme;
  size?: number;
  spin?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const src = on === "blue" ? "/brand/monogram-on-blue.jpg" : "/brand/monogram-on-beige.jpg";

  return (
    <motion.div
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      animate={spin && !reduce ? { rotate: 360 } : undefined}
      transition={spin && !reduce ? { duration: 40, ease: "linear", repeat: Infinity } : undefined}
      whileHover={reduce ? undefined : { scale: 1.05 }}
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </motion.div>
  );
}

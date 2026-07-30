"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

/**
 * Floating glowing circular badge teasing the Content Trip, shown over the
 * home hero. The text ring spins slowly, the whole badge bobs and its beige
 * glow breathes. Links to /content-trip.
 */
export function ContentTripBadge() {
  const reduce = useReducedMotion();
  const ringText = "COM'JAM CONTENT TRIP · LANZAROTE · ÉDITION 02 · ";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-[6%] bottom-[24%] sm:bottom-[20%] z-20"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link
          href="/content-trip"
          aria-label="Découvrir le Com'Jam Content Trip, Édition 02 à Lanzarote"
          className="group block relative w-[104px] h-[104px] sm:w-[128px] sm:h-[128px] rounded-full"
        >
          {/* Breathing glow */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[rgba(245,239,228,0.10)] backdrop-blur-sm border border-beige/40"
            animate={
              reduce
                ? undefined
                : {
                    boxShadow: [
                      "0 0 22px 4px rgba(245,239,228,0.25)",
                      "0 0 44px 12px rgba(245,239,228,0.5)",
                      "0 0 22px 4px rgba(245,239,228,0.25)",
                    ],
                  }
            }
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Spinning text ring */}
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute inset-0 w-full h-full"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            aria-hidden
          >
            <defs>
              <path
                id="trip-ring"
                d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
              />
            </defs>
            <text className="fill-beige" style={{ fontSize: "10.5px", letterSpacing: "2.2px", fontWeight: 500 }}>
              <textPath href="#trip-ring">{ringText}</textPath>
            </text>
          </motion.svg>

          {/* Center arrow */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-beige text-[22px] sm:text-[26px] -rotate-45 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110"
          >
            →
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

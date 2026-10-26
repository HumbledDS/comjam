"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

/**
 * Badge triangulaire flottant pour Content Shift, affiché sur le hero de
 * l'accueil à côté du cercle Content Trip. Le triangle tourne lentement
 * (sens inverse du cercle), flotte, et son halo beige respire. Lien vers
 * /bootcamp.
 */
export function ContentShiftBadge() {
  const reduce = useReducedMotion();
  const ringText = "CONTENT SHIFT · 14 & 15 NOVEMBRE · EN LIGNE · ";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-4 top-[31%] sm:top-auto sm:bottom-[20%] sm:right-[calc(6%+184px)] z-20"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      >
        <Link
          href="/bootcamp"
          aria-label="Découvrir Content Shift, le bootcamp en ligne des 14 et 15 novembre 2026"
          className="group block relative w-[112px] h-[112px] sm:w-[152px] sm:h-[152px]"
        >
          {/* Triangle tournant : contour, fond translucide et texte sur le périmètre */}
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute inset-0 w-full h-full"
            animate={
              reduce
                ? undefined
                : {
                    rotate: -360,
                    filter: [
                      "drop-shadow(0 0 10px rgba(245,239,228,0.25))",
                      "drop-shadow(0 0 24px rgba(245,239,228,0.55))",
                      "drop-shadow(0 0 10px rgba(245,239,228,0.25))",
                    ],
                  }
            }
            transition={{
              rotate: { duration: 26, repeat: Infinity, ease: "linear" },
              filter: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
            }}
            aria-hidden
          >
            <defs>
              <path
                id="shift-triangle"
                d="M 52 16 Q 60 4 68 16 L 108 86 Q 114 98 100 98 L 20 98 Q 6 98 12 86 Z"
              />
            </defs>
            <use
              href="#shift-triangle"
              fill="rgba(245,239,228,0.1)"
              stroke="rgba(245,239,228,0.45)"
              strokeWidth="1"
            />
            <text
              className="fill-beige"
              style={{ fontSize: "9.5px", letterSpacing: "1.8px", fontWeight: 500 }}
            >
              <textPath href="#shift-triangle">{ringText}</textPath>
            </text>
          </motion.svg>

          {/* Flèche au centre (légèrement sous le centre optique du triangle) */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pt-[14%] text-beige text-[20px] sm:text-[24px] -rotate-45 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110 drop-shadow-[0_1px_6px_rgba(13,32,53,0.6)]"
          >
            →
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

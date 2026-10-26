"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

/**
 * Badge triangulaire flottant pour Content Shift, affiché sur le hero de
 * l'accueil à côté du cercle Content Trip. Jaune vif sur la vidéo bleue,
 * avec « CONTENT » le long du côté gauche, « SHIFT » le long du côté droit
 * et « EN LIGNE » sous la base. Oscille, flotte et son halo doré respire.
 * Lien vers /bootcamp.
 */
export function ContentShiftBadge() {
  const reduce = useReducedMotion();

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
          {/* Triangle jaune vif : oscillation douce + halo doré qui respire */}
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute inset-0 w-full h-full"
            animate={
              reduce
                ? undefined
                : {
                    rotate: [-4, 4, -4],
                    filter: [
                      "drop-shadow(0 0 10px rgba(255,201,60,0.35))",
                      "drop-shadow(0 0 26px rgba(255,201,60,0.7))",
                      "drop-shadow(0 0 10px rgba(255,201,60,0.35))",
                    ],
                  }
            }
            transition={{
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              filter: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
            }}
            aria-hidden
          >
            <path
              d="M 52 16 Q 60 4 68 16 L 108 86 Q 114 98 100 98 L 20 98 Q 6 98 12 86 Z"
              fill="#FFC93C"
              stroke="rgba(13,32,53,0.3)"
              strokeWidth="1"
            />
            {/* CONTENT le long du côté gauche, à l'intérieur */}
            <text
              x="42"
              y="60"
              textAnchor="middle"
              transform="rotate(-61 42 60)"
              fill="#0d2035"
              style={{ fontSize: "10.5px", letterSpacing: "1.6px", fontWeight: 700 }}
            >
              CONTENT
            </text>
            {/* SHIFT le long du côté droit, à l'intérieur */}
            <text
              x="78"
              y="60"
              textAnchor="middle"
              transform="rotate(61 78 60)"
              fill="#0d2035"
              style={{ fontSize: "10.5px", letterSpacing: "1.6px", fontWeight: 700 }}
            >
              SHIFT
            </text>
            {/* Date puis EN LIGNE au-dessus de la base */}
            <text
              x="60"
              y="81"
              textAnchor="middle"
              fill="#0d2035"
              style={{ fontSize: "7px", letterSpacing: "1.2px", fontWeight: 600 }}
            >
              14 &amp; 15 NOV
            </text>
            <text
              x="60"
              y="92"
              textAnchor="middle"
              fill="#0d2035"
              style={{ fontSize: "8px", letterSpacing: "2.2px", fontWeight: 700 }}
            >
              EN LIGNE
            </text>
          </motion.svg>

          {/* Flèche au centre optique du triangle */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pb-[4%] text-[#0d2035] text-[17px] sm:text-[20px] -rotate-45 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110"
          >
            →
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

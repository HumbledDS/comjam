"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { bootcamp } from "@/lib/copy";
import { Pattern } from "@/components/brand/Pattern";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Annonce plein écran du Content Shift à l'arrivée sur la page d'accueil.
 * Entrée en cascade (titre, date, accroche, tarif, CTAs), fermeture par la
 * croix, le fond, Échap ou l'un des CTAs. Affichée une seule fois par
 * session (sessionStorage) pour ne pas harceler le visiteur qui navigue.
 */
export function ContentShiftSplash() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("content-shift-splash")) return;
    } catch {}
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem("content-shift-splash", "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cs-splash"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[1100] bg-blue-deep overflow-hidden flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Content Shift, le bootcamp Com'Jam des 14 et 15 novembre 2026"
        >
          <Pattern variant="cream" opacity={0.05} />

          {/* Watermark géant en fond */}
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-light text-[rgba(200,220,234,0.05)] whitespace-nowrap pointer-events-none select-none tracking-[10px]"
            style={{ fontSize: "clamp(80px, 18vw, 280px)" }}
          >
            CONTENT SHIFT
          </motion.div>

          {/* Croix */}
          <button
            type="button"
            onClick={close}
            aria-label="Fermer et continuer vers le site"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-20 w-11 h-11 flex items-center justify-center text-beige text-3xl font-light leading-none hover:rotate-90 transition-transform duration-300 cursor-pointer"
          >
            ×
          </button>

          {/* Contenu */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: 0.25 } },
            }}
            className="relative z-10 text-center max-w-3xl"
            style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              variants={item}
              className="text-[10px] font-medium tracking-[3.5px] uppercase text-blue-light mb-6"
            >
              {bootcamp.name} · Évènement en ligne
            </motion.div>

            <motion.h2
              variants={item}
              className="font-display font-light text-beige leading-[1.02] tracking-[-1px] mb-4"
              style={{ fontSize: "clamp(52px, 9vw, 110px)" }}
            >
              Content <em className="italic text-blue-pale">Shift</em>
            </motion.h2>

            <motion.div variants={item} className="flex justify-center mb-7">
              <div className="inline-flex items-center gap-3 border border-[rgba(200,220,234,0.3)] px-5 py-[10px] text-[11px] font-normal tracking-[2px] text-blue-pale">
                <span
                  className="w-[6px] h-[6px] bg-beige rounded-full"
                  style={{ animation: "pulse-dot 2s infinite" }}
                />
                {bootcamp.date} · {bootcamp.schedule}
              </div>
            </motion.div>

            <motion.p
              variants={item}
              className="font-display italic text-blue-pale leading-[1.45] mb-7 mx-auto max-w-xl"
              style={{ fontSize: "clamp(19px, 2.6vw, 28px)" }}
            >
              {bootcamp.tagline}
            </motion.p>

            {bootcamp.price.earlyBirdActive && (
              <motion.div variants={item} className="mb-9">
                <span className="inline-flex items-baseline gap-3 bg-[rgba(200,220,234,0.08)] border border-[rgba(200,220,234,0.18)] px-5 py-3">
                  <span className="text-[10px] font-semibold tracking-[2px] uppercase text-beige">
                    {bootcamp.price.label}
                  </span>
                  <span className="font-display text-[26px] font-light text-beige leading-none">
                    {bootcamp.price.current}€
                  </span>
                  <span className="text-[12px] font-light text-blue-pale line-through">
                    {bootcamp.price.original}€
                  </span>
                  <span className="text-[11px] font-light text-blue-pale">
                    pour les 20 premières places
                  </span>
                </span>
              </motion.div>
            )}

            <motion.div
              variants={item}
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-6"
            >
              <a
                href={bootcamp.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="btn btn-light"
              >
                Réserver ma place
              </a>
              <Link
                href="/bootcamp"
                onClick={close}
                className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[2.5px] uppercase text-beige hover:gap-4 transition-all"
              >
                Voir le programme <span aria-hidden>→</span>
              </Link>
            </motion.div>

            <motion.button
              variants={item}
              type="button"
              onClick={close}
              className="mt-10 text-[10px] font-light tracking-[2px] uppercase text-blue-pale/70 hover:text-blue-pale transition-colors cursor-pointer"
            >
              Continuer vers le site
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

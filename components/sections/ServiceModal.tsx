"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { Service } from "@/lib/copy";
import { media } from "@/lib/media";

/**
 * Service detail modal. Opens when a tile in ServicesShowcase is clicked.
 * Shows the full service info + image, with a primary CTA that routes to
 * /reservation or /contact (per the service's ctaHref) and a secondary
 * link to the full /services/[slug] page.
 *
 * Closes on backdrop click, ESC key, or X button. Locks body scroll
 * while open.
 */
export function ServiceModal({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  // Lock page scroll while modal is open
  useEffect(() => {
    if (!service) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [service]);

  // ESC to close
  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] bg-blue-deep/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={service.name}
        >
          <motion.article
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-paper w-full max-w-5xl my-auto grid grid-cols-1 lg:grid-cols-[5fr_6fr] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-3 right-3 z-30 w-10 h-10 flex items-center justify-center bg-paper/95 hover:bg-paper text-blue text-2xl leading-none font-light transition-colors"
            >
              ×
            </button>

            {/* IMAGE */}
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:min-h-[560px] bg-beige-dark overflow-hidden">
              <Image
                src={media.services[service.slug as keyof typeof media.services]?.src ?? ""}
                alt={service.name}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
                className="object-cover"
              />
              {/* Number badge top-left */}
              <div className="absolute top-5 left-5 font-display text-2xl font-light text-beige/90 mix-blend-difference">
                {service.num}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-7 sm:p-10 lg:p-12 flex flex-col">
              <div className="text-[10px] tracking-[3px] uppercase text-blue-light mb-4">
                Service {service.num}
              </div>

              <h3
                className="display mb-4 leading-tight"
                style={{ fontSize: "clamp(30px, 3vw, 44px)" }}
              >
                {service.name}
              </h3>

              <p className="font-display italic text-[18px] lg:text-[20px] text-blue-mid leading-snug mb-5">
                {service.short}
              </p>

              <p className="text-[14px] lg:text-[15px] font-light text-blue-mid leading-[1.75] mb-6">
                {service.desc}
              </p>

              {service.for && service.for.length > 0 && (
                <div className="mb-7">
                  <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-blue-light mb-3">
                    Pour qui ?
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.for.map((f) => (
                      <span
                        key={f}
                        className="px-3 py-1.5 bg-beige border border-beige-mid text-[11px] font-normal text-blue"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-7">
                <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-blue-light mb-3">
                  Ce qui est inclus
                </div>
                <ul className="flex flex-col gap-2.5">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-[13.5px] text-blue-mid leading-snug"
                    >
                      <span className="text-blue-light shrink-0">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer: pricing + actions */}
              <div className="mt-auto pt-6 border-t border-beige-mid flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                <div>
                  <div className="text-[10px] font-medium tracking-[2px] uppercase text-blue-light mb-1">
                    Tarif
                  </div>
                  <div className="font-display text-[26px] font-light text-blue leading-none">
                    {service.pricing}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={onClose}
                    className="text-[11px] font-medium tracking-[2.5px] uppercase text-blue-light hover:text-blue transition-colors"
                  >
                    En savoir plus →
                  </Link>
                  <Link
                    href={service.ctaHref}
                    onClick={onClose}
                    className="btn btn-primary"
                  >
                    {service.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

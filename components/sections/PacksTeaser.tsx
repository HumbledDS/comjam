"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { type Pack } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

/**
 * Strip of shooting packs shown at the bottom of the /services hub. Lets a
 * visitor jump straight into booking once they've understood the four
 * pillars above.
 */
export function PacksTeaser({ packs }: { packs: readonly Pack[] }) {
  const reduce = useReducedMotion();
  return (
    <section
      className="bg-beige"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "var(--gap)",
        paddingBottom: "var(--gap)",
      }}
    >
      <Reveal>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <Label>Réservation</Label>
            <h2
              className="display mt-5"
              style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
            >
              Nos packs <em>shooting.</em>
            </h2>
          </div>
          <Link
            href="/reservation"
            className="text-[11px] font-medium tracking-[2.5px] uppercase text-blue hover:text-blue-light transition-colors self-start md:self-auto"
          >
            Voir tous les packs →
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packs.map((p, i) => (
          <motion.div
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/reservation?pack=${p.id}`}
              className="relative block bg-paper border-t-[3px] border-transparent hover:border-blue-light p-7 transition-all hover:-translate-y-1 shadow-[0_18px_40px_-25px_rgba(13,32,53,0.35)] hover:shadow-[0_28px_60px_-25px_rgba(13,32,53,0.45)] h-full"
            >
              {p.topBadge && (
                <div className="absolute -top-3 left-7 bg-blue-light text-paper text-[9px] font-medium tracking-[2px] uppercase px-3 py-1">
                  {p.topBadge}
                </div>
              )}
              <div className="font-display text-2xl font-normal text-blue mb-2">
                {p.name}
              </div>
              <div className="font-display text-[34px] font-light text-blue leading-none mb-4">
                {p.priceLabel}
                {p.unit && (
                  <span className="text-[13px] font-light text-text-light">
                    {" "}{p.unit}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-1.5 mt-2 mb-6">
                {p.features.slice(0, 3).map((f) => (
                  <li
                    key={f}
                    className="text-[11.5px] font-light leading-[1.55] text-text-light flex gap-2"
                  >
                    <span className="text-blue-light shrink-0">-</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-blue mt-auto">
                Réserver →
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

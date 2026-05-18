"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { type Service } from "@/lib/copy";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { ServiceModal } from "@/components/sections/ServiceModal";

/**
 * Compact grid of services used on the /services hub.
 * Click any tile → opens ServiceModal whose primary CTA routes to
 * /reservation or /contact (per the service's ctaHref).
 */
export function ServicesGrid({ services }: { services: readonly Service[] }) {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <RevealGroup
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[rgba(255,255,255,0.06)]"
        stagger={0.08}
      >
        {services.map((s) => (
          <motion.article
            key={s.slug}
            variants={revealItem}
            className="bg-blue p-10 relative overflow-hidden transition-colors hover:bg-[rgba(44,82,130,0.6)] group"
          >
            <button
              type="button"
              onClick={() => setSelected(s)}
              className="block text-left w-full cursor-pointer"
              aria-label={`Voir le détail du service ${s.name}`}
            >
              <div className="font-display text-5xl font-light text-[rgba(200,220,234,0.12)] leading-none mb-5">
                {s.num}
              </div>
              <h3 className="font-display text-[26px] font-normal text-beige mb-4 leading-tight">
                {s.name}
              </h3>
              <p className="text-[13px] font-light leading-[1.8] text-blue-pale mb-7">
                {s.short}
              </p>
              <ul className="flex flex-col gap-[10px] mb-7">
                {s.bullets.slice(0, 4).map((b) => (
                  <li
                    key={b}
                    className="text-[12px] font-light text-[rgba(200,220,234,0.7)] flex items-start gap-[10px] leading-[1.5]"
                  >
                    <span className="text-blue-light text-[10px] shrink-0 mt-[2px]">-</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="font-display text-[22px] font-light text-beige pt-5 border-t border-[rgba(200,220,234,0.12)] flex justify-between items-end">
                <span>{s.pricing}</span>
                <span className="text-[11px] font-sans tracking-[2px] uppercase text-blue-pale opacity-0 group-hover:opacity-100 transition-opacity">
                  Voir →
                </span>
              </div>
            </button>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-light transition-all duration-500 group-hover:w-full pointer-events-none" />
          </motion.article>
        ))}
      </RevealGroup>

      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </>
  );
}

"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { type Service } from "@/lib/copy";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Pattern } from "@/components/brand/Pattern";
import { Ornament } from "@/components/brand/Ornament";
import { ServiceModal } from "@/components/sections/ServiceModal";

/**
 * Compact grid of services used on the /services hub. Cards sit on the
 * lighter blue-mid background with raised shadows + pattern overlays so they
 * read as physical "panels" rather than flat blocks (round-3 feedback).
 * Click any tile → opens ServiceModal whose primary CTA routes to
 * /reservation or /contact (per the service's ctaHref).
 */
export function ServicesGrid({ services }: { services: readonly Service[] }) {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <RevealGroup
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        stagger={0.08}
      >
        {services.map((s) => (
          <motion.article
            key={s.slug}
            variants={revealItem}
            className="relative bg-blue p-10 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] shadow-[0_18px_40px_-25px_rgba(0,0,0,0.5)] group"
          >
            <Pattern variant="cream" opacity={0.05} />
            <button
              type="button"
              onClick={() => setSelected(s)}
              className="block text-left w-full cursor-pointer relative z-10"
              aria-label={`Voir le détail du service ${s.name}`}
            >
              <div className="font-display text-5xl font-light text-[rgba(200,220,234,0.15)] leading-none mb-5">
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
                    className="text-[12px] font-light text-[rgba(200,220,234,0.75)] flex items-start gap-[10px] leading-[1.5]"
                  >
                    <span className="text-blue-light text-[10px] shrink-0 mt-[2px]">-</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="font-display text-[22px] font-light text-beige pt-5 border-t border-[rgba(200,220,234,0.18)]">
                {s.pricing}
              </div>
            </button>
            <Ornament
              kind="flourish"
              variant="cream"
              width={36}
              opacity={0.35}
              className="absolute bottom-5 right-5 pointer-events-none"
            />
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-light transition-all duration-500 group-hover:w-full pointer-events-none" />
          </motion.article>
        ))}
      </RevealGroup>

      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </>
  );
}

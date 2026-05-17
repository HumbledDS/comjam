"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { services, type Service } from "@/lib/copy";
import { media } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { ServiceModal } from "@/components/sections/ServiceModal";

/**
 * Services as image-paired panels. Clicking a tile opens ServiceModal
 * with the full detail + a primary CTA that routes to /reservation or
 * /contact per the service's ctaHref.
 */
export function ServicesShowcase() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <section
        className="bg-blue text-beige"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Reveal>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-14">
            <div>
              <Label light>Services</Label>
              <h2
                className="display display-light mt-5"
                style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                Quatre <em>piliers.</em>
              </h2>
            </div>
            <p className="max-w-[280px] text-[13px] font-light leading-[1.7] text-blue-pale md:text-right">
              Photo, stratégie, production, consulting. Cliquez sur un pilier
              pour en savoir plus.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => {
            const img = media.services[s.slug as keyof typeof media.services];
            return (
              <motion.div
                key={s.slug}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setSelected(s)}
                  className="block relative w-full aspect-[4/5] overflow-hidden group text-left cursor-pointer"
                  aria-label={`Voir le détail du service ${s.name}`}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={reduce ? undefined : { scale: 1.06 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={img.src}
                      alt={s.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Dark gradient anchor */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue via-blue/30 to-transparent" />
                  {/* Number top-left */}
                  <div className="absolute top-5 left-5 font-display text-[20px] font-light text-beige/80">
                    {s.num}
                  </div>
                  {/* Pricing top-right */}
                  <div className="absolute top-5 right-5 text-[10px] font-medium tracking-[2px] uppercase text-beige/70">
                    {s.pricing}
                  </div>
                  {/* Title + short bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-display text-[26px] lg:text-[30px] font-normal text-beige leading-tight">
                      {s.name}
                    </div>
                    <div className="text-[12px] font-light text-blue-pale mt-2 leading-[1.5] max-w-[240px]">
                      {s.short}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium tracking-[2.5px] uppercase text-beige opacity-70 group-hover:opacity-100 group-hover:gap-4 transition-all">
                      Voir <span>→</span>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { services, type Service } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Pattern } from "@/components/brand/Pattern";
import { Ornament } from "@/components/brand/Ornament";
import { ServiceModal } from "@/components/sections/ServiceModal";

/**
 * Services as Com'Jam-coloured cards on a blue section. Alternates dark cards
 * (blue/blue-deep with cream text) and light cards (beige with blue text) and
 * sprinkles brand patterns + flourishes for warmth. Clicking opens
 * ServiceModal for the full detail.
 */
export function ServicesShowcase() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <section
        className="bg-blue text-beige relative overflow-hidden"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Pattern variant="cream" opacity={0.04} />

        <Ornament
          kind="flourish"
          variant="cream"
          width={60}
          opacity={0.4}
          drift
          className="absolute top-[120px] right-[8%] hidden md:block"
        />
        <Ornament
          kind="swoosh"
          variant="cream"
          width={140}
          opacity={0.25}
          drift
          className="absolute bottom-[80px] left-[6%] hidden lg:block"
        />

        <Reveal>
          <div className="relative flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-14">
            <div>
              <Label light>Nos services</Label>
              <h2
                className="display display-light mt-5"
                style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
              >
                Quatre <em>piliers,</em>
                <br />
                une vision <em>360°</em>
              </h2>
            </div>
            <p className="max-w-sm text-[13.5px] font-light leading-[1.75] text-blue-pale md:text-right">
              De la production de contenu au consulting. Des solutions
              créatives, accessibles et adaptées à vos enjeux.
            </p>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[rgba(200,220,234,0.12)]">
          {services.map((s, i) => {
            const light = i % 2 === 1; // alternate beige cards on indices 1, 3
            return (
              <motion.button
                key={s.slug}
                type="button"
                onClick={() => setSelected(s)}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                aria-label={`Voir le détail du service ${s.name}`}
                className={`relative overflow-hidden text-left p-9 lg:p-10 min-h-[420px] flex flex-col group cursor-pointer transition-colors ${
                  light
                    ? "bg-beige text-blue hover:bg-beige-dark"
                    : "bg-blue-deep text-beige hover:bg-[rgba(13,32,53,0.85)]"
                }`}
              >
                {/* Decorative background pattern */}
                <Pattern
                  variant={light ? "blue" : "cream"}
                  opacity={light ? 0.05 : 0.05}
                />

                {/* Big watermark number */}
                <div
                  aria-hidden
                  className={`absolute top-4 right-6 font-display font-light text-[96px] leading-none pointer-events-none select-none ${
                    light ? "text-[rgba(27,58,92,0.08)]" : "text-[rgba(200,220,234,0.08)]"
                  }`}
                >
                  {s.num}
                </div>

                {/* Small ornament tucked in corner */}
                <Ornament
                  kind="flourish"
                  variant={light ? "blue" : "cream"}
                  width={32}
                  opacity={light ? 0.35 : 0.45}
                  className="absolute bottom-6 right-6"
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`text-[10px] font-medium tracking-[2.5px] uppercase mb-7 ${
                      light ? "text-blue-light" : "text-blue-light"
                    }`}
                  >
                    {s.num}
                  </div>

                  <h3
                    className={`font-display text-[26px] lg:text-[28px] font-normal leading-tight mb-3 ${
                      light ? "text-blue" : "text-beige"
                    }`}
                  >
                    {s.num === "04" ? (
                      <>
                        Consulting{" "}
                        <span className="inline-flex items-baseline gap-1 align-middle">
                          <span
                            className={`text-[11px] font-sans font-medium tracking-[2px] uppercase px-2 py-[3px] -translate-y-[3px] ${
                              light
                                ? "bg-blue text-beige"
                                : "bg-beige text-blue"
                            }`}
                          >
                            1 to 1
                          </span>
                        </span>
                      </>
                    ) : (
                      s.name
                    )}
                  </h3>

                  <p
                    className={`font-display italic text-[15px] leading-snug mb-5 ${
                      light ? "text-blue-mid" : "text-blue-pale"
                    }`}
                  >
                    {s.short}
                  </p>

                  <ul className="flex flex-col gap-[7px] mb-7">
                    {s.bullets.slice(0, 4).map((b) => (
                      <li
                        key={b}
                        className={`text-[12.5px] font-light flex gap-2.5 leading-[1.55] ${
                          light ? "text-blue-mid" : "text-blue-pale/85"
                        }`}
                      >
                        <span className={`shrink-0 mt-px ${light ? "text-blue-light" : "text-blue-light"}`}>
                          -
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-auto pt-5 border-t flex items-end justify-between ${
                      light
                        ? "border-beige-mid"
                        : "border-[rgba(200,220,234,0.18)]"
                    }`}
                  >
                    <div
                      className={`font-display text-[20px] font-light ${
                        light ? "text-blue" : "text-beige"
                      }`}
                    >
                      {s.pricing}
                    </div>
                    <div
                      className={`text-[10px] font-medium tracking-[2.5px] uppercase opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
                        light ? "text-blue" : "text-beige"
                      }`}
                    >
                      Voir →
                    </div>
                  </div>
                </div>

                {/* Hover underline */}
                <div
                  className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full pointer-events-none ${
                    light ? "bg-blue" : "bg-blue-light"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </section>

      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </>
  );
}

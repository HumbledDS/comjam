"use client";

import { motion } from "motion/react";
import { testimonials } from "@/lib/copy";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

export function Testimonials() {
  return (
    <section
      className="bg-paper"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "var(--gap)",
        paddingBottom: "var(--gap)",
      }}
    >
      <Reveal>
        <Label>Ils nous font confiance</Label>
        <h2
          className="display mt-5"
          style={{ fontSize: "clamp(36px, 3.5vw, 54px)" }}
        >
          Ce qu'ils disent<br />de <em>nous</em>
        </h2>
      </Reveal>

      <RevealGroup
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14"
        stagger={0.1}
      >
        {testimonials.map((t) => (
          <motion.article
            key={t.name}
            variants={revealItem}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="bg-beige p-10 border-t-2 border-transparent hover:border-blue-light transition-colors"
          >
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="w-[7px] h-[7px] bg-blue-light"
                  style={{
                    clipPath:
                      "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                  }}
                />
              ))}
            </div>
            <p className="font-display text-[19px] font-light italic text-blue leading-[1.65] mb-6">
              {t.quote}
            </p>
            <div className="h-px bg-beige-mid mb-5" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue text-beige flex items-center justify-center font-display text-base shrink-0">
                {t.initial}
              </div>
              <div>
                <div className="text-[13px] font-medium text-blue mb-px">{t.name}</div>
                <div className="text-[11px] font-light text-text-light">{t.role}</div>
              </div>
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </section>
  );
}

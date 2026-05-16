"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { home } from "@/lib/copy";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/brand/Ornament";
import { Pattern } from "@/components/brand/Pattern";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export function Hero() {
  const reduce = useReducedMotion();
  const wrap = (props: ReturnType<typeof fadeUp>) => (reduce ? { initial: false } : props);

  return (
    <section
      className="relative overflow-hidden bg-beige min-h-screen grid lg:grid-cols-2 items-center pt-[120px] pb-20"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        gap: "var(--gap)",
      }}
    >
      {/* Decorative bg layer — wrapped so its children don't take grid cells */}
      <div aria-hidden className="absolute inset-0 pointer-events-none col-span-2">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(27,58,92,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,92,0.035) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 70% 80% at 20% 50%, black 10%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 80% at 20% 50%, black 10%, transparent 80%)",
          }}
        />
        <Pattern variant="blue" opacity={0.04} />
        <Ornament
          kind="flourish"
          variant="blue"
          width={50}
          opacity={0.4}
          className="hidden lg:block absolute top-[140px] right-[8%] z-0"
          drift
        />
      </div>

      <div className="relative z-10">
        <motion.div {...wrap(fadeUp(0.1))} className="mb-9">
          <Label>{home.eyebrow}</Label>
        </motion.div>

        <motion.h1
          {...wrap(fadeUp(0.25))}
          className="display mb-8"
          style={{ fontSize: "clamp(52px, 5.5vw, 88px)" }}
        >
          {home.title.map((line, i) => (
            <span key={i} className="block">
              {home.emphasizedLine === i ? <em>{line}</em> : line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          {...wrap(fadeUp(0.4))}
          className="font-light leading-[1.85] text-blue-mid max-w-[460px] mb-12"
          style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
        >
          {home.desc}
        </motion.p>

        <motion.div
          {...wrap(fadeUp(0.55))}
          className="flex items-center gap-6 flex-wrap"
        >
          <Button href="/contact" variant="primary">
            Prendre rendez-vous
          </Button>
          <Button href="/services" variant="ghost">
            Découvrir nos services
          </Button>
        </motion.div>

        <motion.div
          {...wrap(fadeUp(0.7))}
          className="flex mt-16 pt-9 border-t border-beige-mid"
        >
          {home.stats.map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex-1 pr-3 sm:pr-7 ${
                i < arr.length - 1 ? "border-r border-beige-mid mr-3 sm:mr-7" : ""
              }`}
            >
              <div className="font-display text-[28px] sm:text-[38px] font-light text-blue leading-none mb-[6px]">
                {stat.value}
              </div>
              <div className="text-[10px] font-normal tracking-[2px] uppercase text-text-light">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="relative z-10 lg:max-w-none"
      >
        <div
          className="relative bg-paper border-t-[3px] border-blue p-6 sm:p-12 lg:shadow-[20px_20px_0_var(--color-beige-dark)]"
        >
          <Ornament
            kind="apostrophe"
            variant="blue"
            width={36}
            className="absolute -top-5 -right-1"
          />
          <div className="flex items-center gap-3 text-[9px] font-medium tracking-[3px] uppercase text-blue-light mb-7">
            <span>{home.card.label}</span>
            <span className="flex-1 h-px bg-beige-mid" />
          </div>

          <div className="font-display text-[21px] font-light italic text-blue leading-[1.5] mb-7">
            “{home.card.quote}”
          </div>

          <div className="flex flex-col gap-[2px] mb-7">
            {home.card.items.map((item) => (
              <div
                key={item.name}
                className="flex items-start gap-0 px-4 py-[14px] bg-beige border-l-2 border-transparent hover:border-blue-light hover:bg-beige-dark transition-colors"
              >
                <div className="w-[18px] text-[11px] text-blue-light shrink-0 mt-px">—</div>
                <div>
                  <div className="text-[13px] font-medium text-blue mb-[2px]">{item.name}</div>
                  <div className="text-[11px] font-light text-text-light">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/bootcamp"
            className="bg-blue px-[22px] py-5 flex justify-between items-center gap-4 hover:bg-blue-mid transition-colors"
          >
            <div>
              <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-1">
                Formation live — 14 &amp; 15 Juin 2026
              </div>
              <div className="font-display text-[20px] font-normal text-beige">
                Content Shift Bootcamp
              </div>
            </div>
            <div className="font-display text-[34px] font-light text-beige whitespace-nowrap">
              197€ <sub className="text-[13px] font-light text-blue-pale align-middle">early bird</sub>
            </div>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

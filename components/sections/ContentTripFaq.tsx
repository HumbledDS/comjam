"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/**
 * FAQ in accordion mode (per Jamila's reference): one question open at a
 * time, chevron rotates, answer slides open.
 */
export function ContentTripFaq({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-beige-mid">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
            >
              <span className="font-display text-[20px] sm:text-[22px] font-normal text-blue leading-snug group-hover:text-blue-mid transition-colors">
                {item.q}
              </span>
              <span
                aria-hidden
                className={`shrink-0 text-blue-light text-sm transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[14px] font-light leading-[1.8] text-blue-mid max-w-2xl">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

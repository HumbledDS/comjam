"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Mobile-only sticky "Je candidate" bar. Slides up from the bottom once the
 * visitor scrolls past the hero so the CTA stays reachable all the way down
 * the page. Hidden on desktop (the inline CTAs are enough there).
 */
export function ContentTripSticky({ formUrl }: { formUrl: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-[900] md:hidden bg-[rgba(245,239,228,0.96)] backdrop-blur-md border-t border-beige-mid px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))]"
        >
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-center block"
          >
            Je candidate →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

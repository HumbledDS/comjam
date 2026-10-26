"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Barre CTA sticky mobile. Remonte du bas une fois le hero dépassé pour que
 * l'action principale reste accessible tout au long de la page. Cachée sur
 * desktop (les CTAs inline suffisent).
 */
export function StickyCta({ href, label }: { href: string; label: string }) {
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
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-center block"
          >
            {label} →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

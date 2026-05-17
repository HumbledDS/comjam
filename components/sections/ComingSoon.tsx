"use client";

import { motion, useReducedMotion } from "motion/react";
import { brand } from "@/lib/copy";
import { Logo } from "@/components/brand/Logo";
import { Monogram } from "@/components/brand/Monogram";
import { Pattern } from "@/components/brand/Pattern";
import { Ornament } from "@/components/brand/Ornament";
import {
  InstagramIcon,
  TikTokIcon,
  LinktreeIcon,
  MailIcon,
} from "@/components/brand/SocialIcon";

/**
 * Pre-launch holding page. Full-bleed, no nav, no footer — just the
 * brand identity, an editorial headline, and the social channels.
 *
 * Rendered as the homepage whenever NEXT_PUBLIC_LAUNCHED is unset or
 * false. Set the env var to "true" on Vercel and redeploy to flip to
 * the full site.
 */
export function ComingSoon() {
  const reduce = useReducedMotion();

  const socials = [
    { label: "Instagram", Icon: InstagramIcon, href: brand.instagram.url },
    { label: "TikTok", Icon: TikTokIcon, href: brand.tiktok.url },
    { label: "Linktree", Icon: LinktreeIcon, href: brand.linktree.url },
    { label: "Email", Icon: MailIcon, href: `mailto:${brand.email}` },
  ];

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <main className="relative min-h-[100svh] bg-beige overflow-hidden flex flex-col">
      {/* Subtle brand pattern drifting in the background */}
      <Pattern variant="blue" opacity={0.05} />

      {/* Soft monogram floating top-right (decorative only) */}
      <div className="absolute top-[12vh] right-[8vw] opacity-15 hidden sm:block pointer-events-none">
        <Monogram variant="blue" size={140} spin />
      </div>
      <div className="absolute bottom-[14vh] left-[6vw] opacity-15 hidden sm:block pointer-events-none">
        <Ornament kind="flourish" variant="blue" width={80} drift />
      </div>

      {/* Center stack — logo + headline */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center"
        style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-12"
        >
          <Logo variant="blue" width={220} href={null} priority />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="flex items-center gap-3 text-[10px] font-medium tracking-[3.5px] uppercase text-blue-light mb-8"
        >
          <span className="block w-7 h-px bg-blue-light/70" />
          Bientôt en ligne
          <span className="block w-7 h-px bg-blue-light/70" />
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="display max-w-3xl"
          style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
        >
          Quelque chose se{" "}
          <em className="italic text-blue-light">prépare.</em>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mt-8 max-w-md text-[15px] sm:text-[16px] font-light leading-[1.7] text-blue-mid"
        >
          L&apos;agence Com&apos;Jam arrive très bientôt. En attendant,
          retrouvez-nous sur les réseaux.
        </motion.p>
      </div>

      {/* Socials + copyright at the bottom */}
      <motion.footer
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
        className="relative z-10 pb-10 sm:pb-14 flex flex-col items-center gap-6"
        style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        <div className="flex gap-2 sm:gap-3">
          {socials.map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-paper border border-beige-mid text-blue rounded-full hover:bg-blue hover:text-beige hover:border-blue transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <div className="text-[11px] font-light tracking-[1.5px] uppercase text-text-light">
          © 2026 {brand.name} {brand.suffix} · {brand.city}
        </div>
      </motion.footer>
    </main>
  );
}

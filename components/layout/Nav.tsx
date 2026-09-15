"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, promo } from "@/lib/copy";
import { Monogram } from "@/components/brand/Monogram";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // On desktop, dark-hero routes always show the frosted-beige backdrop so the
  // blue nav links stay readable. On mobile only the burger + wordmark are
  // visible, so we drop the backdrop at the top of dark heroes (cleaner over
  // the video) and re-enable it once the user scrolls past the hero.
  const darkHeroRoutes = ["/", "/services"];
  const overDarkHero = darkHeroRoutes.includes(pathname);
  const desktopBackdrop = scrolled || overDarkHero;
  const mobileTransparent = overDarkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] flex justify-between items-center transition-all duration-300 ${
          mobileTransparent
            ? "py-5 bg-transparent"
            : "py-4 bg-[rgba(245,239,228,0.97)] backdrop-blur-md shadow-[0_1px_0_rgba(212,197,176,0.5)]"
        } ${
          desktopBackdrop
            ? "md:py-4 md:bg-[rgba(245,239,228,0.55)] md:backdrop-blur-xl md:shadow-[0_1px_0_rgba(212,197,176,0.35)]"
            : "md:py-7 md:bg-transparent md:backdrop-blur-0 md:shadow-none"
        }`}
        style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        {/* Mobile: cream "C" monogram over transparent dark hero, blue otherwise.
            Desktop: always blue against the frosted backdrop. */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Link href="/" aria-label="Com'Jam, accueil" className="inline-flex items-center leading-none">
            <span className="md:hidden">
              <Monogram variant={mobileTransparent ? "cream" : "blue"} size={42} />
            </span>
            <span className="hidden md:inline-block">
              <Monogram variant="blue" size={44} />
            </span>
          </Link>

          {/* Badge promo, visible sur toutes les pages */}
          {promo.active && (
            <Link
              href="/reservation"
              aria-label={`Offre ${promo.label} sur toutes les offres ${promo.untilLabel}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-blue px-4 py-2 sm:px-6 sm:py-3 text-[11px] sm:text-[12px] font-semibold tracking-[1.5px] uppercase whitespace-nowrap shadow-[0_6px_18px_-4px_rgba(13,32,53,0.5)] hover:bg-blue-mid transition-colors"
              style={{ color: "var(--color-beige)" }}
            >
              <span
                className="w-[7px] h-[7px] bg-beige rounded-full shrink-0"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
              <span className="sm:hidden">{promo.label} {promo.untilShort}</span>
              <span className="hidden sm:inline">{promo.label} sur tout {promo.untilShort}</span>
            </Link>
          )}
        </div>

        <ul className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <li
              key={item.href}
              className={item.children ? "relative group" : undefined}
            >
              {item.primary ? (
                <Link
                  href={item.href}
                  className="btn btn-primary !py-[10px] !px-6"
                >
                  Nous contacter
                </Link>
              ) : (
                <Link
                  href={item.href}
                  aria-haspopup={item.children ? "menu" : undefined}
                  className={`relative inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[2.5px] uppercase text-blue transition-colors hover:text-blue-mid ${
                    pathname === item.href ? "opacity-100" : "opacity-90"
                  } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-blue after:transition-all after:duration-300 ${
                    pathname === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <span
                      aria-hidden
                      className="text-[8px] transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                    >
                      ▾
                    </span>
                  )}
                </Link>
              )}

              {/* Dropdown (hover + keyboard focus) */}
              {item.children && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                  <ul className="min-w-[240px] bg-paper border border-beige-mid shadow-[0_18px_40px_-12px_rgba(13,32,53,0.25)] py-2">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link
                          href={child.href}
                          className="block px-5 py-3 border-l-2 border-transparent hover:border-blue-light hover:bg-beige transition-colors"
                        >
                          <span className="block text-[11px] font-semibold tracking-[2px] uppercase text-blue">
                            {child.label}
                          </span>
                          {child.sub && (
                            <span className="block text-[10.5px] font-light text-text-light mt-0.5">
                              {child.sub}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-0 cursor-pointer"
        >
          <span
            className={`block w-6 h-[1.5px] transition-all duration-300 ${
              mobileTransparent && !open ? "bg-beige" : "bg-blue"
            } ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-all duration-300 ${
              mobileTransparent && !open ? "bg-beige" : "bg-blue"
            } ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-all duration-300 ${
              mobileTransparent && !open ? "bg-beige" : "bg-blue"
            } ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[998] flex-col justify-center items-center gap-10 bg-beige transition-opacity duration-300 md:hidden ${
          open ? "flex opacity-100" : "hidden opacity-0"
        }`}
      >
        {nav.map((item) =>
          item.children ? (
            <div key={item.href} className="flex flex-col items-center gap-3">
              <span className="font-display text-[36px] font-light text-blue tracking-tight">
                {item.label}
              </span>
              {item.children.map((child) => (
                <Link
                  key={child.href + child.label}
                  href={child.href}
                  className="text-[13px] font-medium tracking-[2px] uppercase text-blue-light hover:text-blue transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[36px] font-light text-blue tracking-tight hover:text-blue-light transition-colors"
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </>
  );
}

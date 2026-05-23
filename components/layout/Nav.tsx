"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/copy";
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
        <Link href="/" aria-label="Com'Jam, accueil" className="inline-flex items-center leading-none">
          <span className="md:hidden">
            <Monogram variant={mobileTransparent ? "cream" : "blue"} size={42} />
          </span>
          <span className="hidden md:inline-block">
            <Monogram variant="blue" size={44} />
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <li key={item.href}>
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
                  className={`relative text-[11px] font-semibold tracking-[2.5px] uppercase text-blue transition-colors hover:text-blue-mid ${
                    pathname === item.href ? "opacity-100" : "opacity-90"
                  } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-blue after:transition-all after:duration-300 ${
                    pathname === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </Link>
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
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-display text-[36px] font-light text-blue tracking-tight hover:text-blue-light transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}

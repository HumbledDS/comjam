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

  // Pages whose hero is dark / image / video need a transparent nav at the
  // top of the page — links/logo flip to cream until the user scrolls past
  // the hero, after which the frosted beige backdrop takes over.
  const darkHeroRoutes = ["/", "/services"];
  const overDarkHero = darkHeroRoutes.includes(pathname);
  const showBackdrop = scrolled || !overDarkHero;
  const onDark = overDarkHero && !scrolled;

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
          showBackdrop
            ? "py-4 bg-[rgba(245,239,228,0.97)] backdrop-blur-md shadow-[0_1px_0_rgba(212,197,176,0.5)]"
            : "py-7"
        }`}
        style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        <Link href="/" aria-label="Com'Jam, accueil" className="inline-flex items-center leading-none">
          <Monogram variant={onDark ? "cream" : "blue"} size={44} />
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <li key={item.href}>
              {item.primary ? (
                <Link
                  href={item.href}
                  className={`btn !py-[10px] !px-6 ${onDark ? "btn-light" : "btn-primary"}`}
                >
                  Nous contacter
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className={`relative text-[11px] font-semibold tracking-[2.5px] uppercase transition-colors ${
                    onDark
                      ? "text-beige hover:text-blue-pale"
                      : "text-blue hover:text-blue-mid"
                  } ${pathname === item.href ? "opacity-100" : "opacity-90"} after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:transition-all after:duration-300 ${
                    onDark ? "after:bg-beige" : "after:bg-blue"
                  } ${
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
            className={`block w-6 h-[1.5px] transition-transform duration-300 ${
              onDark ? "bg-beige" : "bg-blue"
            } ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-opacity duration-300 ${
              onDark ? "bg-beige" : "bg-blue"
            } ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-transform duration-300 ${
              onDark ? "bg-beige" : "bg-blue"
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

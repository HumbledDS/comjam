"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, nav } from "@/lib/copy";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Pages whose hero is dark (blue) need the frosted nav backdrop immediately
  // so blue-on-blue text doesn't become invisible.
  const darkHeroRoutes = ["/services", "/contact"];
  const needsBackdrop = darkHeroRoutes.includes(pathname);
  const showBackdrop = scrolled || needsBackdrop;

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
        <Link
          href="/"
          className="font-display text-[22px] font-semibold tracking-wide text-blue"
        >
          {brand.name} <span className="text-blue-light">{brand.suffix}</span>
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
                  className={`relative text-[11px] font-normal tracking-[2.5px] uppercase text-blue transition-opacity hover:opacity-100 ${
                    pathname === item.href ? "opacity-100" : "opacity-55"
                  } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-blue-light after:transition-all after:duration-300 ${
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
            className={`block w-6 h-[1.5px] bg-blue transition-transform duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-blue transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-blue transition-transform duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
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

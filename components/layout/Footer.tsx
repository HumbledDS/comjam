import Link from "next/link";
import { brand, footer } from "@/lib/copy";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";

export function Footer() {
  return (
    <footer
      className="bg-blue-deep pt-16 pb-10"
      style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
    >
      <div className="flex justify-between items-start pb-12 border-b border-[rgba(255,255,255,0.15)] gap-12 flex-wrap">
        <div className="flex flex-col gap-5 max-w-xs">
          <Logo variant="cream" width={150} href={null} />
          <p className="text-[14px] font-light text-beige leading-[1.7]">
            {brand.tagline}
          </p>
          <Ornament kind="swoosh" variant="cream" width={90} className="-ml-1 mt-1" drift opacity={0.85} />
        </div>

        <div className="flex gap-14 lg:gap-20 flex-wrap">
          {footer.cols.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-semibold tracking-[2.5px] uppercase text-beige mb-5">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] font-normal text-beige/90 hover:text-beige hover:underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 flex-wrap gap-4">
        <div className="text-[13px] font-light text-beige/80">
          © 2026 {brand.name} {brand.suffix} · {brand.city} · Tous droits réservés
        </div>
        <div className="flex gap-7">
          {footer.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium tracking-[2px] uppercase text-beige hover:text-blue-pale transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

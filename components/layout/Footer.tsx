import Link from "next/link";
import { brand, footer } from "@/lib/copy";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";

export function Footer() {
  return (
    <footer
      className="bg-blue-deep pt-[52px] pb-8"
      style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
    >
      <div className="flex justify-between items-start pb-10 border-b border-[rgba(200,220,234,0.07)] gap-10 flex-wrap">
        <div className="flex flex-col gap-4">
          <div className="bg-blue p-2 -m-2">
            <Logo on="blue" width={160} href={null} />
          </div>
          <div className="text-xs font-light text-blue-pale leading-[1.7] max-w-[240px]">
            {brand.tagline}
          </div>
          <Ornament kind="swoosh" on="blue" width={120} className="-ml-3" drift />
        </div>

        <div className="flex gap-[52px] flex-wrap">
          {footer.cols.map((col) => (
            <div key={col.title}>
              <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-[18px]">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-light text-[rgba(200,220,234,0.45)] hover:text-beige transition-colors"
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

      <div className="flex justify-between items-center pt-7 flex-wrap gap-3">
        <div className="text-[11px] font-light text-[rgba(200,220,234,0.25)]">
          © 2026 {brand.name} {brand.suffix} · {brand.city} · Tous droits réservés
        </div>
        <div className="flex gap-6">
          {footer.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-normal tracking-[2px] uppercase text-[rgba(200,220,234,0.35)] hover:text-beige transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

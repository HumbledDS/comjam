import Link from "next/link";
import { brand, footer } from "@/lib/copy";
import { Logo } from "@/components/brand/Logo";
import { Ornament } from "@/components/brand/Ornament";

export function Footer() {
  return (
    <footer
      className="bg-blue-deep pt-20 pb-12 text-paper"
      style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
    >
      <div className="flex justify-between items-start pb-14 border-b border-paper/25 gap-14 flex-wrap">
        <div className="flex flex-col gap-6 max-w-sm">
          <Logo variant="cream" width={170} href={null} />
          <p className="text-[16px] font-light text-paper leading-[1.7]">
            {brand.tagline}
          </p>
          <Ornament kind="swoosh" variant="cream" width={100} className="-ml-1 mt-2" drift opacity={0.9} />
        </div>

        <div className="flex gap-16 lg:gap-24 flex-wrap">
          {footer.cols.map((col) => (
            <div key={col.title}>
              <div className="text-[13px] font-bold tracking-[3px] uppercase text-paper mb-6">
                {col.title}
              </div>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[16px] font-normal text-paper hover:underline underline-offset-[6px] decoration-[1.5px] transition-all"
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

      <div className="flex justify-between items-center pt-10 flex-wrap gap-5">
        <div className="text-[14px] font-normal text-paper">
          © 2026 {brand.name} {brand.suffix} · {brand.city} · Tous droits réservés
        </div>
        <div className="flex gap-8">
          {footer.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-bold tracking-[2.5px] uppercase text-paper hover:text-blue-pale transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

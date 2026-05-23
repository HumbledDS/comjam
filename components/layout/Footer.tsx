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
          <p className="text-[15px] font-light text-[#FDF9F5]/90 leading-[1.7]">
            {brand.tagline}
          </p>
          <Ornament kind="swoosh" variant="cream" width={100} className="-ml-1 mt-2" drift opacity={0.9} />
        </div>

        <div className="flex gap-16 lg:gap-24 flex-wrap">
          {footer.cols.map((col) => (
            <div key={col.title}>
              <div
                className="font-display font-light text-[24px] leading-none text-[#FDF9F5] mb-7"
              >
                {col.title}
              </div>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] font-light text-[#FDF9F5]/85 hover:text-[#FDF9F5] hover:underline underline-offset-[6px] decoration-[1px] transition-all"
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
        <div className="text-[13px] font-light text-[#FDF9F5]/85">
          © 2026 {brand.name} {brand.suffix} · {brand.city} · Tous droits réservés
        </div>
        <div className="flex gap-8">
          {footer.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium tracking-[2.5px] uppercase text-[#FDF9F5] hover:text-blue-pale transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

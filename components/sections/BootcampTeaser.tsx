import Link from "next/link";
import { bootcamp } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

export function BootcampTeaser() {
  return (
    <section
      className="bg-paper relative overflow-hidden"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "var(--gap)",
        paddingBottom: "var(--gap)",
      }}
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-light text-[rgba(27,58,92,0.025)] whitespace-nowrap pointer-events-none select-none tracking-[8px]"
        style={{ fontSize: "clamp(60px, 14vw, 200px)" }}
      >
        CONTENT SHIFT
      </div>

      <div className="relative grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Label>{bootcamp.eyebrow}</Label>
          <h2
            className="display mt-5 mb-6"
            style={{ fontSize: "clamp(36px, 3.5vw, 54px)" }}
          >
            {bootcamp.name.split(" ").map((w, i) => (
              <span key={i} className="block">
                {i === 1 ? <em>{w}</em> : w}
              </span>
            ))}
          </h2>
          <p className="text-[15px] font-light leading-[1.85] text-text-light mb-8 max-w-[460px]">
            {bootcamp.desc}
          </p>
          <Link
            href="/bootcamp"
            className="btn btn-primary"
          >
            Découvrir le bootcamp
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bg-blue p-11 relative">
            <div className="inline-block bg-blue-light text-paper text-[9px] font-medium tracking-[2px] uppercase px-[14px] py-[5px] mb-6">
              {bootcamp.price.label}
            </div>
            <div className="font-display text-[72px] font-light text-beige leading-none mb-1">
              {bootcamp.price.current}€
            </div>
            <div className="text-[13px] font-light text-blue-pale line-through mb-2">
              Tarif normal : {bootcamp.price.original}€
            </div>
            <div className="text-[12px] font-light text-blue-pale leading-[1.7] mb-6">
              {bootcamp.date} · {bootcamp.schedule}
            </div>
            <div className="h-px bg-[rgba(200,220,234,0.12)] my-5" />
            <Link
              href="/bootcamp"
              className="btn btn-light w-full text-center block"
            >
              Réserver ma place
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

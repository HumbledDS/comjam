import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Ornament } from "@/components/brand/Ornament";
import { Monogram } from "@/components/brand/Monogram";
import { unsplash } from "@/lib/unsplash";

export function AboutTeaser() {
  return (
    <section
      className="bg-beige grid lg:grid-cols-2 items-center"
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        paddingTop: "var(--gap)",
        paddingBottom: "var(--gap)",
        gap: "var(--gap)",
      }}
    >
      <Reveal>
        <Label>À propos</Label>
        <h2
          className="display mt-5 mb-7"
          style={{ fontSize: "clamp(36px, 3.5vw, 54px)" }}
        >
          Une approche humaine,<br />une vision <em>360°</em>
        </h2>
        <p className="text-[15px] font-light leading-[1.9] text-blue-mid mb-5">
          Chez Com'Jam, nous intégrons pleinement la <strong className="text-blue font-medium">création de contenu</strong>, l'image de marque, les réseaux sociaux et l'influence au sein d'une stratégie globale.
        </p>
        <p className="text-[15px] font-light leading-[1.9] text-blue-mid mb-8">
          Notre approche repose sur une communication <strong className="text-blue font-medium">simple, humaine et efficace</strong>, privilégiant des contenus naturels mais esthétiques. Chaque projet est conçu avec une attention portée à l'identité du client.
        </p>
        <Link href="/a-propos" className="btn btn-outline">
          En savoir plus
        </Link>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          className="relative aspect-[4/5] bg-paper border-t-[3px] border-blue-light overflow-hidden"
          style={{ boxShadow: "20px 20px 0 var(--color-beige-dark)" }}
        >
          <Image
            src={unsplash.jamilaPortrait}
            alt="Portrait Jamila — fondatrice Com'Jam Agency"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-5 right-5 bg-beige/95 backdrop-blur-sm p-2 rounded-sm">
            <Monogram variant="blue" size={36} />
          </div>
          <Ornament
            kind="swoosh"
            variant="cream"
            width={90}
            className="absolute top-3 left-3"
            opacity={0.9}
          />
        </div>
      </Reveal>
    </section>
  );
}

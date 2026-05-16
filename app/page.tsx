import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { BootcampTeaser } from "@/components/sections/BootcampTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { home, services } from "@/lib/copy";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={home.ticker} />
      <AboutTeaser />

      <section
        className="bg-blue"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingTop: "var(--gap)",
          paddingBottom: "var(--gap)",
        }}
      >
        <SectionHeader
          light
          eyebrow="Services"
          lines={["Ce que nous", "faisons ensemble"]}
          emphasizedLine={1}
          aside="De la stratégie à l'exécution — photo, vidéo, réseaux sociaux et formation. Tout ce dont vous avez besoin pour performer en ligne."
        />
        <ServicesGrid services={services} />
      </section>

      <BootcampTeaser />
      <Testimonials />

      <CTA
        eyebrow="Et après ?"
        title="Parlons de votre projet."
        desc="Vous avez une idée, une marque à propulser, ou besoin d'un accompagnement personnalisé ? Échangeons — nous répondons sous 48h."
        primary={{ href: "/contact", label: "Nous contacter" }}
        secondary={{ href: "/reservation", label: "Réserver un shooting" }}
      />
    </>
  );
}

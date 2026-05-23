import type { Metadata } from "next";
import { services, packs } from "@/lib/copy";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PacksTeaser } from "@/components/sections/PacksTeaser";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services · Com'Jam",
  description:
    "Création de contenu, stratégie digitale, production et consulting 1-2-1. Quatre services pensés pour faire grandir votre image et votre audience.",
};

export default function ServicesPage() {
  return (
    <>
      <section
        className="bg-blue-mid pt-[160px]"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingBottom: "var(--gap)",
        }}
      >
        <SectionHeader
          light
          eyebrow="Nos services"
          lines={["Quatre piliers,", "une vision 360°"]}
          emphasizedLine={1}
          aside="De la production de contenu au consulting individuel. Des solutions créatives, accessibles et adaptées à vos enjeux."
        />
        <ServicesGrid services={services} />
      </section>

      <PacksTeaser packs={packs} />

      <CTA
        title="Pas sûr·e du service qu'il vous faut ?"
        desc="Réservez un appel gratuit de 15 minutes, on échange sur votre besoin et je vous oriente vers la solution la plus pertinente."
        primary={{ href: "/contact", label: "Réserver un appel" }}
        secondary={{ href: "/reservation", label: "Réserver un shooting" }}
      />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { packs, contentTrip } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { ReservationClient } from "./client";

export const metadata: Metadata = {
  title: "Réserver un shooting · Com'Jam",
  description:
    "Réservez votre shooting photo Com'Jam en ligne. Pack Flash, Signature, Duo ou Réel+ Vidéo. Calendrier en direct, paiement sécurisé.",
};

export default function ReservationPage() {
  return (
    <>
      <section
        className="bg-beige pt-[160px]"
        style={{
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
          paddingBottom: "var(--gap)",
        }}
      >
        <Reveal>
          <div className="max-w-3xl">
            <Label>Réservation</Label>
            <h1
              className="display mt-5 mb-6"
              style={{ fontSize: "clamp(40px, 5vw, 76px)" }}
            >
              Réservez votre<br /><em>shooting</em>
            </h1>
            <p className="text-[15px] font-light leading-[1.85] text-blue-mid max-w-2xl">
              Choisissez votre pack, sélectionnez un créneau, réglez votre acompte
              et nous nous occupons du reste. Vous recevez une confirmation avec
              toutes les informations pratiques et importantes.
            </p>
          </div>
        </Reveal>

        <Suspense fallback={<div className="h-[400px] mt-14" />}>
          <ReservationClient packs={packs} />
        </Suspense>

        {/* Content Trip — candidature, pas de créneau calendrier */}
        <Reveal className="mt-16">
          <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] items-stretch bg-blue overflow-hidden">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[300px]">
              <Image
                src={contentTrip.villaImage}
                alt="Villa du Com'Jam Content Trip à Lanzarote"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute top-5 left-5 text-[10px] font-medium tracking-[3px] uppercase text-beige bg-blue/60 backdrop-blur-sm px-3 py-1.5">
                Voyage créatif
              </div>
            </div>
            <div className="p-9 lg:p-12 text-beige flex flex-col justify-between gap-8">
              <div>
                <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-3">
                  {contentTrip.name} · Sur candidature
                </div>
                <h2
                  className="display display-light mb-4"
                  style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
                >
                  Édition 02 · <em>Lanzarote.</em>
                </h2>
                <div className="text-[12px] font-medium tracking-[2px] uppercase text-blue-pale/90 mb-5">
                  {contentTrip.date} · 6 participantes
                </div>
                <p className="text-[14px] font-light leading-[1.8] text-blue-pale max-w-xl">
                  {contentTrip.heroDesc}
                </p>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-blue-pale mb-2">
                    {contentTrip.pricing.label}
                  </div>
                  <div className="font-display text-[40px] font-light leading-none">
                    {contentTrip.pricing.price}
                    <span className="text-[14px] font-sans font-light text-blue-pale ml-2">
                      {contentTrip.pricing.priceSuffix}
                    </span>
                  </div>
                </div>
                <Link href="/content-trip" className="btn btn-light whitespace-nowrap">
                  Découvrir
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

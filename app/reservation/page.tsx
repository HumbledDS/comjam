import type { Metadata } from "next";
import { Suspense } from "react";
import { packs } from "@/lib/copy";
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
      </section>
    </>
  );
}

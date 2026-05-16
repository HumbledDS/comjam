"use client";

import { Pack } from "@/lib/copy";
import { isPayPalConfigured, paypalLink } from "@/lib/cal";

export function PayPalLink({ pack }: { pack: Pack }) {
  if (!isPayPalConfigured()) {
    return (
      <div className="bg-paper border border-beige-mid p-6">
        <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-2">
          Paiement
        </div>
        <p className="text-[13px] font-light text-text-light leading-[1.7]">
          Le lien PayPal sera transmis avec votre confirmation de réservation. Acompte de 50% à
          la réservation, solde le jour du shooting.
        </p>
      </div>
    );
  }

  const deposit = Math.round(pack.price * 0.5);
  const url = paypalLink(deposit, `Com'Jam — Pack ${pack.name}`);

  return (
    <div className="bg-paper border border-beige-mid p-6">
      <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-3">
        Paiement
      </div>
      <p className="text-[13px] font-light text-text-light leading-[1.7] mb-4">
        Pour confirmer votre créneau, réglez l'acompte de 50% ({deposit}€). Le solde se règle le
        jour du shooting.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary inline-block"
      >
        Régler l'acompte ({deposit}€)
      </a>
    </div>
  );
}

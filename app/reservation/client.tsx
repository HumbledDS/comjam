"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Pack } from "@/lib/copy";
import { PackSelector } from "@/components/booking/PackSelector";

/**
 * Reservation flow:
 *   1. Pick a pack
 *   2. Pick a time slot via the pack's Google Calendar booking link (opens in a new tab)
 *   3. Pay the deposit via the pack's Stripe checkout link (also new tab)
 *
 * No embed — Jamila provided direct external links per pack so the experience is
 * fast and reliable. The page itself drives the choice + shows the summary.
 */
export function ReservationClient({ packs }: { packs: readonly Pack[] }) {
  const params = useSearchParams();
  const initial = useMemo(() => {
    const q = params.get("pack");
    return (packs.find((p) => p.id === q)?.id ?? packs[0].id) as Pack["id"];
  }, [params, packs]);

  const [selected, setSelected] = useState<Pack["id"]>(initial);
  const pack = packs.find((p) => p.id === selected)!;

  return (
    <>
      <div className="mt-14">
        <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-4">
          1. Choisissez votre pack
        </div>
        <PackSelector packs={packs} selected={selected} onSelect={setSelected} />
      </div>

      <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-8 mt-14">
        {/* Detail card */}
        <div className="bg-paper border border-beige-mid p-8 sm:p-10">
          <div className="font-display text-3xl text-blue mb-2">{pack.name}</div>
          <div className="font-display text-[44px] font-light text-blue leading-none mb-6">
            {pack.priceLabel}
            {pack.unit && (
              <span className="text-[15px] font-light text-text-light">
                {" "}{pack.unit}
              </span>
            )}
          </div>
          {pack.description && (
            <p className="text-[14px] font-light text-blue-mid italic mb-6 max-w-md">
              {pack.description}
            </p>
          )}

          <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-3">
            Ce qui est inclus
          </div>
          <ul className="flex flex-col gap-2 mb-6">
            {pack.features.map((f) => (
              <li
                key={f}
                className="text-[13px] font-light text-blue-mid flex gap-3 leading-[1.55]"
              >
                <span className="text-blue-light shrink-0">-</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {pack.options && pack.options.length > 0 && (
            <div className="pt-5 border-t border-beige-mid">
              <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-3">
                Options
              </div>
              <ul className="flex flex-col gap-2">
                {pack.options.map((o) => (
                  <li
                    key={o}
                    className="text-[13px] font-light text-blue-mid flex gap-3 leading-[1.55]"
                  >
                    <span className="text-blue-light shrink-0">+</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Booking + payment column */}
        <div className="flex flex-col gap-4">
          {/* Step 2 — Booking */}
          <div className="bg-blue text-beige p-6">
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-pale mb-3">
              2. Sélectionnez votre créneau
            </div>
            <p className="text-[13px] font-light text-blue-pale leading-[1.65] mb-5">
              Choisissez un créneau qui vous convient dans le calendrier de
              réservation.
            </p>
            {pack.calendarUrl ? (
              <a
                href={pack.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light w-full text-center block"
              >
                Ouvrir le calendrier →
              </a>
            ) : (
              <p className="text-[12px] text-blue-pale italic">
                Calendrier bientôt disponible pour ce pack. Pour réserver,
                contactez-nous à hello@comjam.fr.
              </p>
            )}
          </div>

          {/* Step 3 — Payment */}
          <div className="bg-paper border border-beige-mid p-6">
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-3">
              3. Réglez votre acompte
            </div>
            <p className="text-[13px] font-light text-text-light leading-[1.65] mb-5">
              Confirmez votre réservation en réglant l&apos;acompte via
              paiement sécurisé.
            </p>
            <a
              href={pack.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full text-center block"
            >
              Régler l&apos;acompte →
            </a>
            <p className="text-[11px] font-light text-text-light italic mt-4 leading-[1.6]">
              Paiement sécurisé Stripe. Vous recevez une confirmation par
              email avec toutes les informations pratiques.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

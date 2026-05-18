"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Pack } from "@/lib/copy";
import { PackSelector } from "@/components/booking/PackSelector";

/**
 * Reservation flow (two steps — Calendar bundles the deposit payment):
 *   1. Pick a pack
 *   2. Open the pack's Google Calendar booking link to pick a slot + pay deposit
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

        {/* Booking column — Calendar bundles deposit payment */}
        <div className="flex flex-col gap-4">
          <div className="bg-blue text-beige p-6">
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-pale mb-3">
              2. Sélectionnez votre créneau
            </div>
            <p className="text-[13px] font-light text-blue-pale leading-[1.65] mb-5">
              Réservation et acompte gérés dans le même calendrier. Une fois
              le créneau choisi et l&apos;acompte réglé, vous recevez une
              confirmation par email.
            </p>
            {pack.calendarUrl ? (
              <a
                href={pack.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light w-full text-center block"
              >
                Réserver et régler l&apos;acompte →
              </a>
            ) : (
              <p className="text-[12px] text-blue-pale italic">
                Calendrier bientôt disponible pour ce pack. Pour réserver,
                écrivez-nous à hello@comjam.fr.
              </p>
            )}
            <p className="text-[11px] font-light text-blue-pale italic mt-4 leading-[1.6]">
              Acompte de 50% à la réservation, solde le jour du shooting.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

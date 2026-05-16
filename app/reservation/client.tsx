"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Pack } from "@/lib/copy";
import { PackSelector } from "@/components/booking/PackSelector";
import { CalEmbed } from "@/components/booking/CalEmbed";
import { PayPalLink } from "@/components/booking/PayPalLink";

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

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-14">
        <div>
          <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-4">
            2. Sélectionnez votre créneau
          </div>
          <CalEmbed eventSlug={pack.calEvent} packName={pack.name} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[10px] font-medium tracking-[3px] uppercase text-blue-light mb-0">
            3. Détails &amp; paiement
          </div>
          <div className="bg-paper border border-beige-mid p-6">
            <div className="font-display text-2xl text-blue mb-1">{pack.name}</div>
            <div className="font-display text-[32px] font-light text-blue leading-none mb-4">
              {pack.priceLabel}
              {pack.unit && (
                <span className="text-[13px] font-light text-text-light">
                  {" "}{pack.unit}
                </span>
              )}
            </div>
            <ul className="flex flex-col gap-2">
              {pack.features.map((f) => (
                <li key={f} className="text-[12px] font-light text-blue-mid flex gap-2 leading-[1.5]">
                  <span className="text-blue-light">—</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <PayPalLink pack={pack} />
        </div>
      </div>
    </>
  );
}

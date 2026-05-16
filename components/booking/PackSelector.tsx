"use client";

import { Pack } from "@/lib/copy";

export function PackSelector({
  packs,
  selected,
  onSelect,
}: {
  packs: readonly Pack[];
  selected: Pack["id"];
  onSelect: (id: Pack["id"]) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {packs.map((p) => {
        const active = p.id === selected;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            aria-pressed={active}
            className={`relative text-left p-6 transition-all duration-200 ${
              active
                ? "bg-blue text-beige border-t-[3px] border-blue-light"
                : "bg-paper text-blue border-t-[3px] border-transparent hover:border-beige-mid"
            }`}
          >
            {p.topBadge && (
              <div className="absolute -top-3 left-6 bg-blue-light text-paper text-[9px] font-medium tracking-[2px] uppercase px-3 py-1">
                {p.topBadge}
              </div>
            )}
            <div className={`font-display text-2xl font-normal mb-2 ${active ? "text-beige" : "text-blue"}`}>
              {p.name}
            </div>
            <div className={`font-display text-[36px] font-light leading-none mb-3 ${active ? "text-beige" : "text-blue"}`}>
              {p.priceLabel}
              {p.unit && (
                <span className={`text-[14px] font-light ${active ? "text-blue-pale" : "text-text-light"}`}>
                  {" "}{p.unit}
                </span>
              )}
            </div>
            <ul className="flex flex-col gap-1 mt-3">
              {p.features.slice(0, 3).map((f) => (
                <li
                  key={f}
                  className={`text-[11px] font-light leading-[1.5] flex gap-2 ${active ? "text-blue-pale" : "text-text-light"}`}
                >
                  <span className={active ? "text-blue-pale" : "text-blue-light"}>—</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * Live countdown to the application deadline. Renders nothing until mounted
 * (avoids a server/client hydration mismatch on the remaining time), then
 * ticks every second. Past the deadline it flips to a closing notice.
 */
export function ContentTripCountdown({
  deadline,
  deadlineLabel,
  light = false,
}: {
  deadline: string;
  deadlineLabel: string;
  light?: boolean;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(deadline).getTime();
  const diff = now === null ? null : Math.max(0, target - now);

  const units =
    diff === null
      ? null
      : [
          { label: "jours", value: Math.floor(diff / 86_400_000) },
          { label: "heures", value: Math.floor(diff / 3_600_000) % 24 },
          { label: "min", value: Math.floor(diff / 60_000) % 60 },
          { label: "sec", value: Math.floor(diff / 1000) % 60 },
        ];

  const labelColor = light ? "text-blue-pale" : "text-text-light";
  const valueColor = light ? "text-beige" : "text-blue";
  const boxStyle = light
    ? "bg-[rgba(200,220,234,0.08)] border border-[rgba(200,220,234,0.18)]"
    : "bg-paper border border-beige-mid";

  return (
    <div>
      <div className={`text-[10px] font-medium tracking-[2.5px] uppercase mb-3 ${light ? "text-blue-light" : "text-blue-light"}`}>
        Clôture des candidatures le {deadlineLabel}
      </div>
      {diff === 0 ? (
        <div className={`text-[13px] font-light italic ${labelColor}`}>
          Les candidatures sont closes pour cette édition.
        </div>
      ) : (
        <div className="flex gap-2.5" aria-live="off">
          {(units ?? [
            { label: "jours", value: null },
            { label: "heures", value: null },
            { label: "min", value: null },
            { label: "sec", value: null },
          ]).map((u) => (
            <div
              key={u.label}
              className={`${boxStyle} px-3 py-2.5 min-w-[62px] text-center`}
            >
              <div className={`font-display text-[26px] font-light leading-none ${valueColor}`}>
                {u.value === null ? "–" : String(u.value).padStart(2, "0")}
              </div>
              <div className={`text-[9px] font-medium tracking-[1.5px] uppercase mt-1 ${labelColor}`}>
                {u.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

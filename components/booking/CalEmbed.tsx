"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import Link from "next/link";
import { useEffect } from "react";
import { calLink, isCalConfigured } from "@/lib/cal";

export function CalEmbed({ eventSlug, packName }: { eventSlug: string; packName: string }) {
  useEffect(() => {
    if (!isCalConfigured()) return;
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: "comjam" });
      if (cancelled) return;
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#1B3A5C",
            "cal-text": "#1B3A5C",
            "cal-bg-muted": "#F5EFE4",
          },
          dark: {
            "cal-brand": "#4A7BA7",
          },
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isCalConfigured()) {
    return (
      <div className="bg-beige border border-beige-mid p-10 text-center">
        <div className="font-display text-2xl text-blue mb-3">Calendrier bientôt disponible</div>
        <p className="text-[13px] font-light text-text-light max-w-md mx-auto mb-6">
          Le calendrier de réservation pour le pack <strong className="text-blue">{packName}</strong>
          {" "}sera connecté très bientôt. En attendant, écrivez-nous directement avec vos dates souhaitées —
          nous vous confirmons sous 48h.
        </p>
        <Link href={`/contact?subject=${encodeURIComponent(packName)}`} className="btn btn-primary">
          Demander des dates
        </Link>
      </div>
    );
  }

  const link = calLink(eventSlug);

  return (
    <div className="bg-paper">
      <Cal
        namespace="comjam"
        calLink={link}
        config={{ layout: "month_view" }}
        style={{ width: "100%", height: "650px", overflow: "scroll" }}
      />
    </div>
  );
}

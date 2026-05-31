import type { Metadata } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { cormorant, outfit } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { isLaunched } from "@/lib/launch";
import "./globals.css";

export const metadata: Metadata = {
  title: "Com'Jam · Création de contenu et stratégie digitale",
  description:
    "Agence de communication spécialisée en création de contenu, stratégie digitale et marketing d'influence. Photos, vidéos, accompagnement et formation. Paris.",
  metadataBase: new URL("https://comjam.fr"),
  openGraph: {
    title: "Com'Jam",
    description:
      "Création de contenu, stratégie digitale et marketing d'influence. Une approche humaine, créative et 360°.",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const host = (await headers()).get("host");
  const launched = isLaunched(host);

  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        {launched && <Nav />}
        <PageTransition>
          <main>{children}</main>
          {launched && <Footer />}
        </PageTransition>
        <Analytics />
      </body>
    </html>
  );
}

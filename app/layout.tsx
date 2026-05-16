import type { Metadata } from "next";
import { cormorant, outfit } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Com'Jam Agency — Création de Contenu & Stratégie Digitale",
  description:
    "Agence de communication spécialisée en création de contenu, stratégie digitale et marketing d'influence. Photos, vidéos, accompagnement et formation. Paris.",
  metadataBase: new URL("https://comjam.fr"),
  openGraph: {
    title: "Com'Jam Agency",
    description:
      "Création de contenu, stratégie digitale et marketing d'influence. Une approche humaine, créative et 360°.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <Nav />
        <PageTransition>
          <main>{children}</main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}

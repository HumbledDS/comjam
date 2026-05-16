# comjam

Site web Com'Jam Agency — agence de communication spécialisée en création de contenu, stratégie digitale et marketing d'influence (Paris).

## Stack

- **Next.js 16** (App Router, TypeScript) — site multi-pages prerendéré
- **Tailwind CSS v4** — design tokens héritent des couleurs/typo du mockup
- **Motion (ex-Framer Motion)** — page transitions, scroll reveals, hover lifts
- **Cal.com embed** + **PayPal.me link** — flux de réservation v1, zéro back-end
- **Resend** (optionnel) — envoi du formulaire contact
- Déployé sur **Vercel**

## Routes

| Route | Contenu |
|---|---|
| `/` | Hero, services, bootcamp, témoignages |
| `/a-propos` | Story Jamila, valeurs, mission |
| `/services` | Hub des 4 services |
| `/services/creation-de-contenu` | Photo/vidéo lifestyle + packs |
| `/services/strategie-digitale` | Stratégie + influence |
| `/services/production-de-contenu` | Social media pour entreprises |
| `/services/consulting` | Consulting 1-2-1 |
| `/bootcamp` | Content Shift bootcamp (14–15 juin 2026) |
| `/reservation` | Sélecteur de pack + Cal.com + PayPal |
| `/contact` | Formulaire + canaux IG/TikTok/email |

## Lancer en local

```bash
npm install
cp .env.example .env.local   # remplir les variables si besoin
npm run dev                  # http://localhost:3000
```

## Variables d'env

Voir `.env.example`.

**Pour activer l'envoi du formulaire contact :**
1. Créer un compte gratuit sur [resend.com](https://resend.com)
2. Vérifier le domaine `comjam.fr` (Settings → Domains)
3. Générer une API key
4. Renseigner `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`

Sans `RESEND_API_KEY`, l'API `/api/contact` log la soumission dans la console (mode stub) — pratique en dev.

**Booking & paiement** (optionnels, le site fonctionne sans) :
- `NEXT_PUBLIC_CAL_USERNAME` — sans, le calendrier renvoie un fallback « demander des dates »
- `NEXT_PUBLIC_PAYPAL_HANDLE` — sans, le lien PayPal n'est pas affiché

## Assets de marque

Les logos Com'Jam vivent dans `public/brand/`. Les composants dans `components/brand/` (Logo, Monogram, Ornament, Pattern) les utilisent avec des animations Motion.

Note : ce sont des JPEG avec fond — pour un rendu parfait sur des sections de couleur différente, il faudra passer aux versions transparentes (PNG/SVG) plus tard.

## Déploiement Vercel

Connecter le repo à un projet Vercel et ajouter les env vars dans le dashboard. Chaque push sur `main` déclenche un déploiement.

## Scripts

```bash
npm run dev        # serveur dev
npm run build      # production build
npm run start      # serveur prod local
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Copy & contenu

Tout le texte du site vit dans [`lib/copy.ts`](lib/copy.ts) — un seul fichier à éditer pour ajuster les services, packs, témoignages, etc. Les images Unsplash placeholder dans [`lib/unsplash.ts`](lib/unsplash.ts) seront remplacées par les photos clients Com'Jam.

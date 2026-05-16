/**
 * Single source of truth for all site copy.
 * When you want to swap to a real CMS later (Sanity, Contentful),
 * only this file needs to change — components stay the same.
 */

export const brand = {
  name: "Com'Jam",
  suffix: "Agency",
  tagline:
    "Création de contenu, stratégie réseaux sociaux et formation en ligne. Paris & partout en France.",
  city: "Paris",
  email: "contact@comjam.fr",
  instagram: { handle: "@comjam", url: "https://instagram.com/comjam", followers: "9 700" },
  tiktok: { handle: "@comjam", url: "https://tiktok.com/@comjam", followers: "38 000" },
};

export type NavItem = { label: string; href: string; primary?: boolean };

export const nav: NavItem[] = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Bootcamp", href: "/bootcamp" },
  { label: "Réservation", href: "/reservation" },
  { label: "Contact", href: "/contact", primary: true },
];

/* ============================================================
   HOME
============================================================ */
export const home = {
  eyebrow: "Agence de création de contenu · Paris",
  title: ["Votre contenu,", "votre identité.", "Votre impact."] as const,
  emphasizedLine: 1, // index of line that uses <em>
  desc:
    "Chez Com'Jam, nous intégrons pleinement la création de contenu, l'image de marque, les réseaux sociaux et l'influence au sein d'une stratégie globale. Notre approche repose sur une communication simple, humaine et efficace, privilégiant des contenus naturels mais esthétiques.",
  stats: [
    { value: "4 ans", label: "d'expertise" },
    { value: "48K+", label: "communauté" },
    { value: "Bac+5", label: "Communication" },
  ],
  card: {
    label: "Ce que nous proposons",
    quote: "Tout ce dont vous avez besoin pour performer sur les réseaux.",
    items: [
      { name: "Création de contenu", sub: "Photos & vidéos lifestyle pour réseaux sociaux — dès 95€" },
      { name: "Stratégie digitale", sub: "Communication, storytelling, marketing d'influence" },
      { name: "Production & Consulting", sub: "Contenu social media + accompagnement 1-2-1" },
    ],
  },
  ticker: [
    "Création de contenu",
    "Stratégie digitale",
    "Production",
    "Consulting 1-2-1",
    "Content Shift Bootcamp",
    "Marketing d'influence",
    "Formation en ligne",
    "Instagram · TikTok · LinkedIn",
    "Com'Jam Agency · Paris",
  ],
};

/* ============================================================
   ABOUT
============================================================ */
export const about = {
  eyebrow: "À propos",
  title: ["Une agence née", "de la passion"] as const,
  emphasizedLine: 1,
  paragraphs: [
    "Com'Jam est une agence de communication spécialisée dans la **création de contenu**, la **stratégie digitale** et le **marketing d'influence**. L'agence est née d'une passion pour le digital, l'image, l'audiovisuel et les réseaux sociaux.",
    "En observant les défis rencontrés par de nombreuses entreprises et créateurs de contenu, un constat s'est imposé : le manque d'un **accompagnement réellement personnalisé** et adapté aux enjeux actuels.",
    "Derrière Com'Jam, il y a **Jamila** — fondatrice, photographe, créatrice de contenu et stratège digitale. Titulaire d'un **Bac+5 en Communication et Marketing Digital**, je suis sur le terrain chaque jour et je partage uniquement ce qui fonctionne **vraiment**.",
  ],
  mission:
    "Offrir une expérience personnalisée, en proposant des solutions créatives, accessibles et 360°, capables de valoriser vos projets.",
  values: [
    "Stratégie sur-mesure",
    "Photo & Vidéo pro",
    "Croissance organique",
    "Formation & coaching",
    "Accompagnement humain",
    "Créativité & authenticité",
  ],
  quote:
    "Je veux que chaque client reparte avec du contenu dont il est fier — et une stratégie qu'il comprend et qu'il peut tenir dans le temps.",
  author: { name: "Jamila", role: "Fondatrice · Com'Jam Agency · Paris" },
  numbers: [
    { value: "4 ans", label: "expertise" },
    { value: "48K+", label: "communauté" },
    { value: "Bac+5", label: "formation" },
    { value: "100%", label: "terrain" },
  ],
};

/* ============================================================
   SERVICES (4 services + bootcamp surfaced separately)
============================================================ */
export type Service = {
  slug: string;
  num: string;
  name: string;
  short: string;
  desc: string;
  bullets: string[];
  for?: string[];
  pricing?: string;
  ctaHref: string;
  ctaLabel: string;
};

export const services: Service[] = [
  {
    slug: "creation-de-contenu",
    num: "01",
    name: "Création de contenu",
    short: "Photos & vidéos lifestyle, trendy et spontanées.",
    desc:
      "Pensées pour les réseaux sociaux et les usages actuels du digital ou du quotidien. Accompagnement, direction artistique, poses, rendu esthétique.",
    bullets: [
      "Direction artistique sur-mesure",
      "Shooting photo & vidéo combinés possibles",
      "Retouche et montage inclus",
      "Disponible à l'heure ou en pack",
    ],
    for: ["Grand public", "Créateurs de contenu", "Entrepreneurs", "Indépendants", "Marques"],
    pricing: "À partir de 95€",
    ctaHref: "/reservation",
    ctaLabel: "Réserver une séance",
  },
  {
    slug: "strategie-digitale",
    num: "02",
    name: "Stratégie digitale",
    short: "Construire une image forte, claire et cohérente.",
    desc:
      "Stratégie de communication complète : audit, positionnement, storytelling, ligne éditoriale et plan d'action sur mesure. Marketing d'influence : mise en relation entre marques et créateurs, gestion et accompagnement de campagnes.",
    bullets: [
      "Audit complet de compte + recommandations",
      "Stratégie éditoriale sur-mesure",
      "Sélection des profils & suivi des collaborations",
      "Analyse des performances",
    ],
    pricing: "Sur devis",
    ctaHref: "/contact",
    ctaLabel: "Demander un devis",
  },
  {
    slug: "production-de-contenu",
    num: "03",
    name: "Production de contenu",
    short: "Contenu social media pour entreprises.",
    desc:
      "Du contenu photo et vidéo pensé pour alimenter vos réseaux sociaux et site internet. L'objectif : alimenter vos réseaux régulièrement, renforcer votre image de marque, créer une cohérence visuelle, capter l'attention de votre audience.",
    bullets: [
      "Production récurrente photo & vidéo",
      "Cohérence visuelle sur tous canaux",
      "Contenu prêt à publier",
      "Adapté à votre ligne éditoriale",
    ],
    pricing: "Sur devis",
    ctaHref: "/contact",
    ctaLabel: "Discuter du projet",
  },
  {
    slug: "consulting",
    num: "04",
    name: "Consulting 1-2-1",
    short: "Accompagnement individuel pour structurer votre contenu et votre stratégie.",
    desc:
      "Positionnement, image, organisation, création de contenu et conseils adaptés à vos objectifs. Une session individuelle pour passer un cap et clarifier votre stratégie.",
    bullets: [
      "Positionnement & image",
      "Organisation & workflow",
      "Création de contenu",
      "Conseils sur-mesure selon vos objectifs",
    ],
    pricing: "Sur devis",
    ctaHref: "/contact",
    ctaLabel: "Prendre un rendez-vous",
  },
];

/* ============================================================
   SHOOTING PACKS — drive PackSelector on /reservation
============================================================ */
export type Pack = {
  id: "flash" | "signature" | "duo" | "reel-video";
  name: string;
  price: number;
  priceLabel: string;
  unit?: string;
  featured?: boolean;
  topBadge?: string;
  features: string[];
  calEvent: string; // Cal.com event slug — must exist in your Cal account
};

export const packs: Pack[] = [
  {
    id: "flash",
    name: "Flash",
    price: 95,
    priceLabel: "95€",
    unit: "/heure",
    features: [
      "20 photos retouchées par heure",
      "Livraison sous 5 jours ouvrés",
      "Vous choisissez le lieu",
      "Matériel professionnel inclus",
    ],
    calEvent: "flash-1h",
  },
  {
    id: "signature",
    name: "Signature",
    price: 320,
    priceLabel: "320€",
    featured: true,
    topBadge: "Le plus complet",
    features: [
      "Recherche visuelle & mood board",
      "Proposition de tenues (3 looks)",
      "Sélection des lieux (3 endroits)",
      "60 photos retouchées livrées",
      "Livraison sous 7 jours ouvrés",
    ],
    calEvent: "signature",
  },
  {
    id: "duo",
    name: "Duo",
    price: 280,
    priceLabel: "280€",
    features: [
      "Shooting à deux personnes",
      "Mood board & sélection de lieux",
      "60 photos retouchées livrées",
      "Livraison sous 7 jours ouvrés",
    ],
    calEvent: "duo",
  },
  {
    id: "reel-video",
    name: "Réel+ Vidéo",
    price: 450,
    priceLabel: "450€",
    features: [
      "Tournage professionnel 3h",
      "Reels & TikTok optimisés",
      "Montage + post-production inclus",
      "Sous-titres, effets, musiques tendances",
    ],
    calEvent: "reel-video",
  },
];

/* ============================================================
   BOOTCAMP — Content Shift
============================================================ */
export const bootcamp = {
  name: "Content Shift",
  date: "14 & 15 Juin 2026",
  schedule: "En ligne · 10h–18h",
  eyebrow: "Formation en ligne",
  desc:
    "Le bootcamp qui transforme votre façon de créer. En 2 jours de formation live, vous passez de créateur invisible à créateur qui attire, engage et convertit — avec votre téléphone, votre personnalité, et une stratégie qui vous ressemble.",
  days: [
    {
      num: "01",
      label: "Jour 1 — 10h à 18h",
      title: "Poser les bases & maîtriser la photo",
      modules: [
        { time: "10h – 11h30", name: "Identité de créateur — niche, univers visuel, positionnement" },
        { time: "11h30 – 13h", name: "Stratégie éditoriale — piliers, calendrier, formats par plateforme" },
        { time: "14h – 16h30", name: "Photo qui performe — lumière, cadrage, démonstration live, retouche" },
        { time: "16h30 – 18h", name: "Cohérence visuelle — Canva avancé, Q&R live, défi overnight" },
      ],
    },
    {
      num: "02",
      label: "Jour 2 — 10h à 18h",
      title: "Vidéo, montage & monétisation",
      modules: [
        { time: "10h – 12h30", name: "Vidéo dynamique — tournage, son, stabilisation, hooks, démonstration live" },
        { time: "13h30 – 15h", name: "Montage accessible — CapCut complet, sous-titres, workflow rapide" },
        { time: "15h – 16h15", name: "Algorithmes — signaux clés, analytics, erreurs à éviter" },
        { time: "16h15 – 18h", name: "Monétisation, tirage au sort Osmo Pocket 4, Q&R final" },
      ],
    },
  ],
  includes: [
    { name: "Guide pratique PDF", sub: "Les 10 étapes clés pour performer en 2026" },
    { name: "1 mois de suivi inclus", sub: "Groupe privé + Q&R hebdomadaire" },
    { name: "1h de shooting offerte", sub: "Valable 1 an, offrable" },
    { name: "Tirage au sort", sub: "Osmo Pocket 4 à gagner (~450€)" },
    { name: "Accès aux replays", sub: "Visionnez les modules à votre rythme" },
    { name: "Toutes plateformes 2026", sub: "Instagram, TikTok, YouTube, LinkedIn, Snap" },
  ],
  price: { current: 197, original: 247, label: "Early Bird — 20 places" },
  reassurance: [
    "Paiement sécurisé",
    "Formation 100% en ligne",
    "Replays inclus",
    "Ouvert à tous niveaux",
  ],
};

/* ============================================================
   TESTIMONIALS
============================================================ */
export const testimonials = [
  {
    quote:
      "Jamila a complètement transformé ma façon de communiquer sur les réseaux. En 3 semaines, mon engagement a doublé.",
    name: "Sarah M.",
    role: "Créatrice de contenu lifestyle · Paris",
    initial: "S",
  },
  {
    quote:
      "Le shooting Signature, c'est un investissement que je regrette de ne pas avoir fait plus tôt. Les photos sont magnifiques.",
    name: "Thomas R.",
    role: "Entrepreneur · Coach bien-être",
    initial: "T",
  },
  {
    quote:
      "Un accompagnement vraiment humain et bienveillant. Jamila prend le temps de comprendre votre univers avant de proposer quoi que ce soit.",
    name: "Amina K.",
    role: "Cheffe d'entreprise · Mode & Accessoires",
    initial: "A",
  },
];

/* ============================================================
   CONTACT
============================================================ */
export const contact = {
  eyebrow: "Contact",
  title: ["Parlons de", "votre projet"] as const,
  emphasizedLine: 1,
  desc:
    "Vous avez un projet, une question, vous souhaitez réserver une séance ou une place au bootcamp ? Envoyez-nous un message — nous répondons sous 48h.",
  channels: [
    { kind: "ig" as const, name: "Instagram", handle: "@comjam · 9 700 abonnés", url: "https://instagram.com/comjam", icon: "IG" },
    { kind: "tt" as const, name: "TikTok", handle: "@comjam · 38 000 abonnés", url: "https://tiktok.com/@comjam", icon: "TK" },
    { kind: "em" as const, name: "Email", handle: "contact@comjam.fr", url: "mailto:contact@comjam.fr", icon: "@" },
  ],
  formSubjects: [
    "Content Shift — Bootcamp (14–15 Juin 2026)",
    "Shooting photo — Pack Flash",
    "Shooting photo — Pack Signature",
    "Shooting photo — Pack Duo",
    "Pack Réel+ Vidéo",
    "Accompagnement stratégie réseaux",
    "Consulting 1-2-1",
    "Autre demande",
  ],
};

/* ============================================================
   FOOTER
============================================================ */
export const footer = {
  cols: [
    {
      title: "Services",
      links: [
        { label: "Création de contenu", href: "/services/creation-de-contenu" },
        { label: "Stratégie digitale", href: "/services/strategie-digitale" },
        { label: "Production de contenu", href: "/services/production-de-contenu" },
        { label: "Consulting 1-2-1", href: "/services/consulting" },
      ],
    },
    {
      title: "Formation",
      links: [
        { label: "Content Shift Bootcamp", href: "/bootcamp" },
        { label: "Réserver une séance", href: "/reservation" },
      ],
    },
    {
      title: "Com'Jam",
      links: [
        { label: "À propos", href: "/a-propos" },
        { label: "Contact", href: "/contact" },
        { label: "Mentions légales", href: "/mentions-legales" },
      ],
    },
  ],
  socials: [
    { label: "Instagram", url: "https://instagram.com/comjam" },
    { label: "TikTok", url: "https://tiktok.com/@comjam" },
    { label: "LinkedIn", url: "#" },
  ],
};

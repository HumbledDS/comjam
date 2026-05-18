/**
 * Single source of truth for all site copy.
 * When you want to swap to a real CMS later (Sanity, Contentful),
 * only this file needs to change — components stay the same.
 */

export const brand = {
  name: "Com'Jam",
  suffix: "", // dropped "Agency" per Jamila's feedback
  tagline:
    "Agence de communication spécialisée dans la création de contenu, basée à Paris et opérant à l'international.",
  city: "Paris",
  email: "hello@comjam.fr",
  instagram: { handle: "@comjamagency", url: "https://www.instagram.com/comjamagency", followers: "9 700" },
  tiktok: { handle: "@comjamagency", url: "https://www.tiktok.com/@comjamagency", followers: "38 000" },
};

export type NavItem = { label: string; href: string; primary?: boolean };

export const nav: NavItem[] = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Évènements", href: "/bootcamp" },
  { label: "Réservation", href: "/reservation" },
  { label: "Contact", href: "/contact", primary: true },
];

/* ============================================================
   HOME
============================================================ */
export const home = {
  eyebrow: "Agence de communication",
  title: ["Une agence qui transforme", "l'invisibilité en identité,", "et l'identité en impact."] as const,
  emphasizedLine: 1,
  desc:
    "Contenu visuel pour créateurs, marques et entrepreneurs. Paris et l'international. Simple, humaine, efficace.",
  stats: [
    { value: "7", label: "années d'expertise" },
    { value: "50K+", label: "communauté" },
    { value: "30+", label: "projets" },
  ],
  card: {
    label: "Ce que nous proposons",
    quote: "Simple, humaine, efficace.",
    items: [
      { name: "Création de contenu", sub: "Photo et vidéo, pensées pour vos réseaux." },
      { name: "Stratégie digitale", sub: "Audit, positionnement, ligne éditoriale." },
      { name: "Production de contenu", sub: "Du contenu prêt à être publié." },
    ],
  },
  ticker: [
    "Création de contenu",
    "Communication",
    "Marketing",
    "Stratégie digitale",
    "Production",
    "Consulting 1-to-1",
    "Content Trip",
    "Bootcamp by Com'Jam",
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
    "Derrière Com'Jam, il y a **Jamila** : fondatrice, photographe, créatrice de contenu et stratège digitale. Titulaire d'un **Bac+5 en Communication et Marketing Digital**, je suis sur le terrain chaque jour et je partage uniquement ce qui fonctionne **vraiment**.",
  ],
  mission:
    "Offrir une expérience personnalisée, en proposant des solutions créatives, accessibles et 360°, capables de valoriser vos projets.",
  values: [
    "Stratégie sur-mesure",
    "Photo et vidéo professionnelle",
    "Croissance organique",
    "Formation et coaching",
    "Accompagnement humain",
    "Créativité et authenticité",
  ],
  quote:
    "Je veux que chaque client reparte avec du contenu dont il est fier et une stratégie qu'il comprend et qu'il peut tenir dans le temps.",
  author: { name: "Jamila", role: "Fondatrice · Com'Jam · Paris" },
  numbers: [
    { value: "7", label: "années" },
    { value: "50K+", label: "communauté" },
    { value: "30+", label: "projets" },
    { value: "100%", label: "terrain" },
  ],
};

/* ============================================================
   SERVICES (4 services)
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
    short: "Photo et vidéo, pensées pour vos réseaux.",
    desc:
      "Direction artistique, poses, rendu esthétique. Pour créateurs, marques et entrepreneurs.",
    bullets: [
      "Direction artistique sur-mesure",
      "Photo et vidéo combinées possibles",
      "Retouche et montage inclus",
    ],
    for: ["Particuliers", "Créateurs", "Entrepreneurs", "Marques", "Indépendants"],
    pricing: "Dès 95€",
    ctaHref: "/reservation",
    ctaLabel: "Réserver une séance",
  },
  {
    slug: "strategie-digitale",
    num: "02",
    name: "Stratégie digitale",
    short: "Une image forte, claire et cohérente.",
    desc:
      "Audit, positionnement et ligne éditoriale. Un plan d'action sur mesure pour faire émerger votre marque.",
    bullets: [
      "Audit",
      "Positionnement",
      "Ligne éditoriale",
    ],
    pricing: "Sur devis",
    ctaHref: "/contact",
    ctaLabel: "Demander un devis",
  },
  {
    slug: "production-de-contenu",
    num: "03",
    name: "Production de contenu",
    short: "Du contenu prêt à être publié.",
    desc:
      "Photo et vidéo pour vos plateformes digitales. Cohérence visuelle, rythme régulier, identité de marque alignée.",
    bullets: [
      "Direction créative",
      "Cohérence visuelle",
      "Identité de marque",
    ],
    pricing: "Sur devis",
    ctaHref: "/contact",
    ctaLabel: "Discuter du projet",
  },
  {
    slug: "consulting",
    num: "04",
    name: "Consulting 1-to-1",
    short: "Des sessions pour structurer votre stratégie.",
    desc:
      "Un positionnement, une image et une organisation alignés à vos objectifs.",
    bullets: [
      "Clarification de l'offre",
      "Organisation des idées",
      "Stratégie et plan de contenu",
    ],
    pricing: "Sur devis",
    ctaHref: "/contact",
    ctaLabel: "Prendre rendez-vous",
  },
];

/* ============================================================
   SHOOTING PACKS — drive PackSelector on /reservation
   Google Calendar slot picker bundles the deposit payment, so
   no separate Stripe step.
============================================================ */
export type Pack = {
  id: "flash" | "signature" | "duo" | "reel-video";
  name: string;
  price: number;
  priceLabel: string;
  unit?: string;
  featured?: boolean;
  topBadge?: string;
  description?: string;
  features: string[];
  options?: string[];
  calEvent: string;
  /** Google Calendar appointment slot picker (handles payment too). */
  calendarUrl: string;
};

export const packs: Pack[] = [
  {
    id: "flash",
    name: "Flash",
    price: 95,
    priceLabel: "95€",
    unit: "/heure",
    description: "Pour un shooting rapide et efficace.",
    features: [
      "20 photos retouchées par heure",
      "Livraison sous 5 jours ouvrés",
      "Vous choisissez le lieu",
      "Matériel professionnel inclus",
    ],
    calEvent: "flash-1h",
    calendarUrl: "https://calendar.app.google/mvVdfZLZNzkYFiA46",
  },
  {
    id: "signature",
    name: "Signature",
    price: 320,
    priceLabel: "320€",
    featured: true,
    topBadge: "Le plus complet",
    description: "Le pack signature pour un shooting éditorial complet.",
    features: [
      "3h de shooting photo",
      "Jusqu'à 3 tenues",
      "Recherche de lieux",
      "Moodboard personnalisé",
      "Accompagnement poses et direction artistique",
      "60 photos retouchées livrées",
      "Livraison sous 48/72 heures ouvrés",
    ],
    options: [
      "Tenue supplémentaire : 50€",
      "1 vidéo format reel par tenue : +50€ / tenue",
    ],
    calEvent: "signature",
    calendarUrl:
      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ02dbatRQkr59ysvmzjsS-V9n60_Lbue5C8FQUlJCImWjj67uW9WuuTuqgoiSMgZoSK3DGo_vH8",
  },
  {
    id: "duo",
    name: "Duo",
    price: 290,
    priceLabel: "290€",
    description: "Pour deux personnes, même énergie, même résultat éditorial.",
    features: [
      "3h de shooting à deux personnes",
      "Jusqu'à 3 tenues",
      "Recherche de lieux",
      "Moodboard personnalisé",
      "Accompagnement poses et direction artistique",
      "60 photos retouchées livrées",
      "Livraison sous 48/72 heures ouvrés",
    ],
    options: [
      "Tenue supplémentaire : 50€",
      "1 vidéo format reel par tenue : +50€ / tenue",
    ],
    calEvent: "duo",
    calendarUrl: "", // not provided yet
  },
  {
    id: "reel-video",
    name: "Réel+ Vidéo",
    price: 555,
    priceLabel: "555€",
    description: "Tournage vidéo professionnel pour vos réseaux.",
    features: [
      "4h de shooting vidéo",
      "Jusqu'à 3 tenues",
      "Recherche de lieux",
      "Moodboard personnalisé",
      "Accompagnement créatif",
      "3 reels mode/design/lifestyle",
      "3 reels trends / transitions",
    ],
    calEvent: "reel-video",
    calendarUrl:
      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3FP33OMVDYNWYTy4GzH-OvF_QqvL13lV927HONAgYgrfbp9kDfmDO6R0gPHoWI8AhPFGYCIYaF",
  },
];

/* ============================================================
   BOOTCAMP — Content Shift / Bootcamp by Com'Jam
============================================================ */
export const bootcamp = {
  name: "Bootcamp by Com'Jam",
  date: "4 et 5 Juillet 2026",
  schedule: "En présentiel · 9h–17h",
  eyebrow: "Évènement",
  desc:
    "Deux jours pour apprendre les bonnes pratiques, les mettre en application et prendre du plaisir à créer. Un bootcamp complet sur la création de contenu, les réseaux sociaux, la photo et la vidéo.",
  /** Google Calendar slot for bootcamp registration — bundles deposit payment. */
  calendarUrl: "https://calendar.app.google/mvVdfZLZNzkYFiA46",
  days: [
    {
      num: "01",
      label: "Jour 1 · 9h à 17h",
      title: "Création de contenu et personal branding",
      modules: [
        { time: "9h00", name: "Accueil, tour de table et objectifs" },
        { time: "9h20", name: "Création de contenu et réseaux sociaux : comprendre Instagram et TikTok en profondeur, décrypter les algorithmes, identifier ce qui performe vraiment en 2026" },
        { time: "11h45", name: "Personal branding et marketing : construire une identité forte, définir son positionnement, élaborer sa stratégie éditoriale" },
        { time: "12h45", name: "Pause déjeuner" },
        { time: "13h45", name: "Intervenante invitée : créatrice de contenu, trouver sa niche et construire l'image que l'on reflète" },
        { time: "14h30", name: "Photo et identité visuelle : maîtriser la lumière, le cadrage, la retouche, démonstration live" },
        { time: "16h15", name: "Les outils indispensables : matériel, applications, setup selon votre budget" },
        { time: "17h00", name: "Récap, défi overnight et groupe privé" },
      ],
    },
    {
      num: "02",
      label: "Jour 2 · 9h à 17h",
      title: "Vidéo, montage et stratégie",
      modules: [
        { time: "9h00", name: "Accueil et debrief du défi overnight" },
        { time: "9h20", name: "Vidéo dynamique : tournage, son, stabilisation, hooks, démonstration live" },
        { time: "11h45", name: "Montage accessible : CapCut complet, sous-titres, workflow rapide" },
        { time: "12h45", name: "Pause déjeuner" },
        { time: "13h45", name: "Stratégie et plan de contenu : transformer la créativité en système" },
        { time: "14h30", name: "Algorithmes et analytics : signaux clés, erreurs à éviter" },
        { time: "16h15", name: "Monétisation et opportunités : où trouver les premières collaborations" },
        { time: "17h00", name: "Récap final, tirage au sort et clôture" },
      ],
    },
  ],
  includes: [
    { name: "Guide pratique PDF", sub: "Les 10 étapes clés pour performer en 2026" },
    { name: "1 mois de suivi inclus", sub: "Groupe privé et Q&R hebdomadaire" },
    { name: "1h de shooting offerte", sub: "Valable 1 an, offrable" },
    { name: "Tirage au sort", sub: "Osmo Pocket 4 à gagner (~450€)" },
    { name: "Accès aux replays", sub: "Visionnez les modules à votre rythme" },
    { name: "Toutes plateformes 2026", sub: "Instagram, TikTok, YouTube, LinkedIn, Snap" },
  ],
  price: { current: 197, original: 247, label: "Early Bird · 20 places" },
  reassurance: [
    "Paiement sécurisé",
    "Formation en présentiel",
    "Replays inclus",
    "Ouvert à tous niveaux",
  ],
};

/* ============================================================
   TESTIMONIALS — updated per PDF
============================================================ */
export const testimonials = [
  {
    quote:
      "En 4 mois d'accompagnement avec Com'Jam, j'ai gagné plus de 10 000 abonnés sur Instagram. Ce qui m'a le plus marqué c'est leur capacité à analyser exactement ce qui ne fonctionnait pas et à proposer des solutions concrètes, immédiatement applicables.",
    name: "KF",
    role: "Créateur de contenu",
    initial: "K",
  },
  {
    quote:
      "Ce qui me frappe chez Com'Jam c'est la pertinence de leurs conseils. Jamais quelque chose de générique, ils prennent le temps de comprendre votre situation, votre univers, et ce qu'ils vous disent après est toujours juste et actionnable.",
    name: "YS",
    role: "Entreprise",
    initial: "Y",
  },
  {
    quote:
      "Com'Jam est une agence vraiment à l'écoute. On sent qu'ils s'investissent autant que vous dans votre projet. C'est rare de trouver une agence qui traite votre image comme si c'était la leur.",
    name: "OM",
    role: "Créatrice de contenu",
    initial: "O",
  },
  {
    quote:
      "Com'Jam a un regard que peu d'agences ont. Ils voient le beau là où on ne le voit pas encore. Mes photos n'ont plus rien à voir avec ce que je faisais avant de les rencontrer.",
    name: "GM",
    role: "Particulier",
    initial: "G",
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
    "Vous avez un projet, une question, vous souhaitez réserver une séance ou une place au Bootcamp by Com'Jam ? Envoyez-nous un message, nous répondons sous 48h.",
  channels: [
    { kind: "ig" as const, name: "Instagram", handle: "@comjamagency", url: "https://www.instagram.com/comjamagency", icon: "IG" },
    { kind: "tt" as const, name: "TikTok", handle: "@comjamagency", url: "https://www.tiktok.com/@comjamagency", icon: "TK" },
    { kind: "em" as const, name: "Email", handle: "hello@comjam.fr", url: "mailto:hello@comjam.fr", icon: "@" },
  ],
  formSubjects: [
    "Bootcamp by Com'Jam (4 et 5 Juillet 2026)",
    "Content Trip by Com'Jam",
    "Shooting Photo · Pack Flash",
    "Shooting Photo · Pack Signature",
    "Shooting Photo · Pack Duo",
    "Tournage Vidéo · Reel+",
    "Stratégie digitale",
    "Production de contenu",
    "Consulting 1-to-1",
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
        { label: "Consulting 1-to-1", href: "/services/consulting" },
      ],
    },
    {
      title: "Évènements",
      links: [
        { label: "Bootcamp by Com'Jam", href: "/bootcamp" },
        { label: "Content Trip by Com'Jam", href: "/contact" },
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
    { label: "Instagram", url: "https://www.instagram.com/comjamagency" },
    { label: "TikTok", url: "https://www.tiktok.com/@comjamagency" },
  ],
};

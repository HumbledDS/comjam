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
    { value: "7", label: "années d'expérience" },
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
      "Direction artistique, poses, rendu esthétique.",
    bullets: [
      "Direction artistique sur-mesure",
      "Photo et vidéo combinées possibles",
      "Retouche et montage inclus",
    ],
    for: ["Particuliers", "Créateurs", "Entrepreneurs", "Marques"],
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
      "Un plan d'action sur mesure pour faire émerger votre marque.",
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
      "Photo et vidéo pour vos plateformes digitales.",
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
    calendarUrl: "https://calendar.app.google/cBUiK5SLo8NsVMGh9",
  },
  {
    id: "reel-video",
    name: "Réel+",
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
  date: "26 et 27 Septembre 2026",
  schedule: "En ligne · 9h–18h",
  eyebrow: "Évènement",
  desc:
    "Deux jours pour apprendre les bonnes pratiques, les mettre en application et prendre du plaisir à créer. Un bootcamp complet sur la création de contenu, les réseaux sociaux, la photo et la vidéo.",
  /** Google Calendar slot for bootcamp registration — bundles deposit payment. */
  calendarUrl: "https://calendar.app.google/hX5ERL7CvzveDcRw6",
  days: [
    {
      num: "01",
      label: "Jour 1 · 9h à 18h",
      title: "Comprendre, créer, photographier",
      modules: [
        { time: "9h00 – 9h20", name: "Accueil, objectifs du bootcamp" },
        { time: "9h20 – 10h30", name: "Bloc 1 : Qu'est-ce que la création de contenu vraiment ?" },
        { time: "10h30 – 12h00", name: "Bloc 2 : Comprendre Instagram et TikTok en profondeur" },
        { time: "12h00 – 13h00", name: "Bloc 3 : Personal branding et marketing" },
        { time: "13h00 – 14h00", name: "Pause déjeuner" },
        { time: "14h00 – 14h45", name: "Intervenante invitée, Créatrice de contenu : « Trouver sa niche et construire l'image que l'on reflète »" },
        { time: "14h45 – 16h30", name: "Bloc 4 : La photo qui performe" },
        { time: "16h30 – 17h30", name: "Bloc 5 : Les outils indispensables du créateur" },
        { time: "17h30 – 18h00", name: "Récap Jour 1 + intégration au groupe privé" },
      ],
    },
    {
      num: "02",
      label: "Jour 2 · 9h à 18h",
      title: "Monter, performer, monétiser",
      modules: [
        { time: "9h00 – 9h30", name: "Récap Jour 1" },
        { time: "9h30 – 10h15", name: "Intervenant invité, Boîte de production : « Les coulisses du contenu professionnel »" },
        { time: "10h15 – 12h00", name: "Bloc 6 : La vidéo de A à Z" },
        { time: "12h00 – 13h00", name: "Pause déjeuner" },
        { time: "13h00 – 13h45", name: "Intervenante invitée, Créatrice de contenu : « Performer et grandir sur les réseaux »" },
        { time: "13h45 – 15h30", name: "Bloc 7 : Montage vidéo avec CapCut, démonstration complète" },
        { time: "15h30 – 16h15", name: "Bloc 8 : Ads et publicité en 2026" },
        { time: "16h15 – 17h00", name: "Bloc 9 : Monétisation et créateurs × marques" },
        { time: "17h00 – 17h45", name: "Bloc 10 : E-réputation et gestion de crise en ligne" },
        { time: "17h45 – 18h00", name: "Grand final : Tirage au sort Osmo Pocket 4 et clôture" },
      ],
    },
  ],
  includes: [
    { name: "Guide pratique PDF", sub: "Les 10 étapes clés pour performer en 2026" },
    { name: "Intégration dans un groupe privé", sub: "« Le Club by Com'Jam »" },
    { name: "Tirage au sort", sub: "Osmo Pocket 4 à gagner" },
  ],
  price: { current: 200, original: 250, label: "Early Bird · 20 places" },
  reassurance: [
    "Paiement sécurisé",
    "Formation en ligne",
    "Ouvert à tous niveaux",
  ],
};

/* ============================================================
   CONTENT TRIP — Édition 02 · Lanzarote
============================================================ */
export const contentTrip = {
  name: "Com'Jam Content Trip",
  edition: "Édition 02 · Lanzarote",
  date: "Du 7 au 11 octobre 2026",
  eyebrow: "Com'Jam Content Trip",
  /** Candidature Google Form. */
  formUrl: "https://forms.gle/Q2uGpQfRzihw9Gwh8",
  /** Clôture des candidatures (fin de journée, heure de Paris). */
  applicationDeadline: "2026-08-12T23:59:59+02:00",
  applicationDeadlineLabel: "12 août 2026",
  ctaLabel: "Je candidate",
  heroTitle:
    "Apprenez à créer du contenu, développez votre confiance et vivez une expérience unique avec d'autres créatrices.",
  heroDesc:
    "Pendant 5 jours, rejoignez un groupe de 6 participantes dans une villa à Lanzarote pour apprendre à créer du contenu, développer votre identité de marque et repartir avec des centaines de contenus photo et vidéo.",
  concept: {
    title: "Plus qu'un voyage, une expérience.",
    paragraphs: [
      "Le Com'Jam Content Trip est une expérience immersive pensée pour les créatrices de contenu, les entrepreneures et toutes celles qui souhaitent développer leur image sur les réseaux sociaux.",
      "Pendant cinq jours, vous apprendrez à créer du contenu de manière plus professionnelle, à raconter votre histoire, à gagner en confiance devant la caméra et à construire une présence en ligne qui vous ressemble.",
    ],
    highlight:
      "L'objectif n'est pas seulement de repartir avec de belles photos. L'objectif est de repartir avec des compétences, une vision claire et une confiance en vous.",
  },
  forYou: {
    title: "Cette expérience est faite pour vous si :",
    items: [
      "Vous aimez créer du contenu.",
      "Vous manquez parfois d'inspiration.",
      "Vous souhaitez gagner en confiance devant la caméra.",
      "Vous voulez apprendre à créer du contenu de meilleure qualité.",
      "Vous souhaitez développer votre image de marque et investir en vous.",
      "Vous rêvez de vivre une expérience humaine et sortir de votre zone de confort.",
    ],
  },
  learn: {
    title: "Pendant le séjour, vous serez accompagnée sur :",
    items: [
      "Création de contenu photo et vidéo",
      "Réels Instagram et TikTok",
      "Storytelling",
      "Personal branding",
      "Direction artistique",
      "Formation montage vidéo et retouche photo",
      "Développement de votre image sur les réseaux sociaux",
      "Comprendre et analyser les algorithmes",
      "Conseils personnalisés selon votre profil",
    ],
  },
  program: {
    title: "Surprise, on ne peut pas tout vous dévoiler maintenant !",
    desc: "Inscrivez-vous et vous verrez tout cela en temps voulu.",
  },
  includes: [
    "Vol aller-retour au départ de Paris*",
    "4 nuits dans une villa privatisée",
    "Les déplacements sur place",
    "Toutes les sessions photo et vidéo",
    "Les formations et ateliers",
    "Un accompagnement personnalisé",
    "Des ressources exclusives",
  ],
  includesNote:
    "*Le vol est inclus au départ de Paris. Un départ d'une autre ville peut être étudié selon les disponibilités et un éventuel ajustement tarifaire.",
  team: [
    {
      name: "Jamila",
      role: "Fondatrice de Com'Jam",
      desc: "Créatrice de contenu et formatrice, elle vous accompagnera tout au long du séjour afin de vous aider à développer votre image, gagner en confiance et améliorer vos contenus.",
      photo: "/media/content-trip/jamila.jpg",
    },
    {
      name: "Djeneba",
      role: "Créatrice de contenu",
      desc: "Elle partagera son expérience, ses conseils et accompagnera les participantes lors des sessions de création.",
      photo: "/media/content-trip/djeneba.jpg",
    },
    {
      name: "Sia",
      role: "Créatrice de contenu",
      desc: "Elle partagera son quotidien de créatrice, son approche authentique des réseaux sociaux et accompagnera les participantes dans la création de contenus.",
      photo: "/media/content-trip/sia.jpg",
    },
  ],
  pricing: {
    label: "Tarif de l'expérience",
    price: "1 850 €",
    priceSuffix: "TTC",
    desc: "Le tarif comprend l'ensemble de l'expérience décrite ci-dessus.",
    paymentTitle: "Paiement possible :",
    paymentOptions: [
      "Paiement intégral en une fois.",
      "Ou : 850€ d'acompte, puis le solde en une ou deux échéances.",
    ],
  },
  spots: {
    title: "Seulement 6 participantes",
    paragraphs: [
      "Afin de garantir un accompagnement personnalisé, cette édition est volontairement limitée à six participantes.",
      "Chaque candidature est étudiée afin de constituer un groupe bienveillant et motivé.",
    ],
  },
  faq: [
    {
      q: "Puis-je venir si je débute ?",
      a: "Oui. Cette expérience est ouverte à tous les niveaux.",
    },
    {
      q: "Dois-je avoir beaucoup d'abonnés ?",
      a: "Non. La motivation est bien plus importante que le nombre d'abonnés.",
    },
    {
      q: "Puis-je payer en plusieurs fois ?",
      a: "Oui. Un acompte de 850 € est demandé pour confirmer votre place, puis le solde peut être réglé en une ou deux échéances.",
    },
  ],
  finalCta: {
    title: "Prête à vivre l'expérience Com'Jam ?",
    desc: "Si vous souhaitez vivre cette aventure, développer votre créativité et repartir avec des souvenirs, des compétences et des contenus uniques, nous serons ravies de découvrir votre candidature.",
  },
  gallery: {
    title: "Retour sur l'Édition 01 · Amsterdam",
    desc: "L'ambiance réelle de la première édition : sessions photo, ateliers et moments partagés.",
    photos: Array.from({ length: 8 }, (_, i) => ({
      src: `/media/content-trip/amsterdam-${i + 1}.jpg`,
      thumb: `/media/content-trip/amsterdam-${i + 1}-thumb.jpg`,
    })),
    videos: [
      "/media/content-trip/amsterdam-video-1.mp4",
      "/media/content-trip/amsterdam-video-2.mp4",
    ],
  },
  villaImage: "/media/content-trip/villa.jpg",
};

/* ============================================================
   TESTIMONIALS — updated per PDF
============================================================ */
export const testimonials = [
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
    "Bootcamp by Com'Jam (26 et 27 Septembre 2026)",
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
        { label: "Content Trip by Com'Jam", href: "/content-trip" },
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

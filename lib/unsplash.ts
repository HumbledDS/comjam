/**
 * Curated Unsplash placeholder URLs.
 * Each constant points to a stable Unsplash photo ID with sizing params.
 * Swap to real Com'Jam client photos by replacing the URLs (or moving to /public).
 */

const base = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

export const unsplash = {
  // ============================================================
  // CINEMATIC HERO — large statement image, lifestyle creative
  // ============================================================
  heroFull: base("1490481651871-ab68de25d43d", 2000, 1200), // editorial fashion / camera moment
  heroAlt: base("1531746020798-e6953c6e8e04", 2000, 1200),

  // ============================================================
  // BENTO TILES — curated lifestyle / content-creator aesthetic
  // ============================================================
  bento: {
    // Big anchor tile — fashion lifestyle portrait (4:5 portrait)
    portrait1: base("1488161628813-04466f872be2", 900, 1200),
    // Square work shot — editorial close-up
    workSquare1: base("1494790108377-be9c29b29330", 800, 800),
    // Wide cinematic — studio/lifestyle moment
    wideLifestyle: base("1492447166138-50c3889fccb1", 1600, 800),
    // Portrait #2
    portrait2: base("1524504388940-b1c1722653e1", 900, 1200),
    // Behind the scenes — desk / camera / workspace
    behindScenes: base("1556761175-5973dc0f32e7", 1000, 700),
    // Vertical/social-media aesthetic — phone, content creation
    socialContent: base("1492691527719-9d1e07e534b4", 700, 1000),
    // Square detail — texture, accessory, lifestyle
    detail: base("1487530811176-3780de880c2d", 800, 800),
    // Square / brand colour
    moody: base("1502823403499-6ccfcf4fb453", 800, 800),
  },

  // ============================================================
  // ABOUT / PORTRAIT (Jamila placeholder)
  // ============================================================
  jamilaPortrait: base("1521146764736-56c929d59c83", 800, 1000),
  studioWide: base("1542038784456-1ea8e935640e", 1600, 900),

  // ============================================================
  // SERVICE / SECTION HEADER IMAGES (existing sub-pages)
  // ============================================================
  shootingPhoto: base("1554080353-a576cf803bda", 1200, 800),
  videoCreation: base("1601056639638-a08c5e2c4a7e", 1200, 800),
  strategy: base("1551836022-d5d88e9218df", 1200, 800),
  consulting: base("1551836022-deb4988cc6c0", 1200, 800),
  production: base("1552664730-d307ca884978", 1200, 800),
  bootcamp: base("1522202176988-66273c2fd55f", 1600, 900),
  bookingHero: base("1502920917128-1aa500764cbd", 1600, 900),

  // Generic small grid (legacy, can be removed later if unused)
  grid: [
    base("1488161628813-04466f872be2", 600, 800),
    base("1524504388940-b1c1722653e1", 600, 800),
    base("1438761681033-6461ffad8d80", 600, 800),
    base("1502823403499-6ccfcf4fb453", 600, 800),
  ],
};

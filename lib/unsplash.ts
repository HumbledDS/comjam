/**
 * Curated Unsplash placeholder URLs.
 * Each constant points to a stable Unsplash photo ID with sizing params.
 * Swap to real Com'Jam client photos by replacing the URLs (or moving to /public).
 */

const base = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

export const unsplash = {
  // Hero / portrait portraits
  heroPortrait: base("1521146764736-56c929d59c83", 1200, 1500), // woman with camera
  jamilaPortrait: base("1494790108377-be9c29b29330", 800, 1000), // friendly portrait
  studioWide: base("1542038784456-1ea8e935640e", 1600, 900),

  // Service hero images
  shootingPhoto: base("1554080353-a576cf803bda", 1200, 800), // camera close-up
  videoCreation: base("1601056639638-a08c5e2c4a7e", 1200, 800),
  strategy: base("1551836022-d5d88e9218df", 1200, 800),
  consulting: base("1551836022-deb4988cc6c0", 1200, 800),
  production: base("1552664730-d307ca884978", 1200, 800),

  // Portfolio grid (lifestyle / fashion shots)
  grid: [
    base("1488161628813-04466f872be2", 600, 800),
    base("1524504388940-b1c1722653e1", 600, 800),
    base("1438761681033-6461ffad8d80", 600, 800),
    base("1502823403499-6ccfcf4fb453", 600, 800),
    base("1492447166138-50c3889fccb1", 600, 800),
    base("1531746020798-e6953c6e8e04", 600, 800),
    base("1517841905240-472988babdf9", 600, 800),
    base("1500917293891-ef795e70e1f6", 600, 800),
  ],

  // Bootcamp visuals
  bootcamp: base("1522202176988-66273c2fd55f", 1600, 900),
  laptop: base("1517245386807-bb43f82c33c4", 800, 1000),

  // Booking page
  bookingHero: base("1502920917128-1aa500764cbd", 1600, 900),
};

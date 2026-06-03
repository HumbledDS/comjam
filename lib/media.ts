/**
 * Catalog of real Com'Jam photo + video assets in public/media/.
 * Pairs each shot with the section/service that best matches its mood.
 *
 * Re-run scripts/process-jamila-media.mjs / add-new-photos.mjs after
 * replacing or adding source files.
 *
 * Photo index (alphabetical-source order):
 *   01-16  → Jamila's own shoots (Paris/Brussels — Eiffel, Breguet, etc.)
 *   17     → Yellow sweater, pavement candid (Paris)
 *   18     → Black tuxedo blazer, descending staircase (formal)
 *   19     → Olive trench, vintage record library (lifestyle)
 *   20     → Mauve silk + hijab, seated (modest editorial)
 *   21     → Black blazer + pampas grass, restaurant (moody)
 *   22     → Hijab + tweed bomber, hotel staircase (formal modest)
 *   23     → Olive leather + caramel, classical columns (high fashion)
 *   24     → Jamila editorial — navy denim suit + tie, leather armchair, chin on hand
 *   25     → Jamila laughing — navy denim suit, armchair
 *   26     → Jamila side profile — white shirt + tie + denim, cross-legged
 *   27     → Burgundy trench, white shirt, stone column (Louvre vibe)
 *   28     → Burgundy off-shoulder dress, night stairs, plants
 *   29     → Hijab + tweed blazer + denim, marble Hercules statue
 *   30     → Editorial duo — brown + grey suits, Louvre columns (Stratégie)
 */

export const photoSrc = (n: number, thumb = false) => {
  const num = String(n).padStart(2, "0");
  return `/media/photos/${num}${thumb ? "-thumb" : ""}.jpg`;
};

export const photo = (n: number) => ({
  src: photoSrc(n),
  thumb: photoSrc(n, true),
});

export const media = {
  video: {
    // Horizontal cut for desktop / landscape screens.
    desktop: "/media/video/videoHero.mp4",
    // Vertical cut for mobile / portrait screens.
    mobile: "/media/video/videoHero2.mp4",
  },

  // Anchor images per section
  intro: {
    big: photo(5),     // Approche hero — per Jamila's PDF feedback
    small: photo(29),  // Hijab + marble statue — per round 3 feedback
  },

  about: photo(26),    // White shirt + tie + denim, cross-legged in armchair

  // Service-paired imagery (mood matches the service tone)
  services: {
    "creation-de-contenu": photo(17),    // Yellow sweater candid — content creator energy
    "strategie-digitale": photo(30),      // Editorial duo, Louvre columns — Stratégie polished feel
    "production-de-contenu": photo(28),   // Burgundy off-shoulder dress — per round 3 feedback
    "consulting": photo(12),              // Studio portrait — personal/professional
  },

  // Bootcamp / formation visual
  bootcamp: photo(24), // Jamila editorial denim suit (chin on hand) — per round 3 feedback
  bootcampThumb: photo(25), // alt: laughing portrait — kept as a fallback

  // Gallery (curated 12 photos showing breadth of clients & moods)
  // Round 3: too many "Siaa" portraits — rotated 2 of them out for photos 27/29.
  gallery: [
    photo(11),  // Eiffel tower — beige suit
    photo(23),  // olive leather + Roman columns
    photo(8),   // black suit + classical stone
    photo(17),  // yellow sweater candid
    photo(18),  // black tuxedo staircase
    photo(29),  // hijab + marble statue (replaces a Siaa)
    photo(22),  // hijab tweed bomber stairs
    photo(27),  // burgundy trench, column (replaces a Siaa)
    photo(21),  // black blazer + pampas grass
    photo(7),   // brown trench wide
    photo(20),  // mauve silk hijab
    photo(9),   // beige suit Paris corner
  ] as const,
};

/**
 * Catalog of Jamila's real photo + video assets in public/media/.
 * Pairs each shot with the section/service that best matches the mood/setting.
 *
 * Run scripts/process-jamila-media.mjs to regenerate after replacing source files.
 */

export const photoSrc = (n: number, thumb = false) => {
  const num = String(n).padStart(2, "0");
  return `/media/photos/${num}${thumb ? "-thumb" : ""}.jpg`;
};

export const photo = (n: number) => ({
  src: photoSrc(n),
  thumb: photoSrc(n, true),
});

// Hand-picked assignments based on outfit / setting / mood.
export const media = {
  video: {
    mp4: "/media/video/reel.mp4",
    webm: "/media/video/reel.webm",
    poster: "/media/video/reel-poster.jpg",
  },

  // Anchor images per section
  intro: {
    big: photo(11),    // Beige suit, Eiffel Tower at night — iconic
    small: photo(12),  // Navy sweater + plants — matches brand palette
  },

  about: photo(12),    // Same studio shot for About page portrait

  // Service-paired imagery (mood matches the service tone)
  services: {
    "creation-de-contenu": photo(3),     // Black trench Brussels — editorial energy
    "strategie-digitale": photo(2),       // Breguet, polished, "luxury brand" feel
    "production-de-contenu": photo(8),    // Black power suit, classical — production-grade
    "consulting": photo(12),              // Studio portrait — personal/professional
  },

  // Bootcamp / formation visual
  bootcamp: photo(10), // Paris café, leather jacket — content creator energy

  // Gallery (curated for variety in pose/setting/color)
  gallery: [
    photo(1),   // brown trench Brussels
    photo(11),  // Eiffel tower
    photo(8),   // black suit columns
    photo(14),  // denim + red, classical
    photo(13),  // leather jacket moody
    photo(5),   // beige suit evening
    photo(7),   // brown trench wide
    photo(9),   // beige suit corner
  ] as const,
};

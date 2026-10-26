/**
 * Silhouettes floutées pour les intervenants pas encore annoncés.
 * Quatre variantes : trois femmes (coiffures différentes) et un homme.
 * À remplacer par de vraies photos dès que les noms sont confirmés.
 */

type Variant = "f1" | "f2" | "f3" | "m";

const SHAPES: Record<Variant, React.ReactNode> = {
  // Cheveux longs qui tombent sur les épaules
  f1: (
    <>
      <path d="M100 26c-30 0-48 22-48 52 0 20 2 34-4 50l-8 58h120l-8-58c-6-16-4-30-4-50 0-30-18-52-48-52z" />
      <circle cx="100" cy="80" r="31" />
      <path d="M34 200c8-40 34-58 66-58s58 18 66 58z" />
    </>
  ),
  // Chignon haut
  f2: (
    <>
      <circle cx="100" cy="34" r="16" />
      <circle cx="100" cy="82" r="33" />
      <path d="M34 200c8-42 34-60 66-60s58 18 66 60z" />
    </>
  ),
  // Carré mi-long
  f3: (
    <>
      <path d="M100 32c-26 0-42 18-42 46 0 16-2 28-8 38h100c-6-10-8-22-8-38 0-28-16-46-42-46z" />
      <circle cx="100" cy="80" r="30" />
      <path d="M36 200c8-40 33-56 64-56s56 16 64 56z" />
    </>
  ),
  // Homme : cheveux courts, épaules plus larges
  m: (
    <>
      <path d="M100 38c-22 0-34 14-34 34h68c0-20-12-34-34-34z" />
      <circle cx="100" cy="82" r="29" />
      <path d="M26 200c10-42 38-58 74-58s64 16 74 58z" />
    </>
  ),
};

export function SpeakerSilhouette({ variant }: { variant: Variant }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      aria-hidden
      role="presentation"
    >
      <rect width="200" height="200" fill="var(--color-beige-dark)" />
      <g
        fill="var(--color-blue)"
        opacity="0.75"
        style={{ filter: "blur(7px)" }}
      >
        {SHAPES[variant]}
      </g>
    </svg>
  );
}

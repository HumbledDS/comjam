/**
 * Single source of truth for the "is the site launched yet?" flag.
 * When false → app/page.tsx serves the ComingSoon page and the layout
 * hides the Nav/Footer; middleware redirects every other route back
 * to `/`.
 *
 * Toggle by setting NEXT_PUBLIC_LAUNCHED=true on Vercel and redeploying.
 *
 * Default: false (coming soon) — the live site stays under wraps until
 * you flip this explicitly.
 */
export const LAUNCHED = process.env.NEXT_PUBLIC_LAUNCHED === "true";

/**
 * Decides whether to show the ComingSoon holding page or the full site.
 *
 * Two ways to unlock the full site:
 *  1. Env var NEXT_PUBLIC_LAUNCHED = "true" → full site on every domain
 *  2. Request host matches a "staging" host → full site only there
 *
 * Staging hosts:
 *  - localhost (local dev — full site always available while working)
 *  - any *.vercel.app (the project's vercel.app subdomain + preview deploys
 *    on branch PRs — handy for showing work without exposing comjam.fr)
 *
 * Custom domains (comjam.fr) keep showing ComingSoon until the env var flips.
 */

function isStagingHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const hostname = host.split(":")[0].toLowerCase();
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  if (hostname.endsWith(".vercel.app")) return true;
  return false;
}

export function isLaunched(host: string | null | undefined): boolean {
  if (process.env.NEXT_PUBLIC_LAUNCHED === "true") return true;
  return isStagingHost(host);
}

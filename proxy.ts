import { NextResponse, type NextRequest } from "next/server";
import { isLaunched } from "@/lib/launch";

/**
 * While the site is in pre-launch mode AND the request is coming from a
 * non-staging host (i.e. comjam.fr in production), redirect every page
 * request back to "/" so visitors only ever see the ComingSoon page.
 *
 * Localhost + *.vercel.app are treated as staging — they always see the
 * full site, even when the launch flag is off. This lets us preview
 * work-in-progress on comjam.vercel.app without exposing comjam.fr.
 *
 * The matcher excludes /api, /_next, /icon.png, and other static assets
 * so the contact form, image optimisation, and the favicon keep working.
 */
export function proxy(req: NextRequest) {
  if (isLaunched(req.headers.get("host"))) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.png|brand|media|favicon).*)"],
};

import { NextResponse, type NextRequest } from "next/server";

/**
 * While the site is in pre-launch mode (NEXT_PUBLIC_LAUNCHED !== "true"),
 * redirect every page request back to "/" so visitors only ever see the
 * ComingSoon page — even if they have direct links to /services, /a-propos
 * etc.
 *
 * The matcher excludes /api, /_next, /icon.png, and other static assets so
 * the contact form, image optimisation, and the favicon all keep working.
 */
export function proxy(req: NextRequest) {
  const launched = process.env.NEXT_PUBLIC_LAUNCHED === "true";
  if (launched) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  // Run on every pathname EXCEPT api routes, Next internals, and static files
  matcher: ["/((?!api|_next/static|_next/image|icon.png|brand|media|favicon).*)"],
};

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { verifySessionToken } from "./lib/auth";

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if target path is under /admin (e.g. /admin, /en/admin/blog, /id/admin/blog)
  const isAdminRoute = /\/(?:[a-z]{2}\/)?admin(?:\/.*)?$/.test(pathname);
  const isLoginRoute = /\/(?:[a-z]{2}\/)?admin\/login$/.test(pathname);

  if (isAdminRoute && !isLoginRoute) {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const isAuth = sessionCookie ? verifySessionToken(sessionCookie) : false;

    if (!isAuth) {
      // Determine locale or default to en
      const segments = pathname.split("/").filter(Boolean);
      const locale = routing.locales.includes(segments[0] as any) ? segments[0] : routing.defaultLocale;

      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      loginUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already authenticated and trying to visit /admin/login, redirect to /admin/blog
  if (isLoginRoute) {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const isAuth = sessionCookie ? verifySessionToken(sessionCookie) : false;

    if (isAuth) {
      const segments = pathname.split("/").filter(Boolean);
      const locale = routing.locales.includes(segments[0] as any) ? segments[0] : routing.defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/admin/blog`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

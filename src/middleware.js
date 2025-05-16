import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/admin/login"];
const ADMIN_TOKEN = "admin123";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const cookieToken = request.cookies.get("admin-auth")?.value;

    if (cookieToken !== ADMIN_TOKEN) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

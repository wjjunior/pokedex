import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const loginPath = "/login";

  console.log(`[Middleware] Path: ${req.nextUrl.pathname}, Token: ${token}`);

  if (req.nextUrl.pathname.startsWith(loginPath)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login).*)"],
};

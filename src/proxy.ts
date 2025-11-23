import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import envVars from "./config/envVars";
import { deleteCookies } from "./services/auth/cookies";
import {
  getDefaultDashboardRoute,
  getRouteAccessRole,
  isAuthRoute,
  UserRole,
} from "./utils/protectedRoutes";

// This function can be marked `async` if using `await` inside
export const proxy = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value || null;
  const pathname = request?.nextUrl?.pathname;

  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifiedToken = jwt.verify(accessToken, envVars.jwt.access_secret);
    if (typeof verifiedToken === "string") {
      await deleteCookies("accessToken");
      await deleteCookies("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken?.role;
  }

  const routeOwner = getRouteAccessRole(pathname);
  const isAuthenticationRoute = isAuthRoute(pathname);

  // Rule-1 : If authenticated user tries to access an auth route, redirect to their default dashboard
  if (accessToken && isAuthenticationRoute) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  // Rule-2 : If unauthenticated user tries to access public route, allow access
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // Rule-3 : If unauthenticated user tries to access protected route, redirect to login
  if (!accessToken) {
    const loginURL = new URL("/login", request.url);
    loginURL.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginURL);
  }

  // Rule-4 : If authenticated user tries to access a common protected route, allow access
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule-5 : If authenticated user tries to access a role-specific protected route, redirect to their default dashboard
  if (
    routeOwner === "ADMIN" ||
    routeOwner === "DOCTOR" ||
    routeOwner === "PATIENT"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { handleAstrologerRedirect, handleUserStatusRedirect } from "./lib/utils-server";

interface UserData {
  status: string;
  role: "user" | "astrologer" | "admin";
  [key: string]: any;
}

interface TokenData {
  user: UserData;
  [key: string]: any;
}

// Define public routes by role
const PUBLIC_ROUTES = new Set([
  "/astrologer/login",
  "/astrologer/signup",
  "/user/login",
  "/user/signup",
  "/admin/login"
]);

// Utility: check if path starts with one of the provided base paths
const startsWithAny = (pathname: string, bases: string[]) => bases.some((base) => pathname.startsWith(base));

// Main Middleware
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as TokenData | null;

  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const isAstrologerRoute = pathname.startsWith("/astrologer/");
  const isUserRoute = pathname.startsWith("/user/");
  const isAdminRoute = pathname.startsWith("/admin/");

  const isPrivateAstrologerRoute = isAstrologerRoute && !PUBLIC_ROUTES.has(pathname);
  const isPrivateUserRoute = isUserRoute && !PUBLIC_ROUTES.has(pathname);
  const isPrivateAdminRoute = isAdminRoute && pathname !== "/admin/login";

  // Logged in user handling
  if (token?.user) {
    const { status, role } = token.user;

    // 1. Block authenticated users from accessing login/signup
    if (isPublicRoute) {
      let redirectPath = "/";
      if (role === "astrologer") {
        redirectPath = handleAstrologerRedirect(status) || "/astrologer/dashboard";
      } else if (role === "user") {
        redirectPath = handleUserStatusRedirect(status) || "/user/dashboard";
      } else if (role === "admin") {
        redirectPath = "/admin/dashboard";
      }

      // Forcefully block access to login/signup
      if (pathname !== redirectPath) {
        return NextResponse.redirect(new URL(redirectPath, req.url));
      }
    }

    // 2. If role is missing (extra safety)
    if (!role) {
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.set("next-auth.session-token", "", { path: "/", maxAge: 0 });
      response.cookies.set("__Secure-next-auth.session-token", "", { path: "/", maxAge: 0 });
      return response;
    }

    // 3. Role mismatch? Redirect to appropriate route
    if (
      (isAstrologerRoute && role !== "astrologer") ||
      (isUserRoute && role !== "user") ||
      (isAdminRoute && role !== "admin")
    ) {
      let redirectPath = "/";
      if (role === "astrologer") {
        redirectPath = handleAstrologerRedirect(status) || "/astrologer/dashboard";
      } else if (role === "user") {
        redirectPath = handleUserStatusRedirect(status) || "/user/dashboard";
      } else if (role === "admin") {
        redirectPath = "/admin/dashboard";
      }
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  // Not logged in: block private routes
  if (!token) {
    if (isPrivateAstrologerRoute) {
      return NextResponse.redirect(new URL("/astrologer/login", req.url));
    }
    if (isPrivateUserRoute) {
      return NextResponse.redirect(new URL("/user/login", req.url));
    }
    if (isPrivateAdminRoute) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

// Match all relevant routes
export const config = {
  matcher: ["/astrologer/:path*", "/user/:path*", "/admin/:path*"]
};

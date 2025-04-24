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

    // Route Access Restriction by Role

    if (!role) {
      // Clear the next-auth session cookie (adjust domain/path if needed)
      const response = NextResponse.redirect(new URL("/", req.url)); // or general login page
      response.cookies.set("next-auth.session-token", "", {
        path: "/",
        maxAge: 0
      });

      // For production, use "__Secure-next-auth.session-token" if using secure cookies
      response.cookies.set("__Secure-next-auth.session-token", "", {
        path: "/",
        maxAge: 0
      });
      return response;
    }
    // Handle role mismatch: Redirect to correct route instead of home
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

    // Role-Based Redirection Logic
    let redirectPath;
    if (role === "astrologer") {
      redirectPath = handleAstrologerRedirect(status);
    } else if (role === "user") {
      redirectPath = handleUserStatusRedirect(status);
      console.log(" redirectPath:", redirectPath);
    } else if (role === "admin") {
      redirectPath = "/admin/dashboard"; // Always redirect admin to dashboard
    }

    // Already logged in but accessing a login/signup route
    if (isPublicRoute && redirectPath && pathname !== redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    // Redirect if user is logged in but status requires redirection
    if ((isAstrologerRoute || isUserRoute) && redirectPath && pathname !== redirectPath) {
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

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { handleAstrologerRedirect, handleUserStatusRedirect } from "./lib/utils-server";
import { ROLE, USER_PROFILE_STATUS } from "./shared/constants";

interface UserData {
  status: string;
  role: "USER" | "ASTROLOGER" | "ADMIN";
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
      if (role === ROLE.astrologer) {
        redirectPath = handleAstrologerRedirect(status) || "/astrologer/dashboard";
      } else if (role === ROLE.user) {
        redirectPath = handleUserStatusRedirect(status) || "/user/dashboard";
      } else if (role === ROLE.admin) {
        redirectPath = "/admin/dashboard";
      }

      // Forcefully block access to login/signup
      if (pathname !== redirectPath) {
        return NextResponse.redirect(new URL(redirectPath, req.url));
      }
    }
    if (isPrivateAstrologerRoute) {
      if (status !== USER_PROFILE_STATUS.APPROVED_ACTIVATED) {
        const redirectPath = handleAstrologerRedirect(status) || "/astrologer/dashboard";
        if (pathname !== redirectPath) {
          return NextResponse.redirect(new URL(redirectPath, req.url));
        }
      } else if (status === USER_PROFILE_STATUS.APPROVED_ACTIVATED && pathname === "/astrologer/awaiting-review") {
        return NextResponse.redirect(new URL("/astrologer/dashboard", req.url));
      }
    }
    if (isPrivateUserRoute) {
      if (status !== USER_PROFILE_STATUS.APPROVED_ACTIVATED) {
        const redirectPath = handleUserStatusRedirect(status) || "/user/dashboard";
        if (pathname !== redirectPath) {
          return NextResponse.redirect(new URL(redirectPath, req.url));
        }
      } else if (status === USER_PROFILE_STATUS.APPROVED_ACTIVATED && pathname === "/user/onboarding") {
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
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
      (isAstrologerRoute && role !== ROLE.astrologer) ||
      (isUserRoute && role !== ROLE.user) ||
      (isAdminRoute && role !== ROLE.admin)
    ) {
      let redirectPath = "/";
      if (role === ROLE.astrologer) {
        redirectPath = handleAstrologerRedirect(status) || "/astrologer/dashboard";
      } else if (role === ROLE.user) {
        redirectPath = handleUserStatusRedirect(status) || "/user/dashboard";
      } else if (role === ROLE.admin) {
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

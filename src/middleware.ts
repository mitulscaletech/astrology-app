/* eslint-disable indent */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

interface UserData {
  status: string;
  [key: string]: any;
}

interface TokenData {
  user: UserData;
  [key: string]: any;
}

// Define user status constants
const USER_PROFILE_STATUS = {
  APPROVED_ACTIVATED: "Approved & Activated",
  PENDING_PROFILE_COMPLETION: "Pending Basic Information",
  PROFILE_INCOMPLETE: "Profile Incomplete",
  AWAITING_FINAL_REVIEW: "Awaiting Final Review",
  REJECTED: "Rejected"
} as const;

// Handle user status redirect
const handleUserStatusRedirect = (status: string): string | undefined => {
  switch (status) {
    case USER_PROFILE_STATUS.APPROVED_ACTIVATED:
      return "/astrologer/dashboard";
    case USER_PROFILE_STATUS.PENDING_PROFILE_COMPLETION:
      return "/astrologer/onboarding";
    case USER_PROFILE_STATUS.PROFILE_INCOMPLETE:
      return "/astrologer/profile";
    case USER_PROFILE_STATUS.AWAITING_FINAL_REVIEW:
      return "/astrologer/awaiting-review";
    case USER_PROFILE_STATUS.REJECTED:
      return undefined;
    default:
      return undefined;
  }
};

// Define public routes that don't require authentication
const PUBLIC_ROUTES = new Set(["/astrologer/login", "/astrologer/signup"]);

// Middleware to protect private routes
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log("Middleware - Pathname:", pathname);

  // Get the session token
  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as TokenData | null;
  console.log("Middleware - Token exists:", !!token);
  console.log("Token data:", token);

  // Check if the current path is a public route
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);

  // If the path starts with /astrologer/ and is not a public route, it's private
  const isPrivateRoute = pathname.startsWith("/astrologer/") && !isPublicRoute;

  // If user is logged in
  if (token && token.user) {
    const userStatus = token.user.status as string;
    const redirectPath = handleUserStatusRedirect(userStatus);

    // If trying to access a restricted path based on status
    if (redirectPath && pathname !== redirectPath) {
      console.log(`User with status ${userStatus} trying to access ${pathname}, redirecting to ${redirectPath}`);
      const redirectUrl = new URL(redirectPath, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If we're already on the login page and have a valid token, redirect based on status
  if (pathname === "/astrologer/login" && token) {
    const userStatus = token.user?.status as string;
    const redirectPath = handleUserStatusRedirect(userStatus);
    if (redirectPath) {
      console.log(`Redirecting from login to ${redirectPath} based on status ${userStatus}`);
      const redirectUrl = new URL(redirectPath, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If no token and trying to access a private route, redirect to sign-in page
  if (!token && isPrivateRoute) {
    console.log("No token found, redirecting to login");
    const loginUrl = new URL("/astrologer/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists and user is on a public route, redirect based on status
  if (token && isPublicRoute) {
    const userStatus = token.user?.status as string;
    const redirectPath = handleUserStatusRedirect(userStatus);
    if (redirectPath) {
      console.log(`Redirecting from public route to ${redirectPath} based on status ${userStatus}`);
      const redirectUrl = new URL(redirectPath, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Continue with the request if no conditions are met
  return NextResponse.next();
}

// Define which paths the middleware should be applied to
export const config = {
  matcher: [
    "/astrologer/:path*",
    "/admin/:path*"
    // Apply to all routes under /astrologer/
  ]
};

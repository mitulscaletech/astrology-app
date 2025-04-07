import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const PUBLIC_ROUTES = new Set([
    '/astrologer/login',
    '/astrologer/signup'
]);

// Middleware to protect private routes
export function middleware(req: NextRequest) {
    const token = req.cookies.get('next-auth.session-token');
    const pathname = req.nextUrl.pathname;

    // Check if the current path is a public route
    const isPublicRoute = PUBLIC_ROUTES.has(pathname);

    // If the path starts with /astrologer/ and is not a public route, it's private
    const isPrivateRoute = pathname.startsWith('/astrologer/') && !isPublicRoute;

    // If no token and trying to access a private route, redirect to sign-in page
    if (!token && isPrivateRoute) {
        const loginUrl = new URL('/astrologer/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // If token exists and user is on a public route, redirect to dashboard
    if (token && isPublicRoute) {
        const dashboardUrl = new URL('/astrologer/dashboard', req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // Continue with the request if no conditions are met
    return NextResponse.next();
}

// Define which paths the middleware should be applied to
export const config = {
    matcher: [
        '/astrologer/:path*',
        '/admin/:path*'
        // Apply to all routes under /astrologer/
    ]
};
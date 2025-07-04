import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log(token, "token");
  const isAuthenticated = !!token;
  const userRole = token?.role || "USER"; // Default to 'user' if no role specified

  // Define public paths that don't require authentication
  const publicPaths = ["/"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Check if the path starts with /customer or /dashboard
  const isProtectedPath =
    request.nextUrl.pathname.startsWith("/customer") ||
    request.nextUrl.pathname.startsWith("/dashboard");

  // Check for admin-only paths
  const isAdminPath = request.nextUrl.pathname.startsWith("/dashboard");

  // If the user is not authenticated and trying to access protected routes
  if (!isAuthenticated && isProtectedPath) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is trying to access admin paths but doesn't have admin role
  if (isAuthenticated && isAdminPath && userRole !== "ADMIN") {
    // Redirect to dashboard if user tries to access admin routes
    return NextResponse.redirect(new URL("/customer", request.url));
  }

  // If the user is authenticated and trying to access public paths
  if (isAuthenticated && isPublicPath) {
    // Redirect based on role
    const redirectPath = userRole === "ADMIN" ? "/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

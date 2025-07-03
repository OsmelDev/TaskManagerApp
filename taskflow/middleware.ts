import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // In preview mode, allow all routes
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return res
  }

  // Only run middleware if we have proper Supabase configuration
  try {
    const { createMiddlewareClient } = await import("@supabase/auth-helpers-nextjs")
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If user is not signed in and the current path is /dashboard, redirect to /auth
    if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth", req.url))
    }

    // If user is signed in and the current path is /auth, redirect to /dashboard
    if (session && req.nextUrl.pathname === "/auth") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  } catch (error) {
    console.log("Middleware running in preview mode")
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
}

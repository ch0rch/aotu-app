import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  console.log("🔍 Middleware - URL solicitada:", req.nextUrl.pathname)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("🔍 Middleware - Estado de sesión:", session ? "Existe sesión" : "No hay sesión")

  // Si no hay sesión y el usuario intenta acceder a /dashboard, redirigir a /login
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("🔄 Middleware - Redirigiendo a /login por falta de sesión")
    const redirectUrl = new URL("/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Si hay sesión y el usuario intenta acceder a /login, redirigir a /dashboard
  if (session && req.nextUrl.pathname === "/login") {
    console.log("🔄 Middleware - Redirigiendo a /dashboard porque ya hay sesión")
    const redirectUrl = new URL("/dashboard", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}


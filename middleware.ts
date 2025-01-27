import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  console.log("🔍 Middleware - URL solicitada:", req.nextUrl.pathname)

  // Refresh session if it exists
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("🔍 Middleware - Estado de sesión:", session ? "Existe sesión" : "No hay sesión")

  // Si no hay sesión y el usuario intenta acceder a /dashboard, redirigir a /login
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("🔄 Middleware - Redirigiendo a /login por falta de sesión")
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Si hay sesión y el usuario intenta acceder a /login, redirigir a /dashboard
  if (session && req.nextUrl.pathname === "/login") {
    console.log("🔄 Middleware - Redirigiendo a /dashboard porque ya hay sesión")
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Importante: devolver la respuesta con las cookies actualizadas
  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}


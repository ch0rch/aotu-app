import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("Middleware: Verificando sesión para", req.nextUrl.pathname)

  // Si no hay sesión y el usuario intenta acceder a /dashboard, redirigir a /login
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Middleware: No hay sesión, redirigiendo a /login")
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Si hay sesión y el usuario intenta acceder a /login o /, redirigir a /dashboard
  if (session && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/")) {
    console.log("Middleware: Sesión activa, redirigiendo a /dashboard")
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  console.log("Middleware: Permitiendo acceso a", req.nextUrl.pathname)
  return res
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
}


"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log("Verificando sesión en AuthWrapper")
      if (!session && pathname?.startsWith("/dashboard")) {
        console.log("No hay sesión activa, redirigiendo a /login desde AuthWrapper")
        router.replace("/login")
      } else if (session && pathname === "/login") {
        console.log("Sesión activa encontrada en /login, redirigiendo a /dashboard desde AuthWrapper")
        router.replace("/dashboard")
      } else {
        console.log("Sesión verificada, permitiendo acceso")
        setIsLoading(false)
      }
    }

    checkAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Evento de autenticación:", event)
      if (event === "SIGNED_IN" && session) {
        console.log("Usuario ha iniciado sesión, redirigiendo a /dashboard desde AuthWrapper")
        router.replace("/dashboard")
      } else if (event === "SIGNED_OUT") {
        console.log("Usuario ha cerrado sesión, redirigiendo a /login desde AuthWrapper")
        router.replace("/login")
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router, pathname])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return <>{children}</>
}


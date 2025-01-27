"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        console.log("No hay sesión activa, redirigiendo a /login")
        router.push("/login")
      } else {
        console.log("Sesión activa encontrada")
        setIsLoading(false)
      }
    }

    checkAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Evento de autenticación:", event)
      if (event === "SIGNED_IN" && session) {
        console.log("Usuario ha iniciado sesión")
        setIsLoading(false)
      } else if (event === "SIGNED_OUT") {
        console.log("Usuario ha cerrado sesión, redirigiendo a /login")
        router.push("/login")
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return <>{children}</>
}


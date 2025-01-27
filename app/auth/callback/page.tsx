"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error en la autenticación:", error)
        router.push("/login")
      } else {
        router.push("/dashboard")
      }
    }

    handleAuthCallback()
  }, [router])

  return <div>Procesando autenticación...</div>
}


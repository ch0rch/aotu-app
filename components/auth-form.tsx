"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { supabase } from "@/lib/supabaseClient"

type AuthMode = "login" | "register" | "forgotPassword"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      if (authMode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        console.log("Inicio de sesión exitoso")
        router.push("/dashboard")
      } else if (authMode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        console.log("Registro exitoso")
        // Opcionalmente, puedes redirigir aquí también o mostrar un mensaje de verificación
      } else if (authMode === "forgotPassword") {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) throw error
        console.log("Correo de recuperación enviado")
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleLogin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      })
      if (error) throw error
      // La redirección después del inicio de sesión con Google será manejada por Supabase
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error)
    }
  }

  // ... (resto del código del componente)

  return (
    // ... (resto del JSX del componente)
  )
}



"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { supabase } from "@/lib/supabaseClient"
import { refreshSession, waitForAuthStateChange } from "@/lib/auth-utils"

type AuthMode = "login" | "register" | "forgotPassword"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  // Removed: const router = useRouter()

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

        // Esperar a que la sesión se actualice
        await waitForAuthStateChange()

        // Refrescar la sesión para asegurarnos de que está disponible
        const session = await refreshSession()

        if (session) {
          console.log("Sesión verificada, redirigiendo a /dashboard")
          // Forzar una navegación completa
          window.location.href = "/dashboard"
        }
      } else if (authMode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        console.log("Registro exitoso")
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
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error)
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {authMode === "login"
            ? "Bienvenido de vuelta"
            : authMode === "register"
              ? "Crea tu cuenta"
              : "Recupera tu contraseña"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {authMode === "login"
            ? "Ingresa tus credenciales para acceder"
            : authMode === "register"
              ? "Ingresa tus datos para registrarte"
              : "Ingresa tu correo para recuperar tu contraseña"}
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="nombre@ejemplo.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {authMode !== "forgotPassword" && (
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  placeholder="Contraseña"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            <Button disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {authMode === "login"
                ? "Iniciar sesión"
                : authMode === "register"
                  ? "Registrarse"
                  : "Enviar correo de recuperación"}
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleLogin}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>
      <div className="px-8 text-center text-sm text-muted-foreground">
        {authMode === "login" ? (
          <>
            ¿No tienes una cuenta?{" "}
            <Button variant="link" className="underline underline-offset-4" onClick={() => setAuthMode("register")}>
              Regístrate
            </Button>
          </>
        ) : authMode === "register" ? (
          <>
            ¿Ya tienes una cuenta?{" "}
            <Button variant="link" className="underline underline-offset-4" onClick={() => setAuthMode("login")}>
              Inicia sesión
            </Button>
          </>
        ) : (
          <Button variant="link" className="underline underline-offset-4" onClick={() => setAuthMode("login")}>
            Volver al inicio de sesión
          </Button>
        )}
      </div>
      {authMode === "login" && (
        <div className="text-center text-sm">
          <Button variant="link" className="underline underline-offset-4" onClick={() => setAuthMode("forgotPassword")}>
            ¿Olvidaste tu contraseña?
          </Button>
        </div>
      )}
    </div>
  )
}






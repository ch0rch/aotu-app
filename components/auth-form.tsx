"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { supabase } from "@/lib/supabaseClient"
import { useToast } from "@/components/ui/use-toast"

type AuthMode = "login" | "register" | "forgotPassword"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    console.log("📝 AuthForm - Iniciando proceso de autenticación")

    try {
      if (authMode === "login") {
        console.log("🔑 AuthForm - Intentando iniciar sesión con:", { email })
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          console.error("❌ AuthForm - Error detallado:", {
            message: error.message,
            status: error.status,
            name: error.name,
          })
          throw error
        }

        console.log("✅ AuthForm - Respuesta de inicio de sesión:", {
          user: data.user?.email,
          session: !!data.session,
        })

        // Verificamos que la sesión se haya establecido correctamente
        const {
          data: { session },
        } = await supabase.auth.getSession()
        console.log("🔍 AuthForm - Verificación de sesión:", !!session)

        if (session) {
          toast({
            title: "Inicio de sesión exitoso",
            description: "Redirigiendo al dashboard...",
          })

          // Esperamos un momento antes de redirigir
          await new Promise((resolve) => setTimeout(resolve, 1000))
          window.location.replace("/dashboard")
        } else {
          throw new Error("No se pudo establecer la sesión")
        }
      } else if (authMode === "register") {
        console.log("📝 AuthForm - Intentando registro con:", { email })
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) {
          console.error("❌ AuthForm - Error en registro:", error)
          throw error
        }

        console.log("✅ AuthForm - Registro exitoso:", {
          user: data.user?.email,
          confirmationSent: !data.session,
        })

        toast({
          title: "Registro exitoso",
          description: "Por favor, verifica tu correo electrónico para confirmar tu cuenta.",
        })
      } else if (authMode === "forgotPassword") {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) throw error
        toast({
          title: "Correo enviado",
          description: "Se ha enviado un correo con instrucciones para restablecer tu contraseña.",
        })
      }
    } catch (error) {
      console.error("❌ AuthForm - Error durante la autenticación:", error)

      // Mejorar el mensaje de error para el usuario
      let errorMessage = "Ocurrió un error inesperado"
      if (error instanceof Error) {
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Credenciales inválidas. Por favor verifica tu email y contraseña."
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Email no confirmado. Por favor verifica tu correo electrónico."
        } else {
          errorMessage = error.message
        }
      }

      toast({
        title: "Error de autenticación",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
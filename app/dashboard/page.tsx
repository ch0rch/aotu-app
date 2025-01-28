import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  console.log("🏁 DashboardPage - Iniciando renderizado")

  const supabase = createServerComponentClient({ cookies })

  console.log("🔍 DashboardPage - Verificando sesión")
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("📊 DashboardPage - Estado de sesión:", session ? "Activa" : "Inactiva")

  if (!session) {
    console.log("🔄 DashboardPage - No hay sesión, redirigiendo a /login")
    redirect("/login")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Bienvenido, {session.user.email}</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {JSON.stringify(
          {
            user: session.user,
            lastSignInAt: session.user?.last_sign_in_at,
          },
          null,
          2,
        )}
      </pre>
    </div>
  )
}


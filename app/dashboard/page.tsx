import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    console.log("No se encontró sesión en el servidor, redirigiendo a /login")
    redirect("/login")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Bienvenido, {session.user.email}</p>
      {/* Aquí puedes agregar más contenido del dashboard */}
    </div>
  )
}



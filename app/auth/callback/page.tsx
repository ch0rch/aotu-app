import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { headers } from "next/headers"

export default async function PaginaCallbackAutenticacion() {
  const supabase = createServerComponentClient({ cookies })

  const listaEncabezados = await headers()
  const urlX = listaEncabezados.get("x-url")
  console.log("Callback de autenticación iniciado", {
    urlX,
    encabezados: Object.fromEntries(listaEncabezados.entries()),
  })

  const { searchParams } = new URL(urlX || "", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  const codigo = searchParams.get("code")

  if (codigo) {
    await supabase.auth.exchangeCodeForSession(codigo)
  }

  return redirect("/dashboard")
}


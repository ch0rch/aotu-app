import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { headers } from "next/headers"

export default async function AuthCallbackPage() {
  const supabase = createServerComponentClient({ cookies })

  const headersList = headers()
  const xUrl = headersList.get("x-url")
  const { searchParams } = new URL(xUrl || "", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  const code = searchParams.get("code")

  console.log("Auth callback initiated", { code, searchParams: Object.fromEntries(searchParams) })

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  return redirect("/dashboard")
}


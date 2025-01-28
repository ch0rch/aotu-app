import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Variables de entorno de Supabase no encontradas:", {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey,
  })
  throw new Error("Faltan variables de entorno de Supabase")
}

console.log("✅ Inicializando cliente Supabase con URL:", supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})


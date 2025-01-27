import { supabase } from "./supabaseClient"

export async function refreshSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function waitForAuthStateChange(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      unsubscribe?.()
      reject(new Error("Timeout waiting for auth state change"))
    }, timeout)

    let unsubscribe: (() => void) | undefined

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change event:", event)
      if (event === "SIGNED_IN" && session) {
        clearTimeout(timer)
        unsubscribe?.()
        resolve(session)
      }
    })

    unsubscribe = subscription.unsubscribe

    // Verificar inmediatamente si ya hay una sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        clearTimeout(timer)
        unsubscribe?.()
        resolve(session)
      }
    })
  })
}



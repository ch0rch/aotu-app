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
      subscription.unsubscribe()
      reject(new Error("Timeout waiting for auth state change"))
    }, timeout)

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        clearTimeout(timer)
        subscription.unsubscribe()
        resolve(session)
      }
    })
  })
}



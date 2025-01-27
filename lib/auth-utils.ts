import { supabase } from "./supabaseClient"

export async function refreshSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function waitForAuthStateChange() {
  return new Promise((resolve) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        subscription.unsubscribe()
        resolve(session)
      }
    })
  })
}


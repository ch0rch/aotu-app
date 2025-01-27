import { Inter } from "next/font/google"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { ToastProvider } from "@/components/ui/toast"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AOTU App",
  description: "Aplicación de importación AOTU",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="es">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}


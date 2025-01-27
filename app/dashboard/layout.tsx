import { AuthWrapper } from "@/components/auth-wrapper"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthWrapper>
      <div className="flex min-h-screen">
        <Sidebar className="border-r" />
        <div className="flex-1">
          <Header />
          <main className="flex-1 p-8 pt-6">{children}</main>
        </div>
      </div>
    </AuthWrapper>
  )
}


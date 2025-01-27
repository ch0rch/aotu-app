import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ActionCards } from "@/components/action-cards"
import { OrdersList } from "@/components/orders-list"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="border-r" />
      <div className="flex-1">
        <Header />
        <main className="flex-1 space-y-8 p-8 pt-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">¡Bienvenido, Demo Usuario! 👋</h2>
            <p className="text-muted-foreground">Gestioná tus importaciones desde China</p>
          </div>
          <ActionCards />
          <OrdersList />
        </main>
      </div>
    </div>
  )
}


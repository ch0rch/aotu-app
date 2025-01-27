import { AuthWrapper } from "@/components/auth-wrapper"

export default function DashboardPage() {
  return (
    <AuthWrapper>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Bienvenido a tu dashboard. Aquí verás tus pedidos y otra información importante.</p>
      </div>
    </AuthWrapper>
  )
}


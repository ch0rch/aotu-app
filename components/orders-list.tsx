import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderProgress } from "./order-progress"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface Order {
  id: string
  title: string
  currentStep: number
  status: string
  lastUpdate: string
}

const orders: Order[] = [
  {
    id: "ORD001",
    title: "Electrónicos",
    currentStep: 2,
    status: "Gestión en China",
    lastUpdate: "2025-01-24",
  },
  {
    id: "ORD002",
    title: "Textiles",
    currentStep: 3,
    status: "Despacho y Aduana China",
    lastUpdate: "2025-01-23",
  },
]

export function OrdersList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos en Curso</CardTitle>
        <CardDescription>Estado actual de tus pedidos de importación</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{order.title}</h3>
                <p className="text-sm text-muted-foreground">Pedido #{order.id}</p>
              </div>
              <Button variant="ghost" size="sm">
                Ver detalles <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Estado actual: {order.status}</p>
              <OrderProgress currentStep={order.currentStep} />
              <p className="text-xs text-muted-foreground">Última actualización: {order.lastUpdate}</p>
            </div>
            {orders.indexOf(order) !== orders.length - 1 && <hr className="my-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


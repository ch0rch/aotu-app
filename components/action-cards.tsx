import { Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ActionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Pedido Personalizado
          </CardTitle>
          <CardDescription>Creá un pedido a medida con el producto que querés importar</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Obtené asistencia completa en todo el proceso de importación.
          </p>
          <Button>Iniciá Pedido Personalizado</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Comprá en Tienda
          </CardTitle>
          <CardDescription>Explorá productos pre-seleccionados listos para importar</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Productos validados con proceso de importación simplificado.
          </p>
          <Button variant="outline">Explorá la Tienda</Button>
        </CardContent>
      </Card>
    </div>
  )
}


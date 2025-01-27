import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function Header() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6 dark:bg-background">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="font-semibold text-lg">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Creá pedido
        </Button>
      </div>
    </header>
  )
}


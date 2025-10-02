import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, LogOut, ArrowLeft, Calendar, DollarSign } from "lucide-react"

const pedidos = [
  {
    id: 1,
    carro: "Toyota Corolla 2024",
    placa: "ABC-1234",
    dataInicio: "2025-02-01",
    dataFim: "2025-02-05",
    valorTotal: 750,
    status: "em_analise",
    statusTexto: "Em Análise",
  },
  {
    id: 2,
    carro: "Honda Civic 2023",
    placa: "DEF-5678",
    dataInicio: "2025-01-15",
    dataFim: "2025-01-20",
    valorTotal: 900,
    status: "aprovado",
    statusTexto: "Aprovado",
  },
  {
    id: 3,
    carro: "Volkswagen Jetta 2024",
    placa: "GHI-9012",
    dataInicio: "2024-12-20",
    dataFim: "2024-12-25",
    valorTotal: 800,
    status: "concluido",
    statusTexto: "Concluído",
  },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "em_analise":
      return "secondary"
    case "aprovado":
      return "default"
    case "concluido":
      return "outline"
    case "rejeitado":
      return "destructive"
    default:
      return "secondary"
  }
}

export default function ClientePedidos() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">RentCar</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/cliente/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Meus Pedidos</h2>
          <p className="text-muted-foreground">Acompanhe o status dos seus aluguéis</p>
        </div>

        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <Card key={pedido.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{pedido.carro}</CardTitle>
                    <CardDescription>Placa: {pedido.placa}</CardDescription>
                  </div>
                  <Badge variant={getStatusVariant(pedido.status)}>{pedido.statusTexto}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Período</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(pedido.dataInicio).toLocaleDateString("pt-BR")} até{" "}
                        {new Date(pedido.dataFim).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Valor Total</p>
                      <p className="text-sm text-muted-foreground">R$ {pedido.valorTotal}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    {pedido.status === "em_analise" && (
                      <Button variant="outline" size="sm">
                        Cancelar
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

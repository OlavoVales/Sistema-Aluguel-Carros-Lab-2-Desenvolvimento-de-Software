import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, LogOut, User, Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react"

const pedidosPendentes = [
  {
    id: 1,
    cliente: "João Silva",
    cpf: "123.456.789-00",
    carro: "Toyota Corolla 2024",
    placa: "ABC-1234",
    dataInicio: "2025-02-01",
    dataFim: "2025-02-05",
    valorTotal: 750,
    rendimentoTotal: 8500,
    precisaCredito: false,
  },
  {
    id: 2,
    cliente: "Maria Santos",
    cpf: "987.654.321-00",
    carro: "Honda Civic 2023",
    placa: "DEF-5678",
    dataInicio: "2025-02-10",
    dataFim: "2025-02-15",
    valorTotal: 900,
    rendimentoTotal: 6200,
    precisaCredito: true,
  },
  {
    id: 3,
    cliente: "Pedro Oliveira",
    cpf: "456.789.123-00",
    carro: "Volkswagen Jetta 2024",
    placa: "GHI-9012",
    dataInicio: "2025-02-05",
    dataFim: "2025-02-12",
    valorTotal: 1120,
    rendimentoTotal: 12000,
    precisaCredito: false,
  },
]

export default function AgenteDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">RentCar</h1>
            <Badge variant="secondary" className="ml-2">
              Agente
            </Badge>
          </div>
          <nav className="flex items-center gap-4">
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
          <h2 className="text-3xl font-bold mb-2">Pedidos Pendentes</h2>
          <p className="text-muted-foreground">Avalie e aprove os pedidos de aluguel</p>
        </div>

        <div className="space-y-6">
          {pedidosPendentes.map((pedido) => (
            <Card key={pedido.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {pedido.cliente}
                    </CardTitle>
                    <CardDescription>CPF: {pedido.cpf}</CardDescription>
                  </div>
                  {pedido.precisaCredito && <Badge variant="secondary">Requer Crédito</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium mb-1">Veículo</p>
                    <p className="text-sm text-muted-foreground">{pedido.carro}</p>
                    <p className="text-xs text-muted-foreground">Placa: {pedido.placa}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Período
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(pedido.dataInicio).toLocaleDateString("pt-BR")} até{" "}
                      {new Date(pedido.dataFim).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium">Valor Total</p>
                      <p className="text-lg font-bold">R$ {pedido.valorTotal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Rendimento Total</p>
                      <p className="text-lg font-bold">R$ {pedido.rendimentoTotal}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 gap-2" variant="default">
                    <CheckCircle className="h-4 w-4" />
                    Aprovar
                  </Button>
                  <Button className="flex-1 gap-2" variant="destructive">
                    <XCircle className="h-4 w-4" />
                    Rejeitar
                  </Button>
                  <Button variant="outline">Ver Detalhes</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

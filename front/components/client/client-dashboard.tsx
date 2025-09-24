"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, FileText, Clock, Calendar, MapPin, CreditCard, TrendingUp, Users } from "lucide-react"

interface RentalRequest {
  id: string
  vehicleModel: string
  vehicleBrand: string
  vehicleYear: number
  requestDate: string
  startDate: string
  endDate: string
  status: "pending" | "approved" | "rejected" | "active" | "completed"
  monthlyValue: number
  totalValue: number
  location: string
}

interface Contract {
  id: string
  vehicleModel: string
  vehicleBrand: string
  vehicleYear: number
  vehiclePlate: string
  startDate: string
  endDate: string
  monthlyValue: number
  status: "active" | "completed" | "cancelled"
  paymentStatus: "up-to-date" | "pending" | "overdue"
  nextPayment: string
}

const mockRequests: RentalRequest[] = [
  {
    id: "REQ001",
    vehicleModel: "Civic",
    vehicleBrand: "Honda",
    vehicleYear: 2023,
    requestDate: "2024-01-15",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    status: "pending",
    monthlyValue: 1200,
    totalValue: 7200,
    location: "São Paulo, SP",
  },
  {
    id: "REQ002",
    vehicleModel: "Corolla",
    vehicleBrand: "Toyota",
    vehicleYear: 2022,
    requestDate: "2024-01-10",
    startDate: "2024-01-20",
    endDate: "2024-07-20",
    status: "approved",
    monthlyValue: 1100,
    totalValue: 6600,
    location: "Rio de Janeiro, RJ",
  },
  {
    id: "REQ003",
    vehicleModel: "HB20",
    vehicleBrand: "Hyundai",
    vehicleYear: 2021,
    requestDate: "2024-01-05",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "rejected",
    monthlyValue: 800,
    totalValue: 4000,
    location: "Belo Horizonte, MG",
  },
]

const mockContracts: Contract[] = [
  {
    id: "CTR001",
    vehicleModel: "Onix",
    vehicleBrand: "Chevrolet",
    vehicleYear: 2022,
    vehiclePlate: "ABC-1234",
    startDate: "2023-12-01",
    endDate: "2024-06-01",
    monthlyValue: 950,
    status: "active",
    paymentStatus: "up-to-date",
    nextPayment: "2024-02-01",
  },
  {
    id: "CTR002",
    vehicleModel: "Gol",
    vehicleBrand: "Volkswagen",
    vehicleYear: 2021,
    vehiclePlate: "XYZ-5678",
    startDate: "2023-10-01",
    endDate: "2024-04-01",
    monthlyValue: 850,
    status: "active",
    paymentStatus: "pending",
    nextPayment: "2024-01-25",
  },
]

export function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Em Análise", variant: "secondary" as const },
      approved: { label: "Aprovado", variant: "default" as const },
      rejected: { label: "Rejeitado", variant: "destructive" as const },
      active: { label: "Ativo", variant: "default" as const },
      completed: { label: "Concluído", variant: "secondary" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      "up-to-date": { label: "Em Dia", variant: "default" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      overdue: { label: "Em Atraso", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const activeRequests = mockRequests.filter((req) => req.status === "pending" || req.status === "approved")
  const activeContracts = mockContracts.filter((contract) => contract.status === "active")
  const totalValue = activeContracts.reduce((sum, contract) => sum + contract.monthlyValue, 0)

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-sans font-bold text-foreground mb-2">Dashboard do Cliente</h2>
        <p className="text-muted-foreground">Gerencie seus pedidos de aluguel e contratos ativos</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="requests">Pedidos</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Ativos</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeRequests.length}</div>
                <p className="text-xs text-muted-foreground">Em análise ou aprovados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeContracts.length}</div>
                <p className="text-xs text-muted-foreground">Veículos em uso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Mensal</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Contratos ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status do Perfil</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">Ativo</div>
                <p className="text-xs text-muted-foreground">Documentos aprovados</p>
              </CardContent>
            </Card>
          </div>

          {/* Ações rápidas e pedidos recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesse as funcionalidades mais utilizadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start gap-3" size="lg">
                  <Car className="h-5 w-5" />
                  Solicitar Novo Aluguel
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" size="lg">
                  <FileText className="h-5 w-5" />
                  Ver Todos os Pedidos
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" size="lg">
                  <CreditCard className="h-5 w-5" />
                  Histórico de Pagamentos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Vencimentos</CardTitle>
                <CardDescription>Pagamentos e renovações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeContracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {contract.vehicleBrand} {contract.vehicleModel}
                        </p>
                        <p className="text-sm text-muted-foreground">Contrato {contract.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">R$ {contract.monthlyValue}</p>
                        <p className="text-xs text-muted-foreground">{contract.nextPayment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-sans font-semibold">Meus Pedidos de Aluguel</h3>
            <Button>
              <Car className="mr-2 h-4 w-4" />
              Novo Pedido
            </Button>
          </div>

          <div className="grid gap-4">
            {mockRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {request.vehicleBrand} {request.vehicleModel} {request.vehicleYear}
                      </CardTitle>
                      <CardDescription>Pedido {request.id}</CardDescription>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Período</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.startDate).toLocaleDateString()} -{" "}
                          {new Date(request.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Local</p>
                        <p className="text-sm text-muted-foreground">{request.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Valor Total</p>
                        <p className="text-sm text-muted-foreground">R$ {request.totalValue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    {request.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-sans font-semibold">Meus Contratos</h3>
          </div>

          <div className="grid gap-4">
            {mockContracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {contract.vehicleBrand} {contract.vehicleModel} {contract.vehicleYear}
                      </CardTitle>
                      <CardDescription>
                        Contrato {contract.id} • Placa: {contract.vehiclePlate}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(contract.status)}
                      {getPaymentStatusBadge(contract.paymentStatus)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Início</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(contract.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Término</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(contract.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Valor Mensal</p>
                        <p className="text-sm text-muted-foreground">R$ {contract.monthlyValue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Próximo Pagamento</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(contract.nextPayment).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progresso do contrato */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progresso do Contrato</span>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Contrato
                    </Button>
                    <Button variant="outline" size="sm">
                      Histórico de Pagamentos
                    </Button>
                    {contract.paymentStatus === "pending" && <Button size="sm">Pagar Agora</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Mantenha seus dados atualizados para facilitar o processo de aprovação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nome Completo</p>
                  <p className="text-base">João Silva Santos</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                  <p className="text-base">joao.silva@email.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CPF</p>
                  <p className="text-base">123.456.789-00</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">RG</p>
                  <p className="text-base">12.345.678-9</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                  <p className="text-base">Rua das Flores, 123 - Centro - São Paulo, SP - 01234-567</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profissão</p>
                  <p className="text-base">Engenheiro de Software</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant="default">Documentos Aprovados</Badge>
                </div>
              </div>

              <div className="pt-4">
                <Button>Editar Informações</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações de Renda</CardTitle>
              <CardDescription>Dados utilizados para análise de crédito</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Tech Solutions Ltda</h4>
                    <Badge variant="secondary">Principal</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Desenvolvedor Sênior</p>
                  <p className="text-lg font-semibold">R$ 8.500,00/mês</p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Freelancer</h4>
                    <Badge variant="outline">Secundária</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Consultoria em TI</p>
                  <p className="text-lg font-semibold">R$ 2.000,00/mês</p>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline">Adicionar Fonte de Renda</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

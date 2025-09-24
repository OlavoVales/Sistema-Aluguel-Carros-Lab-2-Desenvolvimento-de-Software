"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Car,
  FileText,
  Clock,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  DollarSign,
  Eye,
} from "lucide-react"

interface PendingRequest {
  id: string
  clientName: string
  clientCPF: string
  vehicleModel: string
  vehicleBrand: string
  vehicleYear: number
  requestDate: string
  startDate: string
  endDate: string
  monthlyValue: number
  totalValue: number
  clientIncome: number
  riskScore: "low" | "medium" | "high"
  creditScore: number
  location: string
}

interface ActiveContract {
  id: string
  clientName: string
  vehicleModel: string
  vehicleBrand: string
  vehiclePlate: string
  startDate: string
  endDate: string
  monthlyValue: number
  paymentStatus: "up-to-date" | "pending" | "overdue"
  nextPayment: string
  daysOverdue?: number
}

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  plate: string
  status: "available" | "rented" | "maintenance"
  monthlyRate: number
  location: string
  lastMaintenance: string
}

const mockPendingRequests: PendingRequest[] = [
  {
    id: "REQ001",
    clientName: "João Silva Santos",
    clientCPF: "123.456.789-00",
    vehicleModel: "Civic",
    vehicleBrand: "Honda",
    vehicleYear: 2023,
    requestDate: "2024-01-15",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    monthlyValue: 1200,
    totalValue: 7200,
    clientIncome: 8500,
    riskScore: "low",
    creditScore: 750,
    location: "São Paulo, SP",
  },
  {
    id: "REQ002",
    clientName: "Maria Oliveira",
    clientCPF: "987.654.321-00",
    vehicleModel: "Corolla",
    vehicleBrand: "Toyota",
    vehicleYear: 2022,
    requestDate: "2024-01-16",
    startDate: "2024-02-05",
    endDate: "2024-07-05",
    monthlyValue: 1100,
    totalValue: 5500,
    clientIncome: 4500,
    riskScore: "medium",
    creditScore: 650,
    location: "Rio de Janeiro, RJ",
  },
  {
    id: "REQ003",
    clientName: "Carlos Pereira",
    clientCPF: "456.789.123-00",
    vehicleModel: "HB20",
    vehicleBrand: "Hyundai",
    vehicleYear: 2021,
    requestDate: "2024-01-17",
    startDate: "2024-02-10",
    endDate: "2024-06-10",
    monthlyValue: 800,
    totalValue: 3200,
    clientIncome: 3000,
    riskScore: "high",
    creditScore: 520,
    location: "Belo Horizonte, MG",
  },
]

const mockActiveContracts: ActiveContract[] = [
  {
    id: "CTR001",
    clientName: "Ana Costa",
    vehicleModel: "Onix",
    vehicleBrand: "Chevrolet",
    vehiclePlate: "ABC-1234",
    startDate: "2023-12-01",
    endDate: "2024-06-01",
    monthlyValue: 950,
    paymentStatus: "up-to-date",
    nextPayment: "2024-02-01",
  },
  {
    id: "CTR002",
    clientName: "Roberto Lima",
    vehicleModel: "Gol",
    vehicleBrand: "Volkswagen",
    vehiclePlate: "XYZ-5678",
    startDate: "2023-10-01",
    endDate: "2024-04-01",
    monthlyValue: 850,
    paymentStatus: "overdue",
    nextPayment: "2024-01-15",
    daysOverdue: 10,
  },
  {
    id: "CTR003",
    clientName: "Fernanda Santos",
    vehicleModel: "Fit",
    vehicleBrand: "Honda",
    vehiclePlate: "DEF-9012",
    startDate: "2024-01-01",
    endDate: "2024-07-01",
    monthlyValue: 1000,
    paymentStatus: "pending",
    nextPayment: "2024-02-01",
  },
]

const mockVehicles: Vehicle[] = [
  {
    id: "VEH001",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    plate: "ABC-1234",
    status: "available",
    monthlyRate: 1200,
    location: "São Paulo, SP",
    lastMaintenance: "2024-01-10",
  },
  {
    id: "VEH002",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    plate: "XYZ-5678",
    status: "rented",
    monthlyRate: 1100,
    location: "Rio de Janeiro, RJ",
    lastMaintenance: "2023-12-15",
  },
  {
    id: "VEH003",
    brand: "Chevrolet",
    model: "Onix",
    year: 2021,
    plate: "DEF-9012",
    status: "maintenance",
    monthlyRate: 950,
    location: "Belo Horizonte, MG",
    lastMaintenance: "2024-01-20",
  },
]

export function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null)

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      low: { label: "Baixo Risco", variant: "default" as const },
      medium: { label: "Médio Risco", variant: "secondary" as const },
      high: { label: "Alto Risco", variant: "destructive" as const },
    }

    const config = riskConfig[risk as keyof typeof riskConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: "Disponível", variant: "default" as const },
      rented: { label: "Alugado", variant: "secondary" as const },
      maintenance: { label: "Manutenção", variant: "destructive" as const },
      "up-to-date": { label: "Em Dia", variant: "default" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      overdue: { label: "Em Atraso", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleApproveRequest = (requestId: string) => {
    console.log("Aprovando pedido:", requestId)
    // Implementar lógica de aprovação
  }

  const handleRejectRequest = (requestId: string) => {
    console.log("Rejeitando pedido:", requestId)
    // Implementar lógica de rejeição
  }

  const pendingRequestsCount = mockPendingRequests.length
  const activeContractsCount = mockActiveContracts.length
  const overdueContractsCount = mockActiveContracts.filter((c) => c.paymentStatus === "overdue").length
  const totalMonthlyRevenue = mockActiveContracts.reduce((sum, contract) => sum + contract.monthlyValue, 0)

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-sans font-bold text-foreground mb-2">Dashboard do Agente</h2>
        <p className="text-muted-foreground">Gerencie pedidos, contratos e análises financeiras</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="requests">Pedidos</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="vehicles">Veículos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingRequestsCount}</div>
                <p className="text-xs text-muted-foreground">Aguardando análise</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeContractsCount}</div>
                <p className="text-xs text-muted-foreground">Em vigência</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalMonthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Contratos ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pagamentos em Atraso</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{overdueContractsCount}</div>
                <p className="text-xs text-muted-foreground">Requer atenção</p>
              </CardContent>
            </Card>
          </div>

          {/* Ações rápidas e alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Funcionalidades mais utilizadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start gap-3" size="lg">
                  <FileText className="h-5 w-5" />
                  Analisar Pedidos Pendentes
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" size="lg">
                  <Car className="h-5 w-5" />
                  Gerenciar Veículos
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" size="lg">
                  <BarChart3 className="h-5 w-5" />
                  Relatórios Financeiros
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas e Notificações</CardTitle>
                <CardDescription>Itens que requerem atenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">Pagamentos em Atraso</p>
                      <p className="text-sm text-muted-foreground">{overdueContractsCount} contratos com atraso</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border border-secondary/20 bg-secondary/5 rounded-lg">
                    <Clock className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-medium text-secondary">Pedidos Pendentes</p>
                      <p className="text-sm text-muted-foreground">{pendingRequestsCount} pedidos aguardando análise</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Manutenção Programada</p>
                      <p className="text-sm text-muted-foreground">2 veículos precisam de revisão</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-sans font-semibold">Pedidos Pendentes de Análise</h3>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Riscos</SelectItem>
                  <SelectItem value="low">Baixo Risco</SelectItem>
                  <SelectItem value="medium">Médio Risco</SelectItem>
                  <SelectItem value="high">Alto Risco</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {mockPendingRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.clientName}</CardTitle>
                      <CardDescription>
                        Pedido {request.id} • CPF: {request.clientCPF}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {getRiskBadge(request.riskScore)}
                      <Badge variant="outline">Score: {request.creditScore}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Veículo Solicitado</p>
                      <p className="text-sm">
                        {request.vehicleBrand} {request.vehicleModel} {request.vehicleYear}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Valor Mensal</p>
                      <p className="text-sm font-semibold">R$ {request.monthlyValue.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Renda Declarada</p>
                      <p className="text-sm">R$ {request.clientIncome.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Comprometimento</p>
                      <p className="text-sm">{((request.monthlyValue / request.clientIncome) * 100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </Button>
                    <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Aprovar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleRejectRequest(request.id)}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Rejeitar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-sans font-semibold">Contratos Ativos</h3>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="up-to-date">Em Dia</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="overdue">Em Atraso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {mockActiveContracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{contract.clientName}</CardTitle>
                      <CardDescription>
                        Contrato {contract.id} • {contract.vehicleBrand} {contract.vehicleModel} • Placa:{" "}
                        {contract.vehiclePlate}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(contract.paymentStatus)}
                      {contract.daysOverdue && <Badge variant="destructive">{contract.daysOverdue} dias</Badge>}
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

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Contrato
                    </Button>
                    <Button variant="outline" size="sm">
                      Histórico
                    </Button>
                    {contract.paymentStatus === "overdue" && <Button size="sm">Cobrar Pagamento</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-sans font-semibold">Frota de Veículos</h3>
            <Button>
              <Car className="mr-2 h-4 w-4" />
              Adicionar Veículo
            </Button>
          </div>

          <div className="grid gap-4">
            {mockVehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {vehicle.brand} {vehicle.model} {vehicle.year}
                      </CardTitle>
                      <CardDescription>Placa: {vehicle.plate}</CardDescription>
                    </div>
                    {getStatusBadge(vehicle.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Taxa Mensal</p>
                        <p className="text-sm text-muted-foreground">R$ {vehicle.monthlyRate.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Localização</p>
                        <p className="text-sm text-muted-foreground">{vehicle.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Última Manutenção</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(vehicle.lastMaintenance).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.status === "available"
                            ? "Disponível"
                            : vehicle.status === "rented"
                              ? "Alugado"
                              : "Manutenção"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    {vehicle.status === "available" && <Button size="sm">Marcar Manutenção</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-sans font-semibold">Relatórios e Analytics</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Receita Total</span>
                    <span className="text-lg font-bold">R$ 15.750</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Contratos Ativos</span>
                    <span className="text-lg font-bold">{activeContractsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Taxa de Aprovação</span>
                    <span className="text-lg font-bold">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Inadimplência</span>
                    <span className="text-lg font-bold text-destructive">5.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance da Frota</CardTitle>
                <CardDescription>Utilização dos veículos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Taxa de Ocupação</span>
                    <span className="text-lg font-bold">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Veículos Disponíveis</span>
                    <span className="text-lg font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Em Manutenção</span>
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Receita por Veículo</span>
                    <span className="text-lg font-bold">R$ 1.050</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gerar Relatório Personalizado</CardTitle>
              <CardDescription>Crie relatórios específicos para suas necessidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Tipo de Relatório</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financeiro</SelectItem>
                      <SelectItem value="contracts">Contratos</SelectItem>
                      <SelectItem value="vehicles">Veículos</SelectItem>
                      <SelectItem value="clients">Clientes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-from">Data Inicial</Label>
                  <Input type="date" id="date-from" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-to">Data Final</Label>
                  <Input type="date" id="date-to" />
                </div>
              </div>

              <Button>
                <BarChart3 className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

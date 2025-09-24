"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Car,
  Calendar,
  CreditCard,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react"

interface Contract {
  id: string
  clientName: string
  clientCPF: string
  clientEmail: string
  clientPhone: string
  vehicleBrand: string
  vehicleModel: string
  vehicleYear: number
  vehiclePlate: string
  startDate: string
  endDate: string
  monthlyValue: number
  totalValue: number
  status: "active" | "completed" | "cancelled" | "suspended"
  paymentStatus: "up-to-date" | "pending" | "overdue"
  nextPayment: string
  daysOverdue?: number
  paymentHistory: PaymentRecord[]
  location: string
}

interface PaymentRecord {
  id: string
  dueDate: string
  paidDate?: string
  amount: number
  status: "paid" | "pending" | "overdue"
  method?: string
}

const mockContracts: Contract[] = [
  {
    id: "CTR001",
    clientName: "Ana Costa Silva",
    clientCPF: "111.222.333-44",
    clientEmail: "ana.costa@email.com",
    clientPhone: "(11) 98888-7777",
    vehicleBrand: "Chevrolet",
    vehicleModel: "Onix",
    vehicleYear: 2022,
    vehiclePlate: "ABC-1234",
    startDate: "2023-12-01",
    endDate: "2024-06-01",
    monthlyValue: 950,
    totalValue: 5700,
    status: "active",
    paymentStatus: "up-to-date",
    nextPayment: "2024-02-01",
    location: "São Paulo, SP",
    paymentHistory: [
      {
        id: "PAY001",
        dueDate: "2023-12-01",
        paidDate: "2023-11-28",
        amount: 950,
        status: "paid",
        method: "PIX",
      },
      {
        id: "PAY002",
        dueDate: "2024-01-01",
        paidDate: "2023-12-30",
        amount: 950,
        status: "paid",
        method: "Cartão de Crédito",
      },
      {
        id: "PAY003",
        dueDate: "2024-02-01",
        amount: 950,
        status: "pending",
      },
    ],
  },
  {
    id: "CTR002",
    clientName: "Roberto Lima Santos",
    clientCPF: "555.666.777-88",
    clientEmail: "roberto.lima@email.com",
    clientPhone: "(11) 97777-6666",
    vehicleBrand: "Volkswagen",
    vehicleModel: "Gol",
    vehicleYear: 2021,
    vehiclePlate: "XYZ-5678",
    startDate: "2023-10-01",
    endDate: "2024-04-01",
    monthlyValue: 850,
    totalValue: 5100,
    status: "active",
    paymentStatus: "overdue",
    nextPayment: "2024-01-15",
    daysOverdue: 10,
    location: "Rio de Janeiro, RJ",
    paymentHistory: [
      {
        id: "PAY004",
        dueDate: "2023-10-01",
        paidDate: "2023-10-05",
        amount: 850,
        status: "paid",
        method: "Boleto",
      },
      {
        id: "PAY005",
        dueDate: "2023-11-01",
        paidDate: "2023-11-10",
        amount: 850,
        status: "paid",
        method: "Boleto",
      },
      {
        id: "PAY006",
        dueDate: "2023-12-01",
        paidDate: "2023-12-15",
        amount: 850,
        status: "paid",
        method: "PIX",
      },
      {
        id: "PAY007",
        dueDate: "2024-01-01",
        amount: 850,
        status: "overdue",
      },
    ],
  },
]

export function ContractManagement() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Ativo", variant: "default" as const },
      completed: { label: "Concluído", variant: "secondary" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
      suspended: { label: "Suspenso", variant: "destructive" as const },
      "up-to-date": { label: "Em Dia", variant: "default" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      overdue: { label: "Em Atraso", variant: "destructive" as const },
      paid: { label: "Pago", variant: "default" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleSuspendContract = (contractId: string) => {
    console.log("Suspendendo contrato:", contractId)
    // Implementar lógica de suspensão
  }

  const handleCancelContract = (contractId: string) => {
    console.log("Cancelando contrato:", contractId)
    // Implementar lógica de cancelamento
  }

  const handleSendPaymentReminder = (contractId: string) => {
    console.log("Enviando lembrete de pagamento:", contractId)
    // Implementar lógica de envio de lembrete
  }

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || contract.paymentStatus === filterStatus

    return matchesSearch && matchesFilter
  })

  const activeContracts = filteredContracts.filter((c) => c.status === "active")
  const overdueContracts = filteredContracts.filter((c) => c.paymentStatus === "overdue")
  const completedContracts = filteredContracts.filter((c) => c.status === "completed")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-sans font-bold text-foreground">Gestão de Contratos</h2>
          <p className="text-muted-foreground">Gerencie contratos ativos, pagamentos e histórico</p>
        </div>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, contrato ou placa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
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
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Ativos ({activeContracts.length})</TabsTrigger>
          <TabsTrigger value="overdue">Em Atraso ({overdueContracts.length})</TabsTrigger>
          <TabsTrigger value="completed">Concluídos ({completedContracts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeContracts.map((contract) => (
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
                    {getStatusBadge(contract.status)}
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
                      <p className="text-sm font-medium">Período</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(contract.startDate).toLocaleDateString()} -{" "}
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

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Localização</p>
                      <p className="text-sm text-muted-foreground">{contract.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedContract(contract)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Detalhes do Contrato {contract.id}</DialogTitle>
                        <DialogDescription>{contract.clientName}</DialogDescription>
                      </DialogHeader>

                      {selectedContract && (
                        <div className="space-y-6">
                          {/* Informações do cliente */}
                          <div>
                            <h4 className="font-medium mb-3">Informações do Cliente</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{selectedContract.clientEmail}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{selectedContract.clientPhone}</span>
                              </div>
                            </div>
                          </div>

                          {/* Histórico de pagamentos */}
                          <div>
                            <h4 className="font-medium mb-3">Histórico de Pagamentos</h4>
                            <div className="space-y-2">
                              {selectedContract.paymentHistory.map((payment) => (
                                <div
                                  key={payment.id}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium">
                                      Vencimento: {new Date(payment.dueDate).toLocaleDateString()}
                                    </p>
                                    {payment.paidDate && (
                                      <p className="text-sm text-muted-foreground">
                                        Pago em: {new Date(payment.paidDate).toLocaleDateString()}
                                      </p>
                                    )}
                                    {payment.method && (
                                      <p className="text-sm text-muted-foreground">Método: {payment.method}</p>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold">R$ {payment.amount.toLocaleString()}</p>
                                    {getStatusBadge(payment.status)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => handleSendPaymentReminder(contract.id)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Lembrete
                  </Button>

                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Suspender
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Suspender Contrato</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja suspender o contrato {contract.id}? O cliente será notificado e o
                          veículo deverá ser devolvido.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleSuspendContract(contract.id)}>
                          Suspender
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancelar Contrato</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja cancelar o contrato {contract.id}? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleCancelContract(contract.id)}>
                          Confirmar Cancelamento
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          {overdueContracts.map((contract) => (
            <Card key={contract.id} className="border-destructive/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      {contract.clientName}
                    </CardTitle>
                    <CardDescription>
                      Contrato {contract.id} • {contract.daysOverdue} dias em atraso
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(contract.paymentStatus)}
                    <Badge variant="destructive">{contract.daysOverdue} dias</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Valor em Atraso</p>
                      <p className="text-sm font-semibold text-destructive">
                        R$ {contract.monthlyValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Telefone</p>
                      <p className="text-sm text-muted-foreground">{contract.clientPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Veículo</p>
                      <p className="text-sm text-muted-foreground">
                        {contract.vehicleBrand} {contract.vehicleModel} - {contract.vehiclePlate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSendPaymentReminder(contract.id)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Cobrar Pagamento
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    Ligar para Cliente
                  </Button>
                  <Button variant="destructive" size="sm">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Suspender Contrato
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum contrato concluído</h3>
            <p className="text-muted-foreground">Contratos finalizados aparecerão aqui</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

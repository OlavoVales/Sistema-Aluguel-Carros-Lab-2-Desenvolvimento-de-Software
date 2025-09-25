"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import ProtectedRoute from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Car, Clock, DollarSign, Eye, FileText, Filter, Search, X } from "lucide-react"

// Mock data para demonstração
const mockRequests = [
  {
    id: "REQ-001",
    vehicle: "Honda Civic 2023",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    status: "approved",
    totalValue: 1400,
    requestDate: "2024-01-10",
    agentNotes: "Aprovado após análise de crédito positiva",
  },
  {
    id: "REQ-002",
    vehicle: "Toyota Corolla 2022",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    status: "pending",
    totalValue: 800,
    requestDate: "2024-01-28",
    agentNotes: null,
  },
  {
    id: "REQ-003",
    vehicle: "Volkswagen T-Cross 2023",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    status: "rejected",
    totalValue: 1000,
    requestDate: "2024-01-18",
    agentNotes: "Renda insuficiente para o valor solicitado",
  },
  {
    id: "REQ-004",
    vehicle: "Chevrolet Onix 2023",
    startDate: "2024-03-10",
    endDate: "2024-03-17",
    status: "cancelled",
    totalValue: 1200,
    requestDate: "2024-03-05",
    agentNotes: "Cancelado pelo cliente",
  },
]

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  approved: { label: "Aprovado", color: "bg-green-100 text-green-800", icon: FileText },
  rejected: { label: "Rejeitado", color: "bg-red-100 text-red-800", icon: X },
  cancelled: { label: "Cancelado", color: "bg-gray-100 text-gray-800", icon: X },
}

export default function MyRequestsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState(null)

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <ProtectedRoute requiredUserType="client">
      <Header userType={user?.type} userName={user?.name} />
      <div className="flex">
        <Sidebar userType={user?.type} activeItem="my-requests" />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header da página */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Pedidos</h1>
              <p className="text-gray-600">Acompanhe o status dos seus pedidos de aluguel</p>
            </div>

            {/* Filtros e busca */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar por veículo ou ID do pedido..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="approved">Aprovado</SelectItem>
                        <SelectItem value="rejected">Rejeitado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de pedidos */}
            <div className="grid gap-6">
              {filteredRequests.map((request) => {
                const statusInfo = statusConfig[request.status]
                const StatusIcon = statusInfo.icon

                return (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                              <Car className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{request.vehicle}</h3>
                              <p className="text-sm text-gray-500">Pedido #{request.id}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Período</p>
                                <p className="font-medium">
                                  {formatDate(request.startDate)} - {formatDate(request.endDate)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Valor Total</p>
                                <p className="font-medium">{formatCurrency(request.totalValue)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Data do Pedido</p>
                                <p className="font-medium">{formatDate(request.requestDate)}</p>
                              </div>
                            </div>
                          </div>

                          {request.agentNotes && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                              <p className="text-sm text-gray-600">
                                <strong>Observações do agente:</strong> {request.agentNotes}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <Badge className={`${statusInfo.color} flex items-center gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusInfo.label}
                          </Badge>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Detalhes
                            </Button>

                            {request.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                Cancelar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredRequests.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || statusFilter !== "all"
                      ? "Tente ajustar os filtros de busca"
                      : "Você ainda não fez nenhum pedido de aluguel"}
                  </p>
                  <Button onClick={() => (window.location.href = "/new-request")}>Fazer Novo Pedido</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  CreditCard,
  Car,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"

interface RequestEvaluationProps {
  requestId: string
  onClose?: () => void
}

interface CreditAnalysis {
  score: number
  riskLevel: "low" | "medium" | "high"
  factors: {
    income: { score: number; status: "positive" | "negative" | "neutral" }
    employment: { score: number; status: "positive" | "negative" | "neutral" }
    creditHistory: { score: number; status: "positive" | "negative" | "neutral" }
    debtRatio: { score: number; status: "positive" | "negative" | "neutral" }
  }
  recommendation: "approve" | "reject" | "conditional"
  conditions?: string[]
}

const mockRequestData = {
  id: "REQ001",
  clientName: "João Silva Santos",
  clientCPF: "123.456.789-00",
  clientEmail: "joao.silva@email.com",
  clientPhone: "(11) 99999-9999",
  vehicleModel: "Civic",
  vehicleBrand: "Honda",
  vehicleYear: 2023,
  requestDate: "2024-01-15",
  startDate: "2024-02-01",
  endDate: "2024-08-01",
  monthlyValue: 1200,
  totalValue: 7200,
  pickupLocation: "São Paulo - Centro",
  returnLocation: "São Paulo - Centro",
  insuranceType: "complete",
  additionalServices: ["gps", "delivery"],
  observations: "Preciso do veículo para trabalho, viajo frequentemente a negócios.",
  employers: [
    {
      name: "Tech Solutions Ltda",
      position: "Desenvolvedor Sênior",
      monthlyIncome: 8500,
      workTime: "2-5",
    },
    {
      name: "Freelancer",
      position: "Consultor TI",
      monthlyIncome: 2000,
      workTime: "1-2",
    },
  ],
  totalIncome: 10500,
}

const mockCreditAnalysis: CreditAnalysis = {
  score: 750,
  riskLevel: "low",
  factors: {
    income: { score: 85, status: "positive" },
    employment: { score: 80, status: "positive" },
    creditHistory: { score: 75, status: "positive" },
    debtRatio: { score: 70, status: "positive" },
  },
  recommendation: "approve",
  conditions: [],
}

export function RequestEvaluation({ requestId, onClose }: RequestEvaluationProps) {
  const [decision, setDecision] = useState<"approve" | "reject" | "">("")
  const [comments, setComments] = useState("")
  const [conditions, setConditions] = useState<string[]>([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const request = mockRequestData
  const analysis = mockCreditAnalysis

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      low: { label: "Baixo Risco", variant: "default" as const, color: "text-green-600" },
      medium: { label: "Médio Risco", variant: "secondary" as const, color: "text-yellow-600" },
      high: { label: "Alto Risco", variant: "destructive" as const, color: "text-red-600" },
    }

    const config = riskConfig[risk as keyof typeof riskConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getFactorIcon = (status: string) => {
    switch (status) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getFactorColor = (status: string) => {
    switch (status) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const handleDecision = () => {
    console.log("Decisão:", decision)
    console.log("Comentários:", comments)
    console.log("Condições:", conditions)
    setShowConfirmDialog(false)
    onClose?.()
    // Implementar lógica de aprovação/rejeição
  }

  const comprometimentoRenda = (request.monthlyValue / request.totalIncome) * 100

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-sans font-bold text-foreground">Avaliação de Pedido</h2>
          <p className="text-muted-foreground">
            Pedido {request.id} - {request.clientName}
          </p>
        </div>
        <div className="flex gap-2">
          {getRiskBadge(analysis.riskLevel)}
          <Badge variant="outline">Score: {analysis.score}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal - Informações do pedido */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nome Completo</p>
                  <p className="text-base">{request.clientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CPF</p>
                  <p className="text-base">{request.clientCPF}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                  <p className="text-base">{request.clientEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                  <p className="text-base">{request.clientPhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes do Pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Detalhes do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Veículo</p>
                  <p className="text-base font-semibold">
                    {request.vehicleBrand} {request.vehicleModel} {request.vehicleYear}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Mensal</p>
                  <p className="text-base font-semibold">R$ {request.monthlyValue.toLocaleString()}</p>
                </div>
              </div>

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
                    <p className="text-sm font-medium">Retirada</p>
                    <p className="text-sm text-muted-foreground">{request.pickupLocation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Valor Total</p>
                    <p className="text-sm text-muted-foreground">R$ {request.totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {request.observations && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Observações do Cliente</p>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg">{request.observations}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informações Financeiras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Informações Financeiras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Renda Total</p>
                  <p className="text-2xl font-bold">R$ {request.totalIncome.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Comprometimento</p>
                  <p className="text-2xl font-bold">{comprometimentoRenda.toFixed(1)}%</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Score de Crédito</p>
                  <p className="text-2xl font-bold">{analysis.score}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Fontes de Renda</h4>
                {request.employers.map((employer, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{employer.name}</p>
                        <p className="text-sm text-muted-foreground">{employer.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {employer.monthlyIncome.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {employer.workTime === "2-5" ? "2-5 anos" : "1-2 anos"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral - Análise de crédito e decisão */}
        <div className="space-y-6">
          {/* Análise de Crédito */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Análise de Crédito
              </CardTitle>
              <CardDescription>Avaliação automática baseada nos dados fornecidos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{analysis.score}</div>
                <div className="mb-4">{getRiskBadge(analysis.riskLevel)}</div>
                <Progress value={(analysis.score / 850) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Score de 0 a 850</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Fatores de Análise</h4>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFactorIcon(analysis.factors.income.status)}
                      <span className="text-sm">Renda</span>
                    </div>
                    <span className={`text-sm font-medium ${getFactorColor(analysis.factors.income.status)}`}>
                      {analysis.factors.income.score}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFactorIcon(analysis.factors.employment.status)}
                      <span className="text-sm">Emprego</span>
                    </div>
                    <span className={`text-sm font-medium ${getFactorColor(analysis.factors.employment.status)}`}>
                      {analysis.factors.employment.score}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFactorIcon(analysis.factors.creditHistory.status)}
                      <span className="text-sm">Histórico</span>
                    </div>
                    <span className={`text-sm font-medium ${getFactorColor(analysis.factors.creditHistory.status)}`}>
                      {analysis.factors.creditHistory.score}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFactorIcon(analysis.factors.debtRatio.status)}
                      <span className="text-sm">Endividamento</span>
                    </div>
                    <span className={`text-sm font-medium ${getFactorColor(analysis.factors.debtRatio.status)}`}>
                      {analysis.factors.debtRatio.score}%
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {analysis.recommendation === "approve" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : analysis.recommendation === "reject" ? (
                    <XCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                  <span className="font-medium">
                    Recomendação:{" "}
                    {analysis.recommendation === "approve"
                      ? "Aprovar"
                      : analysis.recommendation === "reject"
                        ? "Rejeitar"
                        : "Condicional"}
                  </span>
                </div>
                {analysis.conditions && analysis.conditions.length > 0 && (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {analysis.conditions.map((condition, index) => (
                      <li key={index}>• {condition}</li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Decisão do Agente */}
          <Card>
            <CardHeader>
              <CardTitle>Decisão Final</CardTitle>
              <CardDescription>Tome sua decisão baseada na análise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Decisão</Label>
                <Select value={decision} onValueChange={setDecision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua decisão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Aprovar Pedido</SelectItem>
                    <SelectItem value="reject">Rejeitar Pedido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comentários</Label>
                <Textarea
                  id="comments"
                  placeholder="Adicione comentários sobre sua decisão..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                />
              </div>

              <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full" disabled={!decision}>
                    {decision === "approve" ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Aprovar Pedido
                      </>
                    ) : decision === "reject" ? (
                      <>
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeitar Pedido
                      </>
                    ) : (
                      "Selecione uma decisão"
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Decisão</DialogTitle>
                    <DialogDescription>
                      Você está prestes a <strong>{decision === "approve" ? "aprovar" : "rejeitar"}</strong> o pedido{" "}
                      {request.id} de {request.clientName}. Esta ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleDecision} variant={decision === "approve" ? "default" : "destructive"}>
                      Confirmar {decision === "approve" ? "Aprovação" : "Rejeição"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

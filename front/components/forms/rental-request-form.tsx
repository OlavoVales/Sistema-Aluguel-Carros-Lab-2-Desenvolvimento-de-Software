"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Car,
  CalendarIcon,
  CreditCard,
  User,
  Building,
  FileText,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  category: string
  monthlyRate: number
  features: string[]
  image: string
  available: boolean
}

interface EmployerInfo {
  name: string
  position: string
  monthlyIncome: number
  workTime: string
}

interface RentalFormData {
  // Dados do veículo
  vehicleId: string
  startDate: Date | undefined
  endDate: Date | undefined
  pickupLocation: string
  returnLocation: string

  // Dados pessoais (já preenchidos do perfil)
  fullName: string
  cpf: string
  rg: string
  email: string
  phone: string
  address: string

  // Informações financeiras
  employers: EmployerInfo[]
  totalIncome: number

  // Preferências e observações
  insuranceType: "basic" | "complete" | "premium"
  additionalServices: string[]
  observations: string

  // Termos e condições
  acceptTerms: boolean
  acceptPrivacy: boolean
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    category: "Sedan",
    monthlyRate: 1200,
    features: ["Ar condicionado", "Direção hidráulica", "Vidros elétricos", "Trava elétrica"],
    image: "/honda-civic-2023.jpg",
    available: true,
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    category: "Sedan",
    monthlyRate: 1100,
    features: ["Ar condicionado", "Direção elétrica", "Central multimídia", "Câmera de ré"],
    image: "/toyota-corolla-2022.jpg",
    available: true,
  },
  {
    id: "3",
    brand: "Chevrolet",
    model: "Onix",
    year: 2023,
    category: "Hatch",
    monthlyRate: 950,
    features: ["Ar condicionado", "Direção elétrica", "Vidros elétricos"],
    image: "/chevrolet-onix-2023.jpg",
    available: true,
  },
  {
    id: "4",
    brand: "Volkswagen",
    model: "T-Cross",
    year: 2023,
    category: "SUV",
    monthlyRate: 1400,
    features: ["Ar condicionado", "Central multimídia", "Sensor de estacionamento", "Teto solar"],
    image: "/volkswagen-t-cross-2023.jpg",
    available: false,
  },
]

const additionalServicesList = [
  { id: "gps", label: "GPS", price: 50 },
  { id: "child-seat", label: "Cadeirinha infantil", price: 30 },
  { id: "extra-driver", label: "Condutor adicional", price: 100 },
  { id: "delivery", label: "Entrega e retirada", price: 80 },
]

export function RentalRequestForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RentalFormData>({
    vehicleId: "",
    startDate: undefined,
    endDate: undefined,
    pickupLocation: "",
    returnLocation: "",
    fullName: "João Silva Santos", // Pré-preenchido do perfil
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    email: "joao.silva@email.com",
    phone: "",
    address: "Rua das Flores, 123 - Centro - São Paulo, SP",
    employers: [
      {
        name: "",
        position: "",
        monthlyIncome: 0,
        workTime: "",
      },
    ],
    totalIncome: 0,
    insuranceType: "basic",
    additionalServices: [],
    observations: "",
    acceptTerms: false,
    acceptPrivacy: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: keyof RentalFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpar erro do campo quando ele for atualizado
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addEmployer = () => {
    if (formData.employers.length < 3) {
      setFormData((prev) => ({
        ...prev,
        employers: [
          ...prev.employers,
          {
            name: "",
            position: "",
            monthlyIncome: 0,
            workTime: "",
          },
        ],
      }))
    }
  }

  const removeEmployer = (index: number) => {
    if (formData.employers.length > 1) {
      setFormData((prev) => ({
        ...prev,
        employers: prev.employers.filter((_, i) => i !== index),
      }))
    }
  }

  const updateEmployer = (index: number, field: keyof EmployerInfo, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      employers: prev.employers.map((emp, i) => (i === index ? { ...emp, [field]: value } : emp)),
    }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.vehicleId) newErrors.vehicleId = "Selecione um veículo"
        if (!formData.startDate) newErrors.startDate = "Selecione a data de início"
        if (!formData.endDate) newErrors.endDate = "Selecione a data de término"
        if (!formData.pickupLocation) newErrors.pickupLocation = "Informe o local de retirada"
        break

      case 2:
        if (!formData.phone) newErrors.phone = "Telefone é obrigatório"
        break

      case 3:
        if (formData.employers.length === 0) {
          newErrors.employers = "Adicione pelo menos uma fonte de renda"
        } else {
          formData.employers.forEach((emp, index) => {
            if (!emp.name) newErrors[`employer_${index}_name`] = "Nome da empresa é obrigatório"
            if (!emp.position) newErrors[`employer_${index}_position`] = "Cargo é obrigatório"
            if (emp.monthlyIncome <= 0) newErrors[`employer_${index}_income`] = "Renda deve ser maior que zero"
          })
        }
        break

      case 4:
        if (!formData.acceptTerms) newErrors.acceptTerms = "Você deve aceitar os termos e condições"
        if (!formData.acceptPrivacy) newErrors.acceptPrivacy = "Você deve aceitar a política de privacidade"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(4)) {
      console.log("Enviando pedido:", formData)
      // Implementar envio do formulário
      alert("Pedido enviado com sucesso! Você será redirecionado para o dashboard.")
    }
  }

  const selectedVehicle = mockVehicles.find((v) => v.id === formData.vehicleId)
  const monthsDiff =
    formData.startDate && formData.endDate
      ? Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
      : 0
  const totalVehicleCost = selectedVehicle ? selectedVehicle.monthlyRate * monthsDiff : 0
  const totalServicesCost = formData.additionalServices.reduce((sum, serviceId) => {
    const service = additionalServicesList.find((s) => s.id === serviceId)
    return sum + (service ? service.price * monthsDiff : 0)
  }, 0)
  const totalCost = totalVehicleCost + totalServicesCost

  const steps = [
    { number: 1, title: "Veículo e Período", icon: Car },
    { number: 2, title: "Dados Pessoais", icon: User },
    { number: 3, title: "Informações Financeiras", icon: CreditCard },
    { number: 4, title: "Revisão e Envio", icon: FileText },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-sans font-bold text-foreground mb-2">Solicitar Aluguel de Veículo</h2>
        <p className="text-muted-foreground">Preencha as informações para solicitar o aluguel do seu veículo</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2",
                      isActive && "border-primary bg-primary text-primary-foreground",
                      isCompleted && "border-primary bg-primary text-primary-foreground",
                      !isActive && !isCompleted && "border-muted-foreground text-muted-foreground",
                    )}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div className="ml-3">
                    <p className={cn("text-sm font-medium", isActive && "text-primary")}>Etapa {step.number}</p>
                    <p className={cn("text-xs text-muted-foreground", isActive && "text-primary/70")}>{step.title}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn("w-16 h-0.5 mx-4", isCompleted ? "bg-primary" : "bg-muted-foreground/30")} />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Vehicle and Period */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Selecione o Veículo
              </CardTitle>
              <CardDescription>Escolha o veículo que melhor atende às suas necessidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all",
                      formData.vehicleId === vehicle.id && "border-primary bg-primary/5",
                      !vehicle.available && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={() => vehicle.available && updateFormData("vehicleId", vehicle.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">
                          {vehicle.brand} {vehicle.model} {vehicle.year}
                        </h3>
                        <p className="text-sm text-muted-foreground">{vehicle.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">R$ {vehicle.monthlyRate.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">por mês</p>
                      </div>
                    </div>

                    <img
                      src={vehicle.image || "/placeholder.svg"}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />

                    <div className="flex flex-wrap gap-1 mb-3">
                      {vehicle.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {!vehicle.available && (
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Indisponível</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {errors.vehicleId && <p className="text-sm text-destructive mt-2">{errors.vehicleId}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Período do Aluguel
              </CardTitle>
              <CardDescription>Defina as datas de início e término do aluguel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? (
                          format(formData.startDate, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => updateFormData("startDate", date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Data de Término</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? (
                          format(formData.endDate, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => updateFormData("endDate", date)}
                        disabled={(date) => date < (formData.startDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup-location">Local de Retirada</Label>
                  <Select
                    value={formData.pickupLocation}
                    onValueChange={(value) => updateFormData("pickupLocation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o local" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sp-centro">São Paulo - Centro</SelectItem>
                      <SelectItem value="sp-aeroporto">São Paulo - Aeroporto Guarulhos</SelectItem>
                      <SelectItem value="rj-centro">Rio de Janeiro - Centro</SelectItem>
                      <SelectItem value="rj-aeroporto">Rio de Janeiro - Aeroporto Galeão</SelectItem>
                      <SelectItem value="bh-centro">Belo Horizonte - Centro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.pickupLocation && <p className="text-sm text-destructive">{errors.pickupLocation}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="return-location">Local de Devolução</Label>
                  <Select
                    value={formData.returnLocation}
                    onValueChange={(value) => updateFormData("returnLocation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o local" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same">Mesmo local de retirada</SelectItem>
                      <SelectItem value="sp-centro">São Paulo - Centro</SelectItem>
                      <SelectItem value="sp-aeroporto">São Paulo - Aeroporto Guarulhos</SelectItem>
                      <SelectItem value="rj-centro">Rio de Janeiro - Centro</SelectItem>
                      <SelectItem value="rj-aeroporto">Rio de Janeiro - Aeroporto Galeão</SelectItem>
                      <SelectItem value="bh-centro">Belo Horizonte - Centro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Personal Data */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados Pessoais
            </CardTitle>
            <CardDescription>Confirme e complete suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" value={formData.cpf} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rg">RG</Label>
                <Input id="rg" value={formData.rg} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço Completo</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                disabled
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <AlertCircle className="inline h-4 w-4 mr-1" />
                Os dados em cinza são provenientes do seu perfil e não podem ser alterados neste formulário. Para
                modificá-los, acesse a seção "Meu Perfil" no dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Financial Information */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informações de Renda
              </CardTitle>
              <CardDescription>
                Adicione suas fontes de renda para análise de crédito (máximo 3 empregadores)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.employers.map((employer, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Empregador {index + 1}</h4>
                    {formData.employers.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeEmployer(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome da Empresa *</Label>
                      <Input
                        placeholder="Nome da empresa"
                        value={employer.name}
                        onChange={(e) => updateEmployer(index, "name", e.target.value)}
                      />
                      {errors[`employer_${index}_name`] && (
                        <p className="text-sm text-destructive">{errors[`employer_${index}_name`]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Cargo/Função *</Label>
                      <Input
                        placeholder="Seu cargo na empresa"
                        value={employer.position}
                        onChange={(e) => updateEmployer(index, "position", e.target.value)}
                      />
                      {errors[`employer_${index}_position`] && (
                        <p className="text-sm text-destructive">{errors[`employer_${index}_position`]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Renda Mensal (R$) *</Label>
                      <Input
                        type="number"
                        placeholder="0,00"
                        value={employer.monthlyIncome || ""}
                        onChange={(e) => updateEmployer(index, "monthlyIncome", Number.parseFloat(e.target.value) || 0)}
                      />
                      {errors[`employer_${index}_income`] && (
                        <p className="text-sm text-destructive">{errors[`employer_${index}_income`]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Tempo de Trabalho</Label>
                      <Select
                        value={employer.workTime}
                        onValueChange={(value) => updateEmployer(index, "workTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-6">Menos de 6 meses</SelectItem>
                          <SelectItem value="6-12">6 meses a 1 ano</SelectItem>
                          <SelectItem value="1-2">1 a 2 anos</SelectItem>
                          <SelectItem value="2-5">2 a 5 anos</SelectItem>
                          <SelectItem value="5+">Mais de 5 anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              {formData.employers.length < 3 && (
                <Button variant="outline" onClick={addEmployer} className="w-full bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Empregador
                </Button>
              )}

              {errors.employers && <p className="text-sm text-destructive">{errors.employers}</p>}

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Renda Total Mensal:</span>
                  <span className="text-lg font-bold">
                    R$ {formData.employers.reduce((sum, emp) => sum + emp.monthlyIncome, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipo de Seguro</CardTitle>
              <CardDescription>Escolha a cobertura de seguro para o veículo</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.insuranceType}
                onValueChange={(value) => updateFormData("insuranceType", value)}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="basic" id="basic" />
                    <div className="flex-1">
                      <Label htmlFor="basic" className="font-medium">
                        Básico - Incluído
                      </Label>
                      <p className="text-sm text-muted-foreground">Cobertura básica contra terceiros</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="complete" id="complete" />
                    <div className="flex-1">
                      <Label htmlFor="complete" className="font-medium">
                        Completo - R$ 150/mês
                      </Label>
                      <p className="text-sm text-muted-foreground">Cobertura completa incluindo roubo e furto</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="premium" id="premium" />
                    <div className="flex-1">
                      <Label htmlFor="premium" className="font-medium">
                        Premium - R$ 250/mês
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Cobertura total com carro reserva e assistência 24h
                      </p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Serviços Adicionais</CardTitle>
              <CardDescription>Selecione os serviços extras que deseja contratar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {additionalServicesList.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id={service.id}
                      checked={formData.additionalServices.includes(service.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData("additionalServices", [...formData.additionalServices, service.id])
                        } else {
                          updateFormData(
                            "additionalServices",
                            formData.additionalServices.filter((s) => s !== service.id),
                          )
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor={service.id} className="font-medium">
                        {service.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">R$ {service.price}/mês</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
              <CardDescription>Informações adicionais sobre sua solicitação</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Descreva qualquer informação adicional relevante para sua solicitação..."
                value={formData.observations}
                onChange={(e) => updateFormData("observations", e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Review and Submit */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resumo da Solicitação
              </CardTitle>
              <CardDescription>Revise todas as informações antes de enviar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resumo do veículo */}
              {selectedVehicle && (
                <div>
                  <h4 className="font-medium mb-3">Veículo Selecionado</h4>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold">
                          {selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.year}
                        </h5>
                        <p className="text-sm text-muted-foreground">{selectedVehicle.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {selectedVehicle.monthlyRate.toLocaleString()}/mês</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resumo do período */}
              <div>
                <h4 className="font-medium mb-3">Período e Locais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Período</p>
                    <p className="font-medium">
                      {formData.startDate && format(formData.startDate, "dd/MM/yyyy")} -{" "}
                      {formData.endDate && format(formData.endDate, "dd/MM/yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">{monthsDiff} meses</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Retirada</p>
                    <p className="font-medium">{formData.pickupLocation}</p>
                  </div>
                </div>
              </div>

              {/* Resumo financeiro */}
              <div>
                <h4 className="font-medium mb-3">Resumo Financeiro</h4>
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Aluguel do veículo ({monthsDiff} meses)</span>
                    <span>R$ {totalVehicleCost.toLocaleString()}</span>
                  </div>
                  {formData.insuranceType !== "basic" && (
                    <div className="flex justify-between">
                      <span>Seguro {formData.insuranceType}</span>
                      <span>
                        R$ {((formData.insuranceType === "complete" ? 150 : 250) * monthsDiff).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {formData.additionalServices.length > 0 && (
                    <div className="flex justify-between">
                      <span>Serviços adicionais</span>
                      <span>R$ {totalServicesCost.toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>R$ {totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Termos e condições */}
              <div className="space-y-4">
                <h4 className="font-medium">Termos e Condições</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => updateFormData("acceptTerms", checked)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      Li e aceito os{" "}
                      <a href="#" className="text-primary hover:underline">
                        termos e condições
                      </a>{" "}
                      de aluguel de veículos, incluindo as políticas de uso, responsabilidades e penalidades.
                    </Label>
                  </div>
                  {errors.acceptTerms && <p className="text-sm text-destructive ml-6">{errors.acceptTerms}</p>}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => updateFormData("acceptPrivacy", checked)}
                    />
                    <Label htmlFor="privacy" className="text-sm leading-relaxed">
                      Concordo com a{" "}
                      <a href="#" className="text-primary hover:underline">
                        política de privacidade
                      </a>{" "}
                      e autorizo o uso dos meus dados para análise de crédito e processamento da solicitação.
                    </Label>
                  </div>
                  {errors.acceptPrivacy && <p className="text-sm text-destructive ml-6">{errors.acceptPrivacy}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Anterior
        </Button>

        <div className="flex gap-2">
          {currentStep < 4 ? (
            <Button onClick={nextStep}>Próximo</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-primary">
              Enviar Solicitação
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

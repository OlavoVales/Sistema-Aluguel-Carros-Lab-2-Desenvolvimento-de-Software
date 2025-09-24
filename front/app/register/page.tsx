"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Loader2 } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "client" as "client" | "agent",
    cpf: "",
    rg: "",
    address: "",
    profession: "",
    agentType: "" as "bank" | "company" | "",
  })
  const [error, setError] = useState("")

  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validações básicas
    if (!formData.name || !formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos obrigatórios")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    if (formData.type === "client" && (!formData.cpf || !formData.rg)) {
      setError("CPF e RG são obrigatórios para clientes")
      return
    }

    if (formData.type === "agent" && !formData.agentType) {
      setError("Tipo de agente é obrigatório")
      return
    }

    try {
      const success = await register(formData)
      if (success) {
        router.push("/")
      } else {
        setError("Erro ao criar conta. Tente novamente.")
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-sans font-bold text-foreground">AutoRent</h1>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-sans">Criar Conta</CardTitle>
            <CardDescription>Cadastre-se para acessar o sistema de gestão de aluguéis</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="client">Cliente</TabsTrigger>
                <TabsTrigger value="agent">Agente</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <TabsContent value="client" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange("cpf", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rg">RG *</Label>
                      <Input
                        id="rg"
                        placeholder="00.000.000-0"
                        value={formData.rg}
                        onChange={(e) => handleInputChange("rg", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro, cidade"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Profissão</Label>
                    <Input
                      id="profession"
                      placeholder="Sua profissão"
                      value={formData.profession}
                      onChange={(e) => handleInputChange("profession", e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="agent" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentType">Tipo de Agente *</Label>
                    <Select value={formData.agentType} onValueChange={(value) => handleInputChange("agentType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de agente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Banco</SelectItem>
                        <SelectItem value="company">Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Faça login aqui
                  </Link>
                </p>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

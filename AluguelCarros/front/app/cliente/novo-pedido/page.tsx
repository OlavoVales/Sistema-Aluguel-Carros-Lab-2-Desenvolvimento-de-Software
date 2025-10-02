"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Car, LogOut, ArrowLeft } from "lucide-react"

export default function NovoPedido() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    dataInicio: "",
    dataFim: "",
    localRetirada: "",
    localDevolucao: "",
    empregador1: "",
    rendimentoEmpregador1: "",
    empregador2: "",
    rendimentoEmpregador2: "",
    empregador3: "",
    rendimentoEmpregador3: "",
    precisaCredito: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const carroId = searchParams.get('carroId')
    const token = localStorage.getItem("authToken");

    if (!token) {
        setError("Sessão expirada. Por favor, faça login novamente.");
        setIsSubmitting(false);
        router.push("/login");
        return;
    }

    if (!carroId) {
      setError("ID do carro não encontrado na URL. Não é possível continuar.")
      setIsSubmitting(false)
      return
    }

    const payload = {
      dataInicio: formData.dataInicio,
      dataFim: formData.dataFim,
      localRetirada: formData.localRetirada,
      localDevolucao: formData.localDevolucao,
      empregador1: formData.empregador1,
      rendimentoEmpregador1: parseFloat(formData.rendimentoEmpregador1) || 0,
      empregador2: formData.empregador2 || null,
      rendimentoEmpregador2: parseFloat(formData.rendimentoEmpregador2) || null,
      empregador3: formData.empregador3 || null,
      rendimentoEmpregador3: parseFloat(formData.rendimentoEmpregador3) || null,
      carroId: parseInt(carroId, 10),
    }

    try {
      const response = await fetch("http://localhost:8080/aluguel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar o pedido. Verifique os dados e tente novamente.")
      }

      alert("Pedido de aluguel enviado com sucesso!")
      router.push("/cliente/pedidos")

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Ocorreu um erro inesperado.")
      }
      console.error("Erro ao submeter o formulário:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }
  
  return (
    <div className="min-h-screen flex flex-col">
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

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Aluguel</CardTitle>
              <CardDescription>Dados sobre o período e local do aluguel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataInicio">Data de Início</Label>
                    <Input id="dataInicio" name="dataInicio" type="date" value={formData.dataInicio} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataFim">Data de Término</Label>
                    <Input id="dataFim" name="dataFim" type="date" value={formData.dataFim} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="localRetirada">Local de Retirada</Label>
                  <Input id="localRetirada" name="localRetirada" placeholder="Endereço completo" value={formData.localRetirada} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="localDevolucao">Local de Devolução</Label>
                  <Input id="localDevolucao" name="localDevolucao" placeholder="Endereço completo" value={formData.localDevolucao} onChange={handleChange} required />
                </div>
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Informações Financeiras</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Informe até 3 fontes de renda (empregadores e rendimentos)
                  </p>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="empregador1">Empregador 1</Label>
                        <Input id="empregador1" name="empregador1" placeholder="Nome da empresa" value={formData.empregador1} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rendimentoEmpregador1">Rendimento Mensal</Label>
                        <Input id="rendimentoEmpregador1" name="rendimentoEmpregador1" type="number" placeholder="0.00" value={formData.rendimentoEmpregador1} onChange={handleChange} required />
                      </div>
                    </div>
                     <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="empregador2">Empregador 2 (opcional)</Label>
                        <Input id="empregador2" name="empregador2" placeholder="Nome da empresa" value={formData.empregador2} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rendimentoEmpregador2">Rendimento Mensal</Label>
                        <Input id="rendimentoEmpregador2" name="rendimentoEmpregador2" type="number" placeholder="0.00" value={formData.rendimentoEmpregador2} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="empregador3">Empregador 3 (opcional)</Label>
                        <Input id="empregador3" name="empregador3" placeholder="Nome da empresa" value={formData.empregador3} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rendimentoEmpregador3">Rendimento Mensal</Label>
                        <Input id="rendimentoEmpregador3" name="rendimentoEmpregador3" type="number" placeholder="0.00" value={formData.rendimentoEmpregador3} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="precisaCredito" name="precisaCredito" checked={formData.precisaCredito} onChange={handleChange} className="accent-primary" />
                  <Label htmlFor="precisaCredito" className="cursor-pointer">
                    Preciso de crédito/financiamento para este aluguel
                  </Label>
                </div>
                {error && <p className="text-center text-sm text-red-500">{error}</p>}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar Pedido"}
                  </Button>
                  <Link href="/cliente/dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
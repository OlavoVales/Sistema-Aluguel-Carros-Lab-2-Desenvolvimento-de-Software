"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Car } from "lucide-react"

export default function CadastroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    email: "",
    senha: "",
    endereco: "",
    profissao: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Este e-mail já está em uso. Tente outro.");
        }
        throw new Error("Ocorreu um erro ao tentar criar a conta.");
      }

      alert("Conta criada com sucesso! Você será redirecionado para o login.");
      router.push("/login");

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Um erro inesperado ocorreu.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Car className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold">RentCar</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cadastro de Cliente</CardTitle>
            <CardDescription>Preencha seus dados para criar uma conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" name="nome" placeholder="João Silva" value={formData.nome} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input id="rg" name="rg" placeholder="00.000.000-0" value={formData.rg} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profissao">Profissão</Label>
                  <Input id="profissao" name="profissao" placeholder="Engenheiro" value={formData.profissao} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" name="endereco" placeholder="Rua Exemplo, 123 - Bairro - Cidade/UF" value={formData.endereco} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" name="senha" type="password" placeholder="••••••••" value={formData.senha} onChange={handleChange} required />
              </div>

              {error && <p className="text-sm text-center text-red-500">{error}</p>}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Criando conta..." : "Criar Conta"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Faça login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
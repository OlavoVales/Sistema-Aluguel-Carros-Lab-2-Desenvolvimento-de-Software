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

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [tipoUsuario, setTipoUsuario] = useState<"cliente" | "agente">("cliente")

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Email ou senha inválidos. Tente novamente.");
      }

      const data = await response.json();
      const token = data.token;

      if (token) {
        localStorage.setItem("authToken", token);
      } else {
        throw new Error("Token não recebido do servidor.");
      }
      
      if (tipoUsuario === "cliente") {
        router.push("/cliente/dashboard");
      } else {
        router.push("/agente/dashboard");
      }

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Car className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold">RentCar</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar o sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Usuário</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tipo" value="cliente" checked={tipoUsuario === "cliente"} onChange={() => setTipoUsuario("cliente")} className="accent-primary" />
                    <span>Cliente</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tipo" value="agente" checked={tipoUsuario === "agente"} onChange={() => setTipoUsuario("agente")} className="accent-primary" />
                    <span>Agente</span>
                  </label>
                </div>
              </div>
              
              {error && <p className="text-sm text-center text-red-500">{error}</p>}
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
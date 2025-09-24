"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Loader2 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"client" | "agent">("client")
  const [error, setError] = useState("")

  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    try {
      const success = await login(email, password, userType)
      if (success) {
        router.push("/")
      } else {
        setError("Credenciais inválidas")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-sans font-bold text-foreground">AutoRent</h1>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-sans">Entrar no Sistema</CardTitle>
            <CardDescription>Acesse sua conta para gerenciar aluguéis de veículos</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "client" | "agent")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="client">Cliente</TabsTrigger>
                <TabsTrigger value="agent">Agente</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Cadastre-se aqui
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

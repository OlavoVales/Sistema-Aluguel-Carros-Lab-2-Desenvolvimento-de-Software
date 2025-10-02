"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, LogOut, FileText, Plus } from "lucide-react"

interface Carro {
  id: number
  marca: string
  modelo: string
  ano: number
  placa: string
  valorDiaria: number
  disponivel: boolean
}

export default function ClienteDashboard() {
  const [carros, setCarros] = useState<Carro[]>([])

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const res = await fetch("http://localhost:8080/carros")
        if (!res.ok) throw new Error("Erro ao buscar carros")
        const data: Carro[] = await res.json()
        setCarros(data)
      } catch (err) {
        console.error("Erro no fetch:", err)
      }
    }

    fetchCarros()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">RentCar</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/cliente/pedidos">
              <Button variant="ghost" className="gap-2">
                <FileText className="h-4 w-4" />
                Meus Pedidos
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Carros Disponíveis</h2>
          <p className="text-muted-foreground">Escolha o veículo ideal para você</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carros.map((carro) => (
            <Card key={carro.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Car className="h-20 w-20 text-muted-foreground/20" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>
                      {carro.marca} {carro.modelo}
                    </CardTitle>
                    <CardDescription>
                      Ano {carro.ano} • {carro.placa}
                    </CardDescription>
                  </div>
                  {carro.disponivel ? (
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      Disponível
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Indisponível</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">R$ {carro.valorDiaria}</p>
                    <p className="text-sm text-muted-foreground">por dia</p>
                  </div>
                  {carro.disponivel && (
                    <Link href={`/cliente/novo-pedido?carroId=${carro.id}`}>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Alugar
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

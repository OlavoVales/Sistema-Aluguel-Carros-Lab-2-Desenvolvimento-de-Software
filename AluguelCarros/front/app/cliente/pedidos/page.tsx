"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, LogOut, ArrowLeft, Calendar, DollarSign, User, MapPin, Briefcase } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

// A interface continua a mesma, com todos os campos
interface Aluguel {
  id: number;
  dataInicio: string;
  dataFim: string;
  localRetirada: string;
  localDevolucao: string;
  empregador1: string;
  rendimentoEmpregador1: number;
  empregador2: string;
  rendimentoEmpregador2: number;
  empregador3: string;
  rendimentoEmpregador3: number;
  carroModelo: string;
  carroMarca: string;
  carroPlaca: string;
  valorTotal: number;
}

export default function ClientePedidos() {
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMeusAlugueis = async () => {
      // ... sua lógica de fetch continua a mesma
      const token = localStorage.getItem("authToken");
      if (!token) { router.push("/login"); return; }
      try {
        const response = await fetch("http://localhost:8080/aluguel", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
          if (response.status === 403) { localStorage.removeItem("authToken"); router.push("/login"); }
          throw new Error("Falha ao buscar aluguéis.");
        }
        const data: Aluguel[] = await response.json();
        setAlugueis(data);
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchMeusAlugueis();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando seus pedidos...</div>;
  }

  // 1. O layout principal da página agora é o elemento raiz, como deveria ser.
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Meus Pedidos</h2>
          <p className="text-muted-foreground">Acompanhe o status dos seus aluguéis</p>
        </div>

        <div className="space-y-4">
          {alugueis.length === 0 ? (
            <Card><CardContent className="pt-6"><p>Você ainda não possui nenhum pedido de aluguel.</p></CardContent></Card>
          ) : (
            alugueis.map((aluguel) => (
              // 2. O componente <Dialog> agora envolve cada item do loop individualmente.
              <Dialog key={aluguel.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{aluguel.carroMarca} {aluguel.carroModelo}</CardTitle>
                        <CardDescription>Placa: {aluguel.carroPlaca}</CardDescription>
                      </div>
                      <Badge variant={"secondary"}>Em Análise</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Período</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(aluguel.dataInicio).toLocaleDateString("pt-BR", { timeZone: 'UTC' })} até{" "}
                            {new Date(aluguel.dataFim).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Valor Total</p>
                          <p className="text-sm text-muted-foreground">
                            {aluguel.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. O DialogContent fica aqui dentro do loop, associado a este Dialog específico */}
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Detalhes do Pedido #{aluguel.id}</DialogTitle>
                    <DialogDescription>
                      Resumo completo do seu pedido de aluguel para o veículo {aluguel.carroMarca} {aluguel.carroModelo}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4 border-b pb-4">
                      <h4 className="font-semibold col-span-2 flex items-center gap-2"><MapPin className="h-4 w-4" />Locais</h4>
                      <span className="text-sm text-muted-foreground">Local de Retirada</span>
                      <span className="text-right">{aluguel.localRetirada}</span>
                      <span className="text-sm text-muted-foreground">Local de Devolução</span>
                      <span className="text-right">{aluguel.localDevolucao}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4 border-b pb-4">
                      <h4 className="font-semibold col-span-2 flex items-center gap-2"><Briefcase className="h-4 w-4" />Informações Financeiras</h4>
                      <span className="text-sm text-muted-foreground">Empregador 1</span>
                      <span className="text-right">{aluguel.empregador1}</span>
                      <span className="text-sm text-muted-foreground">Rendimento 1</span>
                      <span className="text-right">{aluguel.rendimentoEmpregador1.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      {aluguel.empregador2 && (
                        <>
                          <span className="text-sm text-muted-foreground">Empregador 2</span>
                          <span className="text-right">{aluguel.empregador2}</span>
                          <span className="text-sm text-muted-foreground">Rendimento 2</span>
                          <span className="text-right">{aluguel.rendimentoEmpregador2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Fechar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
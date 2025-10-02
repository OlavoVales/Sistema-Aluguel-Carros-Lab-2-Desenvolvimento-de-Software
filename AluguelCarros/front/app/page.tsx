import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Shield, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">RentCar</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/cadastro">
              <Button>Cadastrar</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Aluguel de Carros Simplificado</h2>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            Reserve seu veículo em minutos. Processo 100% online com aprovação rápida.
          </p>
          <Link href="/cadastro">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Começar Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Como Funciona</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Escolha seu Carro</CardTitle>
                <CardDescription>
                  Navegue por nossa frota e selecione o veículo ideal para suas necessidades
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Análise Rápida</CardTitle>
                <CardDescription>Seu pedido é analisado por nossos agentes financeiros em até 24 horas</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Retire seu Veículo</CardTitle>
                <CardDescription>Após aprovação, retire seu carro e aproveite sua viagem</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Vantagens do RentCar</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block">Reserva Flexível</strong>
                    <span className="text-muted-foreground">Cancele ou modifique seu pedido a qualquer momento</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block">Crédito Disponível</strong>
                    <span className="text-muted-foreground">Opções de financiamento com bancos parceiros</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block">Processo 100% Online</strong>
                    <span className="text-muted-foreground">Tudo pela internet, sem burocracia</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="block">Frota Diversificada</strong>
                    <span className="text-muted-foreground">Carros para todos os perfis e necessidades</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <Car className="h-32 w-32 text-muted-foreground/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t mt-auto py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 RentCar. Sistema de Aluguel de Carros.</p>
        </div>
      </footer>
    </div>
  )
}

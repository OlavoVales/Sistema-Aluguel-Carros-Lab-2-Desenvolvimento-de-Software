"use client"

import { Car, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  userType?: "client" | "agent"
  userName?: string
}

export function Header({ userType = "client", userName = "Usuário" }: HeaderProps) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-sans font-bold text-foreground">AutoRent</h1>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-muted-foreground">Sistema de Gestão de Aluguéis</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{userType === "client" ? "Cliente" : "Agente"}:</span>
              <span className="text-sm font-medium text-foreground">{userName}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

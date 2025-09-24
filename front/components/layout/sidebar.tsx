"use client"

import { Car, FileText, Users, CreditCard, BarChart3, Settings, Home, Plus, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SidebarProps {
  userType: "client" | "agent"
  activeItem?: string
  onItemClick?: (item: string) => void
}

const clientMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
  { id: "new-request", label: "Novo Pedido", icon: Plus, href: "/new-request" },
  { id: "my-requests", label: "Meus Pedidos", icon: FileText, href: "/my-requests" },
  { id: "contracts", label: "Contratos", icon: CheckCircle, href: "/contracts" },
  { id: "profile", label: "Meu Perfil", icon: Users, href: "/profile" },
]

const agentMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
  { id: "requests", label: "Pedidos", icon: FileText, href: "/requests" },
  { id: "vehicles", label: "Veículos", icon: Car, href: "/vehicles" },
  { id: "contracts", label: "Contratos", icon: CheckCircle, href: "/contracts" },
  { id: "financial", label: "Financeiro", icon: CreditCard, href: "/financial" },
  { id: "reports", label: "Relatórios", icon: BarChart3, href: "/reports" },
  { id: "settings", label: "Configurações", icon: Settings, href: "/settings" },
]

export function Sidebar({ userType, activeItem = "dashboard", onItemClick }: SidebarProps) {
  const menuItems = userType === "client" ? clientMenuItems : agentMenuItems

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <Link key={item.id} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-left",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                  onClick={() => onItemClick?.(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar

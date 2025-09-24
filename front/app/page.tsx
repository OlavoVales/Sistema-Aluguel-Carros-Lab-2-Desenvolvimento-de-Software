"use client"

import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ClientDashboard } from "@/components/client/client-dashboard"
import { AgentDashboard } from "@/components/agent/agent-dashboard"
import { useState } from "react"

export default function HomePage() {
  const [activeItem, setActiveItem] = useState("dashboard")
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header userType={user?.type} userName={user?.name} />

        <div className="flex">
          <Sidebar userType={user?.type || "client"} activeItem={activeItem} onItemClick={setActiveItem} />

          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">{user?.type === "agent" ? <AgentDashboard /> : <ClientDashboard />}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

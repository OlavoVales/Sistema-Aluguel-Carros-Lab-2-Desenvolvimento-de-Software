"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ContractManagement } from "@/components/agent/contract-management"
import { useAuth } from "@/contexts/auth-context"

export default function ContractsPage() {
  const [activeItem, setActiveItem] = useState("contracts")
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header userType={user?.type} userName={user?.name} />

        <div className="flex">
          <Sidebar userType={user?.type || "client"} activeItem={activeItem} onItemClick={setActiveItem} />

          <main className="flex-1 p-6">
            <ContractManagement />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

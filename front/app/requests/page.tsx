"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { RequestEvaluation } from "@/components/agent/request-evaluation"
import { useAuth } from "@/contexts/auth-context"

export default function RequestsPage() {
  const [activeItem, setActiveItem] = useState("requests")
  const { user } = useAuth()

  return (
    <ProtectedRoute requiredUserType="agent">
      <div className="min-h-screen bg-background">
        <Header userType={user?.type} userName={user?.name} />

        <div className="flex">
          <Sidebar userType={user?.type || "agent"} activeItem={activeItem} onItemClick={setActiveItem} />

          <main className="flex-1 p-6">
            <RequestEvaluation requestId="REQ001" />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

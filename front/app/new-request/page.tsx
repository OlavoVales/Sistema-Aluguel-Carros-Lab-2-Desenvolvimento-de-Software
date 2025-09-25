"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { RentalRequestForm } from "@/components/forms/rental-request-form"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"

export default function NewRequestPage() {
  const [activeItem, setActiveItem] = useState("new-request")
  const { user } = useAuth()

  return (
    <ProtectedRoute requiredUserType="client">
      <div className="min-h-screen bg-background">
        <Header userType={user?.type} userName={user?.name} />

        <div className="flex">
          <Sidebar userType={user?.type || "client"} activeItem={activeItem} onItemClick={setActiveItem} />

          <main className="flex-1 p-6">
            <RentalRequestForm />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

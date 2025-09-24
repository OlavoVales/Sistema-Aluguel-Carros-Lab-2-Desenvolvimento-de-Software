"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: "client" | "agent"
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user && requiredUserType && user.type !== requiredUserType) {
      router.push("/") // Redireciona para dashboard apropriado
    }
  }, [user, isLoading, router, requiredUserType])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Carregando...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredUserType && user.type !== requiredUserType) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "client" | "agent"
  cpf?: string
  rg?: string
  address?: string
  profession?: string
  employers?: Array<{
    name: string
    income: number
  }>
  agentType?: "bank" | "company"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType: "client" | "agent") => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  type: "client" | "agent"
  cpf?: string
  rg?: string
  address?: string
  profession?: string
  agentType?: "bank" | "company"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular verificação de token armazenado
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: "client" | "agent"): Promise<boolean> => {
    setIsLoading(true)

    // Simulação de autenticação - em produção seria uma chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dados simulados para demonstração
    const mockUser: User = {
      id: "1",
      name: userType === "client" ? "João Silva" : "Maria Santos",
      email,
      type: userType,
      cpf: userType === "client" ? "123.456.789-00" : undefined,
      rg: userType === "client" ? "12.345.678-9" : undefined,
      address: userType === "client" ? "Rua das Flores, 123" : undefined,
      profession: userType === "client" ? "Engenheiro" : undefined,
      agentType: userType === "agent" ? "bank" : undefined,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)

    // Simulação de registro - em produção seria uma chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      type: userData.type,
      cpf: userData.cpf,
      rg: userData.rg,
      address: userData.address,
      profession: userData.profession,
      agentType: userData.agentType,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

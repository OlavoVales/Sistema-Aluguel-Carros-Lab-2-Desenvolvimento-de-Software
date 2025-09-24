"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import ProtectedRoute from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  DollarSign,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Shield,
  CreditCard,
} from "lucide-react"

// Mock data para demonstração
const mockUserProfile = {
  id: "1",
  name: "João Silva Santos",
  email: "joao.silva@email.com",
  phone: "(11) 99999-9999",
  rg: "12.345.678-9",
  cpf: "123.456.789-00",
  address: {
    street: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
  },
  profession: "Engenheiro de Software",
  employers: [
    {
      id: 1,
      company: "Tech Solutions Ltda",
      position: "Desenvolvedor Senior",
      income: 8500,
      startDate: "2022-01-15",
    },
    {
      id: 2,
      company: "Freelancer",
      position: "Consultor",
      income: 2000,
      startDate: "2023-06-01",
    },
  ],
  memberSince: "2023-01-15",
  totalRentals: 12,
  status: "active",
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockUserProfile)
  const [editingEmployer, setEditingEmployer] = useState(null)

  const handleSave = () => {
    // Aqui seria feita a chamada para a API para salvar os dados
    console.log("[v0] Salvando perfil:", profile)
    setIsEditing(false)
    setEditingEmployer(null)
  }

  const handleCancel = () => {
    // Restaurar dados originais
    setProfile(mockUserProfile)
    setIsEditing(false)
    setEditingEmployer(null)
  }

  const addEmployer = () => {
    const newEmployer = {
      id: Date.now(),
      company: "",
      position: "",
      income: 0,
      startDate: "",
    }
    setProfile({
      ...profile,
      employers: [...profile.employers, newEmployer],
    })
    setEditingEmployer(newEmployer.id)
  }

  const removeEmployer = (employerId: number) => {
    setProfile({
      ...profile,
      employers: profile.employers.filter((emp) => emp.id !== employerId),
    })
  }

  const updateEmployer = (employerId: number, field: string, value: any) => {
    setProfile({
      ...profile,
      employers: profile.employers.map((emp) => (emp.id === employerId ? { ...emp, [field]: value } : emp)),
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const totalIncome = profile.employers.reduce((sum, emp) => sum + emp.income, 0)

  return (
    <ProtectedRoute>
      <Header userType={user?.type} userName={user?.name} />
      <div className="flex">
        <Sidebar userType={user?.type} activeItem="profile" />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {/* Header da página */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
                <p className="text-gray-600">Gerencie suas informações pessoais e profissionais</p>
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coluna principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informações Pessoais */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informações Pessoais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="profession">Profissão</Label>
                        <Input
                          id="profession"
                          value={profile.profession}
                          onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="rg">RG</Label>
                        <Input
                          id="rg"
                          value={profile.rg}
                          onChange={(e) => setProfile({ ...profile, rg: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={profile.cpf}
                          onChange={(e) => setProfile({ ...profile, cpf: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Endereço */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Endereço
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Logradouro</Label>
                        <Input
                          id="street"
                          value={profile.address.street}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              address: { ...profile.address, street: e.target.value },
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          value={profile.address.neighborhood}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              address: { ...profile.address, neighborhood: e.target.value },
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input
                          id="zipCode"
                          value={profile.address.zipCode}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              address: { ...profile.address, zipCode: e.target.value },
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={profile.address.city}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              address: { ...profile.address, city: e.target.value },
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Select
                          value={profile.address.state}
                          onValueChange={(value) =>
                            setProfile({
                              ...profile,
                              address: { ...profile.address, state: value },
                            })
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            {/* Adicionar outros estados */}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informações Profissionais */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Informações Profissionais
                      </div>
                      {isEditing && profile.employers.length < 3 && (
                        <Button variant="outline" size="sm" onClick={addEmployer}>
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profile.employers.map((employer, index) => (
                      <div key={employer.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">Empregador {index + 1}</h4>
                          {isEditing && profile.employers.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEmployer(employer.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label>Empresa</Label>
                            <Input
                              value={employer.company}
                              onChange={(e) => updateEmployer(employer.id, "company", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <Label>Cargo</Label>
                            <Input
                              value={employer.position}
                              onChange={(e) => updateEmployer(employer.id, "position", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <Label>Renda Mensal</Label>
                            <Input
                              type="number"
                              value={employer.income}
                              onChange={(e) =>
                                updateEmployer(employer.id, "income", Number.parseFloat(e.target.value) || 0)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <Label>Data de Início</Label>
                            <Input
                              type="date"
                              value={employer.startDate}
                              onChange={(e) => updateEmployer(employer.id, "startDate", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar direita */}
              <div className="space-y-6">
                {/* Status da Conta */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Status da Conta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Membro desde</span>
                      <span className="text-sm font-medium">{formatDate(profile.memberSince)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total de aluguéis</span>
                      <span className="text-sm font-medium">{profile.totalRentals}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Resumo Financeiro */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Resumo Financeiro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Renda Total</span>
                      <span className="text-lg font-bold text-emerald-600">{formatCurrency(totalIncome)}</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      {profile.employers.map((employer, index) => (
                        <div key={employer.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{employer.company}</span>
                          <span className="font-medium">{formatCurrency(employer.income)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Ações Rápidas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Preferências de E-mail
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

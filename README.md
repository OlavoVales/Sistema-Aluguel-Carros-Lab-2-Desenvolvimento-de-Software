# 🚗 Sistema de Aluguel de Carros

![GitHub repo size](https://img.shields.io/github/repo-size/OlavoVales/Sistema-Aluguel-Carros-Lab-2-Desenvolvimento-de-Software)
![GitHub contributors](https://img.shields.io/github/contributors/OlavoVales/Sistema-Aluguel-Carros-Lab-2-Desenvolvimento-de-Software)
![GitHub last commit](https://img.shields.io/github/last-commit/OlavoVales/Sistema-Aluguel-Carros-Lab-2-Desenvolvimento-de-Software)
![GitHub issues](https://img.shields.io/github/issues/OlavoVales/Sistema-Aluguel-Carros-Lab-2-Desenvolvimento-de-Software)
![GitHub pull requests](https://img.shields.io/github/issues-pr/OlavoVales/Sistema-Aluguel-Carros-Lab-2-Desenvolvimento-de-Software)

---

## 📝 Descrição do Projeto

Este projeto foi desenvolvido como parte da disciplina **Laboratório de Desenvolvimento de Software (Lab 2)**.  
Trata-se de um **Sistema de Aluguel de Carros**, que permite:

- Cadastro e autenticação de usuários  
- Consulta de catálogo de automóveis disponíveis  
- Solicitação de aluguel de veículos  
- Acompanhamento de pedidos realizados  
- Painel administrativo para aprovação, rejeição ou cancelamento de pedidos  

---

## 👥 Integrantes

- Fernanda Soares Oliveira Cunha  
- Gabriel Reis Lebron de Oliveira  
- Olavo Vales Gomes de Castro Silva  

---

## 🛠 Tecnologias Utilizadas

- **Backend:** Spring Boot
- **Frontend:** Next.js  
- **Banco de Dados:** Supabase
- **Controle de Versão:** Git / GitHub  


---

## 🏗️ Arquitetura e Tecnologias

- ☕ **Java 21**, Spring Boot **3.5.5**  
- 📦 Spring Dependency Management   
- 🗄️ Spring Data JPA (H2 por padrão; PostgreSQL opcional)  
- 🔐 Spring Security (login/sessão)  
- 📝 Bean Validation (jakarta-validation)  
- 🧰 Lombok (anotações)  

---

## ☕ Linguagem e Build

- Java 17
- Maven
- Spring Boot 3.5.6

---

## 📂 Estrutura do Projeto

```bash
sistema-aluguel-carros/
├── backend/
│ ├── .mvn/
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/
│ │ │ │ └── com/aluguel/carros/ # Corrigido de "alquel" para "aluguel"
│ │ │ │ ├── carro/
│ │ │ │ │ ├── Carro.java # Entidade (Model)
│ │ │ │ │ ├── CarroRepository.java # Interface JPA
│ │ │ │ │ ├── CarroService.java # Regras de negócio
│ │ │ │ │ └── CarroDTO.java # Objeto de Transferência de Dados
│ │ │ │ │
│ │ │ │ ├── usuario/
│ │ │ │ │ ├── Usuario.java
│ │ │ │ │ ├── UsuarioRepository.java
│ │ │ │ │ ├── UsuarioService.java
│ │ │ │ │ └── UsuarioDTO.java
│ │ │ │ │
│ │ │ │ ├── pedido/
│ │ │ │ │ ├── Pedido.java
│ │ │ │ │ ├── PedidoRepository.java
│ │ │ │ │ ├── PedidoService.java
│ │ │ │ │ └── PedidoDTO.java
│ │ │ │ │
│ │ │ │ ├── controller/
│ │ │ │ │ ├── CarroController.java # Endpoints para /api/carros
│ │ │ │ │ ├── UsuarioController.java # Endpoints para /api/usuarios
│ │ │ │ │ └── PedidoController.java # Endpoints para /api/pedidos
│ │ │ │ │
│ │ │ │ ├── security/
│ │ │ │ │ ├── SecurityConfig.java # Configurações de segurança (rotas, cors)
│ │ │ │ │ └── TokenService.java # Geração/Validação de Tokens JWT
│ │ │ │ │
│ │ │ │ └── CarrosApplication.java # Classe principal da aplicação
│ │ │ │
│ │ │ └── resources/
│ │ │ ├── application.properties # Configurações do Spring (banco, etc.)
│ │ │ └── data.sql # Opcional: Carga inicial de dados
│ │ │
│ │ └── test/ # Testes unitários e de integração
│ │ └── java/com/aluguel/carros/
│ │
│ ├── .gitattributes
│ ├── .gitignore
│ ├── mvnw
│ ├── mvnw.cmd
│ └── pom.xml # Dependências e build do projeto Maven
│
└── front/
├── app/ # Diretório principal do App Router
│ ├── agente/
│ │ └── page.tsx # Página da área do Agente
│ ├── cadastro/
│ │ └── page.tsx # Página de cadastro de usuário
│ ├── cliente/
│ │ └── page.tsx # Página da área do Cliente
│ ├── login/
│ │ └── page.tsx # Página de login
│ │
│ ├── globals.css # Estilos globais
│ ├── layout.tsx # Layout principal da aplicação
│ └── page.tsx # Página inicial (Home)
│
├── components/ # Componentes React reutilizáveis (Button, Input, Card)
├── hooks/ # Hooks customizados (ex: useAuth, useFetch)
├── lib/ # Funções utilitárias, instâncias de API (axios)
├── public/ # Arquivos estáticos (imagens, fontes)
├── styles/ # Arquivos de estilo adicionais
│
├── .gitignore
├── components.json # Configuração para bibliotecas como a shadcn/ui
├── next.config.mjs # Arquivo de configuração do Next.js
└── package.json # Dependências e scripts do frontend
```

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
---

⚙️ Configuração do Ambiente
1. Clonar o Repositório
git clone https://github.com/OlavoVales/Sistema-Aluguel-Carros-Lab-2-Desenvolvimento-de-Software.git
cd Sistema-Aluguel-Carros-Lab-2-Desenvolvimento-de-Software

2. Configurar o Banco de Dados (Supabase)

O projeto utiliza PostgreSQL hospedado no Supabase.
Crie as tabelas necessárias (usuarios, carros, aluguel) e relacione-as de acordo com o desenvolvimento.

3. Configurar o Backend (Spring Boot)

Navegue até a pasta do backend:

cd backend


Vá para src/main/resources/.

Copie application.properties.example e renomeie para application.properties.

Configure suas credenciais do Supabase:

# URL de conexão com o banco
spring.datasource.url=jdbc:postgresql://SEU_HOST_DO_SUPABASE:5432/postgres

# Usuário e senha
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# JWT
api.security.token.secret=SUA_CHAVE_SECRETA_AQUI

4. Configurar o Frontend (Next.js)

Navegue até a pasta do frontend:

cd front


Crie um arquivo .env.local na raiz e adicione:

NEXT_PUBLIC_API_URL=http://localhost:8080

🚀 Como Rodar o Projeto
Iniciar o Backend
cd backend
mvn clean install
mvn spring-boot:run


➡️ Servidor rodando em: http://localhost:8080

Iniciar o Frontend
cd front
npm install
npm run dev


➡️ Aplicação rodando em: http://localhost:3000

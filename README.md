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

## 📋 Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Git  
- JDK 17 ou superior  
- Node.js v18 ou superior  
- Maven (geralmente já vem integrado em IDEs como IntelliJ e VS Code)  
- Um editor de código de sua preferência (ex: VS Code, IntelliJ IDEA)  

---

## ⚙ Configuração do Ambiente
Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### 1. Clonar o Repositório
```bash
git clone https://SEU-LINK-DO-REPOSITORIO-AQUI.git
cd NOME-DA-PASTA-DO-PROJETO
```

### 2. Configurar o Banco de Dados (Supabase)

Este projeto espera que as tabelas usuarios, carros e aluguel já existam no seu banco de dados Supabase.
Certifique-se de que as colunas e os relacionamentos foram criados conforme o desenvolvimento.

### 3. Configurar o Backend (Spring Boot)

O backend precisa das credenciais para se conectar ao seu banco de dados.

Navegue até a pasta do backend (ex: backend/ ou aluguel-carros/).

Vá para o diretório src/main/resources/.

Crie uma cópia do arquivo application.properties.example e renomeie-a para application.properties.

Abra o novo arquivo e preencha com as suas credenciais do Supabase:

## URL de conexão com o banco de dados PostgreSQL do Supabase
spring.datasource.url=jdbc:postgresql://SEU_HOST_DO_SUPABASE:5432/postgres

## Usuário do banco (geralmente 'postgres')
spring.datasource.username=postgres

## Senha do seu banco de dados
spring.datasource.password=SUA_SENHA_DO_BANCO

## Configurações do JPA/Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Chave secreta para a assinatura do Token JWT (gere uma chave segura)
api.security.token.secret=SUA_CHAVE_SECRETA_LONGA_E_SEGURA_AQUI

### 4. Configurar o Frontend (Next.js)

O frontend precisa saber a URL do seu backend.

Navegue até a pasta do frontend (ex: frontend/).

Crie um arquivo chamado .env.local na raiz desta pasta.

Adicione a seguinte linha ao arquivo:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 🚀 Como Rodar o Projeto

Para rodar a aplicação, você precisará iniciar o backend e o frontend em dois terminais separados.

Iniciar o Backend (Spring Boot)

Abra um terminal e navegue até a pasta do backend.
```bash
mvn clean install
```
Inicie o servidor:
```bash
mvn spring-boot:run
```
➡️ O servidor backend estará rodando em http://localhost:8080


## Iniciar o Frontend (Next.js)

Abra um novo terminal e navegue até a pasta do frontend.

Instale as dependências do projeto:
```bash
npm install
```
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
➡️ A aplicação frontend estará acessível em http://localhost:3000

Agora, basta abrir o navegador em http://localhost:3000 para usar o sistema 🚀

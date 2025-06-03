
# Investment Office

Sistema completo para gestão de clientes e ativos financeiros, voltado para escritórios de investimentos.

## Visão Geral

O projeto é composto por dois módulos principais:

- **Frontend:** Aplicação web moderna e responsiva desenvolvida em Next.js, React e TypeScript, com UI baseada em ShadCN.
- **Backend:** API robusta construída com Node.js, Fastify, Prisma ORM e banco de dados MySQL, containerizada com Docker Compose.

## Funcionalidades

- Cadastro, listagem, edição e remoção de clientes
- Cadastro, listagem e consulta de ativos financeiros
- Associação e desvinculação de ativos a clientes
- Visualização das alocações de ativos por cliente
- Validação de dados e formulários com Zod
- Interface intuitiva e responsiva
- Comunicação frontend-backend via Axios

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, TypeScript, ShadCN UI, Axios, React Hook Form, Zod
- **Backend:** Node.js, Fastify, Prisma ORM, Zod
- **Banco de Dados:** MySQL (via Docker)
- **DevOps:** Docker Compose

## Estrutura do Projeto

```
Investment Office/
  frontend/   # Aplicação web (Next.js)
  backend/    # API, banco de dados e Docker Compose (Node.js, Fastify, Prisma, MySQL)
```
### Estrutura do Frontend

```
src/
  app/
    clientes/           # Páginas e componentes de clientes
      [id]/ativos/      # Páginas e componentes de ativos por cliente
    components/ui/      # Componentes de UI reutilizáveis (ShadCN)
  services/             # Serviços de acesso à API
  hooks/                # Hooks customizados
  lib/schemas/          # Schemas de validação Zod
  types/                # Tipos TypeScript
```
### Estrutura do Backend

- API RESTful com rotas para clientes e ativos
- Prisma ORM para migrations e acesso ao banco
- Validação de dados com Zod
- Container Docker com Docker Compose para backend e MySQL (localizado dentro da pasta `backend`)

## Como rodar o projeto

### 1. Clonar o repositório

```sh
git clone <repo-url>
cd "Investment Office"
```

### 2. Rodar o backend com Docker Compose

```sh
cd backend
docker-compose up --build
```

- O backend estará disponível em: `http://localhost:3000`
- O banco MySQL será inicializado e vinculado ao backend

### 3. Rodar o frontend localmente

```sh
cd ../frontend
npm install
npm run dev
```

- O frontend estará disponível em: `http://localhost:3001` (ou porta configurada)
- A aplicação frontend se comunica com o backend via API

### 4. Configuração das variáveis de ambiente

- No backend, configure o arquivo `.env` baseado no `.env.example` (na pasta `backend`), principalmente a variável `DATABASE_URL` para conexão com o MySQL.
- No frontend, ajuste as variáveis conforme necessidade para apontar para a URL do backend.

---

## Endpoints principais do Backend

| Método | Rota                            | Descrição                          |
|--------|--------------------------------|----------------------------------|
| POST   | `/clientes`                    | Cria um novo cliente             |
| GET    | `/clientes`                    | Lista todos os clientes          |
| PUT    | `/clientes/:id`                | Atualiza um cliente              |
| DELETE | `/clientes/:id`                | Remove um cliente e associações |
| GET    | `/clientes/:id/assets`         | Lista ativos de um cliente       |
| POST   | `/clientes/:id/assets`         | Associa um ativo a um cliente    |
| DELETE | `/clientes/:id/assets/:assetId`| Remove associação de ativo       |
| GET    | `/assets`                     | Lista todos os ativos            |
| GET    | `/assets/:id`                 | Consulta um ativo                |

---

## Contribuição

Pull requests são bem-vindos! Para contribuir:

- Abra uma issue para discutir a sugestão
- Envie um pull request detalhando suas alterações

---

Projeto desenvolvido para escritórios de investimentos. Para dúvidas ou sugestões, entre em contato.

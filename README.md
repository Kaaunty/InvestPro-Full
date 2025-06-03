# Investment Office

Sistema completo para gestão de clientes e ativos financeiros, voltado para escritórios de investimentos.

## Visão Geral

O projeto é composto por dois módulos principais:

- **Frontend:** Aplicação web moderna e responsiva desenvolvida em Next.js, React e TypeScript, com UI baseada em ShadCN.
- **Backend:** API robusta construída com Node.js, Fastify, Prisma ORM e banco de dados MySQL.

## Funcionalidades

- Cadastro, listagem, edição e remoção de clientes
- Cadastro, listagem e consulta de ativos financeiros
- Associação e desvinculação de ativos a clientes
- Visualização das alocações de ativos por cliente
- Validação de dados e formulários com Zod
- Interface intuitiva e responsiva
- Comunicação frontend-backend via Axios
- Projeto containerizado com Docker Compose

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, TypeScript, ShadCN UI, Axios, React Hook Form, Zod
- **Backend:** Node.js, Fastify, Prisma ORM, Zod
- **Banco de Dados:** MySQL (via Docker)
- **DevOps:** Docker Compose

## Estrutura do Projeto

```
Investment Office/
  frontend/   # Aplicação web (Next.js)
  backend/    # API e banco de dados (Node.js, Fastify, Prisma, MySQL)
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

## Como rodar o projeto

### 1. Clonar o repositório

```sh
git clone <repo-url>
cd "Investment Office"
```

### 2. Subir o ambiente com Docker Compose

```sh
docker-compose up --build
```

- Acesse o frontend em: `http://localhost:3001` (ajuste conforme configuração)
- Acesse a API backend em: `http://localhost:3000`

### 3. Variáveis de ambiente

Veja o arquivo `.env.example` na pasta `backend` para configurar as variáveis necessárias, como a URL do banco de dados.

## Endpoints principais do Backend

- `POST   /clientes` — Cria um novo cliente
- `GET    /clientes` — Lista todos os clientes
- `PUT    /clientes/:id` — Atualiza um cliente
- `DELETE /clientes/:id` — Remove um cliente (e suas associações)
- `GET    /clientes/:id/assets` — Lista ativos de um cliente
- `POST   /clientes/:id/assets` — Associa um ativo a um cliente
- `DELETE /clientes/:id/assets/:assetId` — Remove associação de ativo
- `GET    /assets` — Lista todos os ativos
- `GET    /assets/:id` — Consulta um ativo

## Contribuição

Pull requests são bem-vindos! Para contribuir, abra uma issue ou envie um PR.

---

Projeto desenvolvido para escritórios de investimentos. Para dúvidas ou sugestões, entre em contato.

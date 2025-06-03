# Investment Office Backend

API backend para gestão de clientes e ativos financeiros, utilizando Node.js, TypeScript, Fastify, Prisma e MySQL.

## Funcionalidades

- Cadastro, listagem, edição e remoção de clientes
- Cadastro, listagem e consulta de ativos financeiros
- Associação e desvinculação de ativos a clientes
- Validação de dados com Zod
- Migrations e acesso a banco de dados via Prisma ORM

## Requisitos

- Docker e Docker Compose

## Subindo o projeto

1. Clone o repositório e acesse a pasta do projeto.
2. Execute:

```sh
docker-compose up --build
```

A API estará disponível em `http://localhost:3000` e o banco MySQL em `localhost:3306`.

## Variáveis de ambiente

Veja o arquivo `.env` de exemplo:

```
DATABASE_URL="mysql://root:S3cur3P@ssw0rd@db:3306/investment_office"
PORT=3000
HOST=0.0.0.0
```

## Endpoints principais

- `POST   /clientes` — Cria um novo cliente
- `GET    /clientes` — Lista todos os clientes
- `PUT    /clientes/:id` — Atualiza um cliente
- `DELETE /clientes/:id` — Remove um cliente (e suas associações)
- `GET    /clientes/:id/assets` — Lista ativos de um cliente
- `POST   /clientes/:id/assets` — Associa um ativo a um cliente
- `DELETE /clientes/:id/assets/:assetId` — Remove associação de ativo
- `GET    /assets` — Lista todos os ativos
- `GET    /assets/:id` — Consulta um ativo

## Migrations e seed

As migrations Prisma são aplicadas automaticamente ao subir o backend. Para popular ativos de exemplo, rode:

```sh
docker-compose exec backend npm run prisma -- db seed
```

## Observações

- O backend aguarda o banco MySQL estar pronto antes de iniciar.
- O campo `email` do cliente é único.
- Ao remover um cliente, todas as associações com ativos são removidas automaticamente.

---

> Projeto para fins de estudo e demonstração.

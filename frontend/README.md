# InvestPro

Aplicação para gestão de clientes e ativos financeiros para escritórios de investimentos.

## Funcionalidades

- Cadastro, listagem e edição de clientes (nome, email, status ativo/inativo)
- Cadastro e exibição de ativos financeiros (nome, tipo, valor)
- Associação de ativos a clientes e visualização das alocações
- Interface moderna e responsiva com Next.js, TypeScript e ShadCN UI
- Backend Node.js com Fastify, Prisma ORM e banco MySQL
- Validação de formulários com React Hook Form + Zod
- Comunicação frontend-backend via Axios
- Projeto containerizado com Docker Compose

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, TypeScript, ShadCN UI, Axios, React Hook Form, Zod
- **Backend:** Node.js, Fastify, Prisma ORM, Zod
- **Banco de Dados:** MySQL (via Docker)
- **DevOps:** Docker Compose

## Estrutura do Projeto

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

## Como rodar o projeto

### 1. Clonar o repositório

```sh
git clone <repo-url>
cd InvestPro
```

### 2. Subir o ambiente com Docker Compose

```sh
docker-compose up --build
```

Isso irá subir o banco MySQL e o backend.

### 3. Instalar dependências do frontend

```sh
npm install
```

### 4. Rodar o frontend

```sh
npm run dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Scripts úteis

- `npm run dev` — inicia o frontend em modo desenvolvimento
- `docker-compose up` — sobe backend e banco de dados
- `npx prisma migrate dev` — executa as migrações do banco

## Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configuração de URLs e credenciais sensíveis. Crie um arquivo `.env` na raiz do projeto frontend e backend conforme necessário.

### Exemplo de `.env` para o frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

No código, utilize:

```ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
```

### Exemplo de `.env` para o backend:

```
DATABASE_URL="mysql://usuario:senha@host:3306/nome_do_banco"
PORT=3000
```

> **Importante:** Nunca suba arquivos `.env` para o repositório (adicione ao `.gitignore`).

## Observações

- O backend deve estar rodando em http://localhost:3000 para o frontend funcionar corretamente.
- O projeto utiliza validação de unicidade de e-mail para clientes.
- O frontend é 100% TypeScript e utiliza componentes reutilizáveis.

## Licença

MIT

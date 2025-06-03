import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import cors from "@fastify/cors";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const fastify: FastifyInstance = Fastify({ logger: true });
const prisma = new PrismaClient();

// Zod schemas
type ClientStatus = "ativo" | "inativo";
const clientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.enum(["ativo", "inativo"]),
});

const assetSchema = z.object({
  nome: z.string().min(1),
  tipo: z.string().min(1),
  valor: z.number().min(0),
});

fastify.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

fastify.post(
  "/clientes",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const parse = clientSchema.safeParse((request as any).body);
    if (!parse.success) return reply.status(400).send(parse.error);
    try {
      const client = await prisma.client.create({
        data: parse.data as {
          name: string;
          email: string;
          status: "ativo" | "inativo";
        },
      });
      reply.send(client);
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        return reply.status(409).send({ message: "E-mail já cadastrado." });
      }
      throw error;
    }
  }
);

fastify.get(
  "/clientes",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const clients = await prisma.client.findMany({
      select: { id: true, name: true, email: true, status: true },
    });
    reply.send(clients);
  }
);

fastify.put(
  "/clientes/:id",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);
    const parse = clientSchema.safeParse((request as any).body);
    if (!parse.success) return reply.status(400).send(parse.error);
    const client = await prisma.client.update({
      where: { id },
      data: parse.data,
    });
    reply.send(client);
  }
);

fastify.delete(
  "/clientes/:id",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);
    const parse = z.object({ id: z.number() }).safeParse({ id });
    if (!parse.success) return reply.status(400).send(parse.error);
    const clientExists = await prisma.client.findUnique({ where: { id } });
    if (!clientExists)
      return reply.status(404).send({ message: "Client not found" });
    // Deleta todos os clientAssets relacionados antes de deletar o cliente
    await prisma.clientAsset.deleteMany({ where: { clientId: id } });
    await prisma.client.delete({ where: { id } });
    return reply.send({ message: "Client deleted successfully" });
  }
);

fastify.get(
  "/clientes/:id/assets",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);
    if (isNaN(id)) return reply.status(400).send({ message: "ID inválido" });
    const clientAssets = await prisma.clientAsset.findMany({
      where: { clientId: id },
      include: {
        asset: { select: { id: true, nome: true, tipo: true, valor: true } },
      },
    });
    const assets = clientAssets.map((ca) => ({
      relationId: ca.id,
      ...ca.asset,
    }));
    reply.send(assets);
  }
);

fastify.post(
  "/clientes/:id/assets",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);
    if (isNaN(id)) return reply.status(400).send({ message: "ID inválido" });
    const { assetId } = request.body as any;
    if (!assetId || isNaN(Number(assetId)))
      return reply.status(400).send({ message: "assetId inválido" });
    const asset = await prisma.asset.findUnique({
      where: { id: Number(assetId) },
    });
    if (!asset)
      return reply.status(404).send({ message: "Asset não encontrado" });
    const relation = await prisma.clientAsset.create({
      data: { clientId: id, assetId: Number(assetId) },
    });
    reply.send(relation);
  }
);

fastify.delete(
  "/clientes/:id/assets/:assetId",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);
    const assetId = Number((request.params as any).assetId);
    if (isNaN(id) || isNaN(assetId))
      return reply.status(400).send({ message: "ID inválido" });
    const relation = await prisma.clientAsset.findFirst({
      where: { clientId: id, id: assetId },
    });
    if (!relation)
      return reply
        .status(404)
        .send({ message: "Relação Client-Asset não encontrada" });
    await prisma.clientAsset.delete({ where: { id: relation.id } });
    reply.send({ message: "Asset desvinculado do cliente com sucesso" });
  }
);

fastify.get("/assets", async (request: FastifyRequest, reply: FastifyReply) => {
  const assets = await prisma.asset.findMany({
    select: { id: true, nome: true, tipo: true, valor: true },
  });
  if (assets.length === 0) {
    return reply.status(404).send({ message: "Nenhum asset encontrado" });
  }
  reply.send(assets);
});

fastify.get(
  "/assets/:id",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number((request.params as any).id);
    if (isNaN(id)) return reply.status(400).send({ message: "ID inválido" });
    const asset = await prisma.asset.findUnique({
      where: { id },
      select: { id: true, nome: true, tipo: true, valor: true },
    });
    if (!asset)
      return reply.status(404).send({ message: "Asset não encontrado" });
    reply.send(asset);
  }
);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.HOST || "0.0.0.0";

fastify.listen({ port, host });

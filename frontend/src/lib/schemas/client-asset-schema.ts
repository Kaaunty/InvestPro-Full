import { z } from "zod";

export const clientAssetSchema = z.object({
  id: z.string().optional(), // Opcional para novos ativos
  clientId: z.string(), // Obrigatório, mas será preenchido automaticamente
  nome: z
    .string()
    .min(2, { message: "Nome do ativo deve ter pelo menos 2 caracteres." }),
  tipo: z
    .string()
    .min(2, { message: "Tipo do ativo deve ter pelo menos 2 caracteres." }),
  valor: z.coerce
    .number()
    .positive({ message: "Valor do ativo deve ser um número positivo." }),
});

export type ClientAssetFormData = z.infer<typeof clientAssetSchema>;

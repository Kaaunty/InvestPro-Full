import { z } from 'zod';

export const clientSchema = z.object({
  id: z.string().optional(), // Optional for new clients
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  status: z.enum(['ativo', 'inativo'], { required_error: "O status é obrigatório." }),
});

export type ClientFormData = z.infer<typeof clientSchema>;

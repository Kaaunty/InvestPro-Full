"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientSchema, type ClientFormData } from "@/lib/schemas/client-schema";
import type { Client } from "@/types";
import { useEffect } from "react";

interface ClientFormProps {
  client?: Client | null;
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
}

export function ClientForm({ client, onSubmit, onCancel }: ClientFormProps) {
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: client?.id ? String(client.id) : undefined,
      name: client?.name || "",
      email: client?.email || "",
      status: client?.status || "ativo",
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        id: String(client.id), // Garante que o id é string
        name: client.name,
        email: client.email,
        status: client.status,
      });
    } else {
      form.reset({
        id: undefined,
        name: "",
        email: "",
        status: "ativo",
      });
    }
  }, [client]);

  const handleSubmit = (data: ClientFormData) => {
    console.log("[ClientForm] handleSubmit called", data);
    if (typeof onSubmit === "function") {
      console.log("[ClientForm] onSubmit is a function, calling...");
      onSubmit(data);
    } else {
      console.error("[ClientForm] onSubmit não é uma função!", onSubmit);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          console.log("[ClientForm] form onSubmit event", e);
          form.handleSubmit(handleSubmit, (errors) => {
            console.log("[ClientForm] validation errors", errors);
          })(e);
        }}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo do cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="hidden" {...form.register("id")} />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {client ? "Salvar Alterações" : "Adicionar Cliente"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientForm } from "./client-form";
import type { Client } from "@/types";
import type { ClientFormData } from "@/lib/schemas/client-schema";

interface ClientDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
  onSubmit: (data: ClientFormData) => void;
}

export function ClientDialog({ isOpen, onOpenChange, client, onSubmit }: ClientDialogProps) {
  const handleDialogClose = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{client ? "Editar Cliente" : "Adicionar Novo Cliente"}</DialogTitle>
          <DialogDescription>
            {client ? "Faça alterações nos dados do cliente." : "Preencha os dados para adicionar um novo cliente."}
          </DialogDescription>
        </DialogHeader>
        <ClientForm client={client} onSubmit={onSubmit} onCancel={handleDialogClose} />
      </DialogContent>
    </Dialog>
  );
}

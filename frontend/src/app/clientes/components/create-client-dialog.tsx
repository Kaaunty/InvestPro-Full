"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientForm } from "./client-form";
import type { ClientFormData } from "@/lib/schemas/client-schema";

interface CreateClientDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClientFormData) => void;
}

export function CreateClientDialog({
  isOpen,
  onOpenChange,
  onSubmit,
}: CreateClientDialogProps) {
  const handleDialogClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">
            Adicionar Novo Cliente
          </DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar um novo cliente.
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          client={null}
          onSubmit={onSubmit}
          onCancel={handleDialogClose}
        />
      </DialogContent>
    </Dialog>
  );
}

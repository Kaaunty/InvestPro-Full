"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientAssetForm } from "./client-asset-form";
import type { ClientAsset, Asset } from "@/types";
import type { ClientAssetFormData } from "@/lib/schemas/client-asset-schema";

interface ClientAssetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asset?: ClientAsset | null;
  clientId: string;
  assets: Asset[];
  onSubmit: (data: { assetId: number; clientId: string }) => void;
}

export function ClientAssetDialog({
  isOpen,
  onOpenChange,
  asset,
  clientId,
  assets,
  onSubmit,
}: ClientAssetDialogProps) {
  const handleDialogClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">
            {asset
              ? "Editar Ativo do Cliente"
              : "Adicionar Novo Ativo ao Cliente"}
          </DialogTitle>
          <DialogDescription>
            {asset
              ? "Faça alterações nos dados do ativo."
              : "Preencha os dados para adicionar um novo ativo para este cliente."}
          </DialogDescription>
        </DialogHeader>
        <ClientAssetForm
          asset={asset}
          clientId={clientId}
          assets={assets}
          onSubmit={onSubmit}
          onCancel={handleDialogClose}
        />
      </DialogContent>
    </Dialog>
  );
}

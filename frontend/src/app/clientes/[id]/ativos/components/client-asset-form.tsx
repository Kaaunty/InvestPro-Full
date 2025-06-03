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
import {
  clientAssetSchema,
  type ClientAssetFormData,
} from "@/lib/schemas/client-asset-schema";
import type { ClientAsset, AvailableAsset, Asset } from "@/types";
import { useEffect, useState } from "react";

interface ClientAssetFormProps {
  asset?: ClientAsset | null;
  clientId: string;
  assets: Asset[];
  onSubmit: (data: { assetId: number; clientId: string }) => void;
  onCancel: () => void;
}

// Mock data para simular ativos vindos de uma API
const mockAvailableAssets: AvailableAsset[] = [
  { ticker: "PETR4", currentPrice: 38.5 },
  { ticker: "VALE3", currentPrice: 62.75 },
  { ticker: "MGLU3", currentPrice: 1.98 },
  { ticker: "ITUB4", currentPrice: 32.15 },
  { ticker: "BBDC4", currentPrice: 15.5 },
  { ticker: "TESOUROSELIC2029", currentPrice: 100.0 }, // Exemplo de renda fixa
  { ticker: "FIIXPML11", currentPrice: 110.2 }, // Exemplo de FII
];

export function ClientAssetForm({
  asset,
  clientId,
  assets,
  onSubmit,
  onCancel,
}: ClientAssetFormProps) {
  const [selectedAssetId, setSelectedAssetId] = useState<number | undefined>(
    asset ? Number(asset.id) : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAssetId) {
      onSubmit({ assetId: selectedAssetId, clientId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="assetId" className="block mb-2">
          Ativo
        </label>
        <select
          id="assetId"
          value={selectedAssetId}
          onChange={(e) => setSelectedAssetId(Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Selecione um ativo</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.nome} ({asset.tipo}) - R$ {asset.valor}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {asset ? "Salvar Alterações" : "Adicionar Ativo"}
        </Button>
      </div>
    </form>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter for navigation
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { ClientAssetTable } from "./components/client-asset-table";
import { ClientAssetDialog } from "./components/client-asset-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Client, Asset, ClientAsset } from "@/types";
import type { ClientAssetFormData } from "@/lib/schemas/client-asset-schema";
import { useToast } from "@/hooks/use-toast";
import {
  clientAssetService,
  assetService,
  clientService,
} from "@/services/api";

export default function ClienteAtivosPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [clientAssets, setClientAssets] = useState<ClientAsset[]>([]);
  const [clientName, setClientName] = useState<string>("Cliente");
  const [isMounted, setIsMounted] = useState(false);
  const [isAssetDialogOpen, setIsAssetDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<ClientAsset | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingAssetId, setDeletingAssetId] = useState<string | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);

  // Paginação para ativos do cliente
  const [clientAssetsPage, setClientAssetsPage] = useState(1);
  const clientAssetsPerPage = 5;
  const clientAssetsTotalPages = Math.ceil(
    clientAssets.length / clientAssetsPerPage
  );
  const paginatedClientAssets = clientAssets.slice(
    (clientAssetsPage - 1) * clientAssetsPerPage,
    clientAssetsPage * clientAssetsPerPage
  );

  // Paginação para lista fixa de ativos
  const [assetsPage, setAssetsPage] = useState(1);
  const assetsPerPage = 5;
  const assetsTotalPages = Math.ceil(assets.length / assetsPerPage);
  const paginatedAssets = assets.slice(
    (assetsPage - 1) * assetsPerPage,
    assetsPage * assetsPerPage
  );

  const { toast } = useToast();

  useEffect(() => {
    setClientAssets([]); // Limpa antes de buscar para evitar duplicação
    // Buscar clientes da API usando clientService
    clientService
      .getAll()
      .then((res) => {
        const clients = res.data;
        const currentClient = clients.find(
          (c: Client) => String(c.id) === clientId
        );
        if (currentClient) {
          setClientName(currentClient.name);
        } else {
          setClientName("Cliente");
        }
      })
      .catch(() => setClientName("Cliente"));

    // Buscar ativos da API
    assetService.getAll().then((res) => setAssets(res.data));
    // Buscar ativos do cliente (relação)
    clientAssetService.getAll(clientId).then((res) => {
      // Remove duplicados por relationId
      const uniqueAssets = Array.isArray(res.data)
        ? res.data.filter(
            (a: ClientAsset, idx: number, arr: ClientAsset[]) =>
              arr.findIndex((b) => b.relationId === a.relationId) === idx
          )
        : res.data;
      setClientAssets(uniqueAssets);
    });
    // Resetar paginação ao trocar de cliente
    setClientAssetsPage(1);
    setAssetsPage(1);
    setIsMounted(true);
  }, [clientId]);

  const handleAddAsset = () => {
    setEditingAsset(null);
    setIsAssetDialogOpen(true);
  };

  const handleEditAsset = (asset: ClientAsset) => {
    setEditingAsset(asset);
    setIsAssetDialogOpen(true);
  };

  // Handler para abrir o dialog de exclusão
  const handleDeleteAssetDialog = (assetId: string) => {
    setDeletingAssetId(assetId);
    setIsDeleteDialogOpen(true);
  };

  // Handler que realmente executa a exclusão na API
  const handleDeleteAsset = async (clientAssetId: string | number) => {
    try {
      await clientAssetService.remove(clientId, Number(clientAssetId));
      // Buscar novamente os ativos do cliente após remover
      const updated = await clientAssetService.getAll(clientId);
      // Remove duplicados por relationId
      const uniqueAssets = Array.isArray(updated.data)
        ? updated.data.filter(
            (a: ClientAsset, idx: number, arr: ClientAsset[]) =>
              arr.findIndex((b) => b.relationId === a.relationId) === idx
          )
        : updated.data;
      setClientAssets(uniqueAssets);
      toast({
        title: "Ativo excluído",
        description: "O ativo foi excluído com sucesso.",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o ativo.",
        variant: "destructive",
      });
    }
    setIsDeleteDialogOpen(false);
    setDeletingAssetId(null);
  };

  const handleAssetFormSubmit = async (data: {
    assetId: number;
    clientId: string;
  }) => {
    try {
      await clientAssetService.add(clientId, data.assetId);
      // Buscar novamente os ativos do cliente após adicionar
      const updated = await clientAssetService.getAll(clientId);
      // Remove duplicados por relationId
      const uniqueAssets = Array.isArray(updated.data)
        ? updated.data.filter(
            (a: ClientAsset, idx: number, arr: ClientAsset[]) =>
              arr.findIndex((b) => b.relationId === a.relationId) === idx
          )
        : updated.data;
      setClientAssets(uniqueAssets);
      toast({
        title: "Ativo adicionado",
        description: "Novo ativo adicionado ao cliente.",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o ativo.",
        variant: "destructive",
      });
    }
    setIsAssetDialogOpen(false);
    setEditingAsset(null);
  };

  if (!isMounted) {
    return null;
  }

  // Renderizar lista fixa de ativos (somente leitura) com paginação
  const renderReadOnlyAssets = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="font-headline">
          Lista de Ativos Disponíveis
        </CardTitle>
        <CardDescription>
          Estes são os ativos cadastrados no sistema. Para associar um ativo a
          um cliente, utilize o botão "Adicionar Ativo" abaixo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="px-2 py-1 border">ID</th>
                <th className="px-2 py-1 border">Nome</th>
                <th className="px-2 py-1 border">Tipo</th>
                <th className="px-2 py-1 border">Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(paginatedAssets) && paginatedAssets.length > 0 ? (
                paginatedAssets.map((a) => (
                  <tr key={a.id}>
                    <td className="px-2 py-1 border text-center">{a.id}</td>
                    <td className="px-2 py-1 border">{a.nome}</td>
                    <td className="px-2 py-1 border">{a.tipo}</td>
                    <td className="px-2 py-1 border text-right">
                      {a.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-2">
                    Nenhum ativo cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Controles de paginação para ativos disponíveis */}
          <div className="flex justify-center gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAssetsPage((p) => Math.max(1, p - 1))}
              disabled={assetsPage === 1}
            >
              Anterior
            </Button>
            <span className="px-2 py-1">
              Página {assetsPage} de {assetsTotalPages || 1}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setAssetsPage((p) => Math.min(assetsTotalPages, p + 1))
              }
              disabled={
                assetsPage === assetsTotalPages || assetsTotalPages === 0
              }
            >
              Próxima
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-6">
      {renderReadOnlyAssets()}
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/clientes")}
        className="w-fit"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Clientes
      </Button>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">
              Ativos de {clientName}
            </CardTitle>
            <CardDescription>
              Gerencie os ativos financeiros deste cliente.
            </CardDescription>
          </div>
          <Button onClick={handleAddAsset} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Ativo
          </Button>
        </CardHeader>
        <CardContent>
          <ClientAssetTable
            assets={paginatedClientAssets}
            onEdit={handleEditAsset}
            onDelete={handleDeleteAssetDialog}
          />
          {/* Controles de paginação para ativos do cliente */}
          <div className="flex justify-center gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setClientAssetsPage((p) => Math.max(1, p - 1))}
              disabled={clientAssetsPage === 1}
            >
              Anterior
            </Button>
            <span className="px-2 py-1">
              Página {clientAssetsPage} de {clientAssetsTotalPages || 1}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setClientAssetsPage((p) =>
                  Math.min(clientAssetsTotalPages, p + 1)
                )
              }
              disabled={
                clientAssetsPage === clientAssetsTotalPages ||
                clientAssetsTotalPages === 0
              }
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>

      <ClientAssetDialog
        isOpen={isAssetDialogOpen}
        onOpenChange={setIsAssetDialogOpen}
        asset={editingAsset}
        clientId={clientId}
        assets={assets}
        onSubmit={handleAssetFormSubmit}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão do Ativo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este ativo? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingAssetId(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteAsset(deletingAssetId!)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

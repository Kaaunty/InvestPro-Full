"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { ClientTable } from "./components/client-table";
import { CreateClientDialog } from "./components/create-client-dialog";
import { EditClientDialog } from "./components/edit-client-dialog";
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
import type { Client } from "@/types";
import type { ClientFormData } from "@/lib/schemas/client-schema";
import { useToast } from "@/hooks/use-toast";

// Mock data updated to new structure
const initialClients: Client[] = [
  {
    id: "1",
    name: "Maria Oliveira Facunde",
    email: "maria.oliveira.facun@email.com",
    status: "inativo",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    status: "ativo",
  },
  {
    id: "3",
    name: "Carlos Pereira",
    email: "carlos.pereira@example.com",
    status: "ativo",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    status: "inativo",
  },
];

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    axios
      .get<Client[]>("http://localhost:3000/clientes")
      .then((response) => setClients(response.data))
      .catch(() => setClients(initialClients)); // fallback to mock if error
    setIsMounted(true);
  }, []);

  const handleAddClient = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClient = (clientId: string) => {
    setDeletingClientId(clientId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteClient = async () => {
    if (deletingClientId) {
      try {
        await axios.delete(
          `http://localhost:3000/clientes/${deletingClientId}`
        );
        setClients(clients.filter((c) => c.id !== deletingClientId));
        toast({
          title: "Cliente excluído",
          description: "O cliente foi excluído com sucesso.",
        });
      } catch (error) {
        // fallback local delete if API fails
        setClients(clients.filter((c) => c.id !== deletingClientId));
        toast({
          title: "Cliente excluído localmente",
          description: "O cliente foi excluído localmente.",
        });
      }
    }
    setIsDeleteDialogOpen(false);
    setDeletingClientId(null);
  };

  if (!isMounted) {
    // Prevent hydration mismatch by not rendering table until client-side mount
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">
              Gerenciamento de Clientes
            </CardTitle>
            <CardDescription>
              Adicione, edite ou remova clientes da sua lista.
            </CardDescription>
          </div>
          <Button onClick={handleAddClient} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <ClientTable
            clients={clients}
            onEdit={handleEditClient}
            onDelete={handleDeleteClient}
          />
        </CardContent>
      </Card>

      <CreateClientDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={async (data) => {
          try {
            const response = await axios.post<Client>(
              "http://localhost:3000/clientes",
              data
            );
            setClients([...clients, response.data]);
            toast({
              title: "Cliente adicionado",
              description: "Novo cliente adicionado com sucesso.",
            });
          } catch (error) {
            const newClient: Client = {
              ...data,
              id: String(Date.now() + Math.random()),
            };
            setClients([...clients, newClient]);
            toast({
              title: "Cliente adicionado localmente",
              description: "Novo cliente adicionado localmente.",
            });
          }
          setIsCreateDialogOpen(false);
        }}
      />

      <EditClientDialog
        isOpen={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) setEditingClient(null);
        }}
        client={editingClient}
        onSubmit={async (data) => {
          if (!editingClient) return;
          try {
            console.log("Updating client:", editingClient.id, data);
            // Update client via API
            const response = await axios.put<Client>(
              `http://localhost:3000/clientes/${editingClient.id}`,
              data
            );
            setClients(
              clients.map((c) =>
                c.id === editingClient.id ? response.data : c
              )
            );
            toast({
              title: "Cliente atualizado",
              description: "Os dados do cliente foram atualizados.",
            });
          } catch (error) {
            setClients(
              clients.map((c) =>
                c.id === editingClient.id
                  ? { ...c, ...data, id: editingClient.id }
                  : c
              )
            );
            toast({
              title: "Cliente atualizado localmente",
              description: "Os dados do cliente foram atualizados localmente.",
            });
          }
          setIsEditDialogOpen(false);
          setEditingClient(null);
        }}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingClientId(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteClient}
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

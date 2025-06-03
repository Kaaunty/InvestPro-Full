"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit3, Trash2, Briefcase } from "lucide-react";
import type { Client } from "@/types";

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (clientId: string) => void;
}

export function ClientTable({ clients, onEdit, onDelete }: ClientTableProps) {
  const getStatusVariant = (status: Client['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'ativo':
        return 'default';
      case 'inativo':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (clients.length === 0) {
    return <p className="text-muted-foreground text-center py-4">Nenhum cliente cadastrado.</p>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right w-[80px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell className="text-center">
                <Badge variant={getStatusVariant(client.status)} className="capitalize">
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opções Cliente</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit(client)}>
                      <Edit3 className="mr-2 h-4 w-4" />
                      Editar Cliente
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(client.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir Cliente
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Opções Ativos</DropdownMenuLabel>
                    <Link href={`/clientes/${client.id}/ativos`} passHref legacyBehavior>
                      <DropdownMenuItem asChild>
                         <a>
                           <Briefcase className="mr-2 h-4 w-4" />
                           Gerenciar Ativos
                         </a>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

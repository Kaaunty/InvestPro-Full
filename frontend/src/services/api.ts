import axios from "axios";
import type { Client, Asset, ClientAsset } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// --- CLIENTES ---
export const clientService = {
  getAll: () => axios.get<Client[]>(`${API_BASE}/clientes`),
  getById: (id: string | number) =>
    axios.get<Client>(`${API_BASE}/clientes/${id}`),
  create: (data: Omit<Client, "id">) =>
    axios.post<Client>(`${API_BASE}/clientes`, data),
  update: (id: string | number, data: Partial<Client>) =>
    axios.put<Client>(`${API_BASE}/clientes/${id}`, data),
  delete: (id: string | number) => axios.delete(`${API_BASE}/clientes/${id}`),
};

// --- ATIVOS DISPONÍVEIS ---
export const assetService = {
  getAll: () => axios.get<Asset[]>(`${API_BASE}/assets`),
  create: (data: Omit<Asset, "id">) =>
    axios.post<Asset>(`${API_BASE}/assets`, data),
  update: (id: number, data: Omit<Asset, "id">) =>
    axios.put<Asset>(`${API_BASE}/assets/${id}`, data),
  delete: (id: number) => axios.delete(`${API_BASE}/assets/${id}`),
};

// --- ATIVOS DO CLIENTE (RELAÇÃO) ---
export const clientAssetService = {
  getAll: (clientId: string | number) =>
    axios.get<ClientAsset[]>(`${API_BASE}/clientes/${clientId}/assets`),
  add: (clientId: string | number, assetId: number) =>
    axios.post(`${API_BASE}/clientes/${clientId}/assets`, { assetId }),
  remove: (clientId: string | number, relationId: number) =>
    axios.delete(`${API_BASE}/clientes/${clientId}/assets/${relationId}`),
};

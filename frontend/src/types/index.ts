export interface Client {
  id: string;
  name: string;
  email: string;
  status: "ativo" | "inativo";
}

// Atualizado para refletir o modelo do banco
export interface Asset {
  id: number; // ID único do ativo
  nome: string; // Nome/Ticker do ativo
  tipo: string; // Tipo do ativo
  valor: number; // Valor do ativo
  clientId: number; // ID do cliente
}

// Tipo usado no frontend para ativos de clientes (id pode ser string para mock/local)
export interface ClientAsset {
  id: string | number;
  nome: string;
  tipo: string;
  valor: number;
  clientId: string | number;
  assetId: number;
  relationId: string | number;
}

// Novo tipo para simular ativos disponíveis via API
export interface AvailableAsset {
  ticker: string; // Ticker ou nome único do ativo (e.g., "PETR4", "MGLU3")
  currentPrice: number; // Preço atual do ativo
  // Poderia ter outros campos como nome completo, tipo, etc.
  // name: string;      // e.g., "Petrobras PN"
  // type: string;      // e.g., "Ação", "FII"
}

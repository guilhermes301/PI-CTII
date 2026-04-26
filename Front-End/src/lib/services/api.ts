// src/services/api.ts

// Aqui definimos o endereço base do nosso Backend
export const API_URL = 'http://localhost:3000';

// Uma função auxiliar genérica para facilitar nossos POSTs e PATCHs
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Erro na comunicação com o servidor');
  }

  return data;
};
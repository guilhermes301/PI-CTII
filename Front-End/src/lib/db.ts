import { isBefore, parseISO, getDay } from 'date-fns';
import { API_URL, apiFetch } from './services/api';

// --- Tipos ---
export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
}

export interface Barber {
  id: number;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_admin: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: number;
  serviceName: string;
  barberId: number;
  barberName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  visibleToClient: boolean;
  createdAt: string;
}

const SEED_SERVICES: Service[] = [
  { id: 1, name: 'Corte Clássico', price: 50, duration: 30, description: 'Corte tradicional.' },
  { id: 2, name: 'Barba Modelada', price: 35, duration: 20, description: 'Toalha quente e navalha.' },
  { id: 3, name: 'Corte + Barba', price: 75, duration: 50, description: 'Combo completo.' }
];

export const getServices = (): Service[] => SEED_SERVICES;

// --- LEITURA DE BARBEIROS (MAPA DE NOMES) ---
export const getBarbers = async (): Promise<Barber[]> => {
  try {
    const response = await fetch(`${API_URL}/barbeiros`);
    if (!response.ok) return [];
    const data = await response.json();
    
    // MAPEAMENTO: Garante que o campo 'nome' do MariaDB vire 'name' no React
    return data.map((b: any) => ({
      id: b.id,
      name: b.nome || b.name || 'Profissional Sem Nome'
    }));
  } catch (error) {
    console.error("Erro ao carregar barbeiros:", error);
    return [];
  }
};

export const registerUser = async (data: any): Promise<User> => {
  const response = await apiFetch('/usuarios', {
    method: 'POST',
    body: JSON.stringify({
      nome: data.name,
      email: data.email,
      telefone: data.phone,
      senha: data.password
    }),
  });
  return { ...data, id: response.id.toString(), is_admin: false };
};

export const loginUser = async (email: string, pass: string): Promise<User> => {
  const response = await apiFetch('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha: pass }),
  });
  return {
    id: response.user.id.toString(),
    name: response.user.nome,
    email: response.user.email,
    phone: response.user.telefone,
    is_admin: response.user.is_admin === 1
  };
};

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await fetch(`${API_URL}/agendamentos`);
    const data = await response.json();
    return data.map((item: any): Appointment => {
      const dataObjeto = new Date(item.data_hora);
      return {
        id: item.id.toString(),
        clientName: item.cliente,
        clientEmail: '',
        clientPhone: '',
        serviceId: 1,
        serviceName: 'Serviço',
        barberId: item.barbeiro_id,
        barberName: item.barbeiro,
        date: dataObjeto.toISOString().split('T')[0],
        time: dataObjeto.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: item.status === 'AGENDADO' ? 'confirmed' : 'cancelled',
        visibleToClient: true,
        createdAt: item.criado_em
      };
    });
  } catch (error) {
    return [];
  }
};

export const saveAppointment = async (data: any): Promise<void> => {
  const userStorage = localStorage.getItem('barber_current_user');
  if (!userStorage) throw new Error('Faça login primeiro.');
  const currentUser = JSON.parse(userStorage);

  await apiFetch('/agendamentos', {
    method: 'POST',
    body: JSON.stringify({
      usuario_id: currentUser.id,
      barbeiro_id: data.barberId,
      data_hora: `${data.date} ${data.time}:00`,
    }),
  });
};

export const cancelAppointment = async (id: string): Promise<void> => {
  await apiFetch(`/agendamentos/${id}/cancelar`, { method: 'PATCH' });
};

export const addBarber = async (name: string): Promise<void> => {
  await apiFetch('/barbeiros', {
    method: 'POST',
    body: JSON.stringify({ nome: name }),
  });
};

export const removeBarber = async (id: number): Promise<void> => {
  await apiFetch(`/barbeiros/${id}/inativar`, { method: 'PATCH' });
};
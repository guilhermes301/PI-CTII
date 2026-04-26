import type { FormEvent } from 'react';
import type { Barber, Appointment } from '../../lib/db';

interface AdminPanelScreenProps {
  barbers: Barber[];
  allAppointments: Appointment[];
  newBarberName: string;
  setNewBarberName: (name: string) => void;
  darkMode: boolean;
  onAddBarber: () => void;
  onRemoveBarber: (id: number) => void;
  onExit: () => void;
}

export function AdminPanelScreen({
  barbers,
  allAppointments,
  newBarberName,
  setNewBarberName,
  darkMode,
  onAddBarber,
  onRemoveBarber,
  onExit,
}: AdminPanelScreenProps) {
  
  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddBarber();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Painel de Administração</h2>
        <button
          onClick={onExit}
          className="text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          Sair do Painel
        </button>
      </div>

      {/* Seção 1: Gerenciamento da Equipe (Barbeiros) */}
      <div className={`rounded-2xl p-6 shadow-sm border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h3 className="mb-4 text-lg font-semibold">Gerenciar Equipe</h3>
        
        <form onSubmit={handleAddSubmit} className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Nome do novo barbeiro"
            value={newBarberName}
            onChange={(e) => setNewBarberName(e.target.value)}
            className={`flex-1 rounded-xl border p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-400' 
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Adicionar
          </button>
        </form>

        <div className="space-y-3">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className={`flex items-center justify-between rounded-xl border p-3 ${
                darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <span className="font-medium">{barber.name}</span>
              <button
                onClick={() => onRemoveBarber(barber.id)}
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Remover
              </button>
            </div>
          ))}
          {barbers.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-2">Nenhum barbeiro ativo na equipe.</p>
          )}
        </div>
      </div>

      {/* Seção 2: Visão Geral de Agendamentos */}
      <div className={`rounded-2xl p-6 shadow-sm border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h3 className="mb-4 text-lg font-semibold">Histórico Geral de Agendamentos</h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {allAppointments.map((app) => (
            <div
              key={app.id}
              className={`rounded-xl border p-4 text-sm ${
                darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex justify-between font-medium mb-1">
                <span>{app.clientName}</span>
                <span className={
                  app.status === 'confirmed' ? 'text-green-500' : 
                  app.status === 'cancelled' ? 'text-red-500' : 'text-yellow-500'
                }>
                  {app.status === 'confirmed' ? 'Confirmado' : 
                   app.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                </span>
              </div>
              <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <p>Barbeiro: {app.barberName}</p>
                <p>Serviço: {app.serviceName}</p>
                <p>Data: {app.date.split('-').reverse().join('/')} às {app.time}</p>
              </div>
            </div>
          ))}
          {allAppointments.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-4">Nenhum agendamento registrado no sistema.</p>
          )}
        </div>
      </div>
    </div>
  );
}
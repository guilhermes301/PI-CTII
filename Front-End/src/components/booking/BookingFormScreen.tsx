import type { FormEvent } from 'react';
import { formatCurrency } from '../../utils/format';
import type { Service, Barber, User } from '../../lib/db';

interface BookingFormScreenProps {
  selectedService: Service;
  currentUser: User;
  selectedBarber: number | null;
  barbers: Barber[];
  formData: { date: string; time: string };
  errorMsg: string;
  darkMode: boolean;
  onSelectBarber: (id: number) => void;
  onChangeFormData: (data: { date: string; time: string }) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onGoHome: () => void;
}

export function BookingFormScreen({
  selectedService,
  currentUser,
  selectedBarber,
  barbers,
  formData,
  errorMsg,
  darkMode,
  onSelectBarber,
  onChangeFormData,
  onSubmit,
  onGoHome,
}: BookingFormScreenProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onGoHome}
        className={`mb-6 flex items-center text-sm font-medium transition-colors ${
          darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        ← Voltar
      </button>

      <div className={`rounded-3xl p-8 shadow-xl border ${
        darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-100'
      }`}>
        <div className="mb-6 border-b border-slate-700/50 pb-4">
          <h2 className="text-2xl font-bold">{selectedService.name}</h2>
          <p className="text-amber-500 font-semibold">{formatCurrency(selectedService.price)}</p>
        </div>

        <div className="mb-6 rounded-xl bg-blue-500/10 p-4 border border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              <span className="text-xs">👤</span>
            </div>
            <div>
              <p className="text-xs text-blue-400 font-medium">Agendando como</p>
              <p className="font-bold text-blue-100">{currentUser.name}</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {errorMsg && (
            <div className="rounded-xl bg-red-500/10 p-4 text-sm font-medium text-red-400 border border-red-500/20">
              ⚠️ {errorMsg}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium">Profissional</label>
            <div className="grid grid-cols-1 gap-3">
              {barbers.length > 0 ? (
                barbers.map((barber) => (
                  <button
                    key={barber.id}
                    type="button"
                    onClick={() => onSelectBarber(barber.id)}
                    className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                      selectedBarber === barber.id
                        ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500'
                        : darkMode 
                          ? 'border-slate-700 bg-slate-900/50 hover:border-slate-500' 
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold">{barber.name}</span>
                    {selectedBarber === barber.id && <span className="text-amber-500">✓</span>}
                  </button>
                ))
              ) : (
                <p className="text-center py-4 text-sm text-slate-500 italic">
                  Carregando profissionais disponíveis...
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Data</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => onChangeFormData({ ...formData, date: e.target.value })}
                className={`w-full rounded-2xl border p-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Horário</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => onChangeFormData({ ...formData, time: e.target.value })}
                className={`w-full rounded-2xl border p-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-amber-500 py-5 font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-[0.98]"
          >
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}
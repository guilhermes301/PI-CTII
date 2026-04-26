import type { FormEvent } from 'react';
import { ArrowLeft, User, UserCheck } from 'lucide-react';
import type { Barber, Service, User as UserType } from '../../lib/db';
import type { BookingFormData } from '../../types/app';

interface BookingFormScreenProps {
  selectedService: Service;
  currentUser: UserType;
  selectedBarber: Barber | null;
  barbers: Barber[];
  formData: BookingFormData;
  errorMsg: string;
  darkMode: boolean;
  onSelectBarber: (barber: Barber) => void;
  onChangeFormData: (data: BookingFormData) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
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
    <div className="animate-fade-in">
      <button
        onClick={onGoHome}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-yellow-500"
      >
        <ArrowLeft size={18} /> Voltar
      </button>
      <div
        className={`rounded-2xl border p-6 shadow-lg ${
          darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
        }`}
      >
        <h2 className="mb-4 border-b border-slate-100 pb-2 text-xl font-bold dark:border-slate-700">
          {selectedService.name}
        </h2>
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
          <UserCheck size={16} /> Agendando como <b>{currentUser.name}</b>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {errorMsg && (
            <div className="animate-pulse rounded-lg border border-red-200 bg-red-100 p-3 text-sm text-red-700">
              ⚠️ {errorMsg}
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Profissional</label>
            <div className="grid grid-cols-2 gap-2">
              {barbers.map(barber => (
                <div
                  key={barber.id}
                  onClick={() => onSelectBarber(barber)}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border p-2 text-center text-sm font-medium transition-all ${
                    selectedBarber?.id === barber.id
                      ? 'border-yellow-600 bg-yellow-500 text-white'
                      : 'border-slate-200 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700'
                  }`}
                >
                  <User size={14} /> {barber.name}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Data</label>
              <input
                required
                type="date"
                className={`w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-yellow-500 ${
                  darkMode ? 'border-slate-600 bg-slate-900' : 'border-slate-200 bg-slate-50'
                }`}
                value={formData.date}
                onChange={event => onChangeFormData({ ...formData, date: event.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Horário</label>
              <input
                required
                type="time"
                className={`w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-yellow-500 ${
                  darkMode ? 'border-slate-600 bg-slate-900' : 'border-slate-200 bg-slate-50'
                }`}
                value={formData.time}
                onChange={event => onChangeFormData({ ...formData, time: event.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-yellow-500 py-4 font-bold text-white shadow-lg transition-all hover:bg-yellow-600"
          >
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}

import { Calendar, Clock, RefreshCw, XCircle } from 'lucide-react';
import type { Appointment } from '../../lib/db';
import { formatBrazilianDate } from '../../utils/format';

interface AppointmentCardProps {
  appointment: Appointment;
  darkMode: boolean;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (id: string) => void;
}

const STATUS_CONFIG = {
  pending: {
    label: 'PENDENTE',
    stripe: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-700',
  },
  confirmed: {
    label: 'CONFIRMADO',
    stripe: 'bg-green-500',
    badge: 'bg-green-100 text-green-600',
  },
  cancelled: {
    label: 'CANCELADO',
    stripe: 'bg-red-500',
    badge: 'bg-red-100 text-red-600',
  },
} as const;

export function AppointmentCard({
  appointment,
  darkMode,
  onReschedule,
  onCancel,
}: AppointmentCardProps) {
  const status = STATUS_CONFIG[appointment.status];
  const isPending = appointment.status === 'pending';

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-4 ${
        darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
      }`}
    >
      <div className={`absolute left-0 top-0 h-full w-1 ${status.stripe}`} />
      <div className="mb-2 flex items-start justify-between pl-3">
        <div>
          <h3 className="text-lg font-bold">{appointment.serviceName}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">com {appointment.barberName}</p>
        </div>
        <span className={`rounded px-2 py-1 text-xs font-bold ${status.badge}`}>
          {status.label}
        </span>
      </div>
      <div className="mt-3 mb-2 flex gap-4 pl-3 text-sm font-medium">
        <span className="flex items-center gap-1">
          <Calendar size={14} /> {formatBrazilianDate(appointment.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} /> {appointment.time}
        </span>
      </div>

      {isPending && (
        <p className="mb-4 pl-3 text-xs font-medium text-amber-600 dark:text-amber-400">
          Aguardando confirmação do barbeiro.
        </p>
      )}

      <div className="flex gap-2 border-t border-slate-100 pl-3 pt-2 dark:border-slate-700">
        <button
          onClick={() => onReschedule(appointment)}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-50 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100"
        >
          <RefreshCw size={14} /> Reagendar
        </button>
        <button
          onClick={() => onCancel(appointment.id)}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-50 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
        >
          <XCircle size={14} /> Cancelar
        </button>
      </div>
    </div>
  );
}

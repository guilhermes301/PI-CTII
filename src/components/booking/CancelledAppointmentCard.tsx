import { RefreshCw, X, XCircle } from 'lucide-react';
import type { Appointment } from '../../lib/db';

interface CancelledAppointmentCardProps {
  appointment: Appointment;
  onReschedule: (appointment: Appointment) => void;
  onDismiss: (id: string) => void;
}

export function CancelledAppointmentCard({
  appointment,
  onReschedule,
  onDismiss,
}: CancelledAppointmentCardProps) {
  return (
    <div className="animate-fade-in flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/10">
      <div>
        <p className="flex items-center gap-1 text-sm font-bold text-red-600">
          <XCircle size={14} /> Cancelado
        </p>
        <p className="text-xs text-red-500/70">{appointment.serviceName}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onReschedule(appointment)}
          className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-200"
        >
          <RefreshCw size={12} /> Reagendar
        </button>
        <button
          onClick={() => onDismiss(appointment.id)}
          className="px-2 text-slate-400 hover:text-slate-600"
          title="Remover da lista"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

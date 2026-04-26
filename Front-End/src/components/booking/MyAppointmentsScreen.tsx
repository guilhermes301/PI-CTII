import { ArrowLeft } from 'lucide-react';
import type { Appointment, User } from '../../lib/db';
import { AppointmentCard } from './AppointmentCard';
import { CancelledAppointmentCard } from './CancelledAppointmentCard';

interface MyAppointmentsScreenProps {
  currentUser: User;
  appointments: Appointment[];
  darkMode: boolean;
  onGoHome: () => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function MyAppointmentsScreen({
  appointments,
  darkMode,
  onGoHome,
  onReschedule,
  onCancel,
  onDismiss,
}: MyAppointmentsScreenProps) {
  const activeAppointments = appointments.filter((appointment) => appointment.status !== 'cancelled');
  const cancelledAppointments = appointments.filter((appointment) => appointment.status === 'cancelled');

  return (
    <div className="animate-fade-in">
      <button
        onClick={onGoHome}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-yellow-500"
      >
        <ArrowLeft size={18} /> Voltar
      </button>
      <h2 className="mb-6 text-xl font-bold">Meus Agendamentos</h2>

      {appointments.length === 0 ? (
        <p className="rounded-xl bg-slate-100 py-10 text-center text-slate-500 dark:bg-slate-800">
          Você não tem agendamentos ativos.
        </p>
      ) : (
        <div className="space-y-6">
          {activeAppointments.length > 0 && (
            <div className="space-y-3">
              {activeAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  darkMode={darkMode}
                  onReschedule={onReschedule}
                  onCancel={onCancel}
                />
              ))}
            </div>
          )}

          {cancelledAppointments.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Cancelados
              </h3>
              {cancelledAppointments.map((appointment) => (
                <CancelledAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onReschedule={onReschedule}
                  onDismiss={onDismiss}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

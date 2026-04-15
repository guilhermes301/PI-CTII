import type { Appointment } from '../../lib/db';
import { BarberAppointmentCard } from './BarberAppointmentCard';

interface BarberPanelScreenProps {
  barberName: string;
  appointments: Appointment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export function BarberPanelScreen({
  barberName,
  appointments,
  onApprove,
  onReject,
  onLogout,
  onBack,
}: BarberPanelScreenProps) {
  const pending = appointments.filter((a) => a.status === 'pending');
  const confirmed = appointments.filter((a) => a.status === 'confirmed');
  const cancelled = appointments.filter((a) => a.status === 'cancelled');

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Painel do Barbeiro</h1>
            <p className="text-zinc-400">
              Bem-vindo, <strong>{barberName}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
            >
              Home
            </button>

            <button
              onClick={onLogout}
              className="rounded-xl border border-red-800 px-4 py-2 text-sm text-red-300 hover:bg-red-950/40"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Pendentes */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Pendentes</h2>

          {pending.length === 0 ? (
            <p className="text-zinc-500">Nenhum agendamento pendente.</p>
          ) : (
            <div className="grid gap-4">
              {pending.map((appointment) => (
                <BarberAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              ))}
            </div>
          )}
        </section>

        {/* Confirmados */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Confirmados</h2>

          {confirmed.length === 0 ? (
            <p className="text-zinc-500">Nenhum agendamento confirmado.</p>
          ) : (
            <div className="grid gap-4">
              {confirmed.map((appointment) => (
                <BarberAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              ))}
            </div>
          )}
        </section>

        {/* Cancelados */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Cancelados</h2>

          {cancelled.length === 0 ? (
            <p className="text-zinc-500">Nenhum agendamento cancelado.</p>
          ) : (
            <div className="grid gap-4">
              {cancelled.map((appointment) => (
                <BarberAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
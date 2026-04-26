import type { Appointment } from '../../lib/db';

interface BarberAppointmentCardProps {
  appointment: Appointment;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const getStatusLabel = (status: Appointment['status']) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'confirmed':
      return 'Confirmado';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};

export function BarberAppointmentCard({
  appointment,
  onApprove,
  onReject,
}: BarberAppointmentCardProps) {
  const canApprove = appointment.status === 'pending';
  const canReject =
    appointment.status === 'pending' || appointment.status === 'confirmed';

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {appointment.clientName}
          </h3>
          <p className="text-sm text-zinc-400">{appointment.clientEmail}</p>
          <p className="text-sm text-zinc-400">{appointment.clientPhone}</p>
        </div>

        <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-200">
          {getStatusLabel(appointment.status)}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
        <div>
          <span className="block text-zinc-500">Serviço</span>
          <strong className="text-white">{appointment.serviceName}</strong>
        </div>

        <div>
          <span className="block text-zinc-500">Barbeiro</span>
          <strong className="text-white">{appointment.barberName}</strong>
        </div>

        <div>
          <span className="block text-zinc-500">Data</span>
          <strong className="text-white">{appointment.date}</strong>
        </div>

        <div>
          <span className="block text-zinc-500">Horário</span>
          <strong className="text-white">{appointment.time}</strong>
        </div>
      </div>

      {(canApprove || canReject) && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {canApprove && (
            <button
              type="button"
              onClick={() => onApprove(appointment.id)}
              className="flex-1 rounded-xl bg-white px-4 py-3 font-semibold text-zinc-900 transition hover:opacity-90"
            >
              Aceitar agendamento
            </button>
          )}

          {canReject && (
            <button
              type="button"
              onClick={() => onReject(appointment.id)}
              className="flex-1 rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 font-semibold text-red-300 transition hover:bg-red-950/60"
            >
              Cancelar agendamento
            </button>
          )}
        </div>
      )}
    </div>
  );
}
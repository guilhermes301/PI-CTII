import type { Appointment, Barber } from '../../lib/db';

interface AdminPanelScreenProps {
  barbers: Barber[];
  allAppointments: Appointment[];
  newBarberName: string;
  setNewBarberName: React.Dispatch<React.SetStateAction<string>>;
  newBarberEmail: string;
  setNewBarberEmail: React.Dispatch<React.SetStateAction<string>>;
  newBarberPassword: string;
  setNewBarberPassword: React.Dispatch<React.SetStateAction<string>>;
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
  newBarberEmail,
  setNewBarberEmail,
  newBarberPassword,
  setNewBarberPassword,
  darkMode,
  onAddBarber,
  onRemoveBarber,
  onExit,
}: AdminPanelScreenProps) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-lg ${
        darkMode
          ? 'border-slate-700 bg-slate-800 text-slate-100'
          : 'border-slate-200 bg-white text-slate-900'
      }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel do Admin</h1>
          <p
            className={`mt-1 text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Gerencie barbeiros e acompanhe os agendamentos.
          </p>
        </div>

        <button
          type="button"
          onClick={onExit}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            darkMode
              ? 'bg-slate-700 text-white hover:bg-slate-600'
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
          }`}
        >
          Sair
        </button>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Cadastrar novo barbeiro</h2>

        <div className="grid gap-3">
          <input
            type="text"
            placeholder="Nome do barbeiro"
            value={newBarberName}
            onChange={(e) => setNewBarberName(e.target.value)}
            className={`rounded-xl border px-4 py-3 outline-none ${
              darkMode
                ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-500'
                : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
            }`}
          />

          <input
            type="email"
            placeholder="E-mail do barbeiro"
            value={newBarberEmail}
            onChange={(e) => setNewBarberEmail(e.target.value)}
            className={`rounded-xl border px-4 py-3 outline-none ${
              darkMode
                ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-500'
                : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
            }`}
          />

          <input
            type="password"
            placeholder="Senha do barbeiro"
            value={newBarberPassword}
            onChange={(e) => setNewBarberPassword(e.target.value)}
            className={`rounded-xl border px-4 py-3 outline-none ${
              darkMode
                ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-500'
                : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
            }`}
          />

          <button
            type="button"
            onClick={onAddBarber}
            className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            Adicionar barbeiro
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Barbeiros cadastrados</h2>

        {barbers.length === 0 ? (
          <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
            Nenhum barbeiro cadastrado.
          </p>
        ) : (
          <div className="space-y-3">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                  darkMode
                    ? 'border-slate-700 bg-slate-900'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div>
                  <p className="font-semibold">{barber.name}</p>
                  <p className={darkMode ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>
                    {barber.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveBarber(barber.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Todos os agendamentos</h2>

        {allAppointments.length === 0 ? (
          <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
            Nenhum agendamento encontrado.
          </p>
        ) : (
          <div className="space-y-3">
            {allAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`rounded-xl border p-4 ${
                  darkMode
                    ? 'border-slate-700 bg-slate-900'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <p className="font-semibold">{appointment.clientName}</p>
                <p className={darkMode ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>
                  {appointment.serviceName} • {appointment.barberName}
                </p>
                <p className={darkMode ? 'text-slate-400 text-sm' : 'text-slate-500 text-sm'}>
                  {appointment.date} às {appointment.time}
                </p>
                <p className="mt-2 text-sm font-medium">
                  Status: {appointment.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
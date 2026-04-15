import type { AuthFormData } from '../../types/app';

interface BarberLoginScreenProps {
  authData: AuthFormData;
  setAuthData: React.Dispatch<React.SetStateAction<AuthFormData>>;
  errorMsg: string;
  onSubmit: () => void;
  onBack: () => void;
}

export function BarberLoginScreen({
  authData,
  setAuthData,
  errorMsg,
  onSubmit,
  onBack,
}: BarberLoginScreenProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Área do Barbeiro</h1>
          <p className="text-zinc-400 mt-2">
            Entre com seu e-mail e senha para visualizar seus agendamentos.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="barber-email" className="block text-sm font-medium mb-2">
              E-mail
            </label>
            <input
              id="barber-email"
              type="email"
              value={authData.email}
              onChange={(e) =>
                setAuthData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Digite seu e-mail"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label htmlFor="barber-password" className="block text-sm font-medium mb-2">
              Senha
            </label>
            <input
              id="barber-password"
              type="password"
              value={authData.password}
              onChange={(e) =>
                setAuthData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Digite sua senha"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-zinc-500"
            />
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {errorMsg}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-xl border border-zinc-700 bg-transparent px-4 py-3 font-medium text-zinc-200 transition hover:bg-zinc-800"
            >
              Voltar
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className="flex-1 rounded-xl bg-white px-4 py-3 font-semibold text-zinc-900 transition hover:opacity-90"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
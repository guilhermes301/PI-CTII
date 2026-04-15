import type { FormEvent } from 'react';
import { ShieldCheck } from 'lucide-react';

interface AdminLoginScreenProps {
  adminPass: string;
  setAdminPass: (value: string) => void;
  darkMode: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onGoHome: () => void;
}

export function AdminLoginScreen({
  adminPass,
  setAdminPass,
  darkMode,
  onSubmit,
  onGoHome,
}: AdminLoginScreenProps) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-20">
      <ShieldCheck size={64} className="mb-6 text-slate-300" />
      <h2 className="mb-6 text-2xl font-bold">Acesso Restrito</h2>
      <form onSubmit={onSubmit} className="w-full max-w-xs space-y-4">
        <input
          type="password"
          placeholder="Senha do Dono"
          className={`w-full rounded-lg border p-3 text-center outline-none ${
            darkMode ? 'border-slate-600 bg-slate-800' : 'border-slate-200 bg-white'
          }`}
          value={adminPass}
          onChange={event => setAdminPass(event.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 py-3 font-bold text-white dark:bg-slate-700"
        >
          Entrar
        </button>
        <button type="button" onClick={onGoHome} className="w-full text-sm text-slate-500">
          Voltar
        </button>
      </form>
    </div>
  );
}

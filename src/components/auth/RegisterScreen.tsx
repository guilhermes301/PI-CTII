import type { FormEvent } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import type { AuthFormData } from '../../types/app';

interface RegisterScreenProps {
  authData: AuthFormData;
  setAuthData: (data: AuthFormData) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onGoBack: () => void;
}

export function RegisterScreen({ authData, setAuthData, onSubmit, onGoBack }: RegisterScreenProps) {
  return (
    <div className="animate-fade-in py-6">
      <button
        onClick={onGoBack}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-yellow-500"
      >
        <ArrowLeft size={18} /> Voltar
      </button>

      <div className="mb-6 text-center">
        <UserPlus size={48} className="mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold">Criar Conta</h2>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <input
          type="text"
          placeholder="Nome Completo"
          required
          className="w-full rounded-lg border p-3 outline-none dark:border-slate-600 dark:bg-slate-900"
          value={authData.name}
          onChange={event => setAuthData({ ...authData, name: event.target.value })}
        />
        <input
          type="tel"
          placeholder="WhatsApp / Celular"
          required
          className="w-full rounded-lg border p-3 outline-none dark:border-slate-600 dark:bg-slate-900"
          value={authData.phone}
          onChange={event => setAuthData({ ...authData, phone: event.target.value })}
        />
        <input
          type="email"
          placeholder="E-mail"
          required
          className="w-full rounded-lg border p-3 outline-none dark:border-slate-600 dark:bg-slate-900"
          value={authData.email}
          onChange={event => setAuthData({ ...authData, email: event.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          className="w-full rounded-lg border p-3 outline-none dark:border-slate-600 dark:bg-slate-900"
          value={authData.password}
          onChange={event => setAuthData({ ...authData, password: event.target.value })}
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-white shadow-lg transition-all hover:bg-yellow-600"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}

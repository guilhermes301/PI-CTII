import type { FormEvent } from 'react';
import { LogIn } from 'lucide-react';
import type { Service } from '../../lib/db';
import type { AuthFormData } from '../../types/app';

interface LoginScreenProps {
  selectedService: Service | null;
  authData: AuthFormData;
  setAuthData: (data: AuthFormData) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onGoRegister: () => void;
  onGoHome: () => void;
}

export function LoginScreen({
  selectedService,
  authData,
  setAuthData,
  onSubmit,
  onGoRegister,
  onGoHome,
}: LoginScreenProps) {
  return (
    <div className="animate-fade-in py-10">
      {selectedService && (
        <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-center">
          <p className="text-sm font-bold text-yellow-800">Você escolheu: {selectedService.name}</p>
          <p className="text-xs text-yellow-600">Entre para continuar.</p>
        </div>
      )}

      <div className="mb-8 text-center">
        <LogIn size={48} className="mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold">Acesse sua conta</h2>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-xl border bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
      >
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
          className="w-full rounded-lg bg-slate-900 py-3 font-bold text-white dark:bg-slate-700"
        >
          Entrar
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Não tem conta?{' '}
        <button onClick={onGoRegister} className="font-bold text-yellow-600 underline">
          Cadastre-se
        </button>
      </p>
      <button onClick={onGoHome} className="mt-4 block w-full text-center text-sm text-slate-400">
        Voltar
      </button>
    </div>
  );
}

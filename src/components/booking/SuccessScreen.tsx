import { CheckCircle, Loader2, Mail } from 'lucide-react';
import type { Barber, User } from '../../lib/db';
import type { EmailStatus } from '../../types/app';

interface SuccessScreenProps {
  currentUser: User;
  selectedBarber: Barber | null;
  emailStatus: EmailStatus;
  darkMode: boolean;
  onSendEmail: () => void;
  onOpenMyAppointments: () => void;
  onBookAnother: () => void;
  onGoHome: () => void;
}

export function SuccessScreen({
  currentUser,
  selectedBarber,
  emailStatus,
  darkMode,
  onSendEmail,
  onOpenMyAppointments,
  onBookAnother,
  onGoHome,
}: SuccessScreenProps) {
  return (
    <div className="animate-fade-in flex flex-col items-center py-10 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">Agendado com Sucesso!</h2>
      <p className="mb-8 px-6 text-slate-500 dark:text-slate-400">
        Horário reservado com <b>{selectedBarber?.name}</b>.
      </p>
      <div className="w-full space-y-3 px-6">
        <button
          onClick={onSendEmail}
          disabled={emailStatus !== 'idle'}
          className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-bold transition-all ${
            emailStatus === 'sent'
              ? 'cursor-not-allowed bg-slate-200 text-slate-500'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {emailStatus === 'idle' && (
            <>
              <Mail size={20} /> Enviar Comprovante por E-mail
            </>
          )}
          {emailStatus === 'sending' && (
            <>
              <Loader2 size={20} className="animate-spin" /> Enviando...
            </>
          )}
          {emailStatus === 'sent' && (
            <>
              <CheckCircle size={20} /> Enviado para {currentUser.email}
            </>
          )}
        </button>
        <button
          onClick={onOpenMyAppointments}
          className={`w-full rounded-lg border py-3 font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${
            darkMode ? 'border-slate-600' : 'border-slate-300'
          }`}
        >
          Ver Meus Agendamentos
        </button>
        <button
          onClick={onBookAnother}
          className={`w-full rounded-lg border py-3 font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${
            darkMode ? 'border-slate-600' : 'border-slate-300'
          }`}
        >
          Fazer Outro Agendamento
        </button>
        <button onClick={onGoHome} className="mt-4 text-sm text-slate-500 underline">
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}

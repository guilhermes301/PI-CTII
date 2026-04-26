import { CheckCircle2, Mail, Calendar, ArrowRight } from 'lucide-react';
import type { User } from '../../lib/db';

interface SuccessScreenProps {
  currentUser: User;
  selectedBarber: number | null; // Recebe o ID do barbeiro selecionado
  emailStatus: 'idle' | 'sending' | 'sent';
  darkMode: boolean;
  onSendEmail: () => void;
  onOpenMyAppointments: () => void;
  onBookAnother: () => void;
  onGoHome: () => void;
}

export function SuccessScreen({
  selectedBarber,
  emailStatus,
  darkMode,
  onSendEmail,
  onOpenMyAppointments,
  onBookAnother,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 text-green-500">
        <CheckCircle2 size={64} />
      </div>

      <h2 className="mb-2 text-3xl font-bold">Agendado com Sucesso!</h2>
      <p className={`mb-10 max-w-xs text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        Seu horário foi reservado e já aparece no sistema do profissional.
      </p>

      <div className="grid w-full gap-3">
        <button
          onClick={onSendEmail}
          disabled={emailStatus !== 'idle'}
          className={`flex items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all ${
            emailStatus === 'sent'
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          <Mail size={20} />
          {emailStatus === 'idle' && 'Enviar Comprovante por E-mail'}
          {emailStatus === 'sending' && 'Enviando...'}
          {emailStatus === 'sent' && 'Comprovante Enviado!'}
        </button>

        <button
          onClick={onOpenMyAppointments}
          className={`flex items-center justify-center gap-2 rounded-2xl border py-4 font-bold transition-all ${
            darkMode 
              ? 'border-slate-700 hover:bg-slate-800' 
              : 'border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Calendar size={20} />
          Ver Meus Agendamentos
        </button>

        <button
          onClick={onBookAnother}
          className={`flex items-center justify-center gap-2 rounded-2xl border py-4 font-bold transition-all ${
            darkMode 
              ? 'border-slate-700 hover:bg-slate-800' 
              : 'border-slate-200 hover:bg-slate-50'
          }`}
        >
          Fazer Outro Agendamento
          <ArrowRight size={20} />
        </button>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 text-sm font-medium text-slate-500 hover:underline"
      >
        Voltar ao Início
      </button>
    </div>
  );
}
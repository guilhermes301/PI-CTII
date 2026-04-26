import type { Service, User } from '../../lib/db';
import { getFirstName } from '../../utils/format';
import { ServiceCard } from './ServiceCard';

interface HomeScreenProps {
  currentUser: User | null;
  services: Service[];
  darkMode: boolean;
  onOpenLogin: () => void;
  onSelectService: (service: Service) => void;
}

export function HomeScreen({
  currentUser,
  services,
  darkMode,
  onOpenLogin,
  onSelectService,
}: HomeScreenProps) {
  return (
    <div className="animate-fade-in space-y-4">
      <div
        className={`mb-6 rounded-2xl p-6 shadow-lg ${
          currentUser
            ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white'
            : 'border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
        }`}
      >
        <h2 className="text-2xl font-bold">
          {currentUser ? `Olá, ${getFirstName(currentUser.name)}!` : 'Bem-vindo!'}
        </h2>
        <p className={`mt-1 text-sm ${currentUser ? 'text-slate-300' : 'text-slate-500'}`}>
          {currentUser ? 'Vamos agendar seu horário?' : 'Faça login para agendar.'}
        </p>
        {!currentUser && (
          <button
            onClick={onOpenLogin}
            className="mt-4 rounded-lg bg-yellow-500 px-4 py-2 text-xs font-bold text-white"
          >
            Entrar / Criar Conta
          </button>
        )}
      </div>

      <div className="flex items-end justify-between px-2">
        <h3 className="text-lg font-bold">Serviços</h3>
      </div>

      {services.map(service => (
        <ServiceCard
          key={service.id}
          service={service}
          darkMode={darkMode}
          onSelect={onSelectService}
        />
      ))}
    </div>
  );
}

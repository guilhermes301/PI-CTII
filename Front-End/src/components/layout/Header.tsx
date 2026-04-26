import { LogOut, Moon, Scissors, Sun } from 'lucide-react';
import type { User } from '../../lib/db';
import { getUserInitial } from '../../utils/format';

interface HeaderProps {
  darkMode: boolean;
  currentUser: User | null;
  onGoHome: () => void;
  onToggleDarkMode: () => void;
  onOpenLogin: () => void;
  onOpenMyAppointments: () => void;
  onLogout: () => void;
}

export function Header({
  darkMode,
  currentUser,
  onGoHome,
  onToggleDarkMode,
  onOpenLogin,
  onOpenMyAppointments,
  onLogout,
}: HeaderProps) {
  return (
    <header className={`${darkMode ? 'bg-slate-800' : 'bg-white'} sticky top-0 z-20 p-4 shadow-md`}>
      <div className="mx-auto flex max-w-md items-center justify-between">
        <div className="flex cursor-pointer items-center gap-2" onClick={onGoHome}>
          <Scissors className="text-yellow-500" />
          <h1 className="text-xl font-bold tracking-tight">BarberPro</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {currentUser ? (
            <div className="flex gap-3">
              <button onClick={onOpenMyAppointments} title="Meus Agendamentos">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white shadow-lg ring-2 ring-yellow-500/30">
                  {getUserInitial(currentUser.name)}
                </div>
              </button>
              <button onClick={onLogout} title="Sair">
                <LogOut size={20} className="text-red-400 hover:text-red-600" />
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={onOpenLogin}
                className="text-sm font-bold text-slate-600 hover:text-yellow-500 dark:text-slate-300"
              >
                Entrar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
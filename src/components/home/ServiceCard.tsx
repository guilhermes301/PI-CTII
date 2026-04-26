import { Clock } from 'lucide-react';
import type { Service } from '../../lib/db';

interface ServiceCardProps {
  service: Service;
  darkMode: boolean;
  onSelect: (service: Service) => void;
}

export function ServiceCard({ service, darkMode, onSelect }: ServiceCardProps) {
  return (
    <div
      onClick={() => onSelect(service)}
      className={`group flex cursor-pointer items-center justify-between rounded-xl border p-4 shadow-sm transition-all ${
        darkMode
          ? 'bg-slate-800 border-slate-700 hover:border-yellow-500'
          : 'bg-white border-slate-200 hover:border-yellow-500'
      }`}
    >
      <div>
        <h3 className="text-lg font-bold">{service.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{service.description}</p>
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-slate-400">
          <Clock size={12} /> {service.duration} min
        </p>
      </div>
      <div className="text-right">
        <span className="block text-lg font-bold text-yellow-600 dark:text-yellow-400">
          R$ {service.price}
        </span>
        <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-bold text-yellow-600">
          Agendar
        </span>
      </div>
    </div>
  );
}

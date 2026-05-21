import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar jogador, time ou posição..."
        className="w-full bg-white/10 border border-white/10 rounded-xl py-2 pl-9 pr-8 text-white text-xs font-bold placeholder:text-white/25 focus:outline-none focus:border-panini-gold/40 focus:bg-white/15 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

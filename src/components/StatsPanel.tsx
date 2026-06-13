import { BarChart3, Star, Trophy, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { SECTIONS, TOTAL_STICKERS } from '../data/sections';

interface StatsPanelProps {
  collected: Set<string>;
  repeated: Record<string, number>;
}

export function StatsPanel({ collected, repeated }: StatsPanelProps) {
  const [open, setOpen] = useState(false);

  const totalCollected = collected.size;
  const totalRepeated = Object.values(repeated).reduce((a, b) => a + b, 0);
  const totalMissing = TOTAL_STICKERS - totalCollected;
  const completedSections = SECTIONS.filter(sec =>
    Array.from({ length: sec.count }, (_, i) => `${sec.id} ${i + 1}`).every(id => collected.has(id))
  ).length;

  const stats = [
    { icon: <Trophy size={14} />, label: 'Coladas', value: totalCollected, color: 'text-panini-gold' },
    { icon: <Star size={14} />, label: 'Faltam', value: totalMissing, color: 'text-red-400' },
    { icon: <Layers size={14} />, label: 'Repetidas', value: totalRepeated, color: 'text-blue-400' },
    { icon: <BarChart3 size={14} />, label: 'Seções 100%', value: completedSections, color: 'text-green-400' },
  ];

  return (
    <div className="flex-shrink-0">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors text-panini-lightgold"
        title="Estatísticas"
        aria-label="Abrir painel de estatísticas"
        aria-expanded={open}
      >
        <BarChart3 size={16} />
        <span className="hidden sm:inline text-xs font-bold uppercase">Stats</span>
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-panini-navy/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 z-30 w-64 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-black text-panini-lightgold uppercase tracking-widest mb-3">
            📊 Estatísticas da Coleção
          </div>
          <div className="grid grid-cols-2 gap-2">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="bg-white/5 rounded-lg p-2.5 border border-white/5 flex flex-col gap-1"
              >
                <div className={`flex items-center gap-1 ${stat.color}`}>
                  {stat.icon}
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/50">{stat.label}</span>
                </div>
                <span className="text-xl font-black text-white leading-none">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[9px] font-bold text-white/40 uppercase mb-1">
              <span>Progresso total</span>
              <span>{Math.round((totalCollected / TOTAL_STICKERS) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-panini-gold to-yellow-400 transition-all duration-700"
                style={{ width: `${(totalCollected / TOTAL_STICKERS) * 100}%` }}
              />
            </div>
            <div className="text-[9px] font-bold text-white/30 mt-1 text-center">
              {totalCollected}/{TOTAL_STICKERS} figurinhas
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

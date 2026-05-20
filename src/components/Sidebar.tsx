import { X, Book, ChevronRight } from 'lucide-react';
import { SECTIONS, TOTAL_STICKERS } from '../data/sections';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSectionId: string;
  onSectionChange: (id: string) => void;
  collected: Set<string>;
}

export function Sidebar({ isOpen, onClose, activeSectionId, onSectionChange, collected }: SidebarProps) {
  const getSectionProgress = (id: string) => {
    const section = SECTIONS.find(s => s.id === id);
    if (!section) return 0;
    return Array.from({ length: section.count }).filter((_, i) => collected.has(`${id} ${i + 1}`)).length;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-panini-navy/60 backdrop-blur-sm z-20 md:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed md:relative inset-y-0 left-0 z-30 md:z-10
        w-72 bg-gradient-to-b from-panini-navy to-[#0a1525] border-r border-white/10
        transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
          <h2 className="font-bold text-panini-lightgold flex items-center gap-2 uppercase tracking-widest text-sm">
            <Book size={16} />
            Seções
          </h2>
          <button className="md:hidden text-white/50 hover:text-white transition-colors" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Sections list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar-light p-3 space-y-1">
          {/* Overall progress */}
          <div className="px-3 py-3 mb-2 bg-white/5 rounded-xl border border-white/5">
            <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Progresso Geral</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-panini-gold to-yellow-400 transition-all duration-500"
                  style={{ width: `${Math.round((collected.size / TOTAL_STICKERS) * 100)}%` }}
                />
              </div>
              <span className="text-sm font-black text-panini-lightgold">{Math.round((collected.size / TOTAL_STICKERS) * 100)}%</span>
            </div>
            <div className="text-[10px] font-bold text-white/40 mt-1">
              {collected.size}/{TOTAL_STICKERS} figurinhas
            </div>
          </div>

          {SECTIONS.map(sec => {
            const secProgress = getSectionProgress(sec.id);
            const isComplete = secProgress === sec.count;
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => { onSectionChange(sec.id); onClose(); }}
                className={`
                  w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group border
                  ${isActive
                    ? 'bg-white/10 border-panini-gold/40 text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                    : 'bg-transparent border-transparent text-white/60 hover:bg-white/5 hover:border-white/10'}
                `}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base leading-none shrink-0">{sec.flag}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ${
                        isActive ? 'bg-panini-gold text-panini-navy' : 'bg-white/10 text-white/50'
                      }`}>
                        {sec.id}
                      </span>
                      <span className="text-xs font-bold truncate">{sec.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 max-w-[60px] bg-white/10 rounded-full h-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-panini-teal' : 'bg-panini-gold/60'}`}
                          style={{ width: `${(secProgress / sec.count) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-white/40">{secProgress}/{sec.count}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={14} className={`shrink-0 transition-all ${isActive ? 'text-panini-gold opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-50'}`} />
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}

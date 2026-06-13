import { useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import { StickerCard } from './StickerCard';
import { getSection, SECTIONS } from '../data/sections';
import { getStickerInfo } from '../data/stickers';

const STICKERS_PER_PAGE = 10;

type FilterMode = 'all' | 'missing' | 'repeated';

interface AlbumPagesProps {
  activeSectionId: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  collected: Set<string>;
  repeated: Record<string, number>;
  onShowModal: (id: string) => void;
  searchQuery: string;
  filterMode: FilterMode;
  onFilterChange: (mode: FilterMode) => void;
}

export function AlbumPages({ activeSectionId, currentPage, onPageChange, collected, repeated, onShowModal, searchQuery, filterMode, onFilterChange }: AlbumPagesProps) {
  const section = getSection(activeSectionId);

  const stickers = useMemo(() => {
    return Array.from({ length: section.count }, (_, i) => ({
      id: `${section.id} ${i + 1}`,
      number: i + 1
    }));
  }, [section]);

  // Filter stickers by search query
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const q = searchQuery.toLowerCase().trim();
    const results: { id: string; number: number; sectionId: string; teamName: string }[] = [];

    for (const sec of SECTIONS) {
      for (let i = 1; i <= sec.count; i++) {
        const stickerId = `${sec.id} ${i}`;
        const info = getStickerInfo(stickerId);
        const matchName = info?.name.toLowerCase().includes(q);
        const matchSection = sec.id.toLowerCase().includes(q);
        const matchTeam = sec.name.toLowerCase().includes(q);
        const matchPosition = info?.position?.toLowerCase().includes(q);

        if (matchName || matchSection || matchTeam || matchPosition) {
          results.push({ id: stickerId, number: i, sectionId: sec.id, teamName: sec.name });
        }
      }
    }

    return results.sort((a, b) => {
      if (a.sectionId !== b.sectionId) return a.sectionId.localeCompare(b.sectionId);
      return a.number - b.number;
    });
  }, [searchQuery]);

  const displayStickers = filtered || stickers;
  const isFiltering = filtered !== null;

  // Apply filterMode on top of search results
  const filteredByMode = (() => {
    if (filterMode === 'all') return displayStickers;
    return displayStickers.filter(s => {
      if (filterMode === 'missing') return !collected.has(s.id);
      if (filterMode === 'repeated') return (repeated[s.id] || 0) > 0;
      return true;
    });
  })();

  const totalPages = Math.ceil(filteredByMode.length / STICKERS_PER_PAGE);

  const pageStickers = useMemo(() => {
    const start = currentPage * STICKERS_PER_PAGE;
    return filteredByMode.slice(start, start + STICKERS_PER_PAGE);
  }, [filteredByMode, currentPage]);

  // When filtering resets, reset page (inside useEffect to avoid side-effects during render)
  useEffect(() => {
    if (!searchQuery.trim() && currentPage > 0 && currentPage >= Math.ceil(section.count / STICKERS_PER_PAGE)) {
      onPageChange(0);
    }
  }, [searchQuery, currentPage, section.count, onPageChange]);

  const secCollected = stickers.filter(s => collected.has(s.id)).length;
  const secRepeated = stickers.reduce((acc, s) => acc + (repeated[s.id] || 0), 0);

  const FILTERS: { mode: FilterMode; label: string; activeClass: string }[] = [
    { mode: 'all',      label: 'Todas',    activeClass: 'bg-panini-navy text-white' },
    { mode: 'missing',  label: 'Faltando', activeClass: 'bg-red-500 text-white' },
    { mode: 'repeated', label: 'Repetidas',activeClass: 'bg-panini-gold text-panini-navy' },
  ];

  const getGridCols = () => {
    if (pageStickers.length <= 4) return 'grid-cols-2';
    if (pageStickers.length <= 6) return 'grid-cols-3';
    return 'grid-cols-5';
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-panini-navy/10 px-4 sm:px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between max-w-5xl mx-auto gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-lg leading-none shrink-0">{section.flag}</span>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black text-panini-navy uppercase tracking-tight leading-tight truncate">
                {isFiltering ? 'Resultados da Busca' : section.name}
              </h2>
              <p className="text-[10px] font-bold text-panini-burgundy uppercase tracking-wider">
                {isFiltering
                  ? `${filteredByMode.length} figurinhas encontradas`
                  : `${secCollected}/${section.count} coladas · ${secRepeated} repetidas`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Filter buttons */}
            <div className="flex bg-panini-navy/5 border border-panini-navy/10 rounded-lg p-0.5 gap-0.5">
              {FILTERS.map(f => (
                <button
                  key={f.mode}
                  onClick={() => { onFilterChange(f.mode); onPageChange(0); }}
                  className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide transition-all ${
                    filterMode === f.mode ? f.activeClass : 'text-panini-navy/50 hover:text-panini-navy hover:bg-panini-navy/5'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Pagination */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-1.5 rounded-lg bg-panini-navy/5 hover:bg-panini-navy/10 disabled:opacity-20 disabled:hover:bg-panini-navy/5 transition-all border border-panini-navy/10"
              aria-label="Página anterior"
            >
              <ChevronLeft size={18} className="text-panini-navy" />
            </button>
            <span className="text-xs font-bold text-panini-navy/60 min-w-[4rem] text-center">
              Pág. {currentPage + 1}/{Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="p-1.5 rounded-lg bg-panini-navy/5 hover:bg-panini-navy/10 disabled:opacity-20 disabled:hover:bg-panini-navy/5 transition-all border border-panini-navy/10"
              aria-label="Próxima página"
            >
              <ChevronRight size={18} className="text-panini-navy" />
            </button>
          </div>
        </div>
      </div>

      {/* Album page spread */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="min-h-full flex items-start justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-5xl">
            {/* Single page */}
            <div className="bg-white rounded-lg shadow-album-page overflow-hidden paper-texture-sm border border-panini-navy/5">
              {/* Page number header */}
              <div className="flex items-center justify-between px-5 py-2 border-b border-panini-navy/5">
                <div className="w-8 h-0.5 bg-panini-gold/30 rounded-full" />
                <span className="text-[10px] font-bold text-panini-navy/30 uppercase tracking-[0.2em]">
                  {isFiltering ? 'Busca' : `${section.name} · ${section.confederation}`}
                </span>
                <div className="w-8 h-0.5 bg-panini-gold/30 rounded-full" />
              </div>

              {/* Stickers grid */}
              <div className="p-4 sm:p-6">
                {pageStickers.length > 0 ? (
                  <div className={`grid ${getGridCols()} gap-3 sm:gap-4`}>
                    {pageStickers.map(s => (
                      <StickerCard
                        key={s.id}
                        stickerId={s.id}
                        sectionId={'sectionId' in s ? (s as any).sectionId : section.id}
                        number={s.number}
                        isCollected={collected.has(s.id)}
                        repeatedCount={repeated[s.id] || 0}
                        onShowModal={onShowModal}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center flex flex-col items-center gap-3">
                    {isFiltering || filterMode !== 'all' ? (
                      <>
                        <SearchX size={40} className="text-panini-navy/20" />
                        <p className="text-panini-navy/30 font-bold text-lg">Nenhuma figurinha encontrada</p>
                        <p className="text-panini-navy/20 text-xs font-bold">
                          {filterMode === 'missing' ? 'Parabéns! Você tem todas desta seção!' :
                           filterMode === 'repeated' ? 'Nenhuma repetida nesta seção.' :
                           'Tente outro termo de busca'}
                        </p>
                      </>
                    ) : (
                      <p className="text-panini-navy/30 font-bold text-lg">Fim das figurinhas desta seção</p>
                    )}
                  </div>
                )}
              </div>

              {/* Page footer */}
              <div className="flex items-center justify-between px-5 py-2 border-t border-panini-navy/5">
                <span className="text-[9px] font-bold text-panini-navy/20 uppercase tracking-wider">
                  {isFiltering ? 'Busca' : section.id}
                  {filterMode !== 'all' && !isFiltering && ` · ${filterMode === 'missing' ? 'Faltando' : 'Repetidas'}`}
                </span>
                {filteredByMode.length > 0 && (
                  <span className="text-[9px] font-bold text-panini-navy/20 uppercase tracking-wider">
                    {currentPage * STICKERS_PER_PAGE + 1}-{Math.min((currentPage + 1) * STICKERS_PER_PAGE, filteredByMode.length)}
                  </span>
                )}
                <span className="text-[9px] font-bold text-panini-navy/20 uppercase tracking-wider">
                  Fig. Copa 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

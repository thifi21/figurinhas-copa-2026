import { useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import { StickerCard } from './StickerCard';
import { getSection, SECTIONS } from '../data/sections';
import { getStickerInfo } from '../data/stickers';

const STICKERS_PER_PAGE = 20; // 20 per spread (10 per page)

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

      {/* Album Book Spread */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex items-start justify-center p-4 sm:p-8 perspective-1000">
        <div className="w-full max-w-6xl relative album-cover-shadow bg-panini-slot rounded-md">
          {/* Book Spread Container */}
          <div className="flex flex-col md:flex-row relative z-10 w-full min-h-[80vh] md:min-h-[600px]">
            
            {/* LEFT PAGE */}
            <div className="w-full md:w-1/2 bg-white paper-texture-sm album-page-left flex flex-col relative z-10">
              {/* Panini Style Header (only on first page of section, or just repeat it) */}
              <div className="h-16 flex items-stretch">
                <div className="w-4 bg-panini-navy" style={{ backgroundColor: section.colors[0] }}></div>
                <div className="flex-1 bg-gradient-to-r from-panini-navy to-panini-blue flex items-center px-4 justify-between" style={{ background: `linear-gradient(to right, ${section.colors[0]}, ${section.colors[1] || '#1A3668'})` }}>
                  <span className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter drop-shadow-md">
                    {isFiltering ? 'Busca' : section.name}
                  </span>
                  <span className="text-4xl drop-shadow-lg">{section.flag}</span>
                </div>
              </div>
              
              {/* Stickers grid left */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {pageStickers.slice(0, 10).length > 0 ? (
                  <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4`}>
                    {pageStickers.slice(0, 10).map(s => (
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
                  <div className="py-10 text-center flex flex-col items-center gap-3">
                    {/* Empty search state handled below if both are empty */}
                  </div>
                )}
              </div>

              {/* Page footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-black/5 mt-auto">
                 <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest">{section.id}</span>
                 <span className="text-[10px] font-bold text-black/30">{currentPage * 2 + 1}</span>
              </div>
            </div>

            {/* Book Spine Overlay (Desktop only) */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 -ml-4 w-8 album-spine-overlay z-20 pointer-events-none"></div>

            {/* RIGHT PAGE */}
            <div className="w-full md:w-1/2 bg-white paper-texture-sm album-page-right flex flex-col relative z-10 border-t border-dashed border-black/10 md:border-t-0 md:border-l md:border-solid md:border-black/5">
              {/* Optional header for right page, or just keep it simple */}
              <div className="h-16 flex items-stretch">
                <div className="flex-1 bg-gradient-to-r from-panini-blue to-white/10 flex items-center px-4 justify-end" style={{ background: `linear-gradient(to right, ${section.colors[1] || '#1A3668'}, rgba(255,255,255,0.1))` }}>
                   <span className="text-xl font-black text-black/10 uppercase tracking-tighter">
                     {section.confederation}
                   </span>
                </div>
              </div>

              {/* Stickers grid right */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {pageStickers.slice(10, 20).length > 0 ? (
                  <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4`}>
                    {pageStickers.slice(10, 20).map(s => (
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
                  pageStickers.length === 0 && (
                    <div className="py-16 text-center flex flex-col items-center gap-3 w-full absolute inset-0 justify-center">
                      {isFiltering || filterMode !== 'all' ? (
                        <>
                          <SearchX size={40} className="text-panini-navy/20" />
                          <p className="text-panini-navy/30 font-bold text-lg">Nenhuma figurinha encontrada</p>
                          <p className="text-panini-navy/20 text-xs font-bold">
                            {filterMode === 'missing' ? 'Parabéns! Você tem todas!' :
                             filterMode === 'repeated' ? 'Nenhuma repetida aqui.' :
                             'Tente outro termo'}
                          </p>
                        </>
                      ) : (
                        <p className="text-panini-navy/30 font-bold text-lg">Fim da seção</p>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Page footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-black/5 mt-auto">
                 <span className="text-[10px] font-bold text-black/30">Copa 2026</span>
                 <span className="text-[10px] font-bold text-black/30">{currentPage * 2 + 2}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

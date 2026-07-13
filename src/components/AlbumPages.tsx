import { useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import { StickerCard } from './StickerCard';
import { getSection, SECTIONS } from '../data/sections';
import { getStickerInfo } from '../data/stickers';

const STICKERS_PER_PAGE = 20; // 20 por spread (10 por página)

type FilterMode = 'all' | 'missing' | 'repeated';
type FlipDirection = 'forward' | 'backward' | null;

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

  const [flipClass, setFlipClass] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayPage, setDisplayPage] = useState(currentPage);
  const pendingPageRef = useRef<number | null>(null);
  const pendingDirectionRef = useRef<FlipDirection>(null);

  const stickers = useMemo(() => {
    return Array.from({ length: section.count }, (_, i) => ({
      id: `${section.id} ${i + 1}`,
      number: i + 1
    }));
  }, [section]);

  // Filter stickers by search query (all sections)
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

  // Keep displayPage in sync with currentPage (sem animação na troca de seção/filtro)
  useEffect(() => {
    setDisplayPage(currentPage);
  }, [currentPage, activeSectionId, filterMode, searchQuery]);

  const pageStickers = useMemo(() => {
    const start = displayPage * STICKERS_PER_PAGE;
    return filteredByMode.slice(start, start + STICKERS_PER_PAGE);
  }, [filteredByMode, displayPage]);

  // When filtering resets, reset page
  useEffect(() => {
    if (!searchQuery.trim() && currentPage > 0 && currentPage >= Math.ceil(section.count / STICKERS_PER_PAGE)) {
      onPageChange(0);
    }
  }, [searchQuery, currentPage, section.count, onPageChange]);

  // ── Flip animation logic ───────────────────────────────────────────────────
  const triggerFlip = useCallback((targetPage: number, direction: FlipDirection) => {
    if (isAnimating) return;
    if (targetPage < 0 || targetPage >= totalPages) return;

    pendingPageRef.current = targetPage;
    pendingDirectionRef.current = direction;
    setIsAnimating(true);

    // Phase 1: exit animation
    setFlipClass(direction === 'forward' ? 'flip-out-forward' : 'flip-out-backward');

    setTimeout(() => {
      // Swap the page content mid-flip
      setDisplayPage(pendingPageRef.current!);
      onPageChange(pendingPageRef.current!);

      // Phase 2: enter animation
      setFlipClass(pendingDirectionRef.current === 'forward' ? 'flip-in-forward' : 'flip-in-backward');

      setTimeout(() => {
        setFlipClass('');
        setIsAnimating(false);
      }, 340);
    }, 290);
  }, [isAnimating, totalPages, onPageChange]);

  const goNext = useCallback(() => triggerFlip(currentPage + 1, 'forward'), [currentPage, triggerFlip]);
  const goPrev = useCallback(() => triggerFlip(currentPage - 1, 'backward'), [currentPage, triggerFlip]);

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const secCollected = stickers.filter(s => collected.has(s.id)).length;
  const secRepeated  = stickers.reduce((acc, s) => acc + (repeated[s.id] || 0), 0);
  const secProgress  = section.count > 0 ? Math.round((secCollected / section.count) * 100) : 0;

  const FILTERS: { mode: FilterMode; label: string; activeClass: string }[] = [
    { mode: 'all',      label: 'Todas',    activeClass: 'bg-panini-navy text-white' },
    { mode: 'missing',  label: 'Faltando', activeClass: 'bg-red-500 text-white' },
    { mode: 'repeated', label: 'Repetidas',activeClass: 'bg-panini-gold text-panini-navy' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* ── Panini-style Section Header ─────────────────────────────────── */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${section.colors[0]} 0%, ${section.colors[1] || section.colors[0]} 60%, ${section.colors[2] || section.colors[1] || section.colors[0]} 100%)` }}
      >
        {/* decorative lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 40px)' }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-32 opacity-20 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.3), transparent)' }}
        />

        <div className="relative z-10 px-4 sm:px-6 py-3 flex items-center justify-between max-w-6xl mx-auto gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl drop-shadow-lg shrink-0">{section.flag}</span>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight leading-tight truncate drop-shadow-md"
                  style={{ fontFamily: "'Oswald', 'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                {isFiltering ? 'Resultados da Busca' : section.name}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
                  {isFiltering
                    ? `${filteredByMode.length} figurinhas encontradas`
                    : `${secCollected}/${section.count} coladas · ${secRepeated} repetidas`}
                </p>
                {!isFiltering && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 bg-black/30 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${secProgress}%`,
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.95))'
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-white/90">{secProgress}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Filter buttons */}
            <div className="flex bg-black/20 border border-white/10 rounded-lg p-0.5 gap-0.5 backdrop-blur-sm">
              {FILTERS.map(f => (
                <button
                  key={f.mode}
                  onClick={() => { onFilterChange(f.mode); onPageChange(0); }}
                  className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide transition-all ${
                    filterMode === f.mode ? f.activeClass : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Pagination */}
            <button
              onClick={goPrev}
              disabled={currentPage === 0 || isAnimating}
              className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 disabled:opacity-30 disabled:hover:bg-black/20 transition-all border border-white/20 backdrop-blur-sm"
              aria-label="Página anterior (←)"
              title="Página anterior (tecla ←)"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <span className="text-xs font-bold text-white/80 min-w-[4.5rem] text-center tabular-nums">
              {currentPage + 1} / {Math.max(1, totalPages)}
            </span>
            <button
              onClick={goNext}
              disabled={currentPage >= totalPages - 1 || isAnimating}
              className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 disabled:opacity-30 disabled:hover:bg-black/20 transition-all border border-white/20 backdrop-blur-sm"
              aria-label="Próxima página (→)"
              title="Próxima página (tecla →)"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Album Book Spread ──────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex items-start justify-center p-3 sm:p-6 lg:p-8 album-spread-wrapper">
        <div className={`w-full max-w-6xl relative album-cover-shadow rounded-md album-spread ${flipClass}`}>

          {/* Book Spread Container */}
          <div className="flex flex-col md:flex-row relative z-10 w-full min-h-[80vh] md:min-h-[600px]">

            {/* ── LEFT PAGE ───────────────────────────────────────────── */}
            <div className="w-full md:w-1/2 paper-texture-sm album-page-left flex flex-col relative z-10">
              {/* Panini-style page header */}
              <div className="h-14 flex items-stretch shrink-0">
                <div className="w-3 shrink-0" style={{ backgroundColor: section.colors[0] }} />
                <div
                  className="flex-1 flex items-center px-4 justify-between"
                  style={{ background: `linear-gradient(to right, ${section.colors[0]}, ${section.colors[1] || '#1A3668'})` }}
                >
                  <span
                    className="text-xl sm:text-2xl font-black text-white uppercase drop-shadow-md tracking-tight"
                    style={{ fontFamily: "'Oswald', 'Inter', sans-serif" }}
                  >
                    {isFiltering ? 'Busca' : section.name}
                  </span>
                  <span className="text-3xl drop-shadow-lg">{section.flag}</span>
                </div>
              </div>

              {/* Stickers grid left */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col">
                {pageStickers.slice(0, 10).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
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
                  <div className="py-10 text-center flex flex-col items-center gap-3" />
                )}
              </div>

              {/* Page footer */}
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-black/5 mt-auto shrink-0">
                <span className="text-[9px] font-bold text-black/25 uppercase tracking-widest">{section.id}</span>
                <span className="text-[9px] font-bold text-black/25 tabular-nums">{displayPage * 2 + 1}</span>
              </div>
            </div>

            {/* Book Spine Overlay (Desktop) */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 -ml-4 w-8 album-spine-overlay z-20 pointer-events-none" />

            {/* ── RIGHT PAGE ──────────────────────────────────────────── */}
            <div className="w-full md:w-1/2 paper-texture-sm album-page-right flex flex-col relative z-10 border-t border-dashed border-black/10 md:border-t-0 md:border-l md:border-solid md:border-black/5">
              {/* Right page header */}
              <div className="h-14 flex items-stretch shrink-0">
                <div
                  className="flex-1 flex items-center px-4 justify-end"
                  style={{ background: `linear-gradient(to right, ${section.colors[1] || '#1A3668'}, rgba(255,255,255,0.05))` }}
                >
                  <span className="text-lg font-black text-black/10 uppercase tracking-tighter">
                    {section.confederation}
                  </span>
                </div>
                <div className="w-3 shrink-0" style={{ backgroundColor: section.colors[1] || section.colors[0] }} />
              </div>

              {/* Stickers grid right */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col">
                {pageStickers.slice(10, 20).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
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
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-black/5 mt-auto shrink-0">
                <span className="text-[9px] font-bold text-black/25">Copa do Mundo 2026</span>
                <span className="text-[9px] font-bold text-black/25 tabular-nums">{displayPage * 2 + 2}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

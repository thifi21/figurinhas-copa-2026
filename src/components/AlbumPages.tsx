import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StickerCard } from './StickerCard';
import { getSection } from '../data/sections';

const STICKERS_PER_PAGE = 10;

interface AlbumPagesProps {
  activeSectionId: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  collected: Set<string>;
  repeated: Record<string, number>;
  onShowModal: (id: string) => void;
}

export function AlbumPages({ activeSectionId, currentPage, onPageChange, collected, repeated, onShowModal }: AlbumPagesProps) {
  const section = getSection(activeSectionId);
  const totalPages = Math.ceil(section.count / STICKERS_PER_PAGE);

  const stickers = useMemo(() => {
    return Array.from({ length: section.count }, (_, i) => ({
      id: `${section.id} ${i + 1}`,
      number: i + 1
    }));
  }, [section]);

  const pageStickers = useMemo(() => {
    const start = currentPage * STICKERS_PER_PAGE;
    return stickers.slice(start, start + STICKERS_PER_PAGE);
  }, [stickers, currentPage]);

  const secCollected = stickers.filter(s => collected.has(s.id)).length;
  const secRepeated = stickers.reduce((acc, s) => acc + (repeated[s.id] || 0), 0);

  const getGridCols = () => {
    if (pageStickers.length <= 4) return 'grid-cols-2';
    if (pageStickers.length <= 6) return 'grid-cols-3';
    return 'grid-cols-5';
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Page header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-panini-navy/10 px-4 sm:px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-lg leading-none">{section.flag}</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-panini-navy uppercase tracking-tight leading-tight">
                {section.name}
              </h2>
              <p className="text-[10px] font-bold text-panini-burgundy uppercase tracking-wider">
                {secCollected}/{section.count} coladas &middot; {secRepeated} repetidas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-1.5 rounded-lg bg-panini-navy/5 hover:bg-panini-navy/10 disabled:opacity-20 disabled:hover:bg-panini-navy/5 transition-all border border-panini-navy/10"
            >
              <ChevronLeft size={18} className="text-panini-navy" />
            </button>
            <span className="text-xs font-bold text-panini-navy/60 min-w-[4rem] text-center">
              Pág. {currentPage + 1}/{totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="p-1.5 rounded-lg bg-panini-navy/5 hover:bg-panini-navy/10 disabled:opacity-20 disabled:hover:bg-panini-navy/5 transition-all border border-panini-navy/10"
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
                  {section.name} &middot; {section.confederation}
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
                        sectionId={section.id}
                        number={s.number}
                        isCollected={collected.has(s.id)}
                        repeatedCount={repeated[s.id] || 0}
                        onShowModal={onShowModal}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <p className="text-panini-navy/30 font-bold text-lg">Fim das figurinhas desta seção</p>
                  </div>
                )}
              </div>

              {/* Page footer */}
              <div className="flex items-center justify-between px-5 py-2 border-t border-panini-navy/5">
                <span className="text-[9px] font-bold text-panini-navy/20 uppercase tracking-wider">
                  {section.id}
                </span>
                <span className="text-[9px] font-bold text-panini-navy/20 uppercase tracking-wider">
                  {currentPage * STICKERS_PER_PAGE + 1}-{Math.min((currentPage + 1) * STICKERS_PER_PAGE, section.count)}
                </span>
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

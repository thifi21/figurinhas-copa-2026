import { getSection } from '../data/sections';
import type { Section } from '../data/sections';

interface StickerCardProps {
  stickerId: string;
  sectionId: string;
  number: number;
  isCollected: boolean;
  repeatedCount: number;
  onShowModal: (id: string) => void;
}

export function StickerCard({ stickerId, sectionId, number, isCollected, repeatedCount, onShowModal }: StickerCardProps) {
  const section = getSection(sectionId);

  return (
    <button
      onClick={() => onShowModal(stickerId)}
      className={`
        group relative w-full perspective-1000
        ${isCollected ? 'animate-sticker-place' : ''}
      `}
    >
      <div className={`
        relative aspect-[3/4] w-full rounded-sm overflow-hidden
        transition-all duration-300 ease-out
        ${isCollected
          ? 'bg-white border-[3px] border-white shadow-sticker hover:shadow-xl hover:scale-[1.08] hover:-rotate-1 z-10'
          : 'bg-panini-slot border-2 border-dashed border-panini-navy/20 hover:border-panini-navy/40 hover:bg-panini-navy/5'}
      `}>
        {isCollected ? (
          <StickerCollected section={section} number={number} repeatedCount={repeatedCount} />
        ) : (
          <StickerEmpty section={section} number={number} />
        )}
      </div>
    </button>
  );
}

function StickerCollected({ section, number, repeatedCount }: { section: Section; number: number; repeatedCount: number }) {
  return (
    <>
      {/* Flag background gradient */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `linear-gradient(135deg, ${section.colors[0]} 0%, ${section.colors[1] || section.colors[0]} 50%, ${section.colors[2] || section.colors[0]} 100%)`
        }}
      />

      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none sticker-shine" />

      {/* Number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-5xl sm:text-6xl font-black opacity-[0.15] select-none"
          style={{ color: section.colors[2] || '#000' }}
        >
          {number}
        </span>
      </div>

      {/* Section code */}
      <div className="absolute top-1.5 left-1.5 right-1.5 flex justify-between items-start">
        <span className="text-[9px] sm:text-[10px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] uppercase tracking-tighter">
          {section.id}
        </span>
        <span className="text-[16px] leading-none opacity-80">{section.flag}</span>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-4 pb-1 px-1.5">
        <div className="text-[8px] sm:text-[9px] font-bold text-white text-center uppercase tracking-tight truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          Fig. {number}
        </div>
      </div>

      {/* Repeated badge */}
      {repeatedCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-panini-gold to-yellow-600 text-panini-navy text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20">
          +{repeatedCount}
        </div>
      )}

      {/* Corner fold effect */}
      <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-white/40 to-transparent clip-corner" />
    </>
  );
}

function StickerEmpty({ section, number }: { section: Section; number: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
      <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest text-panini-navy">
        {section.id}
      </span>
      <span className="text-lg sm:text-xl font-black opacity-20 text-panini-navy">
        {number}
      </span>
      <span className="text-[16px] opacity-20 mt-1">{section.flag}</span>
    </div>
  );
}

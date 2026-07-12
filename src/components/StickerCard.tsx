import { getSection } from '../data/sections';
import { getStickerInfo, getStickerType } from '../data/stickers';
import { getStickerImageUrl } from '../data/stickerImage';
import type { Section } from '../data/sections';

interface StickerCardProps {
  stickerId: string;
  sectionId: string;
  number: number;
  isCollected: boolean;
  repeatedCount: number;
  onShowModal: (id: string) => void;
}

const POSITION_LABELS: Record<string, string> = {
  'Goleiro': 'GK',
  'Zagueiro': 'CB',
  'Lateral': 'FB',
  'Meio-campista': 'MF',
  'Atacante': 'FW',
};

export function StickerCard({ stickerId, sectionId, number, isCollected, repeatedCount, onShowModal }: StickerCardProps) {
  const section = getSection(sectionId);
  const info = getStickerInfo(stickerId);
  const type = getStickerType(number);

  const displayName = info?.name || `Figurinha ${section.id} ${number}`;
  const ariaLabel = `${displayName} — ${isCollected ? 'Colada' : 'Faltando'}${repeatedCount > 0 ? `, ${repeatedCount} repetida(s)` : ''}`;

  return (
    <button
      onClick={() => onShowModal(stickerId)}
      className="group relative w-full perspective-1000"
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <div 
        className={`
          relative aspect-[3/4] w-full rounded-sm overflow-hidden
          transition-all duration-300 ease-out
          ${isCollected
            ? 'bg-white border-2 border-white/90 shadow-[0_2px_5px_rgba(0,0,0,0.3)] hover:shadow-xl hover:scale-[1.08] hover:rotate-0 z-10'
            : 'bg-transparent border border-black/30 hover:border-black/50 hover:bg-black/5'}
        `}
        style={isCollected ? { 
          transform: `rotate(${((number % 5) - 2) * 0.8}deg) translate(${((number % 3) - 1)}px, ${((number % 4) - 1.5)}px)`
        } : {}}
      >
        {isCollected ? (
          <StickerCollected section={section} number={number} info={info} type={type} repeatedCount={repeatedCount} stickerId={stickerId} />
        ) : (
          <StickerEmpty section={section} number={number} />
        )}
      </div>
    </button>
  );
}


function StickerCollected({ section, number, info, type, repeatedCount, stickerId }: {
  section: Section; number: number; info?: { name: string; position?: string }; type: string; repeatedCount: number; stickerId: string
}) {
  const imageUrl = getStickerImageUrl(stickerId, 'card');
  const isEmblem = type === 'emblem';
  const isPhoto = type === 'photo';
  const isTournament = type === 'tournament';
  const isMuseum = type === 'museum';

  const displayName = info?.name || (isEmblem ? `Escudo ${section.name}` : isPhoto ? `${section.name} — Foto` : `Fig. ${number}`);

  // Real sticker image
  if (imageUrl) {
    return (
      <>
        <div className="absolute inset-0 sticker-shine">
          <img
            src={imageUrl}
            alt={displayName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />

        {repeatedCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-panini-gold to-yellow-600 text-panini-navy text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20">
            +{repeatedCount}
          </div>
        )}
      </>
    );
  }

  // Fallback: gradient design
  return (
    <>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `linear-gradient(135deg, ${section.colors[0]} 0%, ${section.colors[1] || section.colors[0]} 50%, ${section.colors[2] || section.colors[0]} 100%)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none sticker-shine" />

      {/* Large number watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl sm:text-6xl font-black opacity-[0.12] select-none" style={{ color: section.colors[2] || '#000' }}>
          {number}
        </span>
      </div>

      {/* Top section code + flag */}
      <div className="absolute top-1.5 left-1.5 right-1.5 flex justify-between items-start z-10">
        <span className="text-[9px] sm:text-[10px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] uppercase tracking-tighter">
          {isTournament || isMuseum ? 'FWC' : section.id}
        </span>
        <span className="text-[16px] leading-none opacity-80">{section.flag}</span>
      </div>

      {/* Sticker name */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 z-10">
        {isEmblem && <span className="text-xs sm:text-sm font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] uppercase text-center leading-tight">Emblema</span>}
        {isPhoto && <span className="text-xs sm:text-sm font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] uppercase text-center leading-tight">Foto da Equipe</span>}
        {!isEmblem && !isPhoto && !isTournament && !isMuseum && info && (
          <>
            <span className="text-[10px] sm:text-xs font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-center leading-tight px-1">
              {displayName}
            </span>
            {info.position && (
              <span className="text-[8px] font-bold text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-0.5 uppercase tracking-wider">
                {POSITION_LABELS[info.position] || info.position}
              </span>
            )}
          </>
        )}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-4 pb-1 px-1.5 z-10">
        <div className="text-[8px] sm:text-[9px] font-bold text-white text-center uppercase tracking-tight truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          {isEmblem ? `Escudo ${section.id}` : isPhoto ? `${section.id} Foto` : `${section.id} ${number}`}
        </div>
      </div>

      {repeatedCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-panini-gold to-yellow-600 text-panini-navy text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20">
          +{repeatedCount}
        </div>
      )}

      <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-white/40 to-transparent clip-corner" />
    </>
  );
}

function StickerEmpty({ section, number }: { section: Section; number: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-1 bg-white/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.03)]">
      {/* Inner guide border */}
      <div className="absolute inset-[3px] border border-black/10"></div>
      
      {/* Section ID Top Left */}
      <div className="absolute top-1.5 left-1.5 px-0.5 border border-black/20 bg-white/30">
        <span className="text-[7px] font-bold text-black/40 uppercase block leading-none">{section.id}</span>
      </div>

      {/* Big Number */}
      <span className="text-3xl sm:text-4xl font-black text-black/10 tracking-tighter">
        {number}
      </span>
      
      {/* Small text indicator at bottom */}
      <div className="absolute bottom-1.5 w-full text-center">
        <div className="mx-2 border-t border-black/10 pt-0.5">
          <span className="text-[6px] font-bold text-black/30 uppercase tracking-widest block truncate">
            {section.name}
          </span>
        </div>
      </div>
    </div>
  );
}

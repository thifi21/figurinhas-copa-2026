import { X, Minus, Plus, Trophy, Layers, Shield, Camera } from 'lucide-react';
import { getSection } from '../data/sections';
import { getStickerInfo, getStickerType } from '../data/stickers';
import { getStickerImageUrl } from '../data/stickerImage';

interface StickerModalProps {
  stickerId: string;
  isCollected: boolean;
  repeatedCount: number;
  onClose: () => void;
  onToggleCollected: (id: string) => void;
  onAddRepeated: (id: string) => void;
  onRemoveRepeated: (id: string) => void;
}

export function StickerModal({ stickerId, isCollected, repeatedCount, onClose, onToggleCollected, onAddRepeated, onRemoveRepeated }: StickerModalProps) {
  const [sectionId, numStr] = stickerId.split(' ');
  const number = parseInt(numStr);
  const section = getSection(sectionId);
  const colors = section.colors;
  const info = getStickerInfo(stickerId);
  const type = getStickerType(number);

  const isEmblem = type === 'emblem';
  const isPhoto = type === 'photo';
  const isTournament = type === 'tournament';
  const isMuseum = type === 'museum';

  const displayName = info?.name
    || (isEmblem ? `Escudo ${section.name}` : isPhoto ? `Foto da Equipe - ${section.name}` : `Figurinha ${number}`);

  return (
    <div
      className="fixed inset-0 bg-panini-navy/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="h-2 w-full"
          style={{ background: `linear-gradient(90deg, ${colors[0]}, ${colors[1] || colors[0]}, ${colors[2] || colors[0]})` }}
        />

        <div className="p-6 pt-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-panini-navy/40 hover:text-panini-burgundy bg-white/80 rounded-full p-1.5 shadow-sm transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Sticker preview */}
          <div className="flex flex-col items-center mb-6 pt-2">
            <div className="relative aspect-[3/4] w-40 rounded-sm border-[4px] border-white shadow-sticker mb-4 transform rotate-2 hover:rotate-0 transition-transform duration-300 overflow-hidden">
              {(() => {
                const imgUrl = getStickerImageUrl(stickerId, 'modal');
                if (imgUrl) {
                  return (
                    <img
                      src={imgUrl}
                      alt={displayName}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  );
                }
                return (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1] || colors[0]} 50%, ${colors[2] || colors[0]} 100%)`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none" />

                    {/* Number watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-black opacity-[0.12] select-none" style={{ color: colors[2] || '#000' }}>
                        {number}
                      </span>
                    </div>

                    {/* Top info */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                      <span className="text-[11px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] uppercase">
                        {isTournament || isMuseum ? 'FWC' : sectionId}
                      </span>
                      <span className="text-xl leading-none opacity-80">{section.flag}</span>
                    </div>

                    {/* Player/Sticker name */}
                    {info && !isEmblem && !isPhoto && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
                        <span className="text-sm font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-center leading-tight">
                          {displayName}
                        </span>
                        {info.position && (
                          <span className="text-[10px] font-bold text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mt-0.5 uppercase tracking-wider">
                            {info.position}
                          </span>
                        )}
                      </div>
                    )}

                    {isEmblem && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <Shield size={32} className="text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-1" />
                          <span className="text-xs font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] uppercase">Emblema</span>
                        </div>
                      </div>
                    )}

                    {isPhoto && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <Camera size={32} className="text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-1" />
                          <span className="text-xs font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] uppercase">Foto da Equipe</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-5 pb-1.5 px-2">
                      <div className="text-[10px] font-bold text-white text-center uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                        {sectionId} &middot; {number}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            <h2 className="text-xl font-black text-panini-navy uppercase tracking-tight mb-0.5 text-center leading-tight px-2">
              {displayName}
            </h2>
            <p className="text-xs font-bold text-panini-burgundy uppercase tracking-widest flex items-center gap-1.5">
              <span>{section.flag}</span>
              <span>{section.name}</span>
              {info?.position && <><span className="text-panini-navy/30">|</span><span>{info.position}</span></>}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onToggleCollected(stickerId)}
              className={`
                w-full py-3.5 rounded-xl font-black text-base transition-all flex items-center justify-center gap-2 uppercase tracking-wide
                ${isCollected
                  ? 'bg-white text-panini-burgundy hover:bg-red-50 border-2 border-panini-burgundy/20 shadow-sm'
                  : 'text-white hover:brightness-110 border-none shadow-[0_4px_15px_rgba(212,175,55,0.4)]'}
              `}
              style={!isCollected ? {
                background: `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]})`
              } : {}}
            >
              <Trophy size={18} />
              {isCollected ? 'Remover do Álbum' : 'Colar Figurinha'}
            </button>

            <div className="bg-panini-paper rounded-xl flex items-center justify-between p-3 border-2 border-panini-navy/5">
              <span className="font-bold text-panini-navy flex items-center gap-2 uppercase text-xs tracking-wider">
                <Layers size={16} className="text-panini-gold" />
                Repetidas
              </span>
              <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-panini-navy/10 shadow-inner">
                <button
                  onClick={() => onRemoveRepeated(stickerId)}
                  disabled={repeatedCount === 0}
                  className="p-1.5 rounded-md text-panini-burgundy hover:bg-panini-paper disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="font-black text-lg w-8 text-center text-panini-navy">
                  {repeatedCount}
                </span>
                <button
                  onClick={() => onAddRepeated(stickerId)}
                  className="p-1.5 rounded-md text-panini-blue hover:bg-panini-paper transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

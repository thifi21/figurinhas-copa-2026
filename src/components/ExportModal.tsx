import { X, Copy, Check, MessageCircle, Layers } from 'lucide-react';
import { useState } from 'react';
import { SECTIONS } from '../data/sections';

interface ExportModalProps {
  repeated: Record<string, number>;
  onClose: () => void;
}

export function ExportModal({ repeated, onClose }: ExportModalProps) {
  const [copied, setCopied] = useState(false);

  // Agrupa repetidas por seção e monta o texto
  const text = (() => {
    const groups: Record<string, string[]> = {};

    for (const [stickerId, count] of Object.entries(repeated)) {
      if (count <= 0) continue;
      const [sectionId, numStr] = stickerId.split(' ');
      if (!groups[sectionId]) groups[sectionId] = [];
      const label = count > 1 ? `${numStr}(x${count})` : numStr;
      groups[sectionId].push(label);
    }

    const lines: string[] = ['🔄 *Tenho para trocar — Copa 2026*', ''];

    for (const section of SECTIONS) {
      if (!groups[section.id]) continue;
      lines.push(`${section.flag} *${section.name}* (${section.id}): ${groups[section.id].join(', ')}`);
    }

    const total = Object.values(repeated).reduce((a, b) => a + b, 0);
    lines.push('', `📦 Total de repetidas: ${total}`);
    lines.push('Gerado pelo Álbum Copa 2026 🏆');

    return lines.join('\n');
  })();

  const totalRepeated = Object.values(repeated).reduce((a, b) => a + b, 0);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 bg-panini-navy/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-2 w-full bg-gradient-to-r from-panini-gold via-yellow-400 to-panini-gold" />

        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-panini-navy/40 hover:text-panini-burgundy bg-white/80 rounded-full p-1.5 shadow-sm transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-panini-gold to-yellow-600 flex items-center justify-center shadow-md">
              <Layers size={20} className="text-panini-navy" />
            </div>
            <div>
              <h2 className="text-lg font-black text-panini-navy uppercase tracking-tight">Lista de Trocas</h2>
              <p className="text-xs font-bold text-panini-burgundy uppercase tracking-wider">
                {totalRepeated} figurinha{totalRepeated !== 1 ? 's' : ''} repetida{totalRepeated !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {totalRepeated === 0 ? (
            <div className="py-10 text-center">
              <Layers size={40} className="text-panini-navy/20 mx-auto mb-3" />
              <p className="font-bold text-panini-navy/40">Você não tem figurinhas repetidas ainda.</p>
            </div>
          ) : (
            <>
              {/* Preview */}
              <div className="bg-panini-paper rounded-xl border border-panini-navy/10 p-3 mb-4 max-h-52 overflow-y-auto custom-scrollbar">
                <pre className="text-[11px] font-mono text-panini-navy/70 whitespace-pre-wrap leading-relaxed">{text}</pre>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 uppercase tracking-wide transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-panini-navy/5 text-panini-navy hover:bg-panini-navy/10 border border-panini-navy/10'
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex-1 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 uppercase tracking-wide text-white shadow-md transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

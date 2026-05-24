import { SECTIONS } from '../data/sections';
import { ArrowLeft, Printer } from 'lucide-react';

interface PrintableChecklistProps {
  collected: Set<string>;
  onBack: () => void;
}

export function PrintableChecklist({ collected, onBack }: PrintableChecklistProps) {
  // To fit 49 sections in one A4 page, we need a very dense grid.
  // We'll use CSS grid.

  return (
    <div className="min-h-screen bg-white print:bg-white text-black font-sans p-4 print:p-0">
      
      {/* Header controls (Hidden when printing) */}
      <div className="print:hidden mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors font-medium text-sm"
        >
          <ArrowLeft size={16} /> Voltar para o Álbum
        </button>
        <div className="text-center flex-1">
          <h2 className="font-bold text-lg text-gray-800">Visualização de Impressão</h2>
          <p className="text-xs text-gray-500">Para melhor resultado, desmarque "Cabeçalhos e rodapés" e zere as margens no diálogo de impressão.</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium text-sm shadow-md"
        >
          <Printer size={16} /> Imprimir PDF
        </button>
      </div>

      {/* Printable Area */}
      <div className="print-container max-w-[210mm] mx-auto print:mx-0 print:max-w-none">
        
        {/* Print Header */}
        <div className="flex justify-between items-end border-b-2 border-black pb-2 mb-3">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">Copa 2026</h1>
            <h2 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Checklist Oficial</h2>
          </div>
          <div className="text-[10px] font-bold border border-black px-2 py-1">
            Minhas Figurinhas: {collected.size} / 980
          </div>
        </div>

        {/* Dense Grid for Sections */}
        <div className="grid grid-cols-6 gap-[4px]">
          {SECTIONS.map((section) => {
            const hasColors = section.colors && section.colors.length >= 2;
            const bgClass = hasColors ? '' : 'bg-gray-200';
            
            return (
              <div key={section.id} className="border border-black break-inside-avoid">
                {/* Section Header */}
                <div 
                  className={`flex items-center justify-between px-1 py-[2px] border-b border-black text-white ${bgClass}`}
                  style={hasColors ? { background: `linear-gradient(90deg, ${section.colors[0]}, ${section.colors[1]})` } : {}}
                >
                  <span className="font-bold text-[7.5px] uppercase truncate flex-1 drop-shadow-md">{section.name}</span>
                  <span className="text-[8px] ml-1">{section.flag}</span>
                </div>
                
                {/* Stickers Grid */}
                <div className="grid grid-cols-4 gap-[1px] p-[2px] bg-gray-100">
                  {Array.from({ length: section.count }, (_, i) => {
                    const num = i + 1;
                    const stickerId = `${section.id} ${num}`;
                    const isCollected = collected.has(stickerId);
                    
                    return (
                      <div 
                        key={stickerId}
                        className={`
                          flex items-center justify-center border text-[7px] font-semibold h-[10px]
                          ${isCollected 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-gray-800 border-gray-400'
                          }
                        `}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-3 text-center text-[8px] text-gray-500 font-medium">
          Gerado pelo aplicativo Figurinhas Copa 2026
        </div>
      </div>
    </div>
  );
}

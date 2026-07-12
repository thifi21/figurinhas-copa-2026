import { useState, useCallback } from 'react';
import { Menu, Cloud, Search, Printer, AlertTriangle, Layers } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { AlbumPages } from './components/AlbumPages';
import { StickerModal } from './components/StickerModal';
import { SearchBar } from './components/SearchBar';
import { PrintableChecklist } from './components/PrintableChecklist';
import { ExportModal } from './components/ExportModal';
import { StatsPanel } from './components/StatsPanel';
import { useCollection } from './hooks/useCollection';
import { SECTIONS, TOTAL_STICKERS } from './data/sections';

type FilterMode = 'all' | 'missing' | 'repeated';

export default function App() {
  const {
    collected, repeated, isCollected, getRepeated,
    toggleCollected, addRepeated, removeRepeated,
    syncing, syncError, totalCollected
  } = useCollection();

  const [view, setView] = useState<'album' | 'print'>('album');
  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0].id);
  const [currentPage, setCurrentPage] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [showExport, setShowExport] = useState(false);

  const handleSectionChange = useCallback((id: string) => {
    setActiveSectionId(id);
    setCurrentPage(0);
  }, []);

  const handleShowModal = useCallback((id: string) => {
    setSelectedSticker(id);
  }, []);

  // Reset page when search changes
  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(0);
  }, []);

  const handleFilterChange = useCallback((mode: FilterMode) => {
    setFilterMode(mode);
    setCurrentPage(0);
  }, []);

  const progress = Math.round((totalCollected / TOTAL_STICKERS) * 100) || 0;
  const hasSupabase = !!import.meta.env.VITE_SUPABASE_URL;

  if (view === 'print') {
    return <PrintableChecklist collected={collected} onBack={() => setView('album')} />;
  }

  return (
    <div className="h-screen flex flex-col bg-transparent font-sans overflow-hidden">
      {/* Sleek Floating Header */}
      <header className="z-30 flex-shrink-0 p-2 sm:p-4 pointer-events-none">
        <div className="max-w-5xl mx-auto flex items-center justify-between glass-panel px-3 sm:px-5 py-2 pointer-events-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/10 text-white"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu de seções"
            >
              <Menu size={20} className="text-panini-lightgold" />
            </button>

            {/* Album logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-panini-gold to-yellow-600 flex items-center justify-center shadow-lg border border-yellow-300/30">
                <span className="text-panini-navy font-black text-sm sm:text-base">26</span>
              </div>
              <div>
                <h1 className="text-sm sm:text-lg font-black tracking-tight leading-tight text-white">
                  COPA 2026
                </h1>
                <p className="text-[8px] sm:text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] leading-tight">
                  Álbum de Figurinhas
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 relative">
            {/* Search toggle (mobile) + search bar (desktop) */}
            <button
              className="sm:hidden p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/10"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Buscar figurinha"
            >
              <Search size={18} className="text-panini-lightgold" />
            </button>

            <div className="hidden sm:flex">
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
            </div>

            {/* Stats panel */}
            <div className="relative hidden sm:flex">
              <StatsPanel collected={collected} repeated={repeated} />
            </div>

            {/* Export button */}
            <button
              className="p-1.5 sm:px-3 sm:py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/10 flex items-center gap-2"
              onClick={() => setShowExport(true)}
              title="Exportar lista de trocas"
              aria-label="Exportar lista de trocas"
            >
              <Layers size={18} className="text-panini-lightgold" />
              <span className="hidden sm:inline text-xs font-bold text-panini-lightgold uppercase">Trocas</span>
            </button>

            {/* Print button */}
            <button
              className="p-1.5 sm:px-3 sm:py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/10 flex items-center gap-2"
              onClick={() => setView('print')}
              title="Imprimir Checklist PDF"
              aria-label="Imprimir checklist em PDF"
            >
              <Printer size={18} className="text-panini-lightgold" />
              <span className="hidden sm:inline text-xs font-bold text-panini-lightgold uppercase">PDF</span>
            </button>

            {/* Sync indicator */}
            {hasSupabase && (
              <div className={`hidden sm:flex items-center gap-1 text-[10px] font-bold transition-colors ${
                syncError ? 'text-red-400' : syncing ? 'text-yellow-400' : 'text-green-400/70'
              }`}>
                {syncError
                  ? <AlertTriangle size={12} />
                  : syncing
                    ? <Cloud size={12} className="animate-pulse" />
                    : <Cloud size={12} />
                }
                <span className="hidden lg:inline">
                  {syncError ? 'Erro sync' : syncing ? 'Sincronizando...' : 'Salvo'}
                </span>
              </div>
            )}

            {/* Progress bar */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="text-right">
                <div className="text-[10px] font-bold text-panini-lightgold uppercase tracking-widest">Coleção</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white/80">{totalCollected}/{TOTAL_STICKERS}</span>
                  <div className="w-20 bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-panini-gold via-yellow-400 to-panini-gold transition-all duration-500 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Progress percentage badge */}
            <div className="bg-white/10 backdrop-blur-sm border border-panini-gold/30 rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5">
              <span className="text-base sm:text-xl font-black text-panini-lightgold drop-shadow-md">{progress}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search bar */}
      {showSearch && (
        <div className="sm:hidden px-3 py-2 bg-panini-navy/95 border-b border-white/10 flex-shrink-0">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
      )}

      {/* Main layout (Desk area) */}
      <div className="flex-1 flex overflow-hidden relative items-center justify-center p-2 sm:p-4 lg:p-8">
        {/* Sidebar is now absolute overlay to preserve book illusion */}
        <div className={`absolute inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar
            isOpen={true} // Force open visually, controlled by translate-x
            onClose={() => setSidebarOpen(false)}
            activeSectionId={activeSectionId}
            onSectionChange={handleSectionChange}
            collected={collected}
          />
        </div>
        {/* Backdrop for sidebar */}
        {sidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <AlbumPages
          activeSectionId={activeSectionId}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          collected={collected}
          repeated={repeated}
          onShowModal={handleShowModal}
          searchQuery={searchQuery}
          filterMode={filterMode}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Modals */}
      {selectedSticker && (
        <StickerModal
          stickerId={selectedSticker}
          isCollected={isCollected(selectedSticker)}
          repeatedCount={getRepeated(selectedSticker)}
          onClose={() => setSelectedSticker(null)}
          onToggleCollected={toggleCollected}
          onAddRepeated={addRepeated}
          onRemoveRepeated={removeRepeated}
        />
      )}

      {showExport && (
        <ExportModal
          repeated={repeated}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}

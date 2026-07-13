import { useState, useCallback } from 'react';
import { Menu, Search, Printer, AlertTriangle, Layers, Wifi, WifiOff } from 'lucide-react';
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

      {/* ── Panini 2026 Header ───────────────────────────────────────────── */}
      <header className="z-30 flex-shrink-0 relative overflow-hidden">
        {/* Gradient bar — azul Panini → vinho */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #06101a 0%, #0d1b2a 30%, #112040 60%, #3a0d1e 100%)'
          }}
        />
        {/* Gold bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 20%, #F2D372 50%, #D4AF37 80%, transparent 100%)' }}
        />
        {/* subtle diagonal lines */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 12px)' }}
        />

        <div className="relative z-10 flex items-center justify-between px-3 sm:px-5 py-2.5">

          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="p-1.5 bg-white/8 rounded-lg hover:bg-white/15 transition-colors border border-white/10 text-white"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu de seções"
            >
              <Menu size={20} className="text-panini-lightgold" />
            </button>

            {/* FWC 2026 Logo */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0">
                {/* Hexagonal badge */}
                <div
                  className="absolute inset-0 rounded-lg flex items-center justify-center shadow-lg border border-yellow-400/20"
                  style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F2D372 45%, #b89326 100%)' }}
                >
                  <span className="text-[#0d1b2a] font-black text-sm sm:text-base leading-none">
                    26
                  </span>
                </div>
                {/* small FIFA badge */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-panini-burgundy rounded-full border-2 border-[#0d1b2a] flex items-center justify-center">
                  <span className="text-[5px] font-black text-white leading-none">FIFA</span>
                </div>
              </div>

              <div className="hidden xs:block">
                <h1
                  className="text-sm sm:text-lg font-black tracking-tight leading-tight text-white uppercase"
                  style={{ fontFamily: "'Oswald', 'Inter', sans-serif", letterSpacing: '-0.02em' }}
                >
                  Copa do Mundo
                </h1>
                <p className="text-[8px] sm:text-[10px] font-bold text-panini-lightgold/80 uppercase tracking-[0.2em] leading-tight">
                  Álbum Panini · 2026
                </p>
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search toggle (mobile) + search bar (desktop) */}
            <button
              className="sm:hidden p-1.5 bg-white/8 rounded-lg hover:bg-white/15 transition-colors border border-white/10"
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
              className="p-1.5 sm:px-3 sm:py-1.5 bg-white/8 rounded-lg hover:bg-white/15 transition-colors border border-white/10 flex items-center gap-1.5"
              onClick={() => setShowExport(true)}
              title="Exportar lista de trocas"
              aria-label="Exportar lista de trocas"
            >
              <Layers size={17} className="text-panini-lightgold" />
              <span className="hidden sm:inline text-[11px] font-bold text-panini-lightgold uppercase tracking-wide">Trocas</span>
            </button>

            {/* Print button */}
            <button
              className="p-1.5 sm:px-3 sm:py-1.5 bg-white/8 rounded-lg hover:bg-white/15 transition-colors border border-white/10 flex items-center gap-1.5"
              onClick={() => setView('print')}
              title="Imprimir Checklist PDF"
              aria-label="Imprimir checklist em PDF"
            >
              <Printer size={17} className="text-panini-lightgold" />
              <span className="hidden sm:inline text-[11px] font-bold text-panini-lightgold uppercase tracking-wide">PDF</span>
            </button>

            {/* Realtime / Sync indicator */}
            {hasSupabase && (
              <div className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-bold transition-all ${
                syncError
                  ? 'text-red-400 border-red-500/20 bg-red-500/5'
                  : syncing
                    ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5'
                    : 'text-green-400 border-green-400/20 bg-green-400/5'
              }`}>
                {syncError ? (
                  <>
                    <AlertTriangle size={12} />
                    <span className="hidden lg:inline">Erro</span>
                  </>
                ) : syncing ? (
                  <>
                    <Wifi size={12} className="animate-pulse" />
                    <span className="hidden lg:inline">Salvando…</span>
                  </>
                ) : (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 realtime-pulse" />
                    <WifiOff size={0} className="hidden" />
                    <span className="hidden lg:inline">Ao vivo</span>
                  </>
                )}
              </div>
            )}

            {/* Progress badge */}
            <div className="flex items-center gap-2">
              {/* Mini progress bar — desktop */}
              <div className="hidden md:flex flex-col items-end gap-0.5">
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Coleção</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-white/60 tabular-nums">{totalCollected}/{TOTAL_STICKERS}</span>
                  <div className="w-20 bg-black/40 rounded-full h-1.5 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full progress-shimmer transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Percentage badge */}
              <div
                className="border border-panini-gold/30 rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5"
                style={{ background: 'rgba(212,175,55,0.08)', backdropFilter: 'blur(8px)' }}
              >
                <span className="text-base sm:text-xl font-black text-panini-lightgold drop-shadow-md tabular-nums">{progress}%</span>
              </div>
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

      {/* ── Main layout ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative items-stretch justify-center">
        {/* Sidebar overlay */}
        <div className={`absolute inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar
            isOpen={true}
            onClose={() => setSidebarOpen(false)}
            activeSectionId={activeSectionId}
            onSectionChange={handleSectionChange}
            collected={collected}
          />
        </div>
        {/* Backdrop */}
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

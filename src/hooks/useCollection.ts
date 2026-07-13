import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, getDeviceId, startKeepAlive } from '../lib/supabase';
import { INITIAL_COLLECTED } from '../data/initialCollection';

interface CollectionState {
  collected: Set<string>;
  repeated: Record<string, number>;
}

const STORAGE_KEY_COLLECTED = 'panini_2026_collected_v3';
const STORAGE_KEY_REPEATED = 'panini_2026_repeated_v3';
const STORAGE_KEY_INITIALIZED = 'panini_2026_initialized_v2';

function loadLocal(): CollectionState {
  try {
    const parsedCollected = JSON.parse(localStorage.getItem(STORAGE_KEY_COLLECTED) || '[]');
    const collected = new Set<string>(Array.isArray(parsedCollected) ? parsedCollected : []);
    const parsedRepeated = JSON.parse(localStorage.getItem(STORAGE_KEY_REPEATED) || '{}');
    const repeated = typeof parsedRepeated === 'object' && parsedRepeated !== null ? parsedRepeated : {};
    return { collected, repeated };
  } catch {
    return { collected: new Set(), repeated: {} };
  }
}

function saveLocal(state: CollectionState) {
  localStorage.setItem(STORAGE_KEY_COLLECTED, JSON.stringify([...state.collected]));
  localStorage.setItem(STORAGE_KEY_REPEATED, JSON.stringify(state.repeated));
}

/**
 * Carrega o estado inicial: se nunca inicializado, pré-popula com as
 * figurinhas identificadas na tabela de conferência (células laranjas).
 */
function loadInitial(): CollectionState {
  const alreadyInitialized = localStorage.getItem(STORAGE_KEY_INITIALIZED);
  const local = loadLocal();

  if (!alreadyInitialized) {
    // Primeira vez — mescla as figurinhas iniciais com qualquer dado local
    const collected = new Set<string>([...local.collected, ...INITIAL_COLLECTED]);
    const newState = { collected, repeated: local.repeated };
    saveLocal(newState);
    localStorage.setItem(STORAGE_KEY_INITIALIZED, '1');
    return newState;
  }

  return local;
}

export function useCollection() {
  const [state, setState] = useState<CollectionState>(loadInitial);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const pendingStateRef = useRef<CollectionState | null>(null);
  const syncInFlight = useRef(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deviceId = getDeviceId();

  // Keep-alive: impede que o projeto Supabase free-tier pause por inatividade
  useEffect(() => {
    const cancel = startKeepAlive();
    return cancel;
  }, []);

  // Sync from Supabase on mount — server wins only if there's no local data
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) return;

    let mounted = true;

    async function syncFromServer() {
      const localState = loadLocal();
      const hasLocalData = localState.collected.size > 0 || Object.keys(localState.repeated).length > 0;

      if (hasLocalData) {
        // Local data takes precedence to prevent data loss
        setState(localState);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('collections')
          .select('sticker_id, collected, repeated_count')
          .eq('device_id', deviceId);

        if (!mounted) return;
        if (error || !data) return;

        const localSnapshot = loadLocal();
        const collected = new Set<string>(localSnapshot.collected);
        const repeated: Record<string, number> = { ...localSnapshot.repeated };

        for (const row of data) {
          if (row.collected) collected.add(row.sticker_id);
          if (row.repeated_count > 0) {
            repeated[row.sticker_id] = Math.max(repeated[row.sticker_id] || 0, row.repeated_count);
          }
        }

        const newState = { collected, repeated };
        setState(newState);
        saveLocal(newState);
        setLastSync(new Date());
      } catch {
        // Offline - use local data
      }
    }

    syncFromServer();

    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Supabase Realtime — recebe mudanças em tempo real ──────────────────────
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) return;

    const channel = supabase
      .channel(`collection-realtime-${deviceId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'collections',
          filter: `device_id=eq.${deviceId}`,
        },
        (payload) => {
          // Atualiza o estado local imediatamente sem fazer nova sync ao servidor
          if (!payload.new || typeof payload.new !== 'object') return;
          const row = payload.new as { sticker_id: string; collected: boolean; repeated_count: number };

          setState(prev => {
            const nextCollected = new Set(prev.collected);
            const nextRepeated = { ...prev.repeated };

            if (row.collected) {
              nextCollected.add(row.sticker_id);
            } else {
              nextCollected.delete(row.sticker_id);
            }

            if (row.repeated_count > 0) {
              nextRepeated[row.sticker_id] = row.repeated_count;
            } else {
              delete nextRepeated[row.sticker_id];
            }

            const next = { collected: nextCollected, repeated: nextRepeated };
            // Persiste localmente mas NÃO dispara sync (veio do servidor)
            saveLocal(next);
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  // ── Sync to Supabase ────────────────────────────────────────────────────────
  const syncToServer = useCallback(async (newState: CollectionState) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) return;

    if (syncInFlight.current) {
      // There's already a sync in progress — store latest state for after
      pendingStateRef.current = newState;
      return;
    }

    syncInFlight.current = true;
    setSyncing(true);
    setSyncError(false);

    try {
      let currentState = newState;
      const pending = pendingStateRef.current;
      if (pending) {
        currentState = pending;
        pendingStateRef.current = null;
      }

      const stickers = [...currentState.collected].map(id => ({
        device_id: deviceId,
        sticker_id: id,
        collected: true,
        repeated_count: currentState.repeated[id] || 0
      }));

      const notCollected = Object.keys(currentState.repeated)
        .filter(id => !currentState.collected.has(id))
        .map(id => ({
          device_id: deviceId,
          sticker_id: id,
          collected: false,
          repeated_count: currentState.repeated[id]
        }));

      const allRecords = [...stickers, ...notCollected];

      if (allRecords.length === 0) return;

      for (let i = 0; i < allRecords.length; i += 50) {
        const batch = allRecords.slice(i, i + 50);
        const { error } = await supabase.from('collections').upsert(batch, {
          onConflict: 'device_id, sticker_id',
          ignoreDuplicates: false
        });
        if (error) throw error;
      }

      setLastSync(new Date());
      setSyncError(false);
      pendingStateRef.current = null;
    } catch {
      // Falha no sync — dados já salvos localmente, notifica UI
      setSyncError(true);
    } finally {
      syncInFlight.current = false;
      setSyncing(false);

      // If new state was queued while we were syncing, fire again
      if (pendingStateRef.current) {
        const next = pendingStateRef.current;
        pendingStateRef.current = null;
        syncToServer(next);
      }
    }
  }, [deviceId]);

  // ── Debounced sync — evita múltiplas chamadas ao Supabase em clicks rápidos ─
  const debouncedSync = useCallback((newState: CollectionState) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      syncToServer(newState);
    }, 800);
  }, [syncToServer]);

  // ── Keep pendingStateRef current for beforeunload ───────────────────────────
  useEffect(() => {
    pendingStateRef.current = state;
  }, [state]);

  // ── Persist to localStorage on every state change ──────────────────────────
  useEffect(() => {
    saveLocal(state);
  }, [state]);

  // ── Flush sync to Supabase before tab/window closes ────────────────────────
  useEffect(() => {
    async function handleBeforeUnload() {
      const pending = pendingStateRef.current;
      if (!pending) return;

      // Always save locally first (synchronous)
      saveLocal(pending);

      // Attempt a best-effort Supabase sync using fetch keepalive
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) return;

      const allRecords = [
        ...[...pending.collected].map(id => ({
          device_id: deviceId,
          sticker_id: id,
          collected: true,
          repeated_count: pending.repeated[id] || 0
        })),
        ...Object.keys(pending.repeated)
          .filter(id => !pending.collected.has(id))
          .map(id => ({
            device_id: deviceId,
            sticker_id: id,
            collected: false,
            repeated_count: pending.repeated[id]
          }))
      ];

      if (allRecords.length === 0) return;

      try {
        const batch = allRecords.slice(0, 50);
        fetch(`${supabaseUrl}/rest/v1/collections`, {
          method: 'POST',
          keepalive: true,
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'resolution=merge-duplicates',
          },
          body: JSON.stringify(batch),
        });
      } catch {
        // Best-effort — local storage already saved above
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [deviceId]);

  // ── Mutation helpers ────────────────────────────────────────────────────────
  // Computes next state synchronously, persists locally, and debounces server sync.
  const applyMutation = useCallback((updater: (prev: CollectionState) => CollectionState) => {
    setState(prev => {
      const next = updater(prev);
      saveLocal(next);
      debouncedSync(next);
      return next;
    });
  }, [debouncedSync]);

  const toggleCollected = useCallback((id: string) => {
    applyMutation(prev => {
      const next = new Set(prev.collected);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { ...prev, collected: next };
    });
  }, [applyMutation]);

  const addRepeated = useCallback((id: string) => {
    applyMutation(prev => ({
      ...prev,
      repeated: { ...prev.repeated, [id]: (prev.repeated[id] || 0) + 1 }
    }));
  }, [applyMutation]);

  const removeRepeated = useCallback((id: string) => {
    applyMutation(prev => {
      const next = { ...prev.repeated };
      if (next[id] > 1) {
        next[id]--;
      } else {
        delete next[id];
      }
      return { ...prev, repeated: next };
    });
  }, [applyMutation]);

  const isCollected = useCallback((id: string) => state.collected.has(id), [state.collected]);
  const getRepeated = useCallback((id: string) => state.repeated[id] || 0, [state.repeated]);

  return {
    collected: state.collected,
    repeated: state.repeated,
    isCollected,
    getRepeated,
    toggleCollected,
    addRepeated,
    removeRepeated,
    syncing,
    syncError,
    lastSync,
    totalCollected: state.collected.size
  };
}

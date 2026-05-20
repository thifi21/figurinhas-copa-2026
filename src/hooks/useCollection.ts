import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, getDeviceId } from '../lib/supabase';

interface CollectionState {
  collected: Set<string>;
  repeated: Record<string, number>;
}

const STORAGE_KEY_COLLECTED = 'panini_2026_collected_v3';
const STORAGE_KEY_REPEATED = 'panini_2026_repeated_v3';

function loadLocal(): CollectionState {
  try {
    const collected = new Set<string>(JSON.parse(localStorage.getItem(STORAGE_KEY_COLLECTED) || '[]'));
    const repeated = JSON.parse(localStorage.getItem(STORAGE_KEY_REPEATED) || '{}');
    return { collected, repeated };
  } catch {
    return { collected: new Set(), repeated: {} };
  }
}

function saveLocal(state: CollectionState) {
  localStorage.setItem(STORAGE_KEY_COLLECTED, JSON.stringify([...state.collected]));
  localStorage.setItem(STORAGE_KEY_REPEATED, JSON.stringify(state.repeated));
}

export function useCollection() {
  const [state, setState] = useState<CollectionState>(loadLocal);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deviceId = getDeviceId();

  // Sync from Supabase on mount
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) return;

    let mounted = true;

    async function syncFromServer() {
      try {
        const { data } = await supabase
          .from('collections')
          .select('sticker_id, collected, repeated_count')
          .eq('device_id', deviceId);

        if (!mounted || !data) return;

        const collected = new Set<string>();
        const repeated: Record<string, number> = {};

        for (const row of data) {
          if (row.collected) collected.add(row.sticker_id);
          if (row.repeated_count > 0) repeated[row.sticker_id] = row.repeated_count;
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
  }, [deviceId]);

  // Debounced sync to Supabase
  const syncToServer = useCallback(async (newState: CollectionState) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) return;

    setSyncing(true);
    try {
      const stickers = [...newState.collected].map(id => ({
        device_id: deviceId,
        sticker_id: id,
        collected: true,
        repeated_count: newState.repeated[id] || 0
      }));

      const notCollected = Object.keys(newState.repeated)
        .filter(id => !newState.collected.has(id))
        .map(id => ({
          device_id: deviceId,
          sticker_id: id,
          collected: false,
          repeated_count: newState.repeated[id]
        }));

      const allRecords = [...stickers, ...notCollected];

      // Upsert in batches
      for (let i = 0; i < allRecords.length; i += 50) {
        const batch = allRecords.slice(i, i + 50);
        await supabase.from('collections').upsert(batch, {
          onConflict: 'device_id, sticker_id',
          ignoreDuplicates: false
        });
      }

      setLastSync(new Date());
    } catch {
      // Silently fail - data is saved locally
    } finally {
      setSyncing(false);
    }
  }, [deviceId]);

  const updateState = useCallback((updater: (prev: CollectionState) => CollectionState) => {
    setState(prev => {
      const next = updater(prev);
      saveLocal(next);

      // Debounce server sync
      if (syncTimer.current) clearTimeout(syncTimer.current);
      syncTimer.current = setTimeout(() => syncToServer(next), 2000);

      return next;
    });
  }, [syncToServer]);

  const toggleCollected = useCallback((id: string) => {
    updateState(prev => {
      const next = new Set(prev.collected);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { ...prev, collected: next };
    });
  }, [updateState]);

  const addRepeated = useCallback((id: string) => {
    updateState(prev => ({
      ...prev,
      repeated: { ...prev.repeated, [id]: (prev.repeated[id] || 0) + 1 }
    }));
  }, [updateState]);

  const removeRepeated = useCallback((id: string) => {
    updateState(prev => {
      const next = { ...prev.repeated };
      if (next[id] > 1) {
        next[id]--;
      } else {
        delete next[id];
      }
      return { ...prev, repeated: next };
    });
  }, [updateState]);

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
    lastSync,
    totalCollected: state.collected.size
  };
}

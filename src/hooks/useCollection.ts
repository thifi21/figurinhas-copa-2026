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

export function useCollection(user: { id: string } | null) {
  const [state, setState] = useState<CollectionState>(loadLocal);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deviceId = getDeviceId();

  // Sync from Supabase on mount
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || !user) return;

    const userId = user.id;
    let mounted = true;

    async function syncFromServer() {
      try {
        const { data, error } = await supabase
          .from('collections')
          .select('sticker_id, collected, repeated_count')
          .eq('user_id', userId);

        if (!mounted) return;

        if (error || !data) {
          return;
        }

        const collected = new Set<string>(stateRef.current.collected);
        const repeated: Record<string, number> = { ...stateRef.current.repeated };
        let hasServerData = false;

        for (const row of data) {
          hasServerData = true;
          if (row.collected) collected.add(row.sticker_id);
          if (row.repeated_count > 0) repeated[row.sticker_id] = Math.max(repeated[row.sticker_id] || 0, row.repeated_count);
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
  }, [deviceId, user]);

  // Debounced sync to Supabase
  const syncToServer = useCallback(async (newState: CollectionState) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || !user) return;

    setSyncing(true);
    try {
      const stickers = [...newState.collected].map(id => ({
        device_id: deviceId,
        user_id: user.id,
        sticker_id: id,
        collected: true,
        repeated_count: newState.repeated[id] || 0
      }));

      const notCollected = Object.keys(newState.repeated)
        .filter(id => !newState.collected.has(id))
        .map(id => ({
          device_id: deviceId,
          user_id: user.id,
          sticker_id: id,
          collected: false,
          repeated_count: newState.repeated[id]
        }));

      const allRecords = [...stickers, ...notCollected];

      // Upsert in batches
      for (let i = 0; i < allRecords.length; i += 50) {
        const batch = allRecords.slice(i, i + 50);
        const { error } = await supabase.from('collections').upsert(batch, {
          onConflict: 'device_id, sticker_id',
          ignoreDuplicates: false
        });
        if (error) throw error;
      }

      setLastSync(new Date());
    } catch {
      // Silently fail - data is saved locally
    } finally {
      setSyncing(false);
    }
  }, [deviceId, user]);

  const updateState = useCallback((updater: (prev: CollectionState) => CollectionState) => {
    setState(prev => updater(prev));
  }, []);

  // Sync after state update
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      syncToServer(stateRef.current);
    }, 2000);

    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [state, syncToServer]);

  useEffect(() => {
    saveLocal(state);
  }, [state]);

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

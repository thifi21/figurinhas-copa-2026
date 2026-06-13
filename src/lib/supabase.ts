import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
  global: {
    headers: {
      'X-Client-Info': 'figurinhas-copa-2026'
    }
  }
});

export function getDeviceId(): string {
  let id = localStorage.getItem('device_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('device_id', id);
  }
  return id;
}

/**
 * Envia um ping leve ao Supabase a cada 5 minutos para evitar que o projeto
 * free-tier seja pausado por inatividade (pausa ocorre após 7 dias sem requests).
 * Retorna uma função para cancelar o intervalo (usar no cleanup do useEffect).
 */
export function startKeepAlive(): () => void {
  if (!supabaseUrl) return () => {};

  const INTERVAL_MS = 5 * 60 * 1000; // 5 minutos

  const ping = async () => {
    try {
      await supabase.from('collections').select('device_id').limit(1);
    } catch {
      // Silently ignore — apenas um ping preventivo
    }
  };

  // Ping imediato + periódico
  ping();
  const id = setInterval(ping, INTERVAL_MS);
  return () => clearInterval(id);
}

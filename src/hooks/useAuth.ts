import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setState({
          isLoggedIn: !!session,
          user: session?.user ?? null,
          loading: false,
        });
      })
      .catch(() => setState(s => ({ ...s, loading: false })));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        isLoggedIn: !!session,
        user: session?.user ?? null,
        loading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return 'Email ou senha incorretos. Verifique e tente novamente.';
      }
      return null;
    } catch (e: any) {
      return e.message || 'Erro ao fazer login.';
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        return error.message;
      }
      if (!data.session) {
        return 'Conta criada! Verifique seu email para confirmar o cadastro.';
      }
      return null;
    } catch (e: any) {
      return e.message || 'Erro ao criar conta.';
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { ...state, login, register, logout };
}

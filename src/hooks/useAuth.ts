import { useReducer, useCallback } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

const AUTH_KEY = 'panini_2026_auth';

function loadAuth(): AuthState {
  try {
    const data = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
    return { isLoggedIn: !!data.loggedIn, username: data.username || '' };
  } catch {
    return { isLoggedIn: false, username: '' };
  }
}

function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function useAuth() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const { isLoggedIn, username } = loadAuth();

  const login = useCallback((username: string, password: string) => {
    const existing = localStorage.getItem(AUTH_KEY);
    const parsed = existing ? JSON.parse(existing) : null;

    if (parsed && parsed.loggedIn && parsed.password) {
      if (password !== parsed.password) return false;
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, username, password }));
    forceUpdate();
    return true;
  }, []);

  const register = useCallback((username: string, password: string) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, username, password }));
    forceUpdate();
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    forceUpdate();
  }, []);

  return { isLoggedIn, username, login, register, logout };
}

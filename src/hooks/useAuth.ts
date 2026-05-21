import { useState, useCallback } from 'react';

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

function saveAuth(username: string) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, username }));
}

function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(loadAuth);

  const login = useCallback((username: string, password: string) => {
    const existing = localStorage.getItem(AUTH_KEY);
    const parsed = existing ? JSON.parse(existing) : null;

    if (parsed && parsed.loggedIn && parsed.password) {
      if (password !== parsed.password) return false;
    }

    saveAuth(username);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, username, password }));
    setState({ isLoggedIn: true, username });
    return true;
  }, []);

  const register = useCallback((username: string, password: string) => {
    saveAuth(username);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, username, password }));
    setState({ isLoggedIn: true, username });
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setState({ isLoggedIn: false, username: '' });
  }, []);

  return { ...state, login, register, logout };
}

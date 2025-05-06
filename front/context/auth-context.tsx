'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from "@/lib/api";
import { useThemeStore } from '../store/theme-store';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  avatar?: string;
  theme?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { resetTheme, setTheme } = useThemeStore();
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      const { data } = await api.post('auth/login', { username, password });
      setUser(data.user);
      setTheme(data.user.theme);
      localStorage.setItem('token', data.access_token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    resetTheme();
    setUser(null);
    localStorage.removeItem('token');
    router.push('/chat');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('auth/profile')
        .then(({ data }) => setUser(data))
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
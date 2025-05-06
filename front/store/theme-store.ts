import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'purple',
      setTheme: (theme) => set({ theme }),
      resetTheme: () => set({ theme: 'purple' }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

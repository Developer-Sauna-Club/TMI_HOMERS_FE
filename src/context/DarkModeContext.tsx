import { ReactNode, createContext, useState } from 'react';

type ThemeOption = 'light' | 'dark';

type ThemeContextValue = {
  theme: ThemeOption;
  toggleDarkMode: VoidFunction;
  updateDarkMode: (mode: ThemeOption) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeOption>('dark');
  const toggleDarkMode = () => setTheme((mode) => (mode === 'dark' ? 'light' : 'dark'));
  const updateDarkMode = (mode: ThemeOption) => setTheme(mode);

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode, updateDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

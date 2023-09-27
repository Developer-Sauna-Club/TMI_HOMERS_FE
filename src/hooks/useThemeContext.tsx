import { useContext } from 'react';
import { ThemeContext } from '@/context/DarkModeContext';

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useToast must be used within a ThemeProvider');
  }

  return themeContext;
};

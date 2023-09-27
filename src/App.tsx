import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getItemFromStorage, setItemToStorage } from '@/utils/localStorage';
import { useThemeContext } from '@hooks/useThemeContext';
import { ToastContextProvider } from './context/ToastContext';
import MockUpPage from './pages/MockUpPage';

const App = () => {
  const { theme, updateDarkMode } = useThemeContext();

  useEffect(
    () => {
      if (
        getItemFromStorage('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        updateDarkMode('dark');
      } else {
        updateDarkMode('light');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setItemToStorage('theme', theme);
  }, [theme]);

  return (
    <div className="lg:w-full lg:h-screen lg:flex lg:justify-center">
      <MockUpPage>
        <div className="w-full h-full">
          <ToastContextProvider>
            <Outlet />
          </ToastContextProvider>
        </div>
      </MockUpPage>
    </div>
  );
};

export default App;

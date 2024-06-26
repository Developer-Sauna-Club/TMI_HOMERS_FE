import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getItemFromStorage, setItemToStorage } from '@/utils/localStorage';
import RouteChangeTracker from '@components/RouterTracker';
import { useThemeContext } from '@hooks/useThemeContext';
import { ToastContextProvider } from './context/ToastContext';
import { LoadingPage } from './pages';
import MockUpPage from './pages/MockUpPage';

const App = () => {
  const { theme, updateDarkMode } = useThemeContext();

  RouteChangeTracker();

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
            <Suspense fallback={<LoadingPage />}>
              <Outlet />
            </Suspense>
          </ToastContextProvider>
        </div>
      </MockUpPage>
    </div>
  );
};

export default App;

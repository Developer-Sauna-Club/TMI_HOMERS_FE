import { Outlet } from 'react-router-dom';
import { ToastContextProvider } from './context/ToastContext';

const App = () => {
  return (
      <ToastContextProvider>
        <Outlet />
      </ToastContextProvider>
  );
};

export default App;

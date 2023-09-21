import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';

const App = () => {
  return (
    <AuthContextProvider>
      <ToastContextProvider>
        <Outlet />
      </ToastContextProvider>
    </AuthContextProvider>
  );
};

export default App;

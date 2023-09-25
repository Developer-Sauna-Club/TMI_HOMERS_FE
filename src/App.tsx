import { Outlet } from 'react-router-dom';
import { ToastContextProvider } from './context/ToastContext';
import MockUpPage from './pages/MockUpPage';

const App = () => {
  return (
    <div className="lg:w-full lg:h-screen lg:flex lg:justify-center">
      <MockUpPage>
        <ToastContextProvider>
          <Outlet />
        </ToastContextProvider>
      </MockUpPage>
    </div>
  );
};

export default App;

import { Outlet } from 'react-router-dom';
import { ToastContextProvider } from './context/ToastContext';
import MockUpPage from './pages/MockUpPage';

const App = () => {
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

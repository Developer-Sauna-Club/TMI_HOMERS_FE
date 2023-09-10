import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Outlet />;
    </AuthContextProvider>
  );
};

export default App;

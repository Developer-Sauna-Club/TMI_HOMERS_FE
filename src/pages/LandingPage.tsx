import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';

const LandingPage = () => {
  const { user } = useAuthContext();
  if (user === null) {
    return <h2>랜딩 페이지입니다</h2>;
  }

  return <Navigate to="/home" replace />;
};

export default LandingPage;

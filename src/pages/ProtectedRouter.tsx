import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import { LoadingPage } from '.';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();

  if (user === undefined) {
    return <LoadingPage />;
  }

  if (user === null) {
    alert('권한이 필요한 페이지입니다');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouter;

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthQuery from '@/hooks/useAuthQuery';
import { LoadingPage } from '.';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const {
    userQuery: { data: user, isLoading },
  } = useAuthQuery();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    alert('권한이 필요한 페이지입니다');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouter;

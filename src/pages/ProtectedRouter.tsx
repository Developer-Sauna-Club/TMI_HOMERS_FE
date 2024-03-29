import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { TOAST_MESSAGES } from '@/constants/Messages';
import { useAuthQuery, useToastContext } from '@/hooks';
import { LoadingPage } from '.';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToastContext();
  const {
    userQuery: { data: user, isLoading },
  } = useAuthQuery();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    showToast(TOAST_MESSAGES.NEED_AUTH, 'info');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouter;

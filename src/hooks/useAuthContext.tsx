import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuthContext can't be used outside a ProvideAuth.");
  }
  return auth;
};

import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';

//이걸 여기에 따로 뺀이유가잇나..? AuthContext에서 해도되지않..?????
const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuthContext can't be used outside a ProvideAuth.");
  }
  return auth;
};

export default useAuthContext;

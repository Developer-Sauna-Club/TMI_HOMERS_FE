import { ReactNode, createContext, useEffect, useState } from 'react';
import type { User } from '@/type/User';
import { removeItemFromStorage } from '@/utils/localStorage';
import { checkAuthentication } from '@api/auth';

type AuthContextValues = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextValues>({
  user: null,
  setUser: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const fetchedUser = await checkAuthentication();
      if(fetchedUser){
        setUser(fetchedUser)
      }else{
        setUser(null)
        removeItemFromStorage('token')
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

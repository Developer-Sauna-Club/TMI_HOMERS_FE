import { ReactNode, createContext, useEffect, useState } from 'react';
import { checkAuthentication } from '@api/auth';
import type { User } from '@types/User';

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
      fetchedUser ? setUser(fetchedUser) : setUser(null);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

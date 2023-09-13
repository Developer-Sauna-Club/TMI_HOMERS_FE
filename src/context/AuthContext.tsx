import { ReactNode, createContext, useEffect, useState } from 'react';
import type { User } from '@/types/User';
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
      const fetchedUser = await checkAuthentication(); // 인증된 유저인지 확인한다.
      fetchedUser ? setUser(fetchedUser) : setUser(null); // 인증된 유저일경우 유저정보를 저장한다.
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
  useEffect(() => {
    fetchUser();
  }, []); // 초기 렌더링 이후 한번 실행? 이거 왜필요한지 정확히 모르궸넹..

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

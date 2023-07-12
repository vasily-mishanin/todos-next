import { createContext, useState } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  isVerified?: boolean;
}

export interface IAuthContext {
  user: User;
  setUser: (user: User) => void;
}

const initialState: IAuthContext = {
  user: { id: '', email: '', username: '', isAdmin: false, isVerified: false },
  setUser: (user: User) => {},
};

const AuthContext = createContext<IAuthContext>(initialState);

export type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(initialState.user);

  const setCurrentUser = (user: User) => {
    console.log('setCurrentUser', user);
    setUser((prev) => ({ ...prev, ...user }));
  };

  const value = {
    user,
    setUser: setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };

import React, { createContext, useContext, useState } from 'react';

interface User {
  cpf: string;
  dataNascimento: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (user: User) => {
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Login bem-sucedido! isLoggedIn:', isLoggedIn); // Verificar se o estado foi atualizado
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};

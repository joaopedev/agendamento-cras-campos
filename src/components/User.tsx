// import React, { createContext, useContext, useState } from 'react';

// interface User {
//   nome: string;
//   cpf: string;
//   dataNascimento: string; // ou Date
//   email: string;
//   bairro: string;
//   cras: string;
// }

// const UserContext = createContext<User | null>(null);

// export const UserProvider: React.FC = ({ children }) => {
//   const [user, setUser] = useState<User>({
//     nome: 'Fulano de Tal',
//     cpf: '123.456.789-00',
//     dataNascimento: '01/01/1990',
//     email: 'fulano@email.com',
//     bairro: 'Centro',
//     cras: 'CRAS Centro', // Hardcoded por enquanto
//   });

//   return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser deve ser usado dentro de um UserProvider');
//   }
//   return context;
// };

import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './routes/routes';

export const App: React.FC = () => (
  <ChakraProvider>
    <AppRoutes />
  </ChakraProvider>
);

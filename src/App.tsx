import * as React from "react";
import AppRoutes from "./routes/routes";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <ChakraProvider>
    <Box>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </AuthProvider>
    </Box>
  </ChakraProvider>
);

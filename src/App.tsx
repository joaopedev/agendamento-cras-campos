import * as React from "react";
import AppRoutes from "./routes/routes";
import { Box } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <Box>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </AuthProvider>
  </Box>
);

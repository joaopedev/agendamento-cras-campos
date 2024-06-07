import * as React from "react";
import AppRoutes from "./routes/routes";
import { Box } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";

export const App: React.FC = () => (
  <Box>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </Box>
);

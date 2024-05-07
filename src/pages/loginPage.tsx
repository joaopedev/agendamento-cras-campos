import { GridItem, Grid, Box } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../components/loginForm";

export const LoginPage: React.FC = () => {
  return (
    <Grid
      height="100vh"
      templateColumns="repeat(2, 1fr)" // Divide a página em duas colunas
    >
      {/* Coluna esquerda */}
      <GridItem bg="gray.100">
        {/* Conteúdo para a coluna esquerda, como um background ou imagem */}
        <Box
          height="100%"
          backgroundImage="url('caminho_para_sua_imagem')"
          backgroundSize="cover"
        >
          {/* Você pode adicionar mais conteúdo, como um logotipo, aqui */}
        </Box>
      </GridItem>

      {/* Coluna direita */}
      <GridItem mt="30%">
        {/* Conteúdo para a coluna direita, como um formulário de login */}
        
          {" "}
          {/* Adicione padding para espaçamento */}
          {/* Seu formulário de login aqui */}
        <LoginForm />
      </GridItem>
    </Grid>
  );
};

export default LoginPage;

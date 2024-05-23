import React, { useState, ChangeEvent } from 'react';
import {
  Flex,
  Stack,
  Box,
  Input,
  Link,
  InputLeftElement,
  InputGroup,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SidebarLogin from '../components/SidebarLogin';
import LoadingButton from '../components/LoadingButton';
import { HamburgerMenu } from '../components/HamburgerMenu';

import { useUser } from '../components/UserContext';

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false); // Adicionando estado para controlar o carregamento
  const [cpf, setCpf] = useState(''); // Renomeado para cpf
  const [dataNascimento, setDataNascimento] = useState(''); // Renomeado para dataNascimento
  const { login } = useUser();
  const navigate = useNavigate();

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);

    if (value.length > 3) {
      value = value.slice(0, 3) + '.' + value.slice(3);
    }
    if (value.length > 7) {
      value = value.slice(0, 7) + '.' + value.slice(7);
    }
    if (value.length > 11) {
      value = value.slice(0, 11) + '-' + value.slice(11);
    }

    setCpf(value); // Atualiza o estado cpf
  };

  const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 8);

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5);
    }

    setDataNascimento(value); // Atualiza o estado dataNascimento
  };

  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    const mockUser = {
      cpf: '111.111.111-11',
      dataNascimento: '11/11/1111',
    };
    if (cpf === mockUser.cpf && mockUser.dataNascimento) {
      login(mockUser);
      console.log(cpf, dataNascimento);
      navigate('/home');
    } else {
      setLoginError(true);
    }
  };

  return (
    <Flex h='100vh'>
      <SidebarLogin />
      <HamburgerMenu />
      {error && ( // Show error alert if there's an error message
        <Alert status='error' mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Stack
        pt={['60px', '0', '0', '0']}
        m='auto'
        paddingLeft={['0', '40%', '50%', '50%']}
        gap={['20px', '20px', '30px', '30px']}
        w={['60%', '60%', '60%', '80%']}
        alignItems='center'
      >
        <Box
          sx={boxStyle}
          maxW={['500px', '500px', '500px', '950px']}
          position={['relative', 'static', 'static', 'static']}
        >
          <Box
            fontSize={['20px', '25px', '30px', '30px']}
            fontWeight='bold'
            mb='10px'
            padding={0}
            alignItems={'center'}
          >
            ENTRAR
          </Box>

          <InputGroup>
            {' '}
            {/* Envolva os elementos Input e InputLeftElement */}
            <Input
              placeholder='CPF'
              value={cpf}
              onChange={handleCpfChange}
              size='md'
              sx={{
                fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                bg: 'white',
                borderRadius: '5px',
                p: '4px 0',
                mt: '0px',
                mb: '0px',
                paddingLeft: '16px',
              }}
              _placeholder={{ paddingLeft: 0 }}
            />
            <InputLeftElement pointerEvents='none' children={' '} />
          </InputGroup>

          <Box sx={textStyle2}></Box>
          <InputGroup>
            <Input // Input para data de nascimento
              placeholder='Data de Nascimento'
              value={dataNascimento} //
              onChange={handleDataNascimentoChange}
              size='md'
              sx={{
                fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                bg: 'white',
                borderRadius: '5px',
                p: '4px 0',
                mt: '0px',
                mb: '0px',
                paddingLeft: '16px',
              }}
            />
            <InputLeftElement pointerEvents='none' children={' '} />
          </InputGroup>
          <Box sx={textStyle2}></Box>

          <LoadingButton
            isLoading={isLoading}
            sx={btnStyle}
            onClick={() => {
              // Adicione o navigate aqui
              handleLogin();
            }}
          >
            CONFIRMAR
          </LoadingButton>
          <Box sx={textStyle2}></Box>
          <Box sx={textStyle3}>Não possui uma conta?</Box>
          <Link as={RouterLink} to='/cadastro' sx={textStyle4}>
            Criar minha conta
          </Link>
          <Box sx={textStyle3}></Box>
          {/* <Link as={RouterLink} to='/home' sx={textStyle4}>
            Esqueci minha senha
          </Link> */}
        </Box>
      </Stack>
    </Flex>
  );

};

// const textStyle1 = {
//   fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
//   bg: 'white',
//   borderRadius: '5px',
//   p: '8px 0',
// };

const textStyle2 = {
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  fontWeight: 'bold',
  mt: '10px',
  mb: '3px',
};

const textStyle3 = {
  fontSize: ['0.6rem', '0.6rem', '0.7rem'],
  borderRadius: '5px',
  p: '0px 0',
};

const textStyle4 = {
  fontSize: ['0.6rem', '0.6rem', '0.7rem'],
  borderRadius: '2px',
  p: '2px 0',
  textDecoration: 'underline',
};

export const boxStyle = {
  w: '30%',
  maxW: ['300px', '350px', '500px', '950px'],
  minW: '250px',
  boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
  p: ['10px', '10px', '10px', '10px'],
  borderRadius: '25px',
  bg: '#F4F4F4',
  textAlign: 'center',
  alignContent: 'center',
};
export const btnStyle = {
  w: '30%',
  display: '-ms-grid',
  boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
  color: '#fff',
  bg: '#2CA1FF',
  maxW: '500px',
  minW: ['100px', '100px', '150px', '150px'],
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  _hover: {
    bg: '#1C75BC',
    fontWeight: 'bold',
  },
};
export default Login;

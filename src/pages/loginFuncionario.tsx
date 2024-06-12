import React, { useState, ChangeEvent } from 'react';
import {
  Flex,
  Stack,
  Box,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  IconButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SidebarLogin from '../components/SidebarLogin';
import LoadingButtonFuncionario from '../components/LoadingButtonFuncionario';
import { FooterLogin } from '../components/FooterLogin';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; // Add icons

export const LoginFuncionario: React.FC = () => {
  const [isLoading] = useState(false); // Adicionando estado para controlar o carregamento
  const [cpf, setCpf] = useState(''); // Renomeado para cpf
  const [showPassword, setShowPassword] = useState(false);
  const [senha, setSenha] = useState('');
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

  const handleSenhaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex h='100vh'>
      <SidebarLogin />
      <FooterLogin />
      <Stack
        m='auto'
        paddingLeft={['0', '45%', '50%', '50%']}
        gap={['20px', '20px', '30px', '30px']}
        w={['60%', '60%', '60%', '80%']}
        alignItems='center'
      >
        <Box
          mb={['130px', 0, 0, 0]}
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
            <Input
              placeholder='Senha'
              value={senha}
              onChange={handleSenhaChange}
              type={showPassword ? 'text' : 'password'}
              size='md'
              sx={inputStyle}
              _placeholder={{ paddingLeft: 0 }}
            />
            <InputRightElement>
              {' '}
              {/* Changed to InputRightElement */}
              <IconButton
                aria-label='Toggle password visibility'
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={togglePasswordVisibility}
                size='sm'
                variant='ghost'
              />
            </InputRightElement>
          </InputGroup>
          <Box sx={textStyle2}></Box>

          <LoadingButtonFuncionario
            isLoading={isLoading}
            sx={btnStyle}
            onClick={() => {
              navigate('/home');
            }}
          >
            CONFIRMAR
          </LoadingButtonFuncionario>
          <Box sx={textStyle2}></Box>
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

const inputStyle = {
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  bg: 'white',
  borderRadius: '5px',
  p: '4px 0',
  mt: '0px',
  mb: '0px',
  paddingLeft: '16px',
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
export default LoginFuncionario;

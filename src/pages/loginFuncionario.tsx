import React, { useState, ChangeEvent } from 'react';
import {
  Flex,
  Stack,
  Box,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  FormErrorMessage,
  FormControl,
  FormLabel,
  IconButton,
} from '@chakra-ui/react'; // Importando componentes do Chakra UI
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SidebarLogin from '../components/SidebarLogin'; // Importando o componente SidebarHome
import { FooterLogin } from '../components/FooterLogin';
import { SignIn } from '../types/auth-data';
import { useAuth } from '../hook/useAuth';
import { loginSchema } from '../validation/auth';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const Login: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [inputValue, setInputValue] = useState('');
  // const [inputDataNascimento, setInputDataNascimento] = useState(''); // Novo estado para data de nascimento

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({ resolver: yupResolver(loginSchema) });

  const handleLogin = async (data: SignIn) => {
    try {
      await signIn(data);
      navigate('/home');
    } catch (error) {
      return error; // Retornar o erro para tratamento adequado (exibir mensagem, etc.)
    }
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Apply formatting only if 11 digits are present
    if (value.length === 11) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
        6,
        9
      )}-${value.slice(9)}`;
    }

    setInputValue(value); // Update state with formatted or raw value
  };

  return (
    <Flex h='100vh' flex={['column', '', '', '']}>
      <SidebarLogin />
      <FooterLogin />
      <Stack
        pt={['60px', '0', '0', '0']}
        pb={['130px', '0', '0', '0']}
        m='auto'
        paddingLeft={['0', '45%', '50%', '50%']}
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
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl isInvalid={!!errors.cpf}>
              <FormLabel htmlFor='cpf'>CPF</FormLabel>
              <Input
                {...register('cpf')}
                id='cpf'
                placeholder='XXX.XXX.XXX-XX'
                type='text'
                inputMode='numeric' // Restrict input to numbers
                pattern='^\d{3}\.\d{3}\.\d{3}-\d{2}$' // Allow only numeric characters (Regex)
                maxLength={11} // Limit to 11 digits for CPF
                size='md'
                onChange={handleCpfChange}
                value={inputValue}
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
              <FormErrorMessage>
                {(errors.cpf && errors.cpf.message) || 'Invalid CPF format'}
              </FormErrorMessage>
            </FormControl>

            <Box sx={textStyle2}></Box>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor='senha'>Senha</FormLabel>
              <InputGroup size='md'>
                <Input
                  {...register('password')}
                  id='senha'
                  placeholder='Senha'
                  type={showPassword ? 'text' : 'password'}
                  size='md'
                  maxLength={8}
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
                <InputRightElement width='4.5rem'>
                  <IconButton
                    aria-label='Toggle password visibility'
                    onClick={togglePasswordVisibility}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    size='sm'
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Box sx={textStyle2}></Box>

            <Box sx={textStyle2}></Box>
            <Button
              type='submit'
              style={{ backgroundColor: '#2CA1FF' }}
              variant='solid'
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
            <Box sx={textStyle2}></Box>
          </form>
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

export const boxStyle = {
  // w: '30%',
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

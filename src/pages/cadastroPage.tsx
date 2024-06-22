import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Flex,
  Stack,
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useToast,
} from '@chakra-ui/react'; // Importando componentes do Chakra UI
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import SidebarLogin from '../components/SidebarLogin';
import { FooterLogin } from '../components/FooterLogin';
import { RegisterUser } from '../types/auth-data';
import { useAuth } from '../hook/useAuth';
import { RegisterUserSchema } from '../validation/auth';
import { TipoUsuario, Cras, Bairros } from '../interface/User';
import { BairroCras } from '../components/BairroCras';

export const Cadastro: React.FC = () => {
  const [inputDataNascimento, setInputDataNascimento] = useState(''); // Novo estado para data de nascimento
  const [inputTelefone, setInputTelefone] = useState(''); // New state for telefone
  const [inputCpf, setInputCpf] = useState(''); // New state for formatted CPF

  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUser>({
    resolver: yupResolver(RegisterUserSchema),
    defaultValues: {
      tipoUsuario: TipoUsuario.comum, // Default to "Comum"
    },
  });

  const selectedBairro = watch('endereco.bairro');
  useEffect(() => {
    if (selectedBairro) {
      const bairroCras = BairroCras.find(item =>
        item.bairro.includes(selectedBairro)
      );

      if (bairroCras) {
        const crasEnum = Cras[bairroCras.cras as keyof typeof Cras];
        setValue('cras', crasEnum);
      }
    }
  }, [selectedBairro, setValue]); // Include setValue in the dependency array

  const handleRegister = async (data: RegisterUser) => {
    try {
      await registerUser(data);
      toast({
        title: 'Usuário cadastrado com sucesso',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      navigate('/');
    } catch (error) {
      return error;
    }
  };

  // Change Handler for CPF (without formatting in the state)
  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    setInputCpf(value.slice(0, 11)); // Store unformatted value in state
    setValue('cpf', value.slice(0, 11)); // Update form value with unformatted CPF
  };

  // Helper to format CPF for display only
  const formatCpf = (cpf: string) => {
    if (cpf.length > 3) {
      cpf = cpf.slice(0, 3) + '.' + cpf.slice(3);
    }
    if (cpf.length > 7) {
      cpf = cpf.slice(0, 7) + '.' + cpf.slice(7);
    }
    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11) + '-' + cpf.slice(11);
    }
    return cpf;
  };

  const handleDataNascimentoAndPasswordChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setInputDataNascimento(value.slice(0, 8)); // Store unformatted value in state
    setValue('dataNascimento', value.slice(0, 8)); // Update form value with unformatted date

    setValue('password', value.slice(0, 8)); // Update form value for password
  };

  // Helper to format Date of Birth for display only
  const formatDataNascimento = (data: string) => {
    if (data.length > 2) {
      data = data.slice(0, 2) + '/' + data.slice(2);
    }
    if (data.length > 5) {
      data = data.slice(0, 5) + '/' + data.slice(5);
    }
    return data;
  };

  // Change Handler for Telefone (with formatting)
  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);

    if (value.length > 2) {
      value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + '-' + value.slice(10);
    }

    setInputTelefone(value);
    setValue('telefone', value);
  };

  return (
    <Flex h='100vh'>
      <SidebarLogin />
      <Stack
        pb={['130px', '0', '0', '0']}
        pt={['60px', '0', '0', '0']}
        m='auto'
        paddingLeft={['0', '45%', '50%', '50%']}
        gap={['20px', '20px', '30px', '30px']}
        w={['60%', '60%', '60%', '80%']}
        alignItems='center'
      >
        <Box
          w={'500px'}
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
            CADASTRAR
          </Box>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor='name'>Nome completo</FormLabel>
              <InputGroup>
                {' '}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id='name'
                  placeholder='Nome completo'
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
                  {...register('name')}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.cpf}>
              <FormLabel htmlFor='cpf'>CPF</FormLabel>
              <InputGroup>
                <Input
                  id='cpf'
                  placeholder='CPF'
                  size='md'
                  value={formatCpf(inputCpf)} // Format for display only
                  onChange={handleCpfChange}
                  sx={{
                    fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                    bg: 'white',
                    borderRadius: '5px',
                    p: '4px 0',
                    mt: '0px',
                    mb: '0px',
                    paddingLeft: '16px',
                  }}
                  // {...register('cpf')}
                  _placeholder={{ paddingLeft: 0 }}
                  // value={inputValue}
                  // onChange={handleCpfChange}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.cpf && errors.cpf.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.dataNascimento}>
              <FormLabel htmlFor='data-de-nascimento'>
                Data de nascimento
              </FormLabel>
              <InputGroup>
                <Input
                  id='data-de-nascimento'
                  placeholder='DD/MM/AAAA'
                  value={formatDataNascimento(inputDataNascimento)} // Format for display only
                  {...register('dataNascimento', {
                    onChange: handleDataNascimentoAndPasswordChange,
                  })}
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
                  {...register('dataNascimento')}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.dataNascimento && errors.dataNascimento.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.telefone}>
              <FormLabel htmlFor='telefone'>Celular</FormLabel>
              <InputGroup>
                <Input
                  id='telefone'
                  placeholder='(22) 98765-4321'
                  size='md'
                  value={inputTelefone} // Bind to formatted input
                  onChange={handleTelefoneChange} // Use new handler
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
              <FormErrorMessage>
                {errors.telefone && errors.telefone.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <InputGroup>
                {' '}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id='email'
                  placeholder='Email'
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
                  {...register('email')}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.endereco?.rua}>
              <FormLabel htmlFor='rua'>Rua</FormLabel>
              <InputGroup>
                {' '}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id='rua'
                  placeholder='Rua'
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
                  {...register('endereco.rua')}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.endereco?.rua && errors.endereco?.rua.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.endereco?.numero}>
              <FormLabel htmlFor='numero'>Número</FormLabel>
              <InputGroup>
                {' '}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id='numero'
                  placeholder='Número'
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
                  {...register('endereco.numero')}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.endereco?.numero && errors.endereco?.numero.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <Controller // Controlled (and read-only) CRAS Input
              control={control}
              name='endereco.bairro'
              render={({ field }) => (
                <FormControl isInvalid={!!errors.endereco?.bairro}>
                  <FormLabel htmlFor='bairro'>Bairro</FormLabel>
                  <Select id='bairro' variant='outline' {...field}>
                    <option value=''>Selecione seu bairro</option>{' '}
                    {/* Placeholder */}
                    {Object.values(Bairros)
                      .filter(bairro => typeof bairro === 'string')
                      .map(bairro => (
                        <option key={bairro} value={bairro}>
                          {bairro}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.endereco?.bairro && errors.endereco?.bairro.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller // Controlled (and read-only) CRAS Input
              control={control}
              name='cras'
              render={({ field }) => (
                <FormControl isInvalid={!!errors.cras}>
                  <FormLabel htmlFor='cras'>Cras</FormLabel>
                  {/* Display the name (string) associated with the Cras enum value */}
                  <Input
                    id='cras'
                    value={field.value ? Cras[field.value] : ''}
                    isReadOnly
                  />
                  <FormErrorMessage>
                    {errors.cras && errors.cras.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Box sx={textStyle2}></Box>

            <Box sx={textStyle2}></Box>
            <input type='hidden' {...register('tipoUsuario')} />

            <Button
              type='submit'
              style={{ backgroundColor: '#2CA1FF' }}
              variant='solid'
              isLoading={isSubmitting}
            >
              Cadastrar
            </Button>
          </form>
          <Box sx={textStyle2}></Box>
          {/* <NavLink to="/home">
            <LoadingButton isLoading={isLoading} sx={btnStyle} transform="auto">
              CONFIRMAR
            </LoadingButton>
          </NavLink> */}
          <Box sx={textStyle3}>Já possui uma conta?</Box>
          <Link as={RouterLink} to='/' sx={textStyle4}>
            Voltar para o início
          </Link>
        </Box>
      </Stack>
      <FooterLogin />
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
  // w: '30%',
  maxW: ['300px', '250px', '350px', '450px'],
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
export default Cadastro;

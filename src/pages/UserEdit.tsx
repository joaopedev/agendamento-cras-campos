import {
  Flex,
  Input,
  Box,
  InputGroup,
  Button,
  Text,
  useToast,
  Card,
  Avatar,
  Stack,
  FormControl,
  FormLabel,
  InputLeftElement,
  FormErrorMessage,
  InputLeftAddon,
  CloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select'; // Import chakra-react-select
import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import { HamburgerMenu } from '../components/HamburgerMenu';
import SidebarHome from '../components/SidebarHome';
import { AuthContext } from '../context/AuthContext';
import { Controller, useForm } from 'react-hook-form';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { IUserModel, Bairros, Cras } from '../interface/User';
import { updateUserRequest } from '../services/auth-request';
import { BairroCras } from '../components/BairroCras';

export const UserEdit: React.FC = () => {
  const { onClose } = useDisclosure();
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cpf, setCpf] = useState<string>('');
  const { payload, setPayload } = useContext(AuthContext);
  const [inputTelefone, setInputTelefone] = useState('');
  const toast = useToast();

  const handleChange = (event: any) => {
    formatarCPF(event.target.value);
    setError('');
  };

  const {
    // payload,
    getByCpf,
    cpfData,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IUserModel>({
    defaultValues: cpfData || {},
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
  }, [selectedBairro, setValue]);

  // Define BairroOption type
  type BairroOption = {
    label: string;
    value: string;
  };

  const bairroOptions: BairroOption[] = Object.values(Bairros)
    .filter((bairro): bairro is string => typeof bairro === 'string')
    .map(bairro => ({
      label: bairro,
      value: bairro,
    }));

  const handleConfirmEdit = () => {
    setIsEditing(true);
    onClose();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (payload) {
      reset(payload);
      setInputTelefone(''); // Clear the inputTelefone state
    }
  };
  const [inputDataNascimento, setInputDataNascimento] = useState('');

  const formatDataNascimento = (data: string) => {
    if (data.length > 2) {
      data = data.slice(0, 2) + '/' + data.slice(2);
    }
    if (data.length > 5) {
      data = data.slice(0, 5) + '/' + data.slice(5);
    }
    return data;
  };

  const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.slice(0, 8); // Limita a 8 dígitos (DDMMAAAA)

    setInputDataNascimento(value); // Atualiza o estado local
    setValue('data_nascimento', value); // Atualiza o valor do formulário
  };

  function formatarCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    return setCpf(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'));
  }

  const handleGetByCpf = async () => {
    try {
      await getByCpf(cpf.replace(/\D/g, ''));
    } catch (error) {
      toast({
        title: 'Erro ao buscar usuário',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleSave = async (data: IUserModel) => {
    try {
      if (!payload || !payload.id) {
        throw new Error('Informações do usuário não disponíveis');
      }

      // Verificar se a data de nascimento mudou
      const dateOfBirthChanged =
        data.data_nascimento !== payload.data_nascimento;

      const lastUpdated = new Date(payload.updated_at);
      const now = new Date();
      const timeDifference = now.getTime() - lastUpdated.getTime();
      const hoursDifference = timeDifference / (1000 * 3600);

      if (hoursDifference <= 24) {
        throw new Error(
          'Não é possível atualizar as informações dentro de 24 horas da última atualização'
        );
      }

      // Atualizar a senha se a data de nascimento mudou
      if (dateOfBirthChanged) {
        data.password = data.data_nascimento;
      }

      const { data: updatedUserData } = await updateUserRequest(
        cpfData?.id,
        data
      );

      setPayload(cpfData => ({
        ...cpfData,
        ...updatedUserData,
        tipoUsuario: cpfData?.tipo_usuario,
      }));

      setIsEditing(false);
      toast({
        title: 'Sucesso',
        description: 'Informações atualizadas com sucesso.',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        variant: 'custom-success',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (cpfData) {
      setValue('name', cpfData.name);
      setValue('cras', cpfData.cras);
      setValue('usuario_id', cpfData.id);
      setValue('endereco', cpfData.endereco);
      setValue('telefone', cpfData.telefone);
      setValue('data_nascimento', cpfData.data_nascimento);
      setInputDataNascimento(cpfData.data_nascimento || '');
    }
  }, [cpfData, setValue]);

  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11); // Limit to 11 digits (DDD + 9-digit number)

    if (value.length > 2) {
      value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + '-' + value.slice(10);
    }
    setInputTelefone(value); // Update formatted input in state
    setValue('telefone', value); // Update form value with formatted number
  };
  console.log(cpfData);

  return (
    <Flex h='100vh'>
      <SidebarHome />
      <HamburgerMenu />
      <Box
        alignItems={'center'}
        justifyContent={'center'}
        pl={['0%', '30%', '25%', '20%']}
        w={'100%'}
        display={'flex'}
        flexDir='column'
        gap={3}
      >
        <Text fontWeight={'bold'}>Buscar usuário pelo CPF</Text>
        <Flex gap={1}>
          <Input
            maxW={500}
            value={cpf}
            type='text'
            onChange={handleChange}
            placeholder='Digite o CPF'
          />
          {/* <Button onClick={handleGetByCpf}>Buscar por CPF</Button> */}
          <Button
            sx={{
              maxW: 'max-content',
              display: '-ms-grid',
              boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
              color: '#fff',
              bg: 'hsla(207, 74%, 42%, 0.80)',
              minW: ['80px', '80px', '90px', '100px'],
              fontSize: ['0.8rem', '0.8rem', '0.9rem', '1rem'],
              _hover: {
                bg: 'hsla(207, 74%, 42%, 1)',
                fontWeight: 'bold',
              },
            }}
            onClick={() => {
              if (cpf?.length !== 14) {
                setError('O CPF deve conter exatamente 11 números.');
              } else {
                handleGetByCpf();
                setShowCard(true);
              }
            }}
          >
            Buscar
          </Button>
        </Flex>
        {error && (
          <Text fontSize={12} color='red.500'>
            {error}
          </Text>
        )}
        {showCard && (
          <form onSubmit={handleSubmit(handleSave)}>
            <Card p={4} bg={'#F4F4F4'} w={'1000px'}>
              <Flex
                flexDir={['column', 'column', 'row', 'row']}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                gap={2}
              >
                <Avatar
                  bg={'hsla(207, 74%, 42%, 0.80)'}
                  color={'white'}
                  size={['md', 'md', 'lg', 'xl']}
                  name={cpfData?.name}
                />
                <Stack w={['90%', '90%', '30%', '35%']}>
                  <FormControl
                    isInvalid={!!errors.name}
                    isDisabled={!isEditing}
                  >
                    <FormLabel htmlFor='name' fontWeight='bold' color='black'>
                      Nome
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none' />
                      <Input
                        id='name'
                        placeholder={cpfData?.name}
                        _placeholder={{ opacity: 1, color: 'black' }}
                        size='md'
                        {...register('name')}
                        pl={'16px'}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.cpf} isDisabled={!isEditing}>
                    <FormLabel htmlFor='name' fontWeight='bold' color='black'>
                      CPF
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none' />
                      <Input
                        isDisabled
                        // sx={textStyle1}
                        // id='cpf'
                        placeholder={cpfData?.cpf
                          .replace(/[^\d]/g, '')
                          .replace(
                            /(\d{3})(\d{3})(\d{3})(\d{2})/,
                            '$1.$2.$3-$4'
                          )}
                        _placeholder={{ opacity: 1, color: 'black' }}
                        size='md'
                        // {...register('cpf')}
                        pl={'16px'}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.cpf && errors.cpf.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.data_nascimento}
                    isDisabled={!isEditing}
                  >
                    <FormLabel
                      htmlFor='data-de-nascimento'
                      fontWeight='bold'
                      color='black'
                    >
                      Data de Nascimento
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none' />
                      <Input
                        id='data-de-nascimento'
                        placeholder={
                          cpfData?.data_nascimento
                            ? formatDataNascimento(cpfData.data_nascimento)
                            : 'DD/MM/AAAA'
                        }
                        value={formatDataNascimento(inputDataNascimento)} // Valor formatado para exibição
                        onChange={handleDataNascimentoChange} // Função de manipulação
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
                        isDisabled={!isEditing}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.data_nascimento && errors.data_nascimento.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.telefone}
                    isDisabled={!isEditing}
                  >
                    <FormLabel htmlFor='name' fontWeight='bold' color='black'>
                      Celular
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none' />
                      <InputLeftAddon
                      // sx={textStyle1}
                      >
                        +55
                      </InputLeftAddon>
                      <Input
                        // sx={textStyle1}
                        id='telefone'
                        placeholder={cpfData?.telefone || 'Celular'}
                        _placeholder={{ opacity: 1, color: 'black' }}
                        size='md'
                        value={inputTelefone} // Use formatted input
                        onChange={handleTelefoneChange} // Use formatted input handler
                        pl={'16px'}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.telefone && errors.telefone.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Stack w={['90%', '90%', '30%', '35%']}>
                  <FormControl
                    isInvalid={!!errors.endereco?.rua}
                    isDisabled={!isEditing}
                  >
                    <FormLabel htmlFor='name' fontWeight='bold' color='black'>
                      Rua
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none' />
                      <Input
                        // sx={textStyle1}
                        id='rua'
                        placeholder={cpfData?.endereco?.rua || 'Rua'} // Optional Chaining
                        _placeholder={{ opacity: 1, color: 'black' }}
                        size='md'
                        {...register('endereco.rua')}
                        pl={'16px'}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.endereco?.rua && errors.endereco?.rua.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.endereco?.numero}
                    isDisabled={!isEditing}
                  >
                    <FormLabel htmlFor='name' fontWeight='bold' color='black'>
                      Número
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none' />
                      <Input
                        // sx={textStyle1}
                        id='numero'
                        placeholder={
                          cpfData?.endereco?.numero?.toString() || 'Número'
                        } // Add optional chaining
                        _placeholder={{ opacity: 1, color: 'black' }}
                        size='md'
                        {...register('endereco.numero')}
                        pl={'16px'}
                        pr={'16px'}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.endereco?.numero &&
                        errors.endereco?.numero.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Controller
                    control={control}
                    name='endereco.bairro'
                    render={({ field }) => {
                      const selectedOption =
                        bairroOptions.find(
                          option => option.value === field.value
                        ) || null;

                      return (
                        <FormControl
                          isInvalid={!!errors.endereco?.bairro}
                          isDisabled={!isEditing}
                        >
                          <FormLabel
                            htmlFor='bairro'
                            fontWeight='bold'
                            color='black'
                          >
                            Bairro
                          </FormLabel>
                          <Select<BairroOption>
                            id='bairro'
                            name={field.name}
                            options={bairroOptions}
                            placeholder='Selecione seu bairro'
                            isSearchable
                            value={selectedOption}
                            onChange={option => {
                              field.onChange(option?.value);
                            }}
                            chakraStyles={{
                              container: provided => ({
                                ...provided,
                                fontSize: [
                                  '0.7rem',
                                  '0.8rem',
                                  '0.9rem',
                                  '1rem',
                                ],
                                bg: 'white',
                                borderRadius: '5px',
                              }),
                            }}
                            isDisabled={!isEditing}
                          />
                          <FormErrorMessage>
                            {errors.endereco?.bairro &&
                              errors.endereco?.bairro.message}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />

                  <Controller
                    control={control}
                    name='cras'
                    render={({ field }) => (
                      <FormControl isInvalid={!!errors.cras} isDisabled>
                        <FormLabel
                          htmlFor='cras'
                          fontWeight='bold'
                          color='gray'
                        >
                          CRAS
                        </FormLabel>
                        <Input
                          id='cras'
                          value={field.value ? Cras[field.value] : ''}
                          isReadOnly
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
                        <FormErrorMessage>
                          {errors.cras && errors.cras.message}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  />
                </Stack>
                {!isEditing && payload?.tipo_usuario !== 1 && (
                  <Button
                    maxW={10}
                    maxH={10}
                    onClick={handleConfirmEdit}
                    borderRadius={'100%'}
                    transform='auto'
                    bgColor={'hsla(207, 74%, 42%, 0.80)'}
                    _hover={{ backgroundColor: 'hsla(207, 74%, 42%, 1)' }}
                  >
                    <EditIcon color={'white'} />
                  </Button>
                )}
                {isEditing && (
                  <Flex gap={2} flexDir={['row', 'row', 'column', 'column']}>
                    <Button
                      type='submit'
                      maxW={10}
                      maxH={10}
                      borderRadius={'100%'}
                      transform='auto'
                      colorScheme='green'
                      // bgColor={'#016234'}
                      // _hover={{ backgroundColor: '#016234' }}
                    >
                      <CheckIcon color={'white'} />
                    </Button>
                    <Button
                      maxW={10}
                      maxH={10}
                      colorScheme='red'
                      onClick={handleCancelEdit}
                      borderRadius={'100%'}
                      transform='auto'
                    >
                      <CloseButton w={0} h={0} color={'white'} />
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Card>
          </form>
        )}
      </Box>
    </Flex>
  );
};

export const boxStyle = {
  w: '60%',
  maxW: ['300px', '350px', '500px', '950px'],
  minW: '250px',
  boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
  p: ['20px', '20px', '30px', '40px'],
  borderRadius: '25px',
  bg: '#F4F4F4',
  textAlign: 'center',
  alignContent: 'center',
};
export const btnStyle = {
  p: '0',
  w: ['30%', '40%', '40%', '40%'],
  display: '-ms-grid',
  boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
  color: '#fff',
  bg: '#016234',
  maxW: '950px',
  px: '10px',
  minW: [22, 24, 26, 28],
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  _hover: {
    bg: '#00963f',
    fontWeight: 'bold',
  },
};
export default UserEdit;

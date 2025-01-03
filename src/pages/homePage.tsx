import {
  Flex,
  Stack,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Card,
  Avatar,
  InputLeftAddon,
  useToast,
  CloseButton,
  Text,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select'; // Import chakra-react-select
import React, {
  useContext,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import { SidebarHome } from '../components/SidebarHome';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { AuthContext } from '../context/AuthContext';
import { IUserModel, Bairros, Cras } from '../interface/User';
import { useForm, Controller } from 'react-hook-form';
import SelecionarDia from '../components/SelecionarDia';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';
import { updateUserRequest } from '../services/auth-request';
import { BairroCras } from '../components/BairroCras';
import CardShowAgendamento from '../components/CardShowAgendamento';
import { FooterHome } from '../components/FooterHome';

type BairroOption = {
  label: string;
  value: string;
};

export const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const { payload, setPayload } = useContext(AuthContext);
  const toast = useToast();
  const [inputTelefone, setInputTelefone] = useState('');
  const payloadRef = useRef(payload);
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    payloadRef.current = payload;
  }, [payload]);

  useEffect(() => {
    if (payloadRef.current && payloadRef.current.id) {
    }
  }, [payloadRef]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IUserModel>({
    defaultValues: payload || {},
  });

  const bgColor =
    payload?.tipo_usuario !== 1
      ? 'hsla(207, 74%, 42%, 1)'
      : 'hsla(145, 100%, 29%, 0.80)';

  const handleEdit = () => {
    onOpen();
  };

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

  const handleSave = async (data: IUserModel) => {
    try {
      if (!payload || !payload.id) {
        throw new Error('User information not available');
      }

      const lastUpdated = new Date(payload.updated_at);
      const now = new Date();
      const timeDifference = now.getTime() - lastUpdated.getTime();
      const hoursDifference = timeDifference / (1000 * 3600);

      if (hoursDifference <= 24) {
        throw new Error(
          'Cannot update information within 24 hours of the last update'
        );
      }

      const { data: updatedUserData } = await updateUserRequest(
        payload.id,
        data
      );

      // Atualiza apenas os campos necessários no payload
      setPayload(prevPayload => ({
        ...prevPayload,
        ...updatedUserData,
        // Preserve campos críticos, se necessário
        tipoUsuario: payload?.tipo_usuario,
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

  // Define bairroOptions
  const bairroOptions: BairroOption[] = Object.values(Bairros)
    .filter((bairro): bairro is string => typeof bairro === 'string')
    .map(bairro => ({
      label: bairro,
      value: bairro,
    }));

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

  return (
    <Flex h='100vh' flexDir={'column'}>
      <SidebarHome />
      <HamburgerMenu />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Gostaria de editar suas informações?</ModalBody>
          <ModalFooter>
            <Button
              bgColor={'#016234'}
              _hover={{ backgroundColor: '#00963f' }}
              color={'white'}
              mr={3}
              onClick={handleConfirmEdit}
            >
              Sim
            </Button>
            <Button colorScheme='red' onClick={onClose}>
              Não
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CardShowAgendamento />
      {payload?.tipo_usuario !== 5 && <SelecionarDia />}
      <Flex mb={10} flexDir={'column'} gap={4}>
        <Stack
          className='stack'
          gap={['15px', '15px', '18px', '18px']}
          mt={['20px', 10, 10, 10]}
          alignItems='center'
          ml={[0, '30%', '25%', '20%']}
        >
          <Box
            borderRadius='md'
            boxShadow='2px 2px 5px hsla(0, 28%, 0%, 0.5)'
            w={'80%'}
            position={['relative', 'static', 'static', 'static']}
          >
            {payload && (
              <form onSubmit={handleSubmit(handleSave)}>
                <Card p={4} bg={'#F4F4F4'}>
                  <Flex
                    flexDir={['column', 'column', 'row', 'row']}
                    justifyContent={'space-evenly'}
                    alignItems={'center'}
                    gap={2}
                  >
                    <Avatar
                      bg={bgColor}
                      color={'white'}
                      size={['md', 'md', 'lg', 'xl']}
                      name={payload?.name}
                    />
                    <Stack w={['90%', '90%', '30%', '35%']}>
                      <FormControl
                        isInvalid={!!errors.name}
                        isDisabled={!isEditing}
                      >
                        <FormLabel
                          htmlFor='name'
                          fontWeight='bold'
                          color='black'
                        >
                          Nome
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none' />
                          <Input
                            isDisabled
                            sx={textStyle1}
                            id='name'
                            placeholder={payload.name}
                            _placeholder={{ opacity: 1, color: 'black' }}
                            size='md'
                            {...register('name')}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.name && errors.name.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.cpf}
                        isDisabled={!isEditing}
                      >
                        <FormLabel
                          htmlFor='name'
                          fontWeight='bold'
                          color='black'
                        >
                          CPF
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none' />
                          <Input
                            isDisabled
                            sx={textStyle1}
                            id='cpf'
                            placeholder={payload.cpf}
                            _placeholder={{ opacity: 1, color: 'black' }}
                            size='md'
                            {...register('cpf')}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.cpf && errors.cpf.message}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={!!errors.telefone}
                        isDisabled={!isEditing}
                      >
                        <FormLabel
                          htmlFor='name'
                          fontWeight='bold'
                          color='black'
                        >
                          Celular
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none' />
                          <InputLeftAddon sx={textStyle1}>+55</InputLeftAddon>
                          <Input
                            sx={textStyle1}
                            id='telefone'
                            placeholder={payload.telefone || 'Celular'}
                            _placeholder={{ opacity: 1, color: 'black' }}
                            size='md'
                            value={inputTelefone} // Use formatted input
                            onChange={handleTelefoneChange} // Use formatted input handler
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
                        <FormLabel
                          htmlFor='name'
                          fontWeight='bold'
                          color='black'
                        >
                          Endereço
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none' />
                          <Input
                            sx={textStyle1}
                            id='rua'
                            placeholder={payload?.endereco?.rua || 'Rua'} // Optional Chaining
                            _placeholder={{ opacity: 1, color: 'black' }}
                            size='md'
                            {...register('endereco.rua')}
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
                        <FormLabel
                          htmlFor='name'
                          fontWeight='bold'
                          color='black'
                        >
                          Número
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none' />
                          <Input
                            sx={textStyle1}
                            id='numero'
                            placeholder={
                              payload?.endereco?.numero?.toString() || 'Número'
                            } // Add optional chaining
                            _placeholder={{ opacity: 1, color: 'black' }}
                            size='md'
                            {...register('endereco.numero')}
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
                          <FormControl isInvalid={!!errors.cras}>
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
                                fontSize: [
                                  '0.7rem',
                                  '0.8rem',
                                  '0.9rem',
                                  '1rem',
                                ],
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
                    {!isEditing && payload.tipo_usuario === 3 && (
                      <Button
                        maxW={10}
                        maxH={10}
                        onClick={handleEdit}
                        borderRadius={'100%'}
                        transform='auto'
                        bgColor={'hsla(207, 74%, 42%, 1)'}
                        _hover={{ backgroundColor: 'hsla(215, 74%, 42%, 1)' }}
                      >
                        <EditIcon color={'white'} />
                      </Button>
                    )}

                    {isEditing && (
                      <Flex
                        gap={2}
                        flexDir={['row', 'row', 'column', 'column']}
                      >
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
        </Stack>
      </Flex>
      <FooterHome />
      {isDesktop && (
        <Flex
          as='footer'
          position='fixed'
          bottom='0'
          left='250px' // Set this to your sidebar width
          width='calc(100% - 250px)' // Adjust the width accordingly
          justify='center'
          bg='transparent'
          py={2}
          zIndex='1' // Ensure the footer appears above other content if necessary
        >
          <Text fontSize='xs'>
            <Link
              href='/termos'
              color='blue.500'
              mr={2}
              target='_blank'
              rel='noopener noreferrer'
            >
              Termos de Serviço
            </Link>
            {' | '}
            <Link
              href='/privacidade'
              color='blue.500'
              ml={2}
              target='_blank'
              rel='noopener noreferrer'
            >
              Políticas de Privacidade
            </Link>
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

const textStyle1 = {
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  // bg: 'white',
  borderRadius: '5px',
  p: 2,
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
  w: '30%',
  display: '-ms-grid',
  boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
  color: '#fff',
  bg: '#016234',
  maxW: '950px',
  minW: ['150px', '175px', '200px', '300px'],
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  _hover: {
    bg: '#00963f',
    fontWeight: 'bold',
  },
};

export const btnStyle2 = {
  py: '0',
  display: '-ms-grid',
  boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
  color: '#fff',
  bg: 'rgb(0, 128, 0)',
  maxW: '950px',
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  _hover: {
    bg: 'rgb(53, 94, 59)',
    fontWeight: 'bold',
  },
};
export default Home;

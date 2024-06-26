import React, { useState, ChangeEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Input,
  InputLeftElement,
  Select,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RegisterEmployee } from '../types/auth-data';
import { useAuth } from '../hook/useAuth';
import { RegisterEmployeeSchema } from '../validation/auth';
import { Cras, TipoUsuario } from '../interface/User';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddFuncionario: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { registerEmployee } = useAuth();
  const toast = useToast();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterEmployee>({
    resolver: yupResolver(RegisterEmployeeSchema),
    defaultValues: {
      tipoUsuario: TipoUsuario.admin, // Default to "Admin"
    },
  });

  const [inputDataNascimento, setInputDataNascimento] = useState('');
  const [inputCpf, setInputCpf] = useState('');
  const [inputTelefone, setInputTelefone] = useState('');
  const [senha, setSenha] = useState(''); // Add useState for senha

  const CrasEntries = Object.entries(Cras)
    .filter(([_, value]) => typeof value === 'number')
    .map(([key, value]) => [value, key] as [Cras, string]);

  const handleRegister = async (data: RegisterEmployee) => {
    try {
      await registerEmployee(data);
      toast({
        title: 'Usuário cadastrado com sucesso',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      toast({
        title: 'Usuário cadastrado com sucesso',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
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

  const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setInputDataNascimento(value.slice(0, 8)); // Store unformatted value in state
    setValue('dataNascimento', value.slice(0, 8)); // Update form value with unformatted date
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

  // Mudando handler do telefone (com formatação)
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

  const handleCrasChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10); // Parse as number
    setValue('cras', value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Funcionário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor='name'>Nome completo</FormLabel>
              <InputGroup>
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
            <FormControl isInvalid={!!errors.cpf} mt={4}>
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
            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input
                id='password'
                placeholder='Senha'
                value={senha}
                {...register('password', {
                  onChange: e => setSenha(e.target.value),
                })}
                maxLength={8}
              />
            </FormControl>
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
                    onChange: handleDataNascimentoChange,
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
            <FormControl isInvalid={!!errors.cras} mb={4}>
                <FormLabel htmlFor='cras'>Cras</FormLabel>
              <Select
                id='cras'
                onChange={handleCrasChange}
                value={watch('cras')}
              >
                {CrasEntries.map(
                  (
                    [value, key] // Update the map function to use the array of tuples
                  ) => (
                    <option key={value} value={value}>
                      {key}
                    </option>
                  )
                )}
              </Select>
              <FormErrorMessage>
                    {errors.cras && errors.cras.message} {' '}
              </FormErrorMessage>
            </FormControl>

            <input type='hidden' {...register('tipoUsuario')} />
            <Button
              type='submit'
              style={{ backgroundColor: '#2CA1FF' }}
              variant='solid'
              isLoading={isSubmitting}
            >
              Cadastrar
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancelar
            </Button>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddFuncionario;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Table,
  Td,
  Th,
  Tr,
  useDisclosure,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import ModalAddFuncionario from '../components/ModalAddFuncionario';
import ScrollUpButton from '../components/ScrollUpButton';
import SidebarHome from '../components/SidebarHome';
import { HamburgerMenu } from '../components/HamburgerMenu';
import ConfirmationModal from '../components/ConfirmationModal';
import { Cras } from '../interface/User';

interface Employee {
  name: string;
  cpf: string;
  cras: Cras;
  active: boolean;
  dataNascimento: string;
  senha: string;
}

// Removido as declarações repetidas de employees e setEmployees
const FuncionarioData: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [employeeToDeleteIndex, setEmployeeToDeleteIndex] = useState<
    number | null
  >(null);
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();

  const handleDeleteEmployee = (index: number) => {
    setEmployeeToDeleteIndex(index);
    onConfirmationOpen();
  };

  const confirmDelete = () => {
    if (employeeToDeleteIndex !== null) {
      setEmployees(prevEmployees =>
        prevEmployees.filter((_, i) => i !== employeeToDeleteIndex)
      );
      setEmployeeToDeleteIndex(null);
    }
    onConfirmationClose();
  };

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get('/api/users', {
          params: { tipoUsuario: 2 }, // Filtrando por tipo de usuário (funcionário)
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchFuncionarios();
  }, []); // Executa apenas uma vez ao montar o componente

  const handleToggleActive = (index: number) => {
    setEmployees(prevEmployees =>
      prevEmployees.map((employee, i) =>
        i === index ? { ...employee, active: !employee.active } : employee
      )
    );
  };

  // Ajustado o tipo do parâmetro newEmployee
  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
  };

  return (
    <Flex h='100vh' flexDir={'column'}>
      <SidebarHome />
      <HamburgerMenu />
      <ScrollUpButton />
      <Flex
        className='container__content'
        ml={['0vw', '30vw', '25vw', '20vw']}
        flexDir={'column'}
      >
        <Flex
          className='top__elements'
          p={'50px 30px 20px 30px'}
          justifyContent='space-around'
          alignItems={'center'}
          ml={['20px', '0', '0', '0']}
          w={['110%', '100%', '100%', '100%']}
        >
          <Heading size={['lg']} fontSize={['18', '20', '22', '24']}>
            Gerenciamento de Funcionários
          </Heading>
          <Button
            minW='max-content'
            colorScheme='blue'
            bg={'#2CA1FF'}
            _hover={{
              bg: '#1C75BC',
            }}
            onClick={onOpen}
          >
            Adicionar Funcionário
          </Button>
        </Flex>
        <Table
          size={['sm', 'sm', 'md', 'md']}
          variant='striped'
          colorScheme='blue'
        >
          <Tr>
            <Th width='30%'>Nome</Th> {/* Largura fixa para a coluna Nome */}
            <Th width='20%'>CPF</Th> {/* Largura fixa para a coluna CPF */}
            <Th width='20%'>CRAS</Th> {/* Largura fixa para a coluna CRAS */}
            <Th width='20%'>Ações</Th> {/* Largura fixa para a coluna Ações */}
          </Tr>
          {employees.map((employee, index) => (
            <Tr key={index}>
              <Td>{employee.name}</Td>
              <Td>{employee.cpf}</Td>
              <Td>{employee.cras}</Td>
              <Td minWidth='180px'>
                <Flex alignItems='center'>
                  <Checkbox
                    isChecked={employee.active}
                    onChange={() => handleToggleActive(index)}
                    width='80px' // Largura fixa para o Checkbox
                  >
                    {employee.active ? 'Ativo' : 'Inativo'}
                  </Checkbox>
                  <Button
                    size='sm'
                    colorScheme='red'
                    ml={2}
                    onClick={() => handleDeleteEmployee(index)}
                  >
                    Excluir
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Table>
        <Grid
          className='grid'
          // templateColumns={['1fr', '1fr', '25% 1fr', '20% 1fr']}
          gap={6}
          p={4}
        >
          <GridItem p={4}>
            <ModalAddFuncionario isOpen={isOpen} onClose={onClose} />
          </GridItem>
        </Grid>
      </Flex>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        onConfirm={confirmDelete}
      />
    </Flex>
  );
};

export default FuncionarioData;

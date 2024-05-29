import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Grid,
  GridItem,
  HStack,
} from '@chakra-ui/react';
import ModalAddFuncionario from '../components/ModalAddFuncionario';
import SidebarADM from '../components/SidebarADM';
import { HamburgerMenuADM } from '../components/HamburgerMenuADM';

interface Employee {
  name: string;
  cpf: string;
  cras: string;
  active: boolean;
}

// Removido as declarações repetidas de employees e setEmployees
const FuncionarioData: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [employees, setEmployees] = useState<Employee[]>(
    generateInitialEmployees()
  );

  const handleToggleActive = (index: number) => {
    setEmployees(prevEmployees =>
      prevEmployees.map((employee, i) =>
        i === index ? { ...employee, active: !employee.active } : employee
      )
    );
  };

  const handleDeleteEmployee = (index: number) => {
    setEmployees(prevEmployees => prevEmployees.filter((_, i) => i !== index));
  };

  // Ajustado o tipo do parâmetro newEmployee
  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    onClose();
  };

  return (
    <Flex>
      <Box>
        <HamburgerMenuADM />
        <Grid
          templateColumns={['1fr', '1fr', '25% 1fr', '20% 1fr']}
          gap={6}
          p={4}
        >
          <GridItem>
            <SidebarADM />
          </GridItem>
          <GridItem p={4}>
            <Flex justifyContent='space-between' mb={4}>
              <Heading as='h2' size='lg'>
                Gerenciamento de Funcionários
              </Heading>
              <Button colorScheme='blue' onClick={onOpen}>
                Adicionar Funcionário
              </Button>
            </Flex>

            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th width='30%'>Nome</Th>{' '}
                  {/* Largura fixa para a coluna Nome */}
                  <Th width='20%'>CPF</Th>{' '}
                  {/* Largura fixa para a coluna CPF */}
                  <Th width='20%'>CRAS</Th>{' '}
                  {/* Largura fixa para a coluna CRAS */}
                  <Th width='20%'>Ações</Th>{' '}
                  {/* Largura fixa para a coluna Ações */}
                </Tr>
              </Thead>
              <Tbody>
                {employees.map((employee, index) => (
                  <Tr key={index}>
                    <Td>{employee.name}</Td>
                    <Td>{employee.cpf}</Td>
                    <Td>{employee.cras}</Td>
                    <Td>
                      <HStack spacing={2}>
                        {' '}
                        {/* Agrupe os elementos e adicione espaçamento */}
                        <Checkbox
                          isChecked={employee.active}
                          onChange={() => handleToggleActive(index)}
                          width='100px'
                        >
                          {employee.active ? 'Ativo' : 'Inativo'}
                        </Checkbox>
                        <Button
                          size='sm'
                          colorScheme='red'
                          ml={12} // Margem à esquerda para o botão
                          onClick={() => handleDeleteEmployee(index)}
                        >
                          Excluir
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <ModalAddFuncionario
              isOpen={isOpen}
              onClose={onClose}
              onAdd={handleAddEmployee}
            />
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

function generateInitialEmployees(): {
  name: string;
  cpf: string;
  cras: string;
  active: boolean;
}[] {
  const crasOptions = [
    'CODIN',
    'CUSTODÓPOLIS',
    'JARDIM CARIOCA',
    'PARQUE GUARUS',
    'TRAVESSÃO',
    'GOITACAZES',
    'FAROL',
    'JOCKEY',
    'MATADOURO',
    'PENHA',
    'MORRO DO COCO',
    'ESPLANADA',
    'CHATUBA',
    'URURAÍ',
  ];

  const employees = [];
  for (const cras of crasOptions) {
    for (let i = 0; i < 2; i++) {
      // Pelo menos 2 funcionários por CRAS
      employees.push({
        name: `Funcionário ${cras} ${i + 1}`, // Substitua por nomes reais
        cpf: `CPF ${cras} ${i + 1}`, // Substitua por CPFs reais
        cras,
        active: true,
      });
    }
  }
  return employees;
}

export default FuncionarioData;

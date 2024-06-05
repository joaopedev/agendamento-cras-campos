import React, { useState } from 'react';
import {
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
import ScrollUpButton from '../components/ScrollUpButton';

interface Employee {
	name: string;
	cpf: string;
	cras: string;
	active: boolean;
}

// Removido as declarações repetidas de employees e setEmployees
const FuncionarioData: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [employees, setEmployees] = useState<Employee[]>(generateInitialEmployees());

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
		<Flex h="100vh" flexDir={'column'}>
			<SidebarADM />
			<HamburgerMenuADM />
			<ScrollUpButton />
			<Flex className="container__content" ml={['0vw', '30vw', '25vw', '20vw']} flexDir={'column'}>
				<Flex
					className="top__elements"
					p={'50px 30px 20px 30px'}
					justifyContent="space-around"
					alignItems={'center'}
					ml={['20px', '0', '0', '0']}
					w={['110%', '100%', '100%', '100%']}
				>
					<Heading size={['lg']} fontSize={['18', '20', '22', '24']}>
						Gerenciamento de Funcionários
					</Heading>
					<Button
						minW="max-content"
						colorScheme="blue"
						bg={'#2CA1FF'}
						_hover={{
							bg: '#1C75BC',
						}}
						onClick={onOpen}
					>
						Adicionar Funcionário
					</Button>
				</Flex>
				<Table size={['sm', 'sm', 'md', 'md']} variant="striped" colorScheme="blue">
					<Tr>
						<Th width="30%">Nome</Th> {/* Largura fixa para a coluna Nome */}
						<Th width="20%">CPF</Th> {/* Largura fixa para a coluna CPF */}
						<Th width="20%">CRAS</Th> {/* Largura fixa para a coluna CRAS */}
						<Th width="20%">Ações</Th> {/* Largura fixa para a coluna Ações */}
					</Tr>
					{employees.map((employee, index) => (
						<Tr key={index}>
							<Td>{employee.name}</Td>
							<Td>{employee.cpf}</Td>
							<Td>{employee.cras}</Td>
							<Td>
								<HStack
									alignItems={'left'}
									gap={['4px']}
									flexDir={['column', 'column', 'row', 'row']}
								>
									{' '}
									{/* Agrupe os elementos e adicione espaçamento */}
									<Checkbox
										isChecked={employee.active}
										onChange={() => handleToggleActive(index)}
										// width="100px"
									>
										{employee.active ? 'Ativo' : 'Inativo'}
									</Checkbox>
									<Button
										size="sm"
										w={'fit-content'}
										colorScheme="red"
										onClick={() => handleDeleteEmployee(index)}
									>
										Excluir
									</Button>
								</HStack>
							</Td>
						</Tr>
					))}
				</Table>
				<Grid
					className="grid"
					// templateColumns={['1fr', '1fr', '25% 1fr', '20% 1fr']}
					gap={6}
					p={4}
				>
					<GridItem p={4}>
						<ModalAddFuncionario isOpen={isOpen} onClose={onClose} onAdd={handleAddEmployee} />
					</GridItem>
				</Grid>
			</Flex>
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
				name: `Funcionário ${i + 1} ${cras}`, // Substitua por nomes reais
				cpf: `CPF Funcionário ${i + 1}`, // Substitua por CPFs reais
				cras,
				active: true,
			});
		}
	}
	return employees;
}

export default FuncionarioData;

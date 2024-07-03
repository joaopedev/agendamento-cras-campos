import React, { useState, useEffect, useContext } from 'react';
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
import SidebarHome from '../components/SidebarHome';
import { HamburgerMenu } from '../components/HamburgerMenu';
import ConfirmationModal from '../components/ConfirmationModal';
import { IEmployee, TipoUsuario, Cras } from '../interface/User';
import { AuthContext } from '../context/AuthContext';

const Gerenciamento: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { getAllUsers, payload } = useContext(AuthContext);
	const [employeeData, setEmployeeData] = useState<IEmployee[]>([]);
	const [employeeToDeleteIndex, setEmployeeToDeleteIndex] = useState<number | null>(null);
	const {
		isOpen: isConfirmationOpen,
		onOpen: onConfirmationOpen,
		onClose: onConfirmationClose,
	} = useDisclosure();

	useEffect(() => {
		const fetchEmployeeData = async () => {
			if (payload) {
				try {
					const response = await getAllUsers();
					const employees: IEmployee[] = (response.contas || [])
						.filter(user => user.tipo_usuario === TipoUsuario.admin)
						.map(user => ({
							id: user.id,
							name: user.name,
							email: user.email,
							cpf: user.cpf,
							data_ascimento: user.data_ascimento,
							password: user.password, 
							telefone: user.telefone,
							tipo_usuario: user.tipo_usuario,
							cras: user.cras,
							ativo: user.ativo,
						}));

					setEmployeeData(employees);
				} catch (error) {
					console.error('Error fetching employee data:', error);
					setEmployeeData([]);
				}
			}
		};

		fetchEmployeeData();
	}, [payload, getAllUsers]);

	const handleDeleteEmployee = (index: number) => {
		setEmployeeToDeleteIndex(index);
		onConfirmationOpen();
	};

	const confirmDelete = () => {
		if (employeeToDeleteIndex !== null) {
			setEmployeeData(prevEmployeeData =>
				prevEmployeeData.filter((_, i) => i !== employeeToDeleteIndex)
			);
			setEmployeeToDeleteIndex(null);
		}
		onConfirmationClose();
	};

	return (
		<Flex h="100vh" flexDir={'column'}>
			<SidebarHome />
			<HamburgerMenu />
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
					<thead>
						<Tr>
							<Th width="30%">Nome</Th>
							<Th width="20%">CPF</Th>
							<Th width="20%">CRAS</Th>
							<Th width="20%">Ações</Th>
						</Tr>
					</thead>
					<tbody>
						{employeeData && employeeData.length > 0 ? (
							employeeData.map((employee, index) => (
								<Tr key={index}>
									<Td>{employee.name}</Td>
									<Td>{employee.cpf}</Td>
									{/* Access cras directly from the employee object */}
									<Td>{Cras[employee.cras]}</Td>
									<Td minWidth="180px">
										<Flex alignItems="center">
											{/* Use a Box or Span instead of nesting buttons */}
											<Checkbox isChecked={employee.Ativo} width="80px">
												{employee.Ativo ? 'Ativo' : 'Inativo'}
											</Checkbox>
											<Button
												size="sm"
												colorScheme="red"
												ml={2}
												onClick={() => handleDeleteEmployee(index)}
											>
												Excluir
											</Button>
										</Flex>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={4}>Nenhum funcionário encontrado.</Td>
							</Tr>
						)}
					</tbody>
				</Table>
				<Grid
					className="grid"
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

export default Gerenciamento;

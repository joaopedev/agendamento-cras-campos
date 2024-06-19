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
	Select,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { SidebarHome } from '../components/SidebarHome';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Cras, IUserModel, Bairros } from '../interface/User';
import { useForm, Controller } from 'react-hook-form';
import { BairroCras } from '../components/BairroCras';

export const Home: React.FC = () => {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const { getUser, payload } = useContext(AuthContext);
	const [userData, setUserData] = useState<IUserModel | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure(); // For Modal
	const [isEditing, setIsEditing] = useState(false); // Initialize to false
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<IUserModel>({
		// Use optional chaining to handle null userData
		defaultValues: userData || {},
	});
	const showAgendamento = userData?.tipoUsuario === 1 || userData?.tipoUsuario === 3;
	useEffect(() => {
		if (userData) {
			setValue('endereco.bairro', userData.endereco.bairro); // Set default bairro
		}
	}, [userData, setValue]);

	useEffect(() => {
		const fetchUserData = async () => {
			if (payload) {
				const response = await getUser(payload.id); // Supondo que o payload contenha o userId
				setUserData(response.contas); // Ajuste aqui para acessar a propriedade 'contas'
			}
		};

		fetchUserData();
	}, [payload, getUser]);

	const buttonSingleOut = async () => {
		console.log('teste');
		await signOut();
		return navigate('/');
	};

	const selectedBairro = watch('endereco.bairro');
	useEffect(() => {
		if (selectedBairro) {
			const bairroCras = BairroCras.find(item => item.bairro.includes(selectedBairro));

			if (bairroCras) {
				const crasEnum = Cras[bairroCras.cras as keyof typeof Cras];
				setValue('cras', crasEnum);
			} else {
				// Explicitly set to Cras.CODIN if no match is found
				setValue('cras', Cras.CODIN); // Or use another default as needed
			}
		}
	}, [selectedBairro, setValue]);

	const handleEdit = () => {
		onOpen(); // Open the modal for confirmation
	};

	const handleConfirmEdit = () => {
		setIsEditing(true);
		onClose(); // Close the modal after confirmation
	};

	const handleSave = async (data: IUserModel) => {
		// TODO: Implement your logic to save the updated data to the backend
		console.log('Saving updated user data:', data);
		setIsEditing(false);
	};

	return (
		<Flex h="100vh">
			<SidebarHome />
			<HamburgerMenu />
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirmação</ModalHeader>
					<ModalCloseButton />
					<ModalBody>Gostaria de editar suas informações?</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleConfirmEdit}>
							Sim
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Não
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Stack
				gap={['15px', '15px', '18px', '18px']}
				w={['60%', '60%', '60%', '80%']}
				m={'auto'}
				alignItems="center"
				pl={[0, '30%', '25%', '20%']}
			>
				<Box>
					<Button onClick={buttonSingleOut}>Sair</Button>
				</Box>
				<Box
					mt={['60px', 0, 0, 0]}
					sx={boxStyle}
					maxW={['500px', '500px', '500px', '950px']}
					position={['relative', 'static', 'static', 'static']}
				>
					<Box fontSize={['15px', '20px', '25px', '30px']} fontWeight="bold" mb="20px">
						SEUS DADOS
					</Box>
					{userData && (
						<form onSubmit={handleSubmit(handleSave)}>
							<Box>
								<Box sx={textStyle2}>Nome:</Box>
								<Box sx={textStyle1}>{userData.name}</Box> {/* Nome remains read-only */}
								<Box sx={textStyle2}>CPF:</Box>
								<Box sx={textStyle1}>{userData.cpf}</Box> {/* CPF remains read-only */}
								<FormControl
									isInvalid={!!errors.telefone}
									mt="10px"
									isDisabled={!isEditing} // Use isDisabled instead of isReadOnly
								>
									{' '}
									{/* Conditionally read-only */}
									<FormLabel htmlFor="telefone">Celular:</FormLabel>
									<InputGroup>
										<InputLeftElement pointerEvents="none" children={'+55'} />
										<Input
											id="telefone"
											placeholder="(22) 98765-4321"
											size="md"
											{...register('telefone')}
										/>
									</InputGroup>
									<FormErrorMessage>{errors.telefone && errors.telefone.message}</FormErrorMessage>
								</FormControl>
								<Controller // Controlled Bairro Select
									control={control}
									name="endereco.bairro"
									render={({ field }) => (
										<FormControl
											isInvalid={!!errors.endereco?.bairro}
											isDisabled={!isEditing} // Use isDisabled instead of isReadOnly
										>
											{' '}
											{/* Conditionally read-only */}
											<FormLabel htmlFor="bairro">Bairro</FormLabel>
											<Select id="bairro" variant="outline" {...field}>
												{/* Map directly over the Bairros enum values */}
												{Object.values(Bairros).map(bairro => (
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
									name="cras"
									render={({ field }) => (
										<FormControl isInvalid={!!errors.cras}>
											<FormLabel htmlFor="cras">Cras</FormLabel>
											{/* Display the name (string) associated with the Cras enum value */}
											<Input id="cras" value={field.value ? Cras[field.value] : ''} isReadOnly />
											<FormErrorMessage>{errors.cras && errors.cras.message}</FormErrorMessage>
										</FormControl>
									)}
								/>
							</Box>
							{!isEditing && ( // Show button only when not editing
								<Button onClick={handleEdit} sx={btnStyle} mt={4} transform="auto">
									EDITAR INFORMAÇÕES
								</Button>
							)}

							{isEditing && ( // Show button only when editing
								<Button type="submit" sx={btnStyle} transform="auto">
									SALVAR
								</Button>
							)}
						</form>
					)}
				</Box>
				{showAgendamento && !isEditing && (
					<Button onClick={() => navigate('/agendamento')} sx={btnStyle2} mt={4}>
						AGENDAR ATENDIMENTO
					</Button>
				)}
			</Stack>
		</Flex>
	);
};

const textStyle1 = {
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	bg: 'white',
	borderRadius: '5px',
	p: '8px 0',
};

const textStyle2 = {
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	fontWeight: 'bold',
	mt: '10px',
	mb: '3px',
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
	bg: '#2CA1FF',
	maxW: '950px',
	minW: ['150px', '175px', '200px', '300px'],
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	_hover: {
		bg: '#1C75BC',
		fontWeight: 'bold',
	},
};

export const btnStyle2 = {
	p: '0',
	w: '30%',
	display: '-ms-grid',
	boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
	color: '#fff',
	bg: 'rgb(0, 128, 0)',
	maxW: '950px',
	minW: ['200px', '250px', '300px', '350px'],
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	_hover: {
		bg: 'rgb(53, 94, 59)',
		fontWeight: 'bold',
	},
};
export default Home;

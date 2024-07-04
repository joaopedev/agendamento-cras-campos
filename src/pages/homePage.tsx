import {
	Flex,
	Stack,
	Box,
	Button,
	FormControl,
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
	Card,
	Avatar,
	InputLeftAddon,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { SidebarHome } from '../components/SidebarHome';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { AuthContext } from '../context/AuthContext';
import { IUserModel, Bairros, Cras } from '../interface/User';
import { useForm, Controller } from 'react-hook-form';
import SelecionarDia from '../components/SelecionarDia';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';
import CardShowAgendamento from '../components/CardShowAgendamento';

export const Home: React.FC = () => {
	const { payload } = useContext(AuthContext);
	const [userData] = useState<IUserModel | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isEditing, setIsEditing] = useState(false);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IUserModel>({
		defaultValues: userData || {},
	});

	const handleEdit = () => {
		onOpen();
	};

	const handleConfirmEdit = () => {
		setIsEditing(true);
		onClose();
	};

	const handleSave = async () => {
		setIsEditing(false);
	};

	return (
		<Flex
			h="100vh"
			flexDir={'column'}
			// justifyContent={'center'}
		>
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
				className="stack"
				gap={['15px', '15px', '18px', '18px']}
				mt={['60px', 10, 10, 10]}
				mb={6}
				alignItems="center"
				ml={[0, '30%', '25%', '20%']}
			>
				<Box
					borderRadius="md"
					boxShadow="2px 2px 5px hsla(0, 28%, 0%, 0.5)"
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
								>
									<Avatar
										bg={'#2CA1FF'}
										color={'white'}
										size={['md', 'md', 'lg', 'xl']}
										name={payload?.name}
									/>
									<Stack w={['90%', '90%', '30%', '35%']}>
										<FormControl isInvalid={!!errors.name} isDisabled={!isEditing}>
											<InputGroup>
												<InputLeftElement pointerEvents="none" />
												<Input
													isDisabled
													sx={textStyle1}
													id="name"
													placeholder={payload.name}
													_placeholder={{ opacity: 1, color: 'black' }}
													size="md"
													{...register('name')}
												/>
											</InputGroup>
											<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
										</FormControl>
										<FormControl isInvalid={!!errors.cpf} isDisabled={!isEditing}>
											<InputGroup>
												<InputLeftElement pointerEvents="none" />
												<Input
													isDisabled
													sx={textStyle1}
													id="cpf"
													placeholder={payload.cpf}
													_placeholder={{ opacity: 1, color: 'black' }}
													size="md"
													{...register('cpf')}
												/>
											</InputGroup>
											<FormErrorMessage>{errors.cpf && errors.cpf.message}</FormErrorMessage>
										</FormControl>

										<FormControl isInvalid={!!errors.email} isDisabled={!isEditing}>
											<InputGroup>
												<InputLeftElement pointerEvents="none" />
												<Input
													sx={textStyle1}
													id="email"
													placeholder={payload.email}
													_placeholder={{ opacity: 1, color: 'black' }}
													size="md"
													{...register('email')}
												/>
											</InputGroup>
											<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
										</FormControl>
									</Stack>
									<Stack w={['90%', '90%', '30%', '35%']}>
										<FormControl isInvalid={!!errors.telefone} isDisabled={!isEditing}>
											<InputGroup>
												<InputLeftElement pointerEvents="none" />
												<InputLeftAddon sx={textStyle1}>+55</InputLeftAddon>
												<Input
													sx={textStyle1}
													id="telefone"
													placeholder={payload.telefone}
													_placeholder={{ opacity: 1 }}
													size="md"
													{...register('telefone')}
												/>
											</InputGroup>
											<FormErrorMessage>
												{errors.telefone && errors.telefone.message}
											</FormErrorMessage>
										</FormControl>
										<Controller
											control={control}
											name="endereco.bairro"
											render={({ field }) => (
												<FormControl isInvalid={!!errors.endereco?.bairro} isDisabled={!isEditing}>
													<Select sx={textStyle1} id="bairro" variant="outline" {...field}>
														{Object.values(Bairros).map(bairro => (
															<option key={bairro} defaultValue={payload?.endereco.bairro}>
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
										<Controller
											control={control}
											name="cras"
											render={({ field }) => (
												<FormControl isInvalid={!!errors.cras}>
													<Select isDisabled sx={textStyle1} id="cras" variant="outline" {...field}>
														{Object.values(Cras).map(cras => (
															<option key={cras} value={cras}>
																{Cras[payload?.cras]}
															</option>
														))}
													</Select>
												</FormControl>
											)}
										/>
									</Stack>
									{!isEditing && (
										<Button onClick={handleEdit} borderRadius={'100%'} transform="auto">
											<EditIcon color={'#2CA1FF'} />
										</Button>
									)}

									{isEditing && (
										<Button type="submit" borderRadius={'100%'} transform="auto">
											<CheckIcon color={'#2CA1FF'} />
										</Button>
									)}
								</Flex>
							</Card>
						</form>
					)}
				</Box>
			</Stack>
			<Stack alignItems={'center'}>
				<CardShowAgendamento />
				<SelecionarDia />
			</Stack>
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

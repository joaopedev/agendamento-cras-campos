import { useContext, useEffect, useState, useMemo } from 'react';
import {
	Button,
	Box,
	Flex,
	Text,
	SimpleGrid,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Radio,
	RadioGroup,
	Stack,
	useToast,
	FormControl,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays, addHours } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import { ISchedulingModel, ISchedulingResponse } from '../interface/Schedulling';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterSchedulling } from '../types/auth-data';
import { BairroCras } from './BairroCras';
import { btnStyle } from '../pages/loginPage';

registerLocale('pt-BR', ptBR);

interface Horario {
	hora: string;
	disponivel: boolean;
}

const SelecionarDia: React.FC = () => {
	const [showForm, setShowForm] = useState(false);
	const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
	const [selectedOption, setSelectedOption] = useState<string>('');
	const maxDate = addDays(new Date(), 31);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isConfirmOpen, onClose: onConfirmClose } = useDisclosure();
	const { getSchedulling, payload, registerSchedulling, getUser } = useContext(AuthContext);
	const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
	const [userData, setUserData] = useState<any | null>(null);
	const toast = useToast();
	const horarios: Horario[] = [
		{ hora: '08:00', disponivel: true },
		{ hora: '09:00', disponivel: true },
		{ hora: '10:00', disponivel: true },
		{ hora: '11:00', disponivel: true },
		{ hora: '12:00', disponivel: true },
		{ hora: '13:00', disponivel: true },
		{ hora: '14:00', disponivel: true },
		{ hora: '15:00', disponivel: true },
		{ hora: '16:00', disponivel: true },
	];
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<RegisterSchedulling>();
	const onSubmit: SubmitHandler<RegisterSchedulling> = async (data: RegisterSchedulling) => {
		try {
			const response = await registerSchedulling(data);
			console.log(response);
			toast({
				title: 'Agendamento realizado com sucesso',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			// onConfirmClose();
		} catch (error) {
			toast({
				title: 'Erro ao realizar agendamento',
				description: (error as Error).message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
		}
	};

	const horaParaMinutos = (horaString: string): number => {
		const [horas, minutos] = horaString.split(':').map(Number);
		return horas * 60 + minutos;
	};

	useEffect(() => {
		const fetchUserData = async () => {
			if (payload) {
				const response: ISchedulingResponse = await getSchedulling();
				const userResponse = await getUser(payload.id);
				setUserData(userResponse);
				setSchedullingData(response.agendamentos);
			}
		};

		fetchUserData();
	}, [payload, getSchedulling, getUser]);

	const horariosDisponiveis = useMemo(() => {
		return horarios.map(horario => {
			if (selectedDate) {
				const dataSelecionadaFormatada = format(selectedDate, 'yyyy-MM-dd');
				const horariosAgendados = schedullingData
					.filter(
						agendamentos =>
							format(agendamentos.data_hora, 'yyyy-MM-dd') === dataSelecionadaFormatada
					)
					.map(agendamentos => format(agendamentos.data_hora, 'HH:mm'));

				return {
					...horario,
					disponivel: !horariosAgendados.includes(horario.hora),
				};
			}
			return horario;
		});
	}, [horarios, selectedDate, schedullingData]);

	const BoxHorario = ({ horario, onOpen }: { horario: Horario; onOpen: () => void }) => {
		const handleOpenModal = () => {
			if (horario.disponivel && selectedDate) {
				const newDate = new Date(selectedDate);
				const minutos = horaParaMinutos(horario.hora);
				newDate.setHours(Math.floor(minutos / 60));
				newDate.setMinutes(minutos % 60);
				setSelectedDate(newDate);
				setHorarioSelecionado(horario.hora);
				setValue('data_hora', format(newDate, 'yyyy-MM-dd HH:mm'));
				onOpen();
			}
		};

		return (
			<Button
				bg={horario.disponivel ? '#2CA1FF' : 'red'}
				color="white"
				_hover={{
					bg: horario.disponivel ? '#1C75BC' : 'red',
					cursor: horario.disponivel ? 'pointer' : 'auto',
				}}
				onClick={handleOpenModal}
			>
				{horario.hora}
			</Button>
		);
	};

	//   const handleConfirmar = useCallback(() => {
	//     onClose();
	//     onConfirmOpen();
	//   }, [onClose, onConfirmOpen]);

	const handleDateChange = (date: Date | null) => {
		if (date && horarioSelecionado) {
			const minutos = horaParaMinutos(horarioSelecionado);
			date.setHours(Math.floor(minutos / 60));
			date.setMinutes(minutos % 60);
		}
		setSelectedDate(date);
	};

	return (
		<Flex
			className="container__date"
			justifyContent={'center'}
			alignItems={'center'}
			gap={'10px'}
			p={['10px', '0', '0', '0']}
			pl={['0%', '30%', '25%', '20%']}
			w="100%"
			flexDir={'column'}
		>
			{!selectedDate && (
				<Box className="selecionar__dia" textAlign="center">
					<Text alignSelf={'center'} fontWeight={'bold'} fontSize={'20px'} textAlign={'center'}>
						SELECIONE UM DIA
					</Text>
				</Box>
			)}

			{selectedDate && (
				<Box
					className="box__cinza"
					boxShadow="2px 2px 5px hsla(0, 28%, 0%, 0.5)"
					textAlign={'center'}
					p={[2, 3, 4, 4]}
					borderWidth="1px"
					display={selectedDate ? 'block' : 'none'}
					borderRadius="md"
					bg={'#F4F4F4'}
					h={'fit-content'}
					alignSelf={'center'}
					w={'80%'}
				>
					<Flex gap={'5px'} flexDirection={'column'}>
						<Box className="box__dia" alignItems={'center'} display={'flex'} p={2}>
							<Text mr={'5px'} fontWeight="bold" fontSize={['12px', '12px', '15px', '15px']}>
								DIA SELECIONADO:
							</Text>
							<Box bg="#fff" p={'5px'} flex={1} textAlign="center" borderRadius="5px">
								<Text fontSize={['12px', '12px', '15px', '15px']}>
									{selectedDate && format(selectedDate, 'dd/MM/yyyy')}
								</Text>
							</Box>
						</Box>
						<Box className="box__esquerda" flex={1}>
							<Text pb={1} fontSize={['12px', '12px', '15px', '15px']} fontWeight="bold">
								HORÁRIOS DISPONÍVEIS
							</Text>
							<SimpleGrid columns={[2, null, 5]} spacing="1">
								{horariosDisponiveis.map(horario => (
									<BoxHorario key={horario.hora} horario={horario} onOpen={onOpen} />
								))}
							</SimpleGrid>
							<Modal
								isOpen={isOpen}
								onClose={() => {
									onClose();
									setShowForm(false);
								}}
								isCentered
								size={['xs', 'sm', 'md', 'lg']}
							>
								<ModalOverlay />
								<ModalContent textAlign={'center'}>
									<ModalHeader mt={5}>Selecione uma opção para continuar:</ModalHeader>
									<ModalCloseButton />
									<ModalBody>
										<form onSubmit={handleSubmit(onSubmit)}>
											<Flex flexDir="column" alignItems="center">
												{/* <Text>
													Deseja confirmar o agendamento <br /> para o dia{' '}
													<strong>{selectedDate && format(selectedDate, 'dd/MM/yyyy')}</strong> às{' '}
													<strong>{horarioSelecionado}</strong>?
												</Text> */}
												<FormControl isInvalid={!!errors.servico}>
													<RadioGroup
														onChange={value => {
															setSelectedOption(value as string);
															setShowForm(true);
														}}
														// value={selectedOption}
													>
														<Stack
															direction="row"
															//  spacing={4}
															justifyContent="space-around"
														>
															<Radio
																{...register('description')}
																id="description"
																value="1"
																{...register('servico')}
															>
																Cadastramento
															</Radio>
															<Radio
																{...register('description')}
																id="description"
																value="2"
																{...register('servico')}
															>
																Atualização Cadastral
															</Radio>
														</Stack>
													</RadioGroup>
												</FormControl>
												{showForm && (
													<>
														<FormControl display={'none'} isInvalid={!!errors.name}>
															<FormLabel htmlFor="name">Nome</FormLabel>
															<Input
																id="name"
																{...register('name')}
																defaultValue={userData?.contas.name}
															/>
															{errors.name && <Text color="red.500">{errors.name.message}</Text>}
														</FormControl>

														<FormControl display={'none'} isInvalid={!!errors.usuario_id}>
															<FormLabel htmlFor="usuario_id">Usuário ID</FormLabel>
															<Input
																id="usuario_id"
																{...register('usuario_id')}
																defaultValue={userData?.contas.id}
															/>
															{errors.usuario_id && (
																<Text color="red.500">{errors.usuario_id.message}</Text>
															)}
														</FormControl>

														{/* <FormControl isInvalid={!!errors.servico}>
													<FormLabel htmlFor="servico">Serviço</FormLabel>
													<Input id="servico" {...register('servico')} defaultValue={1} />
													{errors.servico && <Text color="red.500">{errors.servico.message}</Text>}
												</FormControl> */}

														{/* <FormControl isInvalid={!!errors.description}>
															<FormLabel htmlFor="description">Descrição</FormLabel>
															<Input
																id="description"
																{...register('description')}
																defaultValue={'Jassa é doido'}
															/>
															{errors.description && (
																<Text color="red.500">{errors.description.message}</Text>
															)}
														</FormControl> */}

														<FormControl display={'none'} isInvalid={!!errors.duracao_estimada}>
															<FormLabel htmlFor="duracao_estimada">Duração Estimada</FormLabel>
															<Input
																id="duracao_estimada"
																{...register('duracao_estimada')}
																defaultValue={format(addHours(selectedDate, 1), 'yyyy-MM-dd HH:mm')}
															/>
															{errors.duracao_estimada && (
																<Text color="red.500">{errors.duracao_estimada.message}</Text>
															)}
														</FormControl>

														<FormControl display={'none'} isInvalid={!!errors.data_hora}>
															<FormLabel htmlFor="data_hora">Data e Hora</FormLabel>
															<Input
																id="data_hora"
																value={selectedDate ? format(selectedDate, 'yyyy-MM-dd HH:mm') : ''}
																{...register('data_hora')}
																readOnly
															/>
															{errors.data_hora && (
																<Text color="red.500">{errors.data_hora.message}</Text>
															)}
														</FormControl>

														<FormControl display={'none'} isInvalid={!!errors.cras}>
															<FormLabel htmlFor="cras">Cras</FormLabel>
															<Input
																id="cras"
																{...register('cras')}
																// defaultValue={BairroCras[userData?.contas.cras - 1].cras}
																defaultValue={userData?.contas.cras}
															/>
															{errors.cras && <Text color="red.500">{errors.cras.message}</Text>}
														</FormControl>

														<FormControl display={'none'} isInvalid={!!errors.cras}>
															<FormLabel htmlFor="cras">Cras</FormLabel>
															<Input
																id="cras"
																{...register('cras')}
																// defaultValue={BairroCras[userData?.contas.cras - 1].cras}
																defaultValue={userData?.contas.cras}
															/>
															{errors.cras && <Text color="red.500">{errors.cras.message}</Text>}
														</FormControl>

														<FormControl mt={5}>
															<FormLabel>Cras</FormLabel>
															<Input
																value={BairroCras[userData?.contas.cras - 1].cras}
																// defaultValue={userData?.contas.cras}
															/>
															{errors.cras && <Text color="red.500">{errors.cras.message}</Text>}
														</FormControl>

														<FormControl display={'none'} isInvalid={!!errors.status}>
															<FormLabel htmlFor="status">Status</FormLabel>
															<Input id="status" {...register('status')} defaultValue={2} />
															{errors.status && (
																<Text color="red.500">{errors.status.message}</Text>
															)}
														</FormControl>
													</>
												)}
											</Flex>
											{showForm && (
												<ModalFooter justifyContent={'center'}>
													<Text>
														Deseja confirmar o agendamento <br /> para o dia{' '}
														<strong>{selectedDate && format(selectedDate, 'dd/MM/yyyy')}</strong> às{' '}
														<strong>{horarioSelecionado}</strong>?
													</Text>
												</ModalFooter>
											)}
											<ModalFooter justifyContent={'center'}>
												<Button
													boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
													fontSize={['0.8rem', '0.8rem', '0.9rem', '1rem']}
													colorScheme="red"
													variant="solid"
													mr={3}
													onClick={onClose}
												>
													Cancelar
												</Button>
												{showForm && (
													<Button sx={btnStyle} type="submit">
														Confirmar
													</Button>
												)}
											</ModalFooter>
										</form>
									</ModalBody>
								</ModalContent>
							</Modal>
							<Modal
								isOpen={isConfirmOpen}
								onClose={onConfirmClose}
								isCentered
								size={['xs', 'sm', 'md', 'lg']}
							>
								<ModalOverlay />
								<ModalContent color={'white'} bg={'#1C75BC'} textAlign={'center'}>
									<ModalHeader>Agendamento Confirmado! 🎉</ModalHeader>
									<ModalCloseButton />
									<ModalBody pb={5}>
										O seu atendimento será feito
										<br />
										dia <strong>
											{selectedDate && format(selectedDate, 'dd/MM/yyyy')}
										</strong> às <strong>{horarioSelecionado}</strong>.
									</ModalBody>
								</ModalContent>
							</Modal>
						</Box>
					</Flex>
					{/* <form onSubmit={handleSubmit(onSubmit)}>
						
						<FormControl>
						<Input id="name" {...register("name")} defaultValue="Agendamento do jassa" />
						</FormControl>
						<Input id="usuario_id" {...register("usuario_id")} defaultValue={userData?.id || ''} />
						<Input id="duracao_estimada" {...register("duracao_estimada")} defaultValue="2024-06-26T14:00:00" />
						<Input id="data_hora" value={selectedDate ? format(selectedDate, 'yyyy-MM-dd HH:mm') : ''} {...register("data_hora")} readOnly />	
						<Input id="cras" {...register("cras")} defaultValue={2} />
						<Input id="servico" {...register("servico")} defaultValue={1} />
						<Input id="status" {...register("status")} defaultValue={3} />
		
						<button type='submit'>Enviar</button>
					</form> */}
				</Box>
			)}

			<DatePicker
				locale={'pt-BR'}
				selected={selectedDate}
				inline
				filterDate={date => date.getDay() !== 0 && date.getDay() !== 6 && date <= maxDate}
				onSelect={handleDateChange}
				onChange={(date: Date | null) => setSelectedDate(date)}
				minDate={addDays(new Date(), 1)}
				className="customInput"
			/>
		</Flex>
	);
};

export default SelecionarDia;

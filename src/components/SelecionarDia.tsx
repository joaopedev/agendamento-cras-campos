import { useContext, useEffect, useState, useMemo, useRef } from 'react';
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
	Divider,
} from '@chakra-ui/react';
import DatePicker, { CalendarContainer, registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays, getDay } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import {
	ISchedulingModel,
	ISchedulingResponse,
	Status,
	TipoServico,
} from '../interface/Schedulling';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterSchedullingModel } from '../types/auth-data';
import { btnStyle } from '../pages/loginPage';
import BoxHorario from './BoxHorario';
import { Cras } from '../interface/User';

registerLocale('pt-BR', ptBR);

const SelecionarDia: React.FC = () => {
	const [showForm, setShowForm] = useState(false);
	const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
	const [selectedOption, setSelectedOption] = useState<string>('');
	const [, setAgendamentoRealizado] = useState(false);
	const maxDate = addDays(new Date(), 31);
	const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { payload, registerSchedulling, getAllSchedullingCras, getByCpf, cpfData, getAllUsers } =
		useContext(AuthContext);
	const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [cpf, setCpf] = useState<string>('');
	const isMounted = useRef(true);
	const toast = useToast();
	const [funcionariosPorCras, setFuncionariosPorCras] = useState();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getAllUsers();
				setFuncionariosPorCras(
					data.contas
						.filter((c: any) => c.tipo_usuario === 2)
						.filter((c: any) => c.cras === payload?.cras).length
				);
			} catch (error) {
				console.error('Erro ao buscar usuários:', error);
			}
		};
		fetchUsers();
	}, [getAllUsers]);

	const getSelectedDay = () => {
		if (getDay(selectedDate) === 7) {
			setSelectedDate(addDays(selectedDate, 2));
			return;
		}
		if (getDay(selectedDate) === 8) {
			setSelectedDate(addDays(selectedDate, 1));
			return;
		}
	};
	getSelectedDay();

	const handleGetByCpf = async () => {
		await getByCpf(cpf);
	};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<RegisterSchedullingModel>();

	const onSubmit: SubmitHandler<RegisterSchedullingModel> = async (
		data: RegisterSchedullingModel
	) => {
		try {
			await registerSchedulling(data);
			setAgendamentoRealizado(true);
			const novoAgendamento: ISchedulingModel = {
				id: Math.random(), // Gere um ID único aqui conforme necessário
				name: data.name,
				usuario_id: data.usuario_id,
				servico: data.servico as unknown as TipoServico,
				description: '', // Ajuste conforme necessário
				duracao_atendimento: 60, // Ajuste conforme necessário
				data_hora: new Date(data.data_hora),
				cras: data.cras,
				status: data.status as unknown as Status,
				message: '', // Ajuste conforme necessário
				agendamentos: [], // Ajuste conforme necessário
			};
			setSchedullingData(prevState => [...prevState, novoAgendamento]);
			toast({
				title: 'Agendamento realizado com sucesso',
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
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
		isMounted.current = true;
		const fetchSchedullingData = async () => {
			if (payload?.cras) {
				try {
					setLoading(true);
					const response: ISchedulingResponse = await getAllSchedullingCras(payload.cras);
					if (isMounted.current) {
						setSchedullingData(response.agendamentos);
					}
				} catch (error) {
					if (isMounted.current) {
						console.error('Failed to fetch data', error);
					}
				} finally {
					if (isMounted.current) {
						setLoading(false);
					}
				}
			}
		};

		fetchSchedullingData();

		return () => {
			isMounted.current = false;
		};
	}, [payload?.cras, getAllSchedullingCras]);

	useEffect(() => {
		if (cpfData) {
			setValue('name', cpfData.name);
			setValue('cras', cpfData.cras);
			setValue('usuario_id', cpfData.id);
		}
	}, [cpfData, setValue]);

	const horarios = useMemo(() => {
		return [
			{ hora: '08:00', disponivel: true },
			{ hora: '08:30', disponivel: true },
			{ hora: '09:00', disponivel: true },
			{ hora: '09:30', disponivel: true },
			{ hora: '10:00', disponivel: true },
			{ hora: '10:30', disponivel: true },
			{ hora: '11:00', disponivel: true },
			{ hora: '11:30', disponivel: true },
			{ hora: '12:00', disponivel: true },
			{ hora: '12:30', disponivel: true },
			{ hora: '13:00', disponivel: true },
			{ hora: '13:30', disponivel: true },
			{ hora: '14:00', disponivel: true },
			{ hora: '14:30', disponivel: true },
			{ hora: '15:00', disponivel: true },
			{ hora: '15:30', disponivel: true },
			{ hora: '16:00', disponivel: true },
			{ hora: '16:30', disponivel: true },
		];
	}, []);

	const horariosDisponiveis = useMemo(() => {
		return horarios.map(horario => {
			if (selectedDate) {
				const dataSelecionadaFormatada = format(selectedDate, 'yyyy-MM-dd');
				const horariosAgendados = schedullingData
					.filter(
						agendamentos =>
							format(new Date(agendamentos.data_hora), 'yyyy-MM-dd') === dataSelecionadaFormatada
					)
					.map(agendamentos => format(new Date(agendamentos.data_hora), 'HH:mm'));

				const countAgendados = horariosAgendados.filter(h => h === horario.hora).length;

				return {
					...horario,
					disponivel: countAgendados < Number(funcionariosPorCras),
					// disponivel: countAgendados < 5,
				};
			}
			return horario;
		});
	}, [horarios, selectedDate, schedullingData]);

	const handleDateChange = (date: Date) => {
		if (date && horarioSelecionado) {
			const minutos = horaParaMinutos(horarioSelecionado);
			date.setHours(Math.floor(minutos / 60));
			date.setMinutes(minutos % 60);
		}
		setSelectedDate(date);
		setAgendamentoRealizado(false); // Resetar o estado do agendamento realizado ao mudar a data
	};

	if (loading) {
		return (
			<Flex justifyContent="center" alignItems="center" height="100vh">
				<Text>Loading...</Text>
			</Flex>
		);
	}

	return (
		<Flex
			className="container__date"
			justifyContent={'center'}
			alignItems={'center'}
			gap={'10px'}
			pl={['0%', '30%', '25%', '20%']}
			w="100%"
			flexDir={'column'}
		>
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
					<Text fontWeight={'bold'} fontSize={['1rem', '1.2rem', '1.3rem', '1.4rem']}>
						AGENDAR ATENDIMENTO
					</Text>
					<Divider />
					<Flex gap={2} flexDirection={'column'}>
						<Box
							flexDir={['column', 'column', 'row', 'row']}
							mx={'auto'}
							className="box__dia"
							alignItems={'center'}
							display={'flex'}
							columnGap={2}
						>
							<Text fontWeight="bold" fontSize={['12px', '12px', '15px', '15px']}>
								DIA SELECIONADO:
							</Text>
							<Box
								alignItems={'center'}
								w={'min-content'}
								borderRadius={5}
								border={'1px solid #999'}
								p={'1px'}
								// mx={'auto'}
							>
								<DatePicker
									dateFormat="dd/MM/yyyy"
									locale={'pt-BR'}
									selected={selectedDate}
									filterDate={date => date.getDay() !== 0 && date.getDay() !== 6 && date <= maxDate}
									onSelect={handleDateChange}
									onChange={(date: Date) => setSelectedDate(date)}
									minDate={addDays(new Date(), 1)}
									className="customInput"
									calendarContainer={({ className, children }) => (
										<Box
											style={{
												borderRadius: '10px',
												padding: '16px',
												background: '#2ca1ff',
												color: '#fff',
												boxShadow: '1px 1px 10px hsla(0, 28%, 0%, 0.4)',
											}}
										>
											<CalendarContainer className={className}>
												<Text
													style={{
														background: '#2ca1ff',
														padding: '4px',
														color: 'white',
													}}
												>
													Selecione um dia
												</Text>
												<Text style={{ position: 'relative' }}>{children}</Text>
											</CalendarContainer>
										</Box>
									)}
								/>
							</Box>
						</Box>
						<Box className="box__esquerda" flex={1}>
							<Text pb={1} fontSize={['12px', '12px', '15px', '15px']} fontWeight="bold">
								HORÁRIOS DISPONÍVEIS
							</Text>
							<SimpleGrid columns={[2, null, 5]} spacing="1">
								{horariosDisponiveis.map(horario => (
									<BoxHorario
										key={horario.hora}
										horario={horario}
										selectedDate={selectedDate}
										onHorarioSelect={(date: Date) => {
											setSelectedDate(date);
											setHorarioSelecionado(horario.hora);
											onOpen();
										}}
										setValue={setValue}
									/>
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
								<ModalContent minW={['90%', '27em', '30em', '48em']} textAlign={'center'}>
									<ModalHeader mt={5}>Selecione uma opção para continuar:</ModalHeader>
									<ModalCloseButton />
									<ModalBody>
										<form onSubmit={handleSubmit(onSubmit)}>
											<Flex flexDir="column" alignItems="center">
												<FormControl isInvalid={!!errors.servico}>
													<RadioGroup
														onChange={value => {
															setSelectedOption(value as string);
															setShowForm(true);
														}}
													>
														<Stack direction="row" justifyContent="space-around">
															<Radio
																{...register('servico')}
																id="cadastramento"
																value="1"
																isChecked={selectedOption === '1'}
															>
																Cadastramento
															</Radio>
															<Radio
																{...register('servico')}
																id="atualizacao"
																value="2"
																isChecked={selectedOption === '2'}
															>
																Atualização Cadastral
															</Radio>
														</Stack>
													</RadioGroup>
												</FormControl>
												<Box display={'none'}>
													<FormControl isInvalid={!!errors.name}>
														<FormLabel htmlFor="name">Nome</FormLabel>
														<Input
															id="name"
															{...register('name')}
															defaultValue={cpfData ? cpfData.name : payload?.name}
														/>
														{errors.name && <Text color="red.500">{errors.name.message}</Text>}
													</FormControl>
													<FormControl isInvalid={!!errors.data_hora}>
														<FormLabel htmlFor="data_hora">Data e Hora</FormLabel>
														<Input
															id="data_hora"
															defaultValue={
																selectedDate ? format(selectedDate, 'yyyy-MM-dd HH:mm') : ''
															}
															{...register('data_hora')}
															readOnly
														/>
														{errors.data_hora && (
															<Text color="red.500">{errors.data_hora.message}</Text>
														)}
													</FormControl>

													<FormControl isInvalid={!!errors.cras}>
														<FormLabel htmlFor="cras">Cras</FormLabel>
														<Input
															id="cras"
															{...register('cras')}
															defaultValue={cpfData ? cpfData.cras : payload?.cras}
														/>
														{errors.cras && <Text color="red.500">{errors.cras.message}</Text>}
													</FormControl>

													<FormControl isInvalid={!!errors.status}>
														<FormLabel htmlFor="status">Status</FormLabel>
														<Input id="status" {...register('status')} defaultValue={2} />
														{errors.status && <Text color="red.500">{errors.status.message}</Text>}
													</FormControl>

													<FormControl isInvalid={!!errors.usuario_id}>
														<FormLabel htmlFor="usuario_id">Usuário ID</FormLabel>
														<Input
															id="usuario_id"
															{...register('usuario_id')}
															defaultValue={cpfData ? cpfData.id : payload?.id}
														/>
														{errors.usuario_id && (
															<Text color="red.500">{errors.usuario_id.message}</Text>
														)}
													</FormControl>
												</Box>
											</Flex>

											{showForm && (
												<>
													{payload?.tipo_usuario !== 1 && (
														<Flex flexDir={'column'} mt={4} gap={4}>
															<Flex
																p={0}
																w={'100%'}
																alignItems={'center'}
																flexDir={'column'}
																gap={2}
															>
																<Text fontWeight={'bold'}>Buscar usuário pelo CPF</Text>
																<Flex gap={1} w={'80%'}>
																	<Input
																		maxLength={11}
																		value={cpf}
																		type="number"
																		onChange={e => {
																			setCpf(e.target.value);
																			setError('');
																		}}
																		placeholder="Digite o CPF"
																	/>
																	{/* <Button onClick={handleGetByCpf}>Buscar por CPF</Button> */}
																	<Button
																		sx={{
																			maxW: 'max-content',
																			display: '-ms-grid',
																			boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
																			color: '#fff',
																			bg: '#2CA1FF',
																			minW: ['80px', '80px', '90px', '100px'],
																			fontSize: ['0.8rem', '0.8rem', '0.9rem', '1rem'],
																			_hover: {
																				bg: '#1C75BC',
																				fontWeight: 'bold',
																			},
																		}}
																		onClick={() => {
																			if (cpf.length !== 11) {
																				setError('O CPF deve conter exatamente 11 números.');
																			} else {
																				setShowForm(true);
																				handleGetByCpf();
																			}
																		}}
																	>
																		Buscar
																	</Button>
																</Flex>
															</Flex>
															{error && (
																<Text fontSize={12} color="red.500">
																	{error}
																</Text>
															)}
															{cpfData && (
																<Box p={4} borderWidth="1px" borderRadius="md" bg="gray.100">
																	<Text>
																		<strong>Nome:</strong> {cpfData.name}
																	</Text>
																	<Text>
																		<strong>CRAS:</strong> {cpfData.cras}
																	</Text>
																</Box>
															)}
														</Flex>
													)}
													{payload?.tipo_usuario === 1 && (
														<ModalFooter justifyContent={'center'}>
															<Text>
																Deseja confirmar o seu agendamento para o dia{' '}
																<strong>
																	{selectedDate && format(selectedDate, 'dd/MM/yyyy')}
																</strong>{' '}
																às <strong>{horarioSelecionado}</strong> no{' '}
																{payload && <strong>CRAS - {Cras[payload.cras]}?</strong>}
															</Text>
														</ModalFooter>
													)}
												</>
											)}
											<ModalFooter justifyContent={'center'}>
												<Button
													minW={['100px', '100px', '150px', '150px']}
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
													<Button
														onClick={() => {
															onClose();
															setShowForm(false);
														}}
														sx={btnStyle}
														type="submit"
													>
														Confirmar
													</Button>
												)}
											</ModalFooter>
										</form>
									</ModalBody>
								</ModalContent>
							</Modal>
						</Box>
					</Flex>
				</Box>
			)}
		</Flex>
	);
};

export default SelecionarDia;

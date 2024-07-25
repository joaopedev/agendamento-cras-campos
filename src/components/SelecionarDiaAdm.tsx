import { useContext, useEffect, useState, useRef } from 'react';
import {
	Button,
	Box,
	Flex,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Radio,
	useToast,
	Divider,
	Input,
	Textarea,
} from '@chakra-ui/react';
import DatePicker, { CalendarContainer, registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays, getDay } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import { ISchedulingModel, ISchedulingResponse } from '../interface/Schedulling';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { BloqueioAgendamentoModel, RegisterSchedullingModel } from '../types/auth-data';
import { btnStyle } from '../pages/loginPage';

registerLocale('pt-BR', ptBR);

const SelecionarDiaAdm: React.FC = () => {
	const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
	const [, setAgendamentoRealizado] = useState(false);
	const [showConfirmar, setShowConfirmar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 15));
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { payload, getAllSchedullingCras, cpfData, registerBlock } = useContext(AuthContext);
	const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
	const [loading, setLoading] = useState(true);
	const isMounted = useRef(true);
	const toast = useToast();
	const [periodoSelecionado, setPeriodoSelecionado] = useState<
		'manha' | 'tarde' | 'dia_inteiro' | null
	>(null);
	const handleOpen = (periodo: 'manha' | 'tarde' | 'dia_inteiro') => {
		setPeriodoSelecionado(periodo);
		onOpen();
	};
	const getSelectedDay = () => {
		if (getDay(selectedDate) === 6) {
			setSelectedDate(addDays(selectedDate, 2));
			return;
		}
		if (getDay(selectedDate) === 0) {
			setSelectedDate(addDays(selectedDate, 1));
			return;
		}
	};
	getSelectedDay();

	const { setValue } = useForm<RegisterSchedullingModel>();

	const confirmarBloqueio = async () => {
		if (!periodoSelecionado || !selectedDate) return;

		const tipoBloqueio =
			periodoSelecionado === 'manha'
				? 'matutino'
				: periodoSelecionado === 'tarde'
				? 'vespertino'
				: 'diario';

		if (payload) {
			const bloqueioData: BloqueioAgendamentoModel = {
				usuario_id: payload?.id,
				cras: payload?.cras,
				data: selectedDate,
				tipo_bloqueio: tipoBloqueio,
				motivo: 'Motivo do bloqueio', // Ajuste conforme necessário
				ativo: true,
			};

			try {
				await registerBlock(bloqueioData);
				toast({
					title: 'Bloqueio realizado com sucesso',
					duration: 5000,
					isClosable: true,
					position: 'top-right',
				});
			} catch (error) {
				toast({
					title: 'Erro ao realizar bloqueio',
					description: (error as Error).message,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top-right',
				});
			}
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
			mb={12}
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
						RESERVAR DIA
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
									filterDate={date => date.getDay() !== 0 && date.getDay() !== 6}
									onSelect={handleDateChange}
									onChange={(date: Date) => setSelectedDate(date)}
									minDate={addDays(new Date(), 15)}
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
						<Flex flex={1} gap={1} justifyContent={'center'}>
							{/* <Text pb={1} fontSize={['12px', '12px', '15px', '15px']} fontWeight="bold">
								HORÁRIOS DISPONÍVEIS
							</Text> */}
							<Button w={'max-content'} colorScheme={'blue'} onClick={() => handleOpen('manha')}>
								MANHÃ
							</Button>
							<Button w={'max-content'} colorScheme={'blue'} onClick={() => handleOpen('tarde')}>
								TARDE
							</Button>
							<Button
								onClick={() => handleOpen('dia_inteiro')}
								w={'max-content'}
								colorScheme={'blue'}
							>
								DIA INTEIRO
							</Button>
						</Flex>
						<Modal
							isOpen={isOpen}
							onClose={() => {
								onClose();
								setShowConfirmar(false);
							}}
							isCentered
							size={['xs', 'sm', 'md', 'lg']}
						>
							<ModalOverlay />
							<ModalContent minW={['90%', '27em', '30em', '48em']} textAlign={'center'}>
								<ModalHeader mt={5}>TEM CERTEZA DISSO?</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Text>
										{periodoSelecionado === 'manha' &&
											`Ao confirmar, todos os atendimentos marcados para a manhã do dia ${format(
												selectedDate,
												'dd/MM/yy'
											)} serão cancelados. ⚠`}
										{periodoSelecionado === 'tarde' &&
											`Ao confirmar, todos os atendimentos marcados para a tarde do dia ${format(
												selectedDate,
												'dd/MM/yy'
											)} serão cancelados. ⚠`}
										{periodoSelecionado === 'dia_inteiro' &&
											`Ao confirmar, todos os atendimentos marcados para o dia ${format(
												selectedDate,
												'dd/MM/yy'
											)} serão cancelados. ⚠`}
									</Text>
									<Radio
										mt={4}
										onChange={() => {
											setShowConfirmar(true);
										}}
									>
										Tenho certeza!
									</Radio>
								</ModalBody>
								<ModalFooter justifyContent={'center'}>
									<Flex gap={4} flexDir={'column'}>
										{showConfirmar && (
											// <Input placeholder="Qual o motivo?"  />
											<Textarea
												placeholder="Qual o motivo?"
												minH="unset"
												overflow="hidden"
												w="100%"
												h={'100px'}
											/>
										)}
										<Flex>
											<Button
												minW={['100px', '100px', '150px', '150px']}
												boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
												fontSize={['0.8rem', '0.8rem', '0.9rem', '1rem']}
												colorScheme="red"
												variant="solid"
												mr={3}
												onClick={() => {
													onClose();
													setShowConfirmar(false);
												}}
											>
												Cancelar
											</Button>
											{showConfirmar && (
												<Button
													onClick={() => {
														confirmarBloqueio();
														onClose();
													}}
													sx={btnStyle}
													type="submit"
												>
													Confirmar
												</Button>
											)}
										</Flex>
									</Flex>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</Flex>
				</Box>
			)}
		</Flex>
	);
};

export default SelecionarDiaAdm;

import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
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
import { format, addDays } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import { ISchedulingModel, ISchedulingResponse } from '../interface/Schedulling';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { RegisterSchedulling } from '../types/auth-data';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchedullingSchema } from '../validation/auth';

registerLocale('pt-BR', ptBR);

interface Horario {
	hora: string;
	disponivel: boolean;
}

const SelecionarDia: React.FC = () => {
	const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
	const [selectedOption, setSelectedOption] = useState<string>('');
	const maxDate = addDays(new Date(), 31);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
	const { getSchedulling, payload, registerSchedulling, getUser } = useContext(AuthContext);
	const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
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
		formState: { errors, isSubmitting },
	} = useForm<RegisterSchedulling>({ resolver: yupResolver(RegisterSchedullingSchema) });

	const horaParaMinutos = (horaString: string): number => {
		const [horas, minutos] = horaString.split(':').map(Number);
		return horas * 60 + minutos;
	};

	useEffect(() => {
		const fetchUserData = async () => {
			if (payload) {
				const response: ISchedulingResponse = await getSchedulling();
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

	const handleRegisterSchedulling = async (data: RegisterSchedulling) => {
		try {
			await registerSchedulling(data);
			toast({
				title: "Agendamento realizado com sucesso",
				duration: 5000,
				isClosable: true,
				position: 'top-right',
			});
			onConfirmClose();
		} catch (error) {
			toast({
				title: "Erro ao realizar agendamento",
				description: (error as Error).message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
		}
	};

	const BoxHorario = ({ horario, onOpen }: { horario: Horario; onOpen: () => void }) => {
		const handleOpenModal = () => {
			if (horario.disponivel && selectedDate) {
				const newDate = new Date(selectedDate);
				const minutos = horaParaMinutos(horario.hora);
				newDate.setHours(Math.floor(minutos / 60));
				newDate.setMinutes(minutos % 60);
				setSelectedDate(newDate);
				setHorarioSelecionado(horario.hora);
				setValue("data_hora", format(newDate, 'yyyy-MM-dd HH:mm'));
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

	const handleConfirmar = useCallback(() => {
		onClose();
		onConfirmOpen();
	}, [onClose, onConfirmOpen]);

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
								<form onSubmit={handleSubmit(handleRegisterSchedulling)}>
								<Modal isOpen={isOpen} onClose={onClose} isCentered size={['xs', 'sm', 'md', 'lg']}>
									<ModalOverlay />
									<ModalContent textAlign={'center'}>
										<ModalHeader>Confirmar Agendamento</ModalHeader>
										<ModalCloseButton />
										<ModalBody>
											<Flex flexDir="column" alignItems="center">
												<Text>
													Deseja confirmar o agendamento <br /> para o dia{' '}
													<strong>{selectedDate && format(selectedDate, 'dd/MM/yyyy')}</strong> às{' '}
													<strong>{horarioSelecionado}</strong>?
												</Text>
												<RadioGroup onChange={setSelectedOption} value={selectedOption} mt={4}>
													<Stack direction="row" spacing={4} align="center">
														<Radio value="Cadastramento">Cadastramento</Radio>
														<Radio value="Atualização Cadastral">Atualização Cadastral</Radio>
													</Stack>
												</RadioGroup>
												<FormControl isInvalid={!!errors.name}>
													<FormLabel htmlFor="name">Nome</FormLabel>
													<Input id="name" {...register("name")} />
													{errors.name && <Text color="red.500">{errors.name.message}</Text>}
												</FormControl>

												<FormControl isInvalid={!!errors.data_hora}>
													<FormLabel htmlFor="data_hora">Data e Hora</FormLabel>
													<Input id="data_hora" value={selectedDate ? format(selectedDate, 'yyyy-MM-dd HH:mm') : ''} {...register("data_hora")} readOnly />
													{errors.data_hora && <Text color="red.500">{errors.data_hora.message}</Text>}
												</FormControl>

												<FormControl isInvalid={!!errors.cras}>
													<FormLabel htmlFor="cras">Cras</FormLabel>
													<Input id="cras" {...register("cras")} />
													{errors.cras && <Text color="red.500">{errors.cras.message}</Text>}
												</FormControl>

												<FormControl isInvalid={!!errors.status}>
													<FormLabel htmlFor="status">Status</FormLabel>
													<Input id="status" {...register("status")} />
													{errors.status && <Text color="red.500">{errors.status.message}</Text>}
												</FormControl>

												<Button
													type="submit"
													bg={'#2CA1FF'}
													textColor={'white'}
													_hover={{ bg: '#1C75BC' }}
													mt={4}
													isLoading={isSubmitting}
												>
													Confirmar
												</Button>
											</Flex>
										</ModalBody>
										<ModalFooter>
											<Button colorScheme="red" variant="ghost" mr={3} onClick={onClose}>
												Cancelar
											</Button>
										</ModalFooter>
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
							</form>
						</Box>
					</Flex>
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

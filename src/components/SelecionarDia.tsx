import { useContext, useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import { ISchedulingModel, ISchedulingResponse } from '../interface/Schedulling';
import 'react-datepicker/dist/react-datepicker.css';
// import { Cras } from '../interface/User';
registerLocale('pt-BR', ptBR);

// const getCrasName = (crasValue: number): string => {
// 	return Cras[crasValue];
// };

interface Horario {
	hora: string;
	disponivel: boolean;
}

const SelecionarDia: React.FC = () => {
	const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
	const [selectedOption, setSelectedOption] = useState<string>('');
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const maxDate = addDays(new Date(), 31);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	// console.log(selectedDate);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
	const { getSchedulling, payload } = useContext(AuthContext);
	const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
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
	const [horariosDisponiveis, setHorariosDisponiveis] = useState<Horario[]>(horarios);

	const horaParaMinutos = (horaString: string): number => {
		const [horas, minutos] = horaString.split(':').map(Number);
		return horas * 60 + minutos;
	};

	const atualizarHorariosDisponiveis = () => {
		const horariosAtualizados = horarios.map(horario => {
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
		setHorariosDisponiveis(horariosAtualizados);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			if (payload) {
				const response: ISchedulingResponse = await getSchedulling();
				setSchedullingData(response.agendamentos);
				atualizarHorariosDisponiveis();
			}
		};

		fetchUserData();
	}, [payload, getSchedulling, selectedDate, atualizarHorariosDisponiveis]);

	console.log(schedullingData);

	const BoxHorario = ({ horario, onOpen }: { horario: Horario; onOpen: () => void }) => {
		const handleOpenModal = () => {
			if (horario.disponivel && selectedDate) {
				const newDate = new Date(selectedDate);
				const minutos = horaParaMinutos(horario.hora);
				newDate.setHours(Math.floor(minutos / 60));
				newDate.setMinutes(minutos % 60);
				setSelectedDate(newDate);
				setHorarioSelecionado(horario.hora);
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

	const handleConfirmar = () => {
		onClose();
		onConfirmOpen();
	};

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
			{/* {schedullingData.length > 0 ? (
				schedullingData.map(schedulling => (
					<Text key={schedulling.id}>
						{schedulling.id} {schedulling.name} - {getCrasName(schedulling.cras)}
					</Text>
				))
			) : (
				<Text>Loading...</Text>
			)} */}

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
										</Flex>
										{showErrorMessage && (
											<Text color="red.500" mt={2}>
												Por favor selecione uma opção antes de confirmar.
											</Text>
										)}
									</ModalBody>
									<ModalFooter>
										<Button colorScheme="red" variant="ghost" mr={3} onClick={onClose}>
											Cancelar
										</Button>
										<Button
											bg={'#2CA1FF'}
											textColor={'white'}
											_hover={{ bg: '#1C75BC' }}
											onClick={() => {
												if (!selectedOption) {
													setShowErrorMessage(true);
												} else {
													setShowErrorMessage(false);
													handleConfirmar();
												}
											}}
										>
											Confirmar
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

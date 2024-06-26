import 'react-datepicker/dist/react-datepicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays } from 'date-fns';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import {
	Button,
	Box,
	Flex,
	Text,
	Card,
	Heading,
	CardBody,
	useDisclosure,
	Image,
	// Modal,
	// ModalBody,
	// ModalContent,
	// ModalHeader,
	// ModalOverlay,
	Tag,
} from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { ISchedulingModel, ISchedulingResponse } from '../interface/Schedulling';

registerLocale('pt-BR', ptBR);

const SelecionarDiaFuncionario: React.FC = () => {
	const btnStyle = {
		display: '-ms-grid',
		boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
		color: '#fff',
		bg: '#2CA1FF',
		minW: ['80px', '80px', '90px', '100px'],
		fontSize: ['0.8rem', '0.8rem', '0.9rem', '0.9rem'],
		_hover: {
			bg: '#1C75BC',
			fontWeight: 'bold',
		},
	};
	const { getSchedulling, payload, registerSchedulling, getUser } = useContext(AuthContext);
	const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
	const [userData, setUserData] = useState<any | null>(null);
	const maxDate = addDays(new Date(), 30);
	const [activeCardId, setActiveCardId] = useState<number | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
	const handleAtendimentoClick = (schedullingId: number) => {
		setActiveCardId(schedullingId === activeCardId ? null : schedullingId); // Alterna entre ativo e inativo
		onAtendimentoOpen();
	};

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	const {
		isOpen: isAtendimentoOpen,
		onOpen: onAtendimentoOpen,
		onClose: onAtendimentoClose,
	} = useDisclosure();
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		let interval: NodeJS.Timer | null = null;
		let timeout: NodeJS.Timeout | null = null;

		if (isAtendimentoOpen) {
			const initialStartTime = new Date(); // Use initialStartTime

			timeout = setTimeout(() => {
				setElapsedTime(0);

				interval = setInterval(() => {
					const now = new Date();
					setElapsedTime(Math.floor((now.getTime() - initialStartTime.getTime()) / 1000));
				}, 1000);
			}, 0);
		} else {
			clearTimeout(timeout!);
			clearInterval(interval!);
			setElapsedTime(0);
		}

		return () => {
			clearTimeout(timeout!);
			clearInterval(interval!);
		};
	}, [isAtendimentoOpen]);

	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
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

	return (
		<Flex
			className="container__date"
			justifyContent={'flex-start'}
			alignItems={'center'}
			gap={'10px'}
			pt={5}
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

			<DatePicker
				locale={'pt-BR'}
				selected={selectedDate}
				inline
				filterDate={date => date.getDay() !== 0 && date.getDay() !== 6 && date <= maxDate}
				onSelect={handleDateChange}
				onChange={(date: Date | null) => setSelectedDate(date)}
				minDate={new Date()}
				className="customInput"
			/>

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
							<Text fontSize={['12px', '12px', '15px', '15px']} fontWeight="bold">
								HORÁRIOS AGENDADOS
							</Text>

							{schedullingData
								.filter(schedulling => {
									if (selectedDate) {
										const dataAgendamento = new Date(schedulling.data_hora);
										return dataAgendamento.toDateString() === selectedDate.toDateString();
									}
								})
								.sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime())
								.map(schedulling => (
									<Card key={schedulling.id} mt={1}>
										<CardBody>
											<Flex
												minH={'102px'}
												justifyContent={'space-between'}
												flexDir={['column', 'column', 'row', 'row']}
											>
												<Flex
													justifyContent={['space-around', 'space-around', '', '']}
													gap={4}
													alignItems={'center'}
													flexDir={['column', 'column', 'row', 'row']}
												>
													<Image
														borderRadius="full"
														boxSize="85px"
														src="https://bit.ly/dan-abramov"
														alt="Dan Abramov"
													/>
													<Flex
														justifyContent={'center'}
														alignItems={['center', 'center', 'flex-start', 'flex-start']}
														flexDir={'column'}
													>
														<Flex gap={2} alignItems={'center'}>
															<Heading size="lg">{format(schedulling.data_hora, 'HH:mm')}</Heading>
															<Tag colorScheme="blue">Pendente</Tag>
														</Flex>
														<Text textAlign={'left'} pt="2" fontSize="sm">
															{schedulling.name}
														</Text>
														<Text my="2" fontSize="sm">
															<strong>{schedulling.description}</strong>
														</Text>
													</Flex>
												</Flex>
												<Flex justifyContent={'center'} gap={4} alignItems={'center'}>
													{/* {selectedCardId === Number(schedulling.id) && (
														<Text>
															Tempo Decorrido: <br /> {formatTime(elapsedTime)}
														</Text>
													)} */}
													{activeCardId === Number(schedulling.id) && (
														<Text>
															Tempo Decorrido: <br /> {formatTime(elapsedTime)}
														</Text>
													)}
													<Flex gap={2} flexDir={['row', 'row', 'column', 'column']}>
														<Button
															sx={btnStyle}
															onClick={() => handleAtendimentoClick(Number(schedulling.id))}
															isDisabled={
																activeCardId !== null && activeCardId !== Number(schedulling.id)
															}
														>
															{activeCardId === Number(schedulling.id) ? 'Encerrar' : 'Atender'}
														</Button>
														{activeCardId !== Number(schedulling.id) && (
															<Button
																isDisabled={activeCardId !== null}
																boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
																minW={['80px', '80px', '90px', '100px']}
																fontSize={['0.8rem', '0.8rem', '0.9rem', '0.9rem']}
																bg={'#EE4B2B'}
																textColor={'white'}
																_hover={{
																	bg: '#be3c22',
																	fontWeight: 'bold',
																}}
															>
																Ausente
															</Button>
														)}
													</Flex>
												</Flex>
											</Flex>
										</CardBody>
									</Card>
								))}
							{/* <Modal
								closeOnOverlayClick={false}
								isOpen={isAtendimentoOpen}
								onClose={onAtendimentoClose}
								isCentered
							>
								<ModalOverlay />
								<ModalContent textAlign={'center'}>
									<ModalHeader>Atendimento em Andamento</ModalHeader>
									<ModalBody>
										<Text>
											Tempo Decorrido: <br /> {formatTime(elapsedTime)}
										</Text>
										<br />
										<Button
											onClick={onAtendimentoClose}
											mb={4}
											boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
											minW={['100px', '100px', '150px', '150px']}
											fontSize={['0.8rem', '0.8rem', '0.9rem', '0.9rem']}
											bg={'#EE4B2B'}
											textColor={'white'}
											_hover={{
												bg: '#be3c22',
												fontWeight: 'bold',
											}}
										>
											Encerrar
										</Button>
									</ModalBody>
								</ModalContent>
							</Modal> */}
						</Box>
					</Flex>
				</Box>
			)}
		</Flex>
	);
};

export default SelecionarDiaFuncionario;

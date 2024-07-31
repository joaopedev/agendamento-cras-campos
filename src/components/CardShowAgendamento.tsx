import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ISchedulingModel, ISchedulingResponse } from '../interface/Schedulling';
import { format, isAfter, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CardShowAgendamento: React.FC = () => {
	const { payload, getAllSchedullingCras } = useContext(AuthContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isMounted = useRef(true);
	const hoje = new Date();
	const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
	const agendamentosFuturos = schedullingData.filter(agendamento => {
		if (typeof agendamento.data_hora === 'string' && agendamento.status === 2) {
			const dataAgendamento = parseISO(agendamento.data_hora);
			return (
				isValid(dataAgendamento) &&
				agendamento.usuario_id === payload?.id &&
				isAfter(dataAgendamento, hoje)
			);
		}
		return false;
	});
	const primeiroAgendamento = agendamentosFuturos.length > 0 ? agendamentosFuturos[0] : null;
	const showAgendamento = agendamentosFuturos?.length > 0;

	useEffect(() => {
		isMounted.current = true;
		const fetchSchedullingData = async () => {
			if (payload?.cras) {
				try {
					const response: ISchedulingResponse = await getAllSchedullingCras(payload?.cras);
					if (isMounted?.current) {
						setSchedullingData(response?.agendamentos);
					}
				} catch (error) {
					if (isMounted?.current) {
						console.error('Failed to fetch data', error);
					}
				} finally {
					if (isMounted.current) {
					}
				}
			}
		};

		fetchSchedullingData();

		return () => {
			isMounted.current = false;
		};
	}, [payload?.cras, getAllSchedullingCras]);

	return (
		<Flex
			justifyContent={'center'}
			ml={['0%', '30%', '25%', '20%']}
			w={['100%', '70%', '75%', '80%']}
			textAlign={'center'}
		>
			{showAgendamento && (
				<Card
					alignItems={'center'}
					w={'80%'}
					boxShadow="2px 2px 5px hsla(0, 28%, 0%, 0.5)"
					bg={'#f4f4f4'}
				>
					<CardHeader>
						<Text fontWeight={'bold'} fontSize={['xl', 'xl', '2xl', '3xl']}>
							VOCÊ JÁ POSSUI UM AGENDAMENTO!
						</Text>
					</CardHeader>
					<CardBody fontSize={'xl'} pt={0}>
						<Divider mb={2} />
						<Text>Próximo atendimento:</Text>
						<Text>
							dia{' '}
							<strong>
								{primeiroAgendamento &&
									format(primeiroAgendamento?.data_hora, 'dd/MM', { locale: ptBR })}
							</strong>{' '}
							às{' '}
							<strong>
								{primeiroAgendamento &&
									format(primeiroAgendamento?.data_hora, "HH'h'", { locale: ptBR })}
							</strong>
						</Text>

						<Button // Novo botão para editar
							mt={4} // Adiciona um pouco de margem superior
							colorScheme="blue" // Cor azul padrão
							bg={'#2CA1FF'}
							onClick={onOpen}
						>
							Editar Agendamento
						</Button>
					</CardBody>
				</Card>
			)}
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
				}}
				isCentered
				size={['xs', 'sm', 'md', 'lg']}
			>
				<ModalOverlay />
				<ModalContent minW={['90%', '27em', '30em', '48em']} textAlign={'center'}>
					<ModalHeader mt={5}>O que você deseja fazer?</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>
					<ModalFooter justifyContent={'center'}></ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default CardShowAgendamento;

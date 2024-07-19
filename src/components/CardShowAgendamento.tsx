import { Card, CardBody, CardHeader, Divider, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ISchedulingModel, ISchedulingResponse } from '../interface/Schedulling';
import { format, isAfter, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CardShowAgendamento: React.FC = () => {
	const { payload, getAllSchedullingCras } = useContext(AuthContext);
	const textStyle1 = {
		fontSize: ['1.2rem', '1.3rem', '1.4rem', '1.5rem'],
		borderRadius: '5px',
		p: '8px 0',
	};
	const isMounted = useRef(true);
	const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
	const hoje = new Date();
	const agendamentosFuturos = schedullingData.filter(agendamento => {
		if (typeof agendamento.data_hora === 'string') {
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
	const showAgendamento = schedullingData.filter(a => a.usuario_id === payload?.id).length > 0;

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
						<Text fontWeight={'bold'} sx={textStyle1}>
							VOCÊ JÁ POSSUI UM AGENDAMENTO
						</Text>
						<Divider />
					</CardHeader>
					<CardBody pt={0}>
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
					</CardBody>
				</Card>
			)}
		</Flex>
	);
};

export default CardShowAgendamento;

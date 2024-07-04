import { Card, CardBody, CardHeader, Divider, Flex, Text } from '@chakra-ui/react';

const CardShowAgendamento: React.FC = () => {
	const textStyle1 = {
		fontSize: ['1.2rem', '1.3rem', '1.4rem', '1.5rem'],
		borderRadius: '5px',
		p: '8px 0',
	};
	return (
		<Flex
			justifyContent={'center'}
			ml={['0%', '30%', '25%', '20%']}
			w={['100%', '70%', '75%', '80%']}
			mb={4}
			textAlign={'center'}
		>
			<Card
				alignItems={'center'}
				w={'80%'}
				boxShadow="2px 2px 5px hsla(0, 28%, 0%, 0.5)"
				bg={'#f4f4f4'}
			>
				<CardHeader>
					<Text
						// textAlign={'center'}
						fontWeight={'bold'}
						sx={textStyle1}
					>
						VOCÊ JÁ POSSUI UM AGENDAMENTO
					</Text>
					<Divider />
				</CardHeader>
				<CardBody pt={0}>
					<Text>Próximo agendamento:</Text>
					<Text>
						dia <strong>08/08</strong> às <strong>14h</strong>
					</Text>
				</CardBody>
			</Card>
		</Flex>
	);
};

export default CardShowAgendamento;

import { Button, Flex, Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { SidebarS } from '../components/SidebarS';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const Home: React.FC = () => {
	return (
		<Flex h="100vh">
			<SidebarS />
			<Stack gap={'30px'} w="80%" m={'auto'} alignItems="center">
				<Box sx={boxStyle}>
					<Box fontSize="30px" fontWeight="bold" mb="20px">
						SEUS DADOS
					</Box>
					<Box alignItems="center">
						<Box fontWeight="bold" mt={'10px'} mb={'3px'}>
							Nome:
						</Box>
						<Box w="" bg="white" borderRadius="5px" p="8px 0">
							Fulano da Silva Júnior
						</Box>
					</Box>
					<Box fontWeight="bold" mt={'10px'} mb={'3px'}>
						CPF:
					</Box>
					<Box bg="white" borderRadius="5px" p="8px 0">
						123.456.789-00
					</Box>
					<Box fontWeight="bold" mt={'10px'} mb={'3px'}>
						Unidade do CRAS:
					</Box>
					<Box bg="white" borderRadius="5px" p="8px 0">
						CRAS da Penha
					</Box>
				</Box>
				<Button sx={btnStyle}>AGENDAR ATENDIMENTO</Button>
			</Stack>
		</Flex>
	);
};

export const boxStyle = {
	maxW: '950px',
	minW: '400px',
	boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
	w: '60%',
	p: '40px',
	borderRadius: '25px',
	bg: '#F4F4F4',
	textAlign: 'center',
	alignContent: 'center',
};
export const btnStyle = {
	w: '30%',
	display: '-ms-grid',
	boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
	color: '#fff',
	bg: '#2CA1FF',
	maxW: '950px',
	minW: '400px',
	_hover: {
		bg: '#1C75BC',
		fontWeight: 'bold',
	},
};
export default Home;

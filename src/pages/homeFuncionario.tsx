import { Flex, Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { SidebarFuncionario } from '../components/SidebarFuncionario';
import { HamburgerMenu } from '../components/HamburgerMenu';

export const HomeFuncionario: React.FC = () => {
	return (
		<Flex h="100vh">
			<SidebarFuncionario />
			<HamburgerMenu />
			<Stack
				gap={['20px', '20px', '30px', '30px']}
				w={['60%', '60%', '60%', '80%']}
				m={'auto'}
				pt={['60px', '0px', '0px', '0px']}
				pl={['0%', '30%', '25%', '20%']}
				alignItems="center"
			>
				<Box
					sx={boxStyle}
					maxW={['500px', '500px', '500px', '950px']}
					position={['relative', 'static', 'static', 'static']}
				>
					<Box fontSize={['20px', '25px', '30px', '30px']} fontWeight="bold" mb="20px">
						SEUS DADOS
					</Box>

					<Box sx={textStyle2}>Nome:</Box>
					<Box w="" sx={textStyle1}>
						Fulano da Silva Júnior
					</Box>

					<Box sx={textStyle2}>CPF:</Box>
					<Box sx={textStyle1}>123.456.789-00</Box>
					<Box sx={textStyle2}>E-mail:</Box>
					<Box sx={textStyle1}>funcionario@gmail.com</Box>
				</Box>
			</Stack>
		</Flex>
	);
};

const textStyle1 = {
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	bg: 'white',
	borderRadius: '5px',
	p: '8px 0',
};

const textStyle2 = {
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	fontWeight: 'bold',
	mt: '10px',
	mb: '3px',
};

export const boxStyle = {
	w: '60%',
	maxW: ['300px', '350px', '500px', '950px'],
	minW: '250px',
	boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
	p: ['20px', '25px', '30px', '40px'],
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
	minW: ['150px', '200px', '250px', '300px'],
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	_hover: {
		bg: '#1C75BC',
		fontWeight: 'bold',
	},
};
export default HomeFuncionario;
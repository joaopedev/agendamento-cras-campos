import { Button, Text, Stack, Box, Image } from '@chakra-ui/react';

export const SidebarS: React.FC = () => {
	const sideBtnStyle = {
		textColor: 'white',
		fontSize: ['18', '18', '20', '28'],
		h: 'fit-content',
		p: '10px 15px',
		borderRadius: '0',
		bgColor: '#ffffff50',
		w: '100%',
		justifyContent: 'left',
		_hover: {
			color: '#1C75BC',
			bg: '#ebedf090',
		},
		_focus: {
			boxShadow: 'dark-lg',
			color: '#1C75BC',
			bg: 'white',
		},
	};

	return (
		<Box
			w={['30%', '30%', '25%', '20%']}
			h={['100vh']}
			borderRadius="0 100px 0 0 "
			bgImage={
				'https://www.turismo.rj.gov.br/wp-content/uploads/2020/03/Rio-Para%C3%ADba-do-Sul-1.jpg'
			}
			bgSize={'cover'}
			bgPos={'20%'}
			display={['none', 'flex', 'flex', 'flex']}
		>
			<Stack
				p={'150px 0 40px '}
				justifyContent="space-between"
				bg="hsla(207, 74%, 42%, 0.85)"
				w="20%"
				h="100%"
				borderRadius="0 100px 0 0 "
				alignItems="center"
				boxSize={'full'}
			>
				<Stack p=" 0" w={'100%'}>
					<Button sx={sideBtnStyle}>Início</Button>

					<Button sx={sideBtnStyle}>Agendamento</Button>
				</Stack>
				<Stack alignItems={'center'}>
					<Image
						boxSize={'100px'}
						objectFit="contain"
						src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Bras%C3%A3o_de_Campos_dos_Goytacazes.png"
						alt="Brasão de Campos dos Goytacazes"
					/>
					<Text fontSize={'12'} color={'white'} textAlign={'center'} maxW={'150px'}>
						Prefeitura Municipal de Campos dos Goytacazes
					</Text>
				</Stack>
			</Stack>
		</Box>
	);
};

export default SidebarS;

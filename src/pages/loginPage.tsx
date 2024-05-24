import React, { useState, ChangeEvent } from 'react';
import { Flex, Stack, Box, Input, Link, InputLeftElement, InputGroup } from '@chakra-ui/react'; // Importando componentes do Chakra UI
import { Link as RouterLink } from 'react-router-dom'; // Importando o Link do react-router-dom
import SidebarLogin from '../components/SidebarLogin'; // Importando o componente SidebarHome
import LoadingButton from '../components/LoadingButton'; // Importando o componente LoadingButton
import { FooterLogin } from '../components/FooterLogin';

export const Login: React.FC = () => {
	const [isLoading] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [inputDataNascimento, setInputDataNascimento] = useState(''); // Novo estado para data de nascimento

	const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
		// Define o tipo do parâmetro
		let value = e.target.value.replace(/\D/g, '');
		value = value.slice(0, 11);

		if (value.length > 3) {
			value = value.slice(0, 3) + '.' + value.slice(3);
		}
		if (value.length > 7) {
			value = value.slice(0, 7) + '.' + value.slice(7);
		}
		if (value.length > 11) {
			value = value.slice(0, 11) + '-' + value.slice(11);
		}

		setInputValue(value);
	};

	const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, ''); // Remove não numéricos
		value = value.slice(0, 8); // Limita a 8 dígitos (DDMMAAAA)

		// Formatação
		if (value.length > 2) {
			value = value.slice(0, 2) + '/' + value.slice(2);
		}
		if (value.length > 5) {
			value = value.slice(0, 5) + '/' + value.slice(5);
		}

		setInputDataNascimento(value);
	};

	return (
		<Flex h="100vh" flex={['column', '', '', '']}>
			<SidebarLogin />
			<FooterLogin />
			<Stack
				pt={['60px', '0', '0', '0']}
				pb={['130px', '0', '0', '0']}
				m="auto"
				paddingLeft={['0', '45%', '50%', '50%']}
				gap={['20px', '20px', '30px', '30px']}
				w={['60%', '60%', '60%', '80%']}
				alignItems="center"
			>
				<Box
					sx={boxStyle}
					maxW={['500px', '500px', '500px', '950px']}
					position={['relative', 'static', 'static', 'static']}
				>
					<Box
						fontSize={['20px', '25px', '30px', '30px']}
						fontWeight="bold"
						mb="10px"
						padding={0}
						alignItems={'center'}
					>
						ENTRAR
					</Box>

					<InputGroup>
						{' '}
						{/* Envolva os elementos Input e InputLeftElement */}
						<Input
							placeholder="CPF"
							value={inputValue}
							onChange={handleCpfChange}
							size="md"
							sx={{
								fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
								bg: 'white',
								borderRadius: '5px',
								p: '4px 0',
								mt: '0px',
								mb: '0px',
								paddingLeft: '16px',
							}}
							_placeholder={{ paddingLeft: 0 }}
						/>
						<InputLeftElement pointerEvents="none" children={' '} />
					</InputGroup>

					<Box sx={textStyle2}></Box>
					<InputGroup>
						<Input // Input para data de nascimento
							placeholder="Data de Nascimento"
							value={inputDataNascimento} //
							onChange={handleDataNascimentoChange}
							size="md"
							sx={{
								fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
								bg: 'white',
								borderRadius: '5px',
								p: '4px 0',
								mt: '0px',
								mb: '0px',
								paddingLeft: '16px',
							}}
						/>
						<InputLeftElement pointerEvents="none" children={' '} />
					</InputGroup>
					<Box sx={textStyle2}></Box>

					<LoadingButton isLoading={isLoading} sx={btnStyle} transform="auto">
						CONFIRMAR
					</LoadingButton>
					<Box sx={textStyle2}></Box>
					<Box sx={textStyle3}>Não possui uma conta?</Box>
					<Link as={RouterLink} to="/cadastro" sx={textStyle4}>
						Criar minha conta
					</Link>
					<Box sx={textStyle3}></Box>
					{/* <Link as={RouterLink} to='/home' sx={textStyle4}>
            Esqueci minha senha
          </Link> */}
				</Box>
			</Stack>
		</Flex>
	);
};

// const textStyle1 = {
//   fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
//   bg: 'white',
//   borderRadius: '5px',
//   p: '8px 0',
// };

const textStyle2 = {
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	fontWeight: 'bold',
	mt: '10px',
	mb: '3px',
};

const textStyle3 = {
	fontSize: ['0.6rem', '0.6rem', '0.7rem'],
	borderRadius: '5px',
	p: '0px 0',
};

const textStyle4 = {
	fontSize: ['0.6rem', '0.6rem', '0.7rem'],
	borderRadius: '2px',
	p: '2px 0',
	textDecoration: 'underline',
};

export const boxStyle = {
	// w: '30%',
	maxW: ['300px', '350px', '500px', '950px'],
	minW: '250px',
	boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
	p: ['10px', '10px', '10px', '10px'],
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
	maxW: '500px',
	minW: ['100px', '100px', '150px', '150px'],
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	_hover: {
		bg: '#1C75BC',
		fontWeight: 'bold',
	},
};
export default Login;

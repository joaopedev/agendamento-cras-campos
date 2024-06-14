import React, { useState, ChangeEvent } from 'react';
import {
	Flex,
	Stack,
	Box,
	Input,
	Link,
	InputLeftElement,
	InputGroup,
	Button,
	FormErrorMessage,
	FormControl,
	FormLabel,
} from '@chakra-ui/react'; // Importando componentes do Chakra UI
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom'; // Importando o Link do react-router-dom
import SidebarLogin from '../components/SidebarLogin'; // Importando o componente SidebarHome
import { FooterLogin } from '../components/FooterLogin';
import { SignIn } from '../types/auth-data';
import { useAuth } from '../hook/useAuth';
import { loginSchema } from '../validation/auth';

export const Login: React.FC = () => {
	const { signIn } = useAuth();
	const navigate = useNavigate();
	// const [inputValue, setInputValue] = useState('');
	// const [inputDataNascimento, setInputDataNascimento] = useState(''); // Novo estado para data de nascimento

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignIn>({ resolver: yupResolver(loginSchema) });

	const handleLogin = async (data: SignIn) => {
		try {
			await signIn(data);
			navigate('/home');
		} catch (error) {
			return error; // Retornar o erro para tratamento adequado (exibir mensagem, etc.)
		}
	};

	// const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
	//   const { value } = e.target;
	//   let inputValue = value.replace(/\D/g, ''); // Remove non-numeric characters

	//   // Apply formatting as the user types (XXX.XXX.XXX-XX)
	//   if (inputValue.length > 3) {
	//     inputValue = ${inputValue.slice(0, 3)}.${inputValue.slice(3)};
	//   }
	//   if (inputValue.length > 7) {
	//     inputValue = ${inputValue.slice(0, 7)}.${inputValue.slice(7)};
	//   }
	//   if (inputValue.length > 11) {
	//     inputValue = ${inputValue.slice(0, 11)}-${inputValue.slice(11, 13)}; // Limit to 11 digits
	//   }

	//   setInputValue(inputValue);
	// };
	// const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
	//   const { value } = e.target;
	//   let inputValue = value.replace(/\D/g, ''); // Remove non-numeric characters

	//   // Apply formatting as the user types
	//   if (inputValue.length > 2) {
	//     inputValue = ${inputValue.slice(0, 2)}/${inputValue.slice(2)};
	//   }
	//   if (inputValue.length > 5) {
	//     inputValue = ${inputValue.slice(0, 5)}/${inputValue.slice(5, 9)}; // Limit to 8 digits
	//   }

	//   setInputDataNascimento(inputValue);
	// };

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
					<form onSubmit={handleSubmit(handleLogin)}>
						<FormControl isInvalid={!!errors.cpf}>
							<FormLabel htmlFor="cpf">CPF</FormLabel>
							<InputGroup>
								{' '}
								{/* Envolva os elementos Input e InputLeftElement */}
								<Input
									id="cpf"
									placeholder="XXX.XXX.XXX-XX" // Update placeholder
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
									{...register('cpf')}
									// value={inputValue} // Add this line to keep input synced with the state
									// onChange={handleCpfChange}
									_placeholder={{ paddingLeft: 0 }}
								/>
								<InputLeftElement pointerEvents="none" children={' '} />
							</InputGroup>
							<FormErrorMessage>{errors.cpf && errors.cpf.message}</FormErrorMessage>
						</FormControl>

						<Box sx={textStyle2}></Box>

						<FormControl isInvalid={!!errors.password}>
							<FormLabel htmlFor="dataNascimento">Data de Nascimento</FormLabel>{' '}
							{/* Updated label */}
							<Input
								{...register('password', {
									// onChange: handleDataNascimentoChange,
								})}
								id="dataNascimento"
								placeholder="DD/MM/AAAA"
								type="text"
								size="md"
								sx={{
									/* Chakra UI styling */
									fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
									bg: 'white',
									borderRadius: '5px',
									p: '4px 0',
									mt: '0px',
									mb: '0px',
									paddingLeft: '16px',
								}}
								// value={inputDataNascimento}
								_placeholder={{ paddingLeft: 0 }}
							/>
							<FormErrorMessage>
								{errors.password && errors.password.message}{' '}
								{/* Error message if validation fails */}
							</FormErrorMessage>
						</FormControl>

						<Box sx={textStyle2}></Box>
						<Button
							type="submit"
							style={{ backgroundColor: '#2CA1FF' }}
							variant="solid"
							isLoading={isSubmitting}
						>
							Entrar
						</Button>
						<Box sx={textStyle2}></Box>
					</form>

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

import { Flex, Stack, Box, Button, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { SidebarHome } from '../components/SidebarHome';
import { HamburgerMenu } from '../components/HamburgerMenu';
import LoadingButtonHome from '../components/LoadingButtonHome';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Cras, IUserModel } from '../interface/User';

const getCrasName = (crasValue: number): string => {
	return Cras[crasValue];
};

export const Home: React.FC = () => {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const { getUser, payload } = useContext(AuthContext);
	const [userData, setUserData] = useState<IUserModel | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			if (payload) {
				const response = await getUser(payload.id); // Supondo que o payload contenha o userId
				setUserData(response.contas); // Ajuste aqui para acessar a propriedade 'contas'
			}
		};

		fetchUserData();
	}, [payload, getUser]);

	const buttonSingleOut = async () => {
		console.log('teste');
		await signOut();
		return navigate('/');
	};

	const [isLoading] = useState(false);

	return (
		<Flex h="100vh">
			<SidebarHome />
			<HamburgerMenu />
			<Stack
				gap={['15px', '15px', '18px', '18px']}
				w={['60%', '60%', '60%', '80%']}
				m={'auto'}
				alignItems="center"
				pl={[0, '30%', '25%', '20%']}
			>
				<Box>
					<Button sx={btnStyle} onClick={buttonSingleOut}>
						Sair
					</Button>
				</Box>
				<Box
					mt={['60px', 0, 0, 0]}
					sx={boxStyle}
					maxW={['500px', '500px', '500px', '950px']}
					position={['relative', 'static', 'static', 'static']}
				>
					<Box fontSize={['15px', '20px', '25px', '30px']} fontWeight="bold" mb="20px">
						SEUS DADOS
					</Box>
					{userData ? (
						<Box>
							<Box sx={textStyle2}>Nome:</Box>
							<Box sx={textStyle1}>{userData.name}</Box>
							<Box sx={textStyle2}>CPF:</Box>
							<Box sx={textStyle1}>{userData.cpf}</Box>
							<Box sx={textStyle2}>Celular:</Box>
							<Box sx={textStyle1}>{userData.telefone}</Box>
							<Box sx={textStyle2}>Bairro:</Box>
							<Box sx={textStyle1}>{userData.endereco.bairro}</Box>
							<Box sx={textStyle2}>Unidade do CRAS:</Box>
							<Box sx={textStyle1}>{getCrasName(userData.cras)}</Box>
						</Box>
					) : (
						<Text>Loading...</Text>
					)}
				</Box>
				<LoadingButtonHome isLoading={isLoading} sx={btnStyle} transform="auto">
					AGENDAR ATENDIMENTO
				</LoadingButtonHome>
				{/* <LoadingButton isLoading={isLoading} sx={btnStyle} transform='auto'>
          EDITAR INFORMAÇÕES
        </LoadingButton> */}
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
	p: ['20px', '20px', '30px', '40px'],
	borderRadius: '25px',
	bg: '#F4F4F4',
	textAlign: 'center',
	alignContent: 'center',
};
export const btnStyle = {
	p: '0 12',
	maxW: 'fit-content',
	minW: 'fit-content',
	display: '-ms-grid',
	boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
	color: '#fff',
	bg: '#2CA1FF',
	// maxW: '950px',
	// minW: ['150px', '200px', '250px', '300px'],
	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
	_hover: {
		bg: '#1C75BC',
		fontWeight: 'bold',
	},
};
export default Home;

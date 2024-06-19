import { Menu, MenuButton, MenuList, MenuItem, Box, IconButton } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IUserModel } from '../interface/User';

export const HamburgerMenu: React.FC = () => {
	const { getUser, payload } = useContext(AuthContext);
	const [userData, setUserData] = useState<IUserModel | null>(null);
	const showAgendamento = userData?.tipoUsuario === 1 || userData?.tipoUsuario === 3;
	useEffect(() => {
		const fetchUserData = async () => {
			if (payload) {
				const response = await getUser(payload.id); // Supondo que o payload contenha o userId
				setUserData(response.contas); // Ajuste aqui para acessar a propriedade 'contas'
			}
		};

		fetchUserData();
	}, [payload, getUser]);

	return (
		<Box display={['flex', 'none', 'none', 'none']} zIndex={200} top={0} pos={'fixed'}>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="Options"
					icon={<HamburgerIcon color={'white'} />}
					bg={'#2CA1FF'}
					variant="outline"
					m={'10px'}
					boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
					border={'none'}
					_hover={{
						bg: '#1C75BC',
						fontWeight: 'bold',
					}}
					_active={{}}
				/>
				<MenuList bg={'#2CA1FF'}>
					<NavLink to={'/home'}>
						<MenuItem
							bg={'none'}
							_hover={{
								bg: '#1C75BC',
								fontWeight: 'bold',
							}}
							color={'white'}
						>
							Início
						</MenuItem>
					</NavLink>

					{showAgendamento && (
						<NavLink to={'/agendamento'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#1C75BC',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Agendamento
							</MenuItem>
						</NavLink>
					)}

					<NavLink to={'/controleFuncionarios'}>
						<MenuItem
							bg={'none'}
							_hover={{
								bg: '#1C75BC',
								fontWeight: 'bold',
							}}
							color={'white'}
						>
							Controle de Funcionarios
						</MenuItem>
					</NavLink>

					{userData?.tipoUsuario === 3 && (
						<NavLink to={'/dashboard'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#1C75BC',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Dashboard
							</MenuItem>
						</NavLink>
					)}

					{userData?.tipoUsuario === 3 && (
						<NavLink to={'/gerenciamento'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#1C75BC',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Gerenciamento
							</MenuItem>
						</NavLink>
					)}
				</MenuList>
			</Menu>
		</Box>
	);
};

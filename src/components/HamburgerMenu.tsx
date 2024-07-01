import { Menu, MenuButton, MenuList, MenuItem, Box, IconButton, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const HamburgerMenu: React.FC = () => {
	const { payload, signOut } = useContext(AuthContext);

	const buttonSingleOut = () => {
		signOut();
		window.location.href = '/';
	};

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

					<NavLink to={'/agendar'}>
						<MenuItem
							bg={'none'}
							_hover={{
								bg: '#1C75BC',
								fontWeight: 'bold',
							}}
							color={'white'}
						>
							Agendar
						</MenuItem>
					</NavLink>

					{payload?.tipo_usuario !== 1 && (
						<NavLink to={'/agendamentos'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#1C75BC',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Agendamentos
							</MenuItem>
						</NavLink>
					)}

					{payload?.tipo_usuario === 3 && (
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

					{payload?.tipo_usuario === 3 && (
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
					<Button
						bg={'none'}
						_hover={{
							bg: '#1C75BC',
							fontWeight: 'bold',
						}}
						color={'white'}
						onClick={buttonSingleOut}
					>
						Sair
					</Button>
				</MenuList>
			</Menu>
		</Box>
	);
};

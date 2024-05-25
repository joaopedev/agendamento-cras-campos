// import { Menu, MenuButton, MenuList, MenuItem, Box, IconButton } from '@chakra-ui/react';
// import { NavLink } from 'react-router-dom';
// import { HamburgerIcon } from '@chakra-ui/icons';

// export const HamburgerMenu: React.FC = () => {
// 	return (
// 		<Box display={['flex', 'none', 'none', 'none']} pos={'fixed'}>
// 			<Menu>
// 				<MenuButton
// 					as={IconButton}
// 					aria-label="Options"
// 					icon={<HamburgerIcon color={'white'} />}
// 					bg={'#2CA1FF'}
// 					variant="outline"
// 					m={'10px'}
// 					boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
// 					border={'none'}
// 					_hover={{
// 						bg: '#1C75BC',
// 						fontWeight: 'bold',
// 					}}
// 					_active={{}}
// 				/>
// 				<MenuList bg={'#2CA1FF'}>
// 					<NavLink to={'/home'}>
// 						<MenuItem
// 							bg={'none'}
// 							_hover={{
// 								bg: '#1C75BC',
// 								fontWeight: 'bold',
// 							}}
// 							color={'white'}
// 						>
// 							Início
// 						</MenuItem>
// 					</NavLink>

// 					<NavLink to={'/agendamento'}>
// 						<MenuItem
// 							bg={'none'}
// 							_hover={{
// 								bg: '#1C75BC',
// 								fontWeight: 'bold',
// 							}}
// 							color={'white'}
// 						>
// 							Agendamento
// 						</MenuItem>
// 					</NavLink>
// 				</MenuList>
// 			</Menu>
// 		</Box>
// 	);
// };
import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Box, IconButton } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

export const HamburgerMenu: React.FC = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	const isAdminPage = currentPath.startsWith('/adm') || currentPath.startsWith('/home-adm');
	const isEmployeePage =
		currentPath.startsWith('/home-funcionario') ||
		currentPath.startsWith('/adm') ||
		currentPath.startsWith('/home-adm');

	return (
		<Box display={['flex', 'none', 'none', 'none']} pos={'fixed'}>
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

					<NavLink to={'/agendamento'}>
						<MenuItem
							bg={'none'}
							_hover={{
								bg: '#1C75BC',
								fontWeight: 'bold',
							}}
							color={'white'}
						>
							{isEmployeePage ? 'Agendamentos' : 'Agendamento'}
						</MenuItem>
					</NavLink>

					{isAdminPage && (
						<NavLink to={'/adm'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#1C75BC',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Administração
							</MenuItem>
						</NavLink>
					)}
				</MenuList>
			</Menu>
		</Box>
	);
};

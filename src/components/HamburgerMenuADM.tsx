import { Menu, MenuButton, MenuList, MenuItem, Box, IconButton } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

export const HamburgerMenuADM: React.FC = () => {
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
					<NavLink to={'/home-adm'}>
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
				</MenuList>
			</Menu>
		</Box>
	);
};

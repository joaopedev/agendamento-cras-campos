import { Menu, MenuButton, MenuList, MenuItem, Box, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export const HamburgerMenu: React.FC = () => {
	return (
		<Box display={['flex', 'none', 'none', 'none']} pos={'absolute'}>
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
					<MenuItem bg={'none'} color={'white'}>
						Início
					</MenuItem>
					<MenuItem bg={'none'} color={'white'}>
						Agendamento
					</MenuItem>
				</MenuList>
			</Menu>
		</Box>
	);
};

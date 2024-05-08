import { Button, Flex, Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { SidebarS } from '../components/SidebarS';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import LoginForm from '../components/loginForm';
// import

const Scheduling: React.FC = () => {
	return (
		<Flex h="100vh">
			<SidebarS />
			<Box></Box>
		</Flex>
	);
};

export default Scheduling;

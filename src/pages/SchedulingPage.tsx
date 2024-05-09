import { Button, Flex, Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { SidebarS } from '../components/SidebarS';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const Scheduling: React.FC = () => {
	const localizer = momentLocalizer(moment);
	return (
		<>
			<Flex h="100vh">
				<SidebarS />
				<Box></Box>
			</Flex>
			<Flex>
				<Calendar
					localizer={localizer}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }}
				/>
			</Flex>
		</>
	);
};

export default Scheduling;

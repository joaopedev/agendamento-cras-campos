import 'react-datepicker/dist/react-datepicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import * as React from 'react';
import { useState, useEffect } from 'react';
import DatePicker, {
	// @ts-expect-error The library is not exporting the component as a named export
	ReactDatePicker as _MissingNamedExport,
	registerLocale,
} from 'react-datepicker';
import {
	Box,
	useDisclosure,
	Container,
	Flex,
	Center,
	Fade,
	ScaleFade,
	Slide,
	SlideFade,
	Collapse,
	Text,
} from '@chakra-ui/react';

registerLocale('pt-BR', ptBR);

const SelecionarDia: React.FC = () => {
	const { isOpen, onToggle } = useDisclosure();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);

		if (date) {
			//data selecionada
			console.log(date);
		}
	};

	return (
		<Flex
			className="container__date"
			justifyContent={'center'}
			alignItems={'center'}
			gap={'10px'}
			p={['10px', '0', '0', '0']}
			w={['100%', '70%', '75%', '80%']}
			flexDir={'column'}
		>
			{!selectedDate && (
				<Box
					className="selecionar__dia"
					textAlign="center"
					// mb={4}
				>
					<Text alignSelf={'center'} fontWeight={'bold'} fontSize={'20px'} textAlign={'center'}>
						SELECIONE UM DIA
					</Text>
				</Box>
			)}
			{selectedDate && (
				<Box
					className="box__cinza"
					textAlign={'center'}
					p={4}
					borderWidth="1px"
					display={selectedDate ? 'block' : 'none'}
					borderRadius="md"
					bg={'#F4F4F4'}
					h={'fit-content'}
					alignSelf={'center'}
					w={'80%'}
				>
					<Flex gap={'10px'} flexDirection={'column'}>
						<Box className="box__dia" alignItems={'center'} display={'flex'} p={2}>
							<Text mr={'5px'} fontWeight="bold" fontSize={['12px', '12px', '15px', '15px']}>
								DIA SELECIONADO:
							</Text>
							<Box bg="#fff" p={'5px'} flex={1} textAlign="center" borderRadius="5px">
								<Text fontSize={['12px', '12px', '15px', '15px']}>
									{selectedDate && format(selectedDate, 'dd/MM/yyyy')}
								</Text>
							</Box>
						</Box>
						<Box className="box__esquerda" flex={1}>
							<Text fontSize={['12px', '12px', '15px', '15px']} fontWeight="bold">
								HORÁRIOS DISPONÍVEIS
							</Text>
							{/* Mapear os horários disponíveis aqui */}
							<Box
								fontWeight={'bold'}
								fontSize={['12px', '12px', '15px', '15px']}
								bg={'#fff'}
								h={'stretch'}
							>
								<Box bg="green.500" p={2} mb={2}>
									08:00
								</Box>
								<Box bg="green.500" p={2} mb={2}>
									09:00
								</Box>
								<Box bg="green.500" p={2} mb={2}>
									11:00
								</Box>
								<Box bg="green.500" p={2} mb={2}>
									14:00
								</Box>
								{/* ... outros horários */}
							</Box>
						</Box>
					</Flex>
				</Box>
			)}

			<DatePicker
				locale={'pt-BR'}
				selected={selectedDate}
				inline
				filterDate={date => date.getDay() !== 0 && date.getDay() !== 6}
				onSelect={handleDateChange}
				onChange={(date: Date | null) => setSelectedDate(date)}
				minDate={new Date()}
				className="customInput"
			/>
		</Flex>
	);
};

export default SelecionarDia;

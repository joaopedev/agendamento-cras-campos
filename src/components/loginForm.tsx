import React from 'react';
import { Button, FormControl, FormLabel, Input, VStack, Box } from '@chakra-ui/react';
import { FaBold } from 'react-icons/fa';
export const LoginForm: React.FC = () => {
	return (
		<Box bg="white" m={2} p={3} rounded="md">
			<VStack>
				<FormControl justifyContent="space-between">
					<VStack></VStack>
					<VStack>
						<FormLabel color="black" m="0" fontSize={36} fontWeight="bold">
							ENTRAR
						</FormLabel>
					</VStack>
					<VStack>
						<Input mt={5} type="email" placeholder="CPF" borderColor="black" />
					</VStack>

					<VStack>
						<Button type="submit" marginTop={6} backgroundColor="#2CA1FF" textColor="white">
							Login
						</Button>
					</VStack>
				</FormControl>
			</VStack>
		</Box>
	);
};

export default LoginForm;

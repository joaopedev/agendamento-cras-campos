import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
} from "@chakra-ui/react";
export const LoginForm: React.FC = () => {


  return (
    <Box bg="white" m={2} p={3} rounded="md">
      <VStack>
        <FormControl justifyContent="space-between">
          <VStack>
          </VStack>
          <VStack>
            <FormLabel color="black" mt={8} mb={5}>
              Enter the email used for the purchase!
            </FormLabel>
          </VStack>
          <VStack>
            <Input
              mt={5}
              type="email"
              placeholder="Type your e-mail"
               borderColor="black"      
            />
          </VStack>
          
          <VStack>
            <Button
              type="submit"
              marginTop={6}
              backgroundColor="grey"

            >
              Login
            </Button>
          </VStack>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default LoginForm;

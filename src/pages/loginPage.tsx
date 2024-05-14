import { Flex, Stack, Box, Input, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SidebarS } from '../components/SidebarS';
import { HamburgerMenu } from '../components/HamburgerMenu';
import LoadingButton from '../components/LoadingButton';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom

export const Home: React.FC = () => {
  const [isLoading] = useState(false);
  const [inputValue, setInputValue] = useState(''); // Input value state

  return (
    <Flex h='100vh'>
      <SidebarS />
      <HamburgerMenu />
      <Stack
        gap={['20px', '20px', '30px', '30px']}
        w={['60%', '60%', '60%', '80%']}
        m='auto'
        alignItems='center'
      >
        <Box
          sx={boxStyle}
          maxW={['500px', '500px', '500px', '950px']}
          position={['relative', 'static', 'static', 'static']}
        >
          <Box
            fontSize={['20px', '25px', '30px', '30px']}
            fontWeight='bold'
            mb='20px'
          >
            ENTRAR
          </Box>

          <Input
            placeholder='  CPF'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            size='md'
            sx={{
              fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
              bg: 'white',
              borderRadius: '5px',
              p: '8px 0',
              mt: '10px',
              mb: '3px',
            }}
          />

          <Box sx={textStyle2}></Box>
          <Input // Password input field
            placeholder='  Senha'
            type='password' // This is the key change
            size='md'
            sx={{
              fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
              bg: 'white',
              borderRadius: '5px',
              p: '8px 0',
              mt: '10px',
              mb: '3px',
            }}
          />

          <Box sx={textStyle2}></Box>

          <LoadingButton isLoading={isLoading} sx={btnStyle} transform='auto'>
            CONFIRMAR
          </LoadingButton>
          <Box sx={textStyle3}>Não possui uma conta?</Box>
          <Link // Chakra UI Link component
            as={RouterLink} // Use react-router-dom's Link for routing
            to='/home' // Replace with the actual path to your signup page
            sx={textStyle4}
          >
            Clique aqui
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
};

// const textStyle1 = {
//   fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
//   bg: 'white',
//   borderRadius: '5px',
//   p: '8px 0',
// };

const textStyle2 = {
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  fontWeight: 'bold',
  mt: '10px',
  mb: '3px',
};

const textStyle3 = {
  fontSize: ['0.6rem', '0.6rem', '0.7rem'],
  borderRadius: '5px',
  p: '8px 0',
};

const textStyle4 = {
  fontSize: ['0.6rem', '0.6rem', '0.7rem'],
  borderRadius: '5px',
  p: '8px 0',
  textDecoration: 'underline',
};

export const boxStyle = {
  w: '30%',
  maxW: ['300px', '350px', '500px', '950px'],
  minW: '250px',
  boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
  p: ['10px', '10px', '10px', '10px'],
  borderRadius: '25px',
  bg: '#F4F4F4',
  textAlign: 'center',
  alignContent: 'center',
};
export const btnStyle = {
  w: '30%',
  display: '-ms-grid',
  boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
  color: '#fff',
  bg: '#2CA1FF',
  maxW: '500px',
  minW: ['100px', '100px', '150px', '150px'],
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  _hover: {
    bg: '#1C75BC',
    fontWeight: 'bold',
  },
};
export default Home;

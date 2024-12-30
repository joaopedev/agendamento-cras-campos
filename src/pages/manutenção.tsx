import React from 'react';
import { Flex, Stack, Box, Text } from '@chakra-ui/react';
import SidebarLogin from '../components/SidebarLogin';
import { FooterLogin } from '../components/FooterLogin';

export const Manutenção: React.FC = () => {
  return (
    <Flex h='100vh' flex={['column', '', '', '']}>
      <SidebarLogin />
      <Stack
        pt={['60px', '0', '0', '0']}
        pb={['130px', '0', '0', '0']}
        m='auto'
        paddingLeft={['0', '45%', '50%', '50%']}
        w={['60%', '60%', '60%', '80%']}
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
            mb='10px'
            padding={0}
            alignItems={'center'}
          >
            SISTEMA EM MANUTENÇÃO!
          </Box>
          <Text
            fontSize={['16px', '18px', '20px']}
            textAlign='center'
            color='gray.600'
          >
            O sistema está passando por uma manutenção programada. Por favor,
            tente novamente mais tarde.
          </Text>
        </Box>
      </Stack>
      <FooterLogin />
    </Flex>
  );
};

const boxStyle = {
  maxW: ['300px', '350px', '500px', '950px'],
  minW: '250px',
  boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
  p: ['10px', '10px', '10px', '10px'],
  borderRadius: '25px',
  bg: '#F4F4F4',
  textAlign: 'center',
  alignContent: 'center',
};

export default Manutenção;

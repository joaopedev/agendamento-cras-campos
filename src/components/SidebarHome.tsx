import { Button, Text, Stack, Box, Image } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export const SidebarHome: React.FC = () => {
  const sideBtnStyle = {
    textColor: 'white',
    fontSize: ['18', '18', '20', '28'],
    h: 'fit-content',
    p: ['10px 12px', '10px 12px', '10px 15px', '10px 15px'],
    borderRadius: '0',
    bgColor: '#ffffff50',
    w: '100%',
    justifyContent: 'left',
    _hover: {
      color: '#1C75BC',
      bg: '#ebedf090',
    },
    _focus: {
      color: '#1C75BC',
      bg: 'white',
    },
    _active: {
      color: '#1C75BC',
      bg: 'white',
    },
  };

  

export const Sidem: React.FC = () => {
  return (
    <Box
      w={['30%', '30%', '25%', '20%']}
      h={['100vh']}
      borderRadius='0 100px 0 0 '
      bgImage={
        'https://www.turismo.rj.gov.br/wp-content/uploads/2020/03/Rio-Para%C3%ADba-do-Sul-1.jpg'
      }
      bgSize={'cover'}
      bgPos={'20%'}
      display={['none', 'flex', 'flex', 'flex']}
    >
      <Stack
        p={'150px 0 40px '}
        justifyContent='space-between'
        bg='hsla(207, 74%, 42%, 0.85)'
        w='20%'
        h='100%'
        borderRadius='0 100px 0 0 '
        alignItems='center'
        boxSize={'full'}
      >
        <Stack p=' 0' w={'100%'}>
          <NavLink to={'/home'}>
            {({ isActive }) => (
              <Button isActive={isActive} sx={sideBtnStyle}>
                Início
              </Button>
            )}
          </NavLink>

          <NavLink to='/agendamento'>
            {({ isActive }) => (
              <Button isActive={isActive} sx={sideBtnStyle}>
                Agendamento
              </Button>
            )}
          </NavLink>
        </Stack>
        <Text
          fontFamily={'Poppins, sans-serif'} // Fonte mais moderna e legível
          fontSize={'30px'}
          color={'white'}
          textAlign={'left'}
          maxW={'250px'}
          textShadow='1px 1px 2px rgba(0, 0, 0, 0.5)' // Sombra sutil
        >
          Bem vindo(a) à{' '}
          <Text as='span' fontWeight='bold'>
            central
          </Text>{' '}
          de{' '}
          <Text as='span' fontWeight='bold'>
            agendamento
          </Text>{' '}
          do{' '}
          <Text as='span' fontWeight='bold'>
            CRAS
          </Text>
        </Text>
        <Divider
          mt={-8} // Margem superior (opcional)
          borderColor='white'
          borderWidth='2px' // Espessura da linha
          borderRadius={'10'}
          width='80%' // Largura da linha (80% da largura do container pai)
          marginLeft='15%' // Margem esquerda para controlar o início
          marginRight='15%' // Margem direita
          boxShadow='0px 2px 5px rgba(0, 0, 0, 0.3)' // Sombra
        />

        <Stack p=' 0' w={'100%'}></Stack>
        <Stack alignItems={'center'}>
          <Image
            boxSize={'100px'}
            objectFit='contain'
            src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Bras%C3%A3o_de_Campos_dos_Goytacazes.png'
            alt='Brasão de Campos dos Goytacazes'
          />
          <Text
            fontSize={'12'}
            color={'white'}
            textAlign={'center'}
            maxW={'150px'}
          >
            Prefeitura Municipal de Campos dos Goytacazes
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SidebarHome;
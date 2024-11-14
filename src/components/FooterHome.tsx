import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const FooterHome: React.FC = () => {
  return (
    <Box
      as='footer'
      display={['', 'none', 'none', 'none']}
      bg='hsla(145, 100%, 29%, 0.80)'
      color='white'
      p={4}
      borderRadius='0 50px 0 0 '
      bottom={0}
      w='100%'
      zIndex={2}
    >
      <Flex px={4} direction='column' alignItems='center' textAlign='center'>
        <Text fontSize='20'>
          Bem-vindo(a) à <b>Central</b> de <b>Agendamento</b> do <b>CadÚnico</b>
        </Text>

        <Box mt={2}>
          <Link
            as='a'
            href='/termos'
            fontSize='sm'
            color='white'
            textDecoration='underline'
            mr={4}
            target='_blank' // Abre em uma nova aba
            rel='noopener noreferrer' // Segurança
          >
            Termos de Serviço
          </Link>
          <Link
            as='a'
            href='/privacidade'
            fontSize='sm'
            color='white'
            textDecoration='underline'
            target='_blank' // Abre em uma nova aba
            rel='noopener noreferrer' // Segurança
          >
            Políticas de Privacidade
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

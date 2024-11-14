import React from 'react';
import { Container, Heading, Text, Divider, Box, Link } from '@chakra-ui/react';

const TermosDeServico: React.FC = () => {
  return (
    <Container maxW='container.lg' py={10}>
      <Heading as='h1' size='xl' mb={6} textAlign='center'>
        Termos de Serviço
      </Heading>
      <Text fontSize='lg' mb={6}>
        Bem-vindo ao sistema de agendamento dos Centros de Referência de
        Assistência Social (CRAS) de Campos dos Goytacazes. Ao utilizar nossos
        serviços, você concorda em cumprir e estar sujeito aos termos e
        condições descritos neste documento.
      </Text>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          1. Aceitação dos Termos
        </Heading>
        <Text>
          Ao acessar ou utilizar o sistema de agendamento, você concorda com
          estes Termos de Serviço. Caso não concorde com algum dos termos, não
          utilize o sistema.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          2. Uso do Sistema
        </Heading>
        <Text>
          O sistema de agendamento é destinado ao atendimento dos usuários dos
          CRAS, facilitando o acesso a serviços de assistência social. Ao
          utilizá-lo, você concorda em fornecer informações precisas e
          atualizadas, e em não utilizar o sistema para atividades ilícitas ou
          não autorizadas.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          3. Responsabilidades do Usuário
        </Heading>
        <Text>
          Você é responsável pelo uso adequado do sistema, pela veracidade das
          informações fornecidas e pela preservação da confidencialidade de seus
          dados de acesso. Qualquer atividade realizada com suas credenciais é
          de sua responsabilidade.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          4. Restrições de Uso
        </Heading>
        <Text>
          É proibido utilizar o sistema para finalidades que violem leis ou
          regulamentos. Não é permitido realizar atividades que prejudiquem o
          funcionamento do sistema ou infrinjam os direitos de outros usuários
          ou da Secretaria Municipal de Desenvolvimento Humano e Social (SMDHS).
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          5. Privacidade e Proteção de Dados
        </Heading>
        <Text>
          O uso do sistema de agendamento implica na coleta e processamento de
          dados pessoais, conforme descrito em nossa{' '}
          <Link href='/privacidade' color='blue.600' textDecoration='underline'>
            Política de Privacidade
          </Link>
          . A proteção desses dados é prioritária e em conformidade com a LGPD.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          6. Alterações dos Termos
        </Heading>
        <Text>
          A SMDHS se reserva o direito de modificar estes Termos de Serviço a
          qualquer momento. Recomenda-se a revisão periódica deste documento. O
          uso contínuo do sistema após as alterações implica na aceitação dos
          novos termos.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          7. Limitação de Responsabilidade
        </Heading>
        <Text>
          A SMDHS não se responsabiliza por danos resultantes do uso incorreto
          do sistema, interrupções, falhas, ou pela exatidão das informações
          fornecidas pelo usuário. O sistema é disponibilizado como está, sem
          garantias de funcionamento contínuo e ininterrupto.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          8. Foro
        </Heading>
        <Text>
          Para dirimir quaisquer questões relacionadas a estes Termos de
          Serviço, fica eleito o Foro da Comarca de Campos dos Goytacazes,
          Estado do Rio de Janeiro, renunciando-se a qualquer outro foro, por
          mais privilegiado que seja.
        </Text>
      </Box>

      <Text textAlign='center' fontSize='sm' mt={10}>
        A SMDHS agradece a confiança e reafirma seu compromisso com a segurança
        e transparência no uso de nossos serviços.
      </Text>
    </Container>
  );
};

export default TermosDeServico;

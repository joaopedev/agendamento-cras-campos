import React from 'react';
import { Container, Heading, Text, Divider, Box, Link } from '@chakra-ui/react';

const Privacidade: React.FC = () => {
  return (
    <Container maxW='container.lg' py={10}>
      <Heading as='h1' size='xl' mb={6} textAlign='center'>
        Política de Privacidade
      </Heading>
      <Text fontSize='lg' mb={6}>
        A Secretaria Municipal de Desenvolvimento Humano e Social de Campos dos
        Goytacazes (SMDHS) é responsável pela proteção do sigilo dos dados
        pessoais e dados pessoais sensíveis dos usuários do sistema de
        agendamento dos Centros de Referência de Assistência Social (CRAS) de
        Campos dos Goytacazes. O acesso ao banco de dados pessoais é utilizado
        exclusivamente para apoiar o planejamento e a implementação de políticas
        públicas de assistência social.
      </Text>
      <Text mb={6}>
        Esta Política de Privacidade foi elaborada em conformidade com o Marco
        Civil da Internet e com a Lei Geral de Proteção de Dados Pessoais
        (LGPD). A aplicação desta Política será pautada pelo dever de boa-fé e
        pela observância dos princípios previstos no art. 6º da LGPD, incluindo
        os princípios da finalidade, adequação, necessidade, livre acesso,
        qualidade dos dados, transparência, prevenção, não discriminação e
        responsabilização.
      </Text>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          1. Definições
        </Heading>
        <Text mb={2}>
          <strong>Dado Pessoal:</strong> Informação relacionada a uma pessoa
          natural identificada ou identificável.
        </Text>
        <Text mb={2}>
          <strong>Titular:</strong> Pessoa natural a quem se referem os dados
          pessoais que são objeto de tratamento.
        </Text>
        <Text mb={2}>
          <strong>Dado Pessoal Sensível:</strong> Dado pessoal sobre origem
          racial ou étnica, convicção religiosa, opinião política, filiação a
          sindicato ou a organização de caráter religioso, filosófico ou
          político, dado referente à saúde ou à vida sexual, dado genético ou
          biométrico.
        </Text>
        <Text mb={2}>
          <strong>Controlador:</strong> A SMDHS, responsável pelas decisões
          referentes ao tratamento de dados pessoais.
        </Text>
        <Text mb={2}>
          <strong>Operador:</strong> Pessoa natural ou jurídica que realiza o
          tratamento de dados pessoais em nome do controlador.
        </Text>
        <Text mb={2}>
          <strong>Encarregado (DPO):</strong> Pessoa indicada pela SMDHS para
          atuar como canal de comunicação entre o controlador, os titulares dos
          dados e a Autoridade Nacional de Proteção de Dados (ANPD).
        </Text>
        <Text>
          <strong>Tratamento:</strong> Toda operação realizada com dados
          pessoais, como coleta, produção, recepção, classificação, utilização,
          acesso, reprodução, transmissão, distribuição, arquivamento,
          armazenamento, eliminação, avaliação, controle, modificação,
          comunicação, transferência, difusão ou extração.
        </Text>
      </Box>

      {/* Additional sections */}
      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          2. Base Legal para o Tratamento de Dados Pessoais
        </Heading>
        <Text>
          O tratamento de dados pessoais realizado no sistema de agendamento dos
          Centros de Referência de Assistência Social (CRAS) de Campos dos
          Goytacazes baseia-se na obrigação legal de coleta e manutenção de
          dados para a inclusão e atualização no Cadastro Único (CadÚnico),
          conforme o Decreto nº 6.135/2007 e a Lei Orgânica da Assistência
          Social (LOAS) - Lei nº 8.742/1993. A Lei Geral de Proteção de Dados
          Pessoais (LGPD) permite o tratamento de dados pessoais para
          cumprimento de obrigação legal e execução de políticas públicas,
          conforme os artigos 7º, inciso III, e 11, inciso II, alíneas "a" e "e"
          da LGPD.
        </Text>
      </Box>

      {/* Repeat similar structure for other sections */}
      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          3. Controlador
        </Heading>
        <Text>
          <strong>Nome do Controlador:</strong> Secretaria Municipal de
          Desenvolvimento Humano e Social de Campos dos Goytacazes (SMDHS)
        </Text>
        <Text>
          <strong>Endereço:</strong> Rua Rocha Leão, nº 13, Caju, Campos dos
          Goytacazes, RJ, CEP 28051-170
        </Text>
        <Text>
          <strong>Site:</strong> socialcampos.com.br
        </Text>
        <Text>
          <strong>Contato:</strong> Formulário de Contato
        </Text>
        <Text>
          <strong>Encarregado de Dados (DPO):</strong> Kamila Oliveira Barreto
        </Text>
        <Text>
          <strong>E-mail do Encarregado:</strong>{' '}
          kamilaoliveirabarreto@yahoo.com.br
        </Text>
      </Box>

      <Divider my={8} />

      {/* Repeat for remaining sections */}
      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          4. Direitos do Titular de Dados Pessoais
        </Heading>
        <Text>
          O titular dos dados pessoais possui os direitos segundo o artigo 18 da
          Lei Geral de Proteção de Dados Pessoais (LGPD):
        </Text>
        <Text mt={4}>
          • <strong>Direito de Confirmação e Acesso:</strong> O titular tem o
          direito de saber se seus dados estão sendo processados e de acessar os
          dados pessoais mantidos pelo controlador.
        </Text>
        <Text mt={2}>
          • <strong>Direito de Retificação:</strong> O titular pode solicitar a
          correção de dados incompletos, inexatos ou desatualizados.
        </Text>
        <Text mt={2}>
          • <strong>Direito à Limitação do Tratamento:</strong> O titular pode
          pedir a limitação do uso de seus dados, restringindo o tratamento em
          determinadas circunstâncias.
        </Text>
        <Text mt={2}>
          • <strong>Direito de Oposição:</strong> O titular tem o direito de se
          opor ao tratamento de seus dados pessoais quando considerar que o uso
          não está em conformidade com a legislação aplicável.
        </Text>
        <Text mt={2}>
          •{' '}
          <strong>
            Direito de Não Ser Submetido a Decisões Automatizadas:
          </strong>{' '}
          O titular tem o direito de não ser sujeito a decisões automatizadas
          que possam afetar significativamente seus interesses, sem uma revisão
          humana.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          5. Dados Pessoais Coletados
        </Heading>
        <Text>
          Para a utilização do sistema de agendamento dos CRAS, coletamos os
          seguintes dados pessoais:
        </Text>
        <Text mt={2}>&bull; Nome Completo</Text>
        <Text>&bull; CPF</Text>
        <Text>&bull; Data de Nascimento</Text>
        <Text>
          &bull; Endereço Completo (Rua/Avenida/Estrada, número da residência)
        </Text>
        <Text>&bull; Bairro</Text>
        <Text>&bull; Número de Telefone</Text>
        <Text>&bull; E-mail</Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          6. Finalidade do Uso dos Dados Pessoais
        </Heading>
        <Text>Os dados pessoais coletados serão utilizados para:</Text>
        <Text mt={2}>
          &bull; <strong>Identificação e Autenticação:</strong> Garantir a
          correta identificação do usuário no sistema.
        </Text>
        <Text>
          &bull; <strong>Agendamento de Serviços:</strong> Permitir o
          agendamento de atendimentos nos CRAS.
        </Text>
        <Text>
          &bull; <strong>Comunicação:</strong> Entrar em contato com o usuário
          para confirmação, lembretes ou informações sobre o agendamento.
        </Text>
        <Text>
          &bull; <strong>Políticas Públicas:</strong> Apoiar o planejamento e
          implementação de políticas públicas de assistência social.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          7. Do Tratamento Realizado com os Dados Pessoais
        </Heading>
        <Text>
          Os dados pessoais serão submetidos às seguintes operações de
          tratamento:
        </Text>
        <Text mt={2}>&bull; Coleta</Text>
        <Text>&bull; Armazenamento</Text>
        <Text>&bull; Processamento</Text>
        <Text>&bull; Utilização</Text>
        <Text>
          &bull; Compartilhamento Interno: Os dados poderão ser compartilhados
          com qualquer entidade da Prefeitura de Campos dos Goytacazes, quando
          necessário para a execução de políticas públicas ou cumprimento de
          obrigações legais.
        </Text>
        <Text>
          &bull; Criptografia: Dados são criptografados e mantidos em segurança
          ao final do seu uso, de acordo com a legislação vigente e boas
          práticas de proteção de dados.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          8. Segurança dos Dados
        </Heading>
        <Text>
          A SMDHS adota medidas de segurança técnicas e administrativas para
          proteger os dados pessoais de acessos não autorizados e situações
          acidentais ou ilícitas de destruição, perda, alteração, comunicação ou
          difusão.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          9. Transferência Internacional de Dados
        </Heading>
        <Text>Não haverá transferência internacional de dados pessoais.</Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          10. Do Bloqueio de Usuário
        </Heading>
        <Text>
          A SMDHS poderá bloquear o acesso do usuário ao sistema de agendamento
          sem aviso prévio em caso de uso inadequado, violação de leis ou
          regulamentos, ou descumprimento desta Política de Privacidade.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          11. Alterações da Política de Privacidade
        </Heading>
        <Text>
          A SMDHS reserva-se o direito de alterar esta Política de Privacidade a
          qualquer momento. Recomenda-se que o usuário a revise periodicamente.
          O uso contínuo do sistema após eventuais alterações será considerado
          como aceitação das mudanças.
        </Text>
      </Box>

      <Divider my={8} />

      <Box mb={8}>
        <Heading as='h2' size='md' mb={4}>
          12. Contato
        </Heading>
        <Text>
          Para esclarecer quaisquer dúvidas sobre esta Política de Privacidade
          ou sobre o tratamento de dados pessoais, entre em{' '}
          <Link
            href='https://www.prefeituracamposgoytacazes.org/contato/'
            isExternal
            textDecoration='underline'
            color='blue.600'
            fontWeight='bold'
          >
            contato conosco
          </Link>
          .
        </Text>
      </Box>

      <Divider my={8} />

      <Text textAlign='center' fontSize='sm' mt={10}>
        A SMDHS reafirma seu compromisso com a privacidade e a segurança dos
        dados pessoais dos usuários, em conformidade com a legislação vigente.
      </Text>
    </Container>
  );
};

export default Privacidade;

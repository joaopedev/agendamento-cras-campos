import React, { useState, ChangeEvent, useMemo } from 'react';
import {
  Flex,
  Stack,
  Box,
  Input,
  Link,
  InputLeftElement,
  InputGroup,
  Select,
  FormControl,
} from '@chakra-ui/react'; // Importando componentes do Chakra UI
import { Link as RouterLink } from 'react-router-dom'; // Importando o Link do react-router-dom
import SidebarHome from '../components/SidebarLogin'; // Importando o componente SidebarHome
import LoadingButton from '../components/LoadingButton'; // Importando o componente LoadingButton

export const Cadastro: React.FC = () => {
  const [isLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputDataNascimento, setInputDataNascimento] = useState(''); // Novo estado para data de nascimento

  const bairros = useMemo(
    () => [
      'ACAMP SEM TERRA ESTRADA LEITE',
      'ALTO DA AREIA',
      'ALTO DO ELISEU',
      'ASSENT ALELUIA',
      'ASSENT ANTONIO FARIAS',
      'ASSENT BATATAL',
      'ASSENT CAMBUCA',
      'ASSENT TERRA CONQUISTADA',
      'BABOSA',
      'BAIXA GRANDE',
      'BALANCA RANGEL',
      'BARRA DO JACARE',
      'BENTA PEREIRA',
      'BEIRA DO FAZ',
      'BEIRA DO TAI',
      'BOA VISTA',
      'BREJO GRANDE',
      'BUGALHO',
      'CABOIO',
      'CAJU',
      'CAMBAIBA',
      'CAMPELO',
      'CAMPO DE AREIA',
      'CAMPO LIMPO',
      'CAMPO NOVO',
      'CANAA',
      'CANAL DAS FLEXAS',
      'CANTAGALO',
      'CANTO DO ENGENHO',
      'CANTO DO RIO TOCOS',
      'CAPAO',
      'CARIOCA DE TOCOS',
      'CARVAO',
      'CAXETA',
      'CAXIAS DE TOCOS',
      'CAZUMBA',
      'CENTRO (OU ESPLANADA)',
      'CENTRO (OU MATADOURO)',
      'CEREJEIRA',
      'CHACARA JOAO FERREIRA',
      'CHATUBA',
      'CHAVE DO PARAISO',
      'CIPRIAO',
      'CODIN',
      'CONCEIÇAO DO IMBE',
      'COND SANTA ROSA',
      'COND SANTA ROSA 2',
      'COND CIDADE VERDE',
      'COND. DOS NOGUEIRAS',
      'CONSELHEIRO JOSINO',
      'COQUEIRO DE TOCOS',
      'CORREGO FUNDO',
      'CORRENTEZA',
      'CUPIM DE POÇO GORDO',
      'DIVISA',
      'DONANA',
      'DORES DE MACABU',
      'ESCOVA URUBU',
      'ESPINHO',
      'ESPIRITO SANTINHO',
      'ESTANCIA DA PENHA',
      'FAROL DE SAO THOME',
      'FAROLZINHO',
      'FAZENDINHA',
      'GAIVOTAS',
      'GOIABA',
      'GOYTACAZES',
      'GUANDU',
      'GURIRI',
      'HORTO',
      'IBITIOCA',
      'IMBE',
      'INVASAO CIDADE LUZ',
      'ITERERE',
      'JARDIM BOA VISTA',
      'JARDIM CARIOCA',
      'JARDIM FLAMBOYANT I',
      'JARDIM FLAMBOYANT II',
      'JARDIM MARIA DE QUEIROZ',
      'JARDIM PARAISO DE TOCOS',
      'JARDIM PRIMAVERA',
      'JOAO MARIA',
      'JOCKEY CLUB',
      'JOCKEY I',
      'JOCKEY II',
      'KM 5 a 8',
      'KM 9 a 16',
      'LAGOA DAS PEDRAS',
      'LAGOA DE CIMA',
      'LAGAMAR',
      'LAPA',
      'LARGO DO GARCIA',
      'LINHA DO LIMÃO',
      'MACACO',
      'MARCELO',
      'MARRECAS',
      'MARTINS LAGE',
      'MATA DA CRUZ',
      'MATO ESCURO',
      'MATUTU',
      'MINEIROS',
      'MONTENEGRO',
      'MORADO DO ORIENTE',
      'MORANGABA',
      'MORRO DO COCO',
      'MORRO GRANDE',
      'MULACO',
      'MUNDEUS',
      'MURUNDU',
      'MUSSUREPE',
      'MUTEMA',
      'NOSSA SRA DO ROSARIO',
      'NOVA BRASILIA',
      'NOVA CANAA',
      'NOVA GOITACAZES',
      'NOVO ELDORADO',
      'NOVO JOCKEY',
      'PARQUE ALPHAVILLE',
      'PARQUE ALPHAVILLE II',
      'PARQUE ALDEIA',
      'PARQUE ALDEIA I',
      'PARQUE ALDEIA II',
      'PARQUE ANGELICA',
      'PARQUE AURORA',
      'PARQUE BARAO DO RIO BRANCO',
      'PARQUE BELA VISTA',
      'PARQUE BONSUCESSO',
      'PARQUE CALIFORNIA',
      'PARQUE CARLOS DE LACERDA',
      'PARQUE CIDADE LUZ',
      'PARQUE CONJ. SANTA MARIA',
      'PARQUE CORRIENTES',
      'PARQUE CUSTODOPOLIS',
      'PARQUE DO PRADO',
      'PARQUE DOM BOSCO',
      'PARQUE DOS RODOVIÁRIOS',
      'PARQUE DR BEDA',
      'PARQUE ELDORADO',
      'PARQUE ESPLANADA',
      'PARQUE FAZENDA GRANDE',
      'PARQUE FUNDAO',
      'PARQUE GUARUS',
      'PARQUE IMPERIAL',
      'PARQUE IPS',
      'PARQUE JD DAS ACACIAS',
      'PARQUE JD GUARUS',
      'PARQUE JARDIM AEROPORTO',
      'PARQUE JARDIM CEASA',
      'PARQUE JOAO SEIXAS',
      'PARQUE JOSE DO PATROCINIO',
      'PARQUE JULIAO NOGUEIRA',
      'PARQUE LEBRET',
      'PARQUE LEOPOLDINA',
      'PARQUE MOSTEIRO DE SAO BENTO',
      'PARQUE NAUTICO',
      'PARQUE NITEROI',
      'PARQUE NOVA CAMPOS',
      'PARQUE NOVO MUNDO',
      'PARQUE OLIVEIRA BOTELHO',
      'PARQUE PRAZERES',
      'PARQUE PRESIDENTE VARGAS',
      'PARQUE REAL',
      'PARQUE RESIDENCIAL DA LAPA II',
      'PARQUE RES PORTO SEGURO',
      'PARQUE RES SANTO ANTONIO',
      'PARQUE RIACHUELO',
      'PARQUE ROSARIO',
      'PARQUE RUI BARBOSA',
      'PARQUE SALO BRAND',
      'PARQUE SANTA CLARA',
      'PARQUE SANTA HELENA',
      'PARQUE SANTA ROSA',
      'PARQUE SANTO AMARO',
      'PARQUE SANTO ANTONIO',
      'PARQUE SAO BENEDITO',
      'PARQUE SAO CAETANO',
      'PARQUE SAO DOMINGOS',
      'PARQUE SAO JOSE',
      'PARQUE SAO LINO',
      'PARQUE SAO MATHEUS',
      'PARQUE SAO SILVESTRE',
      'PARQUE SÃO SILVANO',
      'PARQUE SANTOS DUMONT',
      'PARQUE SARAIVA',
      'PARQUE SUMARE',
      'PARQUE TAMANDARE',
      'PARQUE TARCISIO MIRANDA',
      'PARQUE TRANSMISSOR',
      'PARQUE TROPICAL',
      'PARQUE TURF CLUB',
      'PARQUE VARANDA DO VISCONDE',
      'PARQUE VERA CRUZ',
      'PARQUE VICENTE GONÇALVES DIAS',
      'PARQUE VILA MENEZES',
      'PARQUE VILA VERDE',
      'PAUS AMARELOS',
      'PECUARIA',
      'PEDRA NEGRA',
      'PENHA',
      'PERNAMBUCA',
      'PITANGUEIRA',
      'PLANICIE',
      'POÇO GORDO',
      'PONTA DA LAMA',
      'PONTA GROSSA',
      'PONTO DE COQUEIROS',
      'PONTO DO CARMO',
      'QUILOMBO',
      'QUIXABA',
      'RADIO VELHO',
      'RES. VIVENDAS DA PENHA I',
      'RES. VIVENDAS DA PENHA II',
      'RESIDENCIAL PLANICIE',
      'RETIRO',
      'RIBEIRO DO AMARO',
      'SABAO',
      'SANTA BARBARA',
      'SANTA CRUZ',
      'SANTA MARIA',
      'SANTANA',
      'SANTO AMARO DE CAMPOS',
      'SANTO EDUARDO',
      'SAO DIOGO',
      'SAO LUIS DE MUTUCA',
      'SAO ROQUE',
      'SÃO MARTINHO',
      'SÃO SEBASTIÃO',
      'SENTINELA DO IMBE',
      'SERRINHA',
      'SESMARIA',
      'SOLAR DA PENHA',
      'SUMARE',
      'TAPERA',
      'TERMINAL PESQUEIRO',
      'TERRA PROMETIDA',
      'TIRA GOSTO',
      'TOCAIA',
      'TOCOS',
      'TRAVESSAO',
      'TRES VENDAS',
      'URURAI',
      'USINA SAO JOAO',
      'USINA SANTO ANTONIO',
      'VALA DO MATO',
      'VENDA NOVA',
      'VEIGA',
      'VIANA',
      'VICENTE GONÇALVES DIAS',
      'VIEGAS',
      'VILA DO SOL',
      'VILA DOS PESCADORES',
      'VILA INDUSTRIAL',
      'VILA MANHAES',
      'VILA NOVA',
      'VILA REAL',
      'VILA ROMANA',
      'VISTA ALEGRE',
      'VIVENDAS DOS COQUEIROS',
      'VIVENDAS DOS COQUEIROS II',
      'XEXE',
      'ZUZA MOTA',
    ],
    []
  );
  const [selectedBairro, setSelectedBairro] = useState('');

  const handleBairroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBairro(e.target.value);
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Define o tipo do parâmetro
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);

    if (value.length > 3) {
      value = value.slice(0, 3) + '.' + value.slice(3);
    }
    if (value.length > 7) {
      value = value.slice(0, 7) + '.' + value.slice(7);
    }
    if (value.length > 11) {
      value = value.slice(0, 11) + '-' + value.slice(11);
    }

    setInputValue(value);
  };

  const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove não numéricos
    value = value.slice(0, 8); // Limita a 8 dígitos (DDMMAAAA)

    // Formatação
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5);
    }

    setInputDataNascimento(value);
  };

  return (
    <Flex h='100vh'>
      <SidebarHome />
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
            mb='10px'
            padding={0}
            alignItems={'center'}
          >
            ENTRAR
          </Box>

          <Input
            placeholder='Nome Completo'
            size='md'
            sx={{
              fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
              bg: 'white',
              borderRadius: '5px',
              p: '4px 0',
              mt: '0px',
              mb: '0px',
              paddingLeft: '16px',
            }}
            _placeholder={{ paddingLeft: 0 }}
          />
          <Box sx={textStyle2}></Box>
          <Input
            placeholder='E-mail'
            size='md'
            sx={{
              fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
              bg: 'white',
              borderRadius: '5px',
              p: '4px 0',
              mt: '0px',
              mb: '0px',
              paddingLeft: '16px',
            }}
            _placeholder={{ paddingLeft: 0 }}
          />
          <Box sx={textStyle2}></Box>
          <InputGroup>
            {' '}
            {/* Envolva os elementos Input e InputLeftElement */}
            <Input
              placeholder='CPF'
              value={inputValue}
              onChange={handleCpfChange}
              size='md'
              sx={{
                fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                bg: 'white',
                borderRadius: '5px',
                p: '4px 0',
                mt: '0px',
                mb: '0px',
                paddingLeft: '16px',
              }}
              _placeholder={{ paddingLeft: 0 }}
            />
            <InputLeftElement pointerEvents='none' children={' '} />
          </InputGroup>

          <Box sx={textStyle2}></Box>
          <InputGroup>
            <Input // Input para data de nascimento
              placeholder='Data de Nascimento'
              value={inputDataNascimento} //
              onChange={handleDataNascimentoChange}
              size='md'
              sx={{
                fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                bg: 'white',
                borderRadius: '5px',
                p: '4px 0',
                mt: '0px',
                mb: '0px',
                paddingLeft: '16px',
              }}
            />
            <InputLeftElement pointerEvents='none' children={' '} />
          </InputGroup>
          <Box sx={textStyle2}></Box>
          <FormControl>
            <Select
              placeholder='Selecione seu bairro'
              variant='outline'
              value={selectedBairro}
              onChange={handleBairroChange}
            >
              {bairros.map((bairro, index) => (
                <option key={index} value={bairro}>
                  {bairro}
                </option>
              ))}
            </Select>
          </FormControl>
          <Box sx={textStyle2}></Box>

          <LoadingButton isLoading={isLoading} sx={btnStyle} transform='auto'>
            CONFIRMAR
          </LoadingButton>
          <Box sx={textStyle2}></Box>
          <Box sx={textStyle3}>Já possui uma conta?</Box>
          <Link as={RouterLink} to='/' sx={textStyle4}>
            Entrar
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
  p: '0px 0',
};

const textStyle4 = {
  fontSize: ['0.6rem', '0.6rem', '0.7rem'],
  borderRadius: '2px',
  p: '2px 0',
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
export default Cadastro;

/*
  "ACAMP SEM TERRA ESTRADA LEITE",
  "ALTO DA AREIA",
  "ALTO DO ELISEU",
  "ASSENT ALELUIA",
  "ASSENT ANTONIO FARIAS",
  "ASSENT BATATAL",
  "ASSENT CAMBUCA",
  "ASSENT TERRA CONQUISTADA",
  "BABOSA",
  "BAIXA GRANDE",
  "BALANCA RANGEL",
  "BARRA DO JACARE",
  "BENTA PEREIRA",
  "BEIRA DO FAZ",
  "BEIRA DO TAI",
  "BOA VISTA",
  "BREJO GRANDE",
  "BUGALHO",
  "CABOIO",
  "CAJU",
  "CAMBAIBA",
  "CAMPELO",
  "CAMPO DE AREIA",
  "CAMPO LIMPO",
  "CAMPO NOVO",
  "CANAA",
  "CANAL DAS FLEXAS",
  "CANTAGALO",
  "CANTO DO ENGENHO",
  "CANTO DO RIO TOCOS",
  "CAPAO",
  "CARIOCA DE TOCOS",
  "CARVAO",
  "CAXETA",
  "CAXIAS DE TOCOS",
  "CAZUMBA",
  "CENTRO (OU ESPLANADA)",
  "CENTRO (OU MATADOURO)",
  "CEREJEIRA",
  "CHACARA JOAO FERREIRA",
  "CHATUBA",
  "CHAVE DO PARAISO",
  "CIPRIAO",
  "CODIN",
  "CONCEIÇAO DO IMBE",
  "COND SANTA ROSA",
  "COND SANTA ROSA 2",
  "COND CIDADE VERDE",
  "COND. DOS NOGUEIRAS",
  "CONSELHEIRO JOSINO",
  "COQUEIRO DE TOCOS",
  "CORREGO FUNDO",
  "CORRENTEZA",
  "CUPIM DE POÇO GORDO",
  "DIVISA",
  "DONANA",
  "DORES DE MACABU",
  "ESCOVA URUBU",
  "ESPINHO",
  "ESPIRITO SANTINHO",
  "ESTANCIA DA PENHA",
  "FAROL DE SAO THOME",
  "FAROLZINHO",
  "FAZENDINHA",
  "GAIVOTAS",
  "GOIABA",
  "GOITACAZES",
  "GUANDU",
  "GURIRI",
  "HORTO",
  "IBITIOCA",
  "IMBE",
  "INVASAO CIDADE LUZ",
  "ITERERE",
  "JARDIM BOA VISTA",
  "JARDIM CARIOCA",
  "JARDIM FLAMBOYANT I",
  "JARDIM FLAMBOYANT II",
  "JARDIM MARIA DE QUEIROZ",
  "JARDIM PARAISO DE TOCOS",
  "JARDIM PRIMAVERA",
  "JOAO MARIA",
  "JOCKEY CLUB",
  "JOCKEY I",
  "JOCKEY II",
  "KM 5 a 8",
  "KM 9 a 16",
  "LAGOA DAS PEDRAS",
  "LAGOA DE CIMA",
  "LAGAMAR",
  "LAPA",
  "LARGO DO GARCIA",
  "LINHA DO LIMÃO",
  "MACACO",
  "MARCELO",
  "MARRECAS",
  "MARTINS LAGE",
  "MATA DA CRUZ",
  "MATO ESCURO",
  "MATUTU",
  "MINEIROS",
  "MONTENEGRO",
  "MORADO DO ORIENTE",
  "MORANGABA",
  "MORRO DO COCO",
  "MORRO GRANDE",
  "MULACO",
  "MUNDEOS",
  "MURUNDU",
  "MUSSUREPE",
  "MUTEMA",
  "NOSSA SRA DO ROSARIO",
  "NOVA BRASILIA",
  "NOVA CANAA",
  "NOVA GOITACAZES",
  "NOVO ELDORADO",
  "NOVO JOCKEY",
  "PARQUE ALPHAVILLE",
  "PARQUE ALPHAVILLE II",
  "PARQUE ALDEIA",
  "PARQUE ALDEIA I",
  "PARQUE ALDEIA II",
  "PARQUE ANGELICA",
  "PARQUE AURORA",
  "PARQUE BARAO DO RIO BRANCO",
  "PARQUE BELA VISTA",
  "PARQUE BONSUCESSO",
  "PARQUE CALIFORNIA",
  "PARQUE CARLOS DE LACERDA",
  "PARQUE CIDADE LUZ",
  "PARQUE CONJ. SANTA MARIA",
  "PARQUE CORRIENTES",
  "PARQUE CUSTODOPOLIS",
  "PARQUE DO PRADO",
  "PARQUE DOM BOSCO",
  "PARQUE DOS RODOVIÁRIOS",
  "PARQUE DR BEDA",
  "PARQUE ELDORADO",
  "PARQUE ESPALANADA",
  "PARQUE FAZENDA GRANDE",
  "PARQUE FUNDAO",
  "PARQUE GUARUS",
  "PARQUE IMPERIAL",
  "PARQUE IPS",
  "PARQUE JD DAS ACACIAS",
  "PARQUE JD GUARUS",
  "PARQUE JARDIM AEROPORTO",
  "PARQUE JARDIM CEASA",
  "PARQUE JOAO SEIXAS",
  "PARQUE JOSE DO PATROCINIO",
  "PARQUE JULIAO NOGUEIRA",
  "PARQUE LEBRET",
  "PARQUE LEOPOLDINA",
  "PARQUE MOSTEIRO DE SAO BENTO",
  "PARQUE NAUTICO",
  "PARQUE NITEROI",
  "PARQUE NOVA CAMPOS",
  "PARQUE NOVO MUNDO",
  "PARQUE OLIVEIRA BOTELHO",
  "PARQUE PRAZERES",
  "PARQUE PRESIDENTE VARGAS",
  "PARQUE REAL",
  "PARQUE RESIDENCIAL DA LAPA II",
  "PARQUE RES PORTO SEGURO",
  "PARQUE RES SANTO ANTONIO",
  "PARQUE RIACHUELO",
  "PARQUE ROSARIO",
  "PARQUE RUI BARBOSA",
  "PARQUE SALO BRAND",
  "PARQUE SANTA CLARA",
  "PARQUE SANTA HELENA",
  "PARQUE SANTA ROSA",
  "PARQUE SANTO AMARO",
  "PARQUE SANTO ANTONIO",
  "PARQUE SAO BENEDITO",
  "PARQUE SAO CAETANO",
  "PARQUE SAO DOMINGOS",
  "PARQUE SAO JOSE",
  "PARQUE SAO LINO",
  "PARQUE SAO MATHEUS",
  "PARQUE SAO SILVESTRE",
  "PARQUE SÃO SILVANO",
  "PARQUE SANTOS DUMONT",
  "PARQUE SARAIVA",
  "PARQUE SUMARE",
  "PARQUE TAMANDARE",
  "PARQUE TARCISIO MIRANDA",
  "PARQUE TRANSMISSOR",
  "PARQUE TROPICAL",
  "PARQUE TURF CLUB",
  "PARQUE VARANDA DO VISCONDE",
  "PARQUE VERA CRUZ",
  "PARQUE VICENTE GONÇALVES DIAS",
  "PARQUE VILA MENEZES",
  "PARQUE VILA VERDE",
  "PAUS AMARELOS",
  "PECUARIA",
  "PEDRA NEGRA",
  "PENHA",
  "PERNAMBUCA",
  "PITANGUEIRA",
  "PLANICIE",
  "POÇO GORDO",
  "PONTA DA LAMA",
  "PONTA GROSSA",
  "PONTO DE COQUEIROS",
  "PONTO DO CARMO",
  "QUILOMBO",
  "QUIXABA",
  "RADIO VELHO",
  "RES. VIVENDAS DA PENHA I",
  "RES. VIVENDAS DA PENHA II",
  "RESIDENCIAL PLANICIE",
  "RETIRO",
  "RIBEIRO DO AMARO",
  "SABAO",
  "SANTA BARBARA",
  "SANTA CRUZ",
  "SANTA MARIA",
  "SANTANA",
  "SANTO AMARO DE CAMPOS",
  "SANTO EDUARDO",
  "SAO DIOGO",
  "SAO LUIS DE MUTUCA",
  "SAO ROQUE",
  "SÃO MARTINHO",
  "SÃO SEBASTIÃO",
  "SENTINELA DO IMBE",
  "SERRINHA",
  "SESMARIA",
  "SOLAR DA PENHA",
  "SUMARE",
  "TAPERA",
  "TERMINAL PESQUEIRO",
  "TERRA PROMETIDA",
  "TIRA GOSTO",
  "TOCAIA",
  "TOCOS",
  "TRAVESSAO",
  "TRES VENDAS",
  "URURAI",
  "USINA SAO JOAO",
  "USINA SANTO ANTONIO",
  "VALA DO MATO",
  "VENDA NOVA",
  "VEIGA",
  "VIANA",
  "VICENTE GONÇALVES DIAS",
  "VIEGAS",
  "VILA DO SOL",
  "VILA DOS PESCADORES",
  "VILA INDUSTRIAL",
  "VILA MANHAES",
  "VILA NOVA",
  "VILA REAL",
  "VILA ROMANA",
  "VISTA ALEGRE",
  "VIVENDAS DOS COQUEIROS",
  "VIVENDAS DOS COQUEIROS II",
  "XEXE",
  "ZUZA MOTA"
*/

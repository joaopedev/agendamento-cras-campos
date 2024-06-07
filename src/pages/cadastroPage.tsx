import React from "react";
import {
  Flex,
  Stack,
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useToast,
} from "@chakra-ui/react"; // Importando componentes do Chakra UI
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import SidebarLogin from "../components/SidebarLogin";
import { FooterLogin } from "../components/FooterLogin";
import { RegisterUser } from "../types/auth-data";
import { useAuth } from "../hook/useAuth";
import { RegisterUserSchema } from "../validation/auth";
import { TipoUsuario, Cras } from "../interface/User";

export const Cadastro: React.FC = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUser>({ resolver: yupResolver(RegisterUserSchema) });

  const handleRegister = async (data: RegisterUser) => {
    try {
      await registerUser(data);
      toast({
        title: "Usuário cadastrado com sucesso",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <Flex h="100vh">
      <SidebarLogin />
      <Stack
        pb={["130px", "0", "0", "0"]}
        pt={["60px", "0", "0", "0"]}
        m="auto"
        paddingLeft={["0", "45%", "50%", "50%"]}
        gap={["20px", "20px", "30px", "30px"]}
        w={["60%", "60%", "60%", "80%"]}
        alignItems="center"
      >
        <Box
          w={"500px"}
          sx={boxStyle}
          maxW={["500px", "500px", "500px", "950px"]}
          position={["relative", "static", "static", "static"]}
        >
          <Box
            fontSize={["20px", "25px", "30px", "30px"]}
            fontWeight="bold"
            mb="10px"
            padding={0}
            alignItems={"center"}
          >
            CADASTRAR
          </Box>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome completo</FormLabel>
              <InputGroup>
                {" "}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id="name"
                  placeholder="Nome completo"
                  size="md"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("name")}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.cpf}>
              <FormLabel htmlFor="cpf">CPF</FormLabel>
              <InputGroup>
                {" "}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id="cpf"
                  placeholder="CPF"
                  size="md"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("cpf")}
                  _placeholder={{ paddingLeft: 0 }}
                  // value={inputValue}
                  // onChange={handleCpfChange}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.cpf && errors.cpf.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.dataNascimento}>
              <FormLabel htmlFor="data-de-nascimento">
                Data de nascimento
              </FormLabel>
              <InputGroup>
                <Input // Input para data de nascimento
                  id="data-de-nascimento"
                  placeholder="Data de Nascimento"
                  // value={inputDataNascimento} //
                  // onChange={handleDataNascimentoChange}
                  size="md"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("dataNascimento")}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.dataNascimento && errors.dataNascimento.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.telefone}>
              <FormLabel htmlFor="telefone">Celular</FormLabel>
              <InputGroup>
                {" "}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id="telefone"
                  placeholder="(99) 90000-00000"
                  size="md"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("telefone")}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.telefone && errors.telefone.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                {" "}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id="email"
                  placeholder="Email"
                  size="md"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("email")}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.endereco?.rua}>
              <FormLabel htmlFor="rua">Rua</FormLabel>
              <InputGroup>
                {" "}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id="rua"
                  placeholder="Rua"
                  size="md"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("endereco.rua")}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.endereco?.rua && errors.endereco?.rua.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.endereco?.numero}>
              <FormLabel htmlFor="numero">Número</FormLabel>
              <InputGroup>
                {" "}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id="numero"
                  placeholder="Número"
                  size="md"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("endereco.numero")}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.endereco?.numero && errors.endereco?.numero.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.endereco?.bairro}>
              <FormLabel htmlFor="bairro">Bairro</FormLabel>
              <InputGroup>
                {" "}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id="bairro"
                  placeholder="Bairro"
                  size="md"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("endereco.bairro")}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.endereco?.bairro && errors.endereco?.bairro.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <InputGroup>
                {" "}
                {/* Envolva os elementos Input e InputLeftElement */}
                <Input
                  id="password"
                  placeholder="Senha"
                  size="md"
                  type="password"
                  sx={{
                    fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
                    bg: "white",
                    borderRadius: "5px",
                    p: "4px 0",
                    mt: "0px",
                    mb: "0px",
                    paddingLeft: "16px",
                  }}
                  {...register("password")}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents="none" children={" "} />
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <Controller
              control={control}
              name="tipoUsuario"
              render={({ field }) => (
                <FormControl isInvalid={!!errors.tipoUsuario}>
                  <FormLabel htmlFor="tipoUsuario">Tipo de Usuário</FormLabel>
                  <Select
                    id="tipoUsuario"
                    variant="outline"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <option value={TipoUsuario.comum}>Comum</option>
                    <option value={TipoUsuario.admin}>Admin</option>
                    <option value={TipoUsuario.superAmin}>Super Admin</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.tipoUsuario && errors.tipoUsuario.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="cras"
              render={({ field }) => (
                <FormControl isInvalid={!!errors.cras}>
                  <FormLabel htmlFor="cras">Cras</FormLabel>
                  <Select
                    id="cras"
                    variant="outline"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <option value={Cras.CODIN}>CODIN</option>
                    <option value={Cras.CUSTODÓPOLIS}>CUSTODÓPOLIS</option>
                    <option value={Cras.JARDIM_CARIOCA}>PENHA</option>
                    <option value={Cras.PARQUE_ESPLANADA}>CODIN</option>
                    <option value={Cras.CHATUBA}>CUSTODÓPOLIS</option>
                    <option value={Cras.MATADOURO}>PENHA</option>
                    <option value={Cras.PENHA}>CODIN</option>
                    <option value={Cras.CUSTODÓPOLIS}>CUSTODÓPOLIS</option>
                    <option value={Cras.PARQUE_GUARU}>PENHA</option>
                    <option value={Cras.TRAVESSAO}>CUSTODÓPOLIS</option>
                    <option value={Cras.MORRO_DO_COCO}>PENHA</option>
                    <option value={Cras.TAPERA}>CUSTODÓPOLIS</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.cras && errors.cras.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Button
              type="submit"
              style={{ backgroundColor: "#2CA1FF" }}
              variant="solid"
              isLoading={isSubmitting}
            >
              Cadastrar
            </Button>
          </form>
          <Box sx={textStyle2}></Box>
          {/* <NavLink to="/home">
            <LoadingButton isLoading={isLoading} sx={btnStyle} transform="auto">
              CONFIRMAR
            </LoadingButton>
          </NavLink> */}
          <Box sx={textStyle3}>Já possui uma conta?</Box>
          {/* <Link as={RouterLink} to="/" sx={textStyle4}>
            Entrar
          </Link> */}
        </Box>
      </Stack>
      <FooterLogin />
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
  fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
  fontWeight: "bold",
  mt: "10px",
  mb: "3px",
};

const textStyle3 = {
  fontSize: ["0.6rem", "0.6rem", "0.7rem"],
  borderRadius: "5px",
  p: "0px 0",
};

// const textStyle4 = {
//   fontSize: ["0.6rem", "0.6rem", "0.7rem"],
//   borderRadius: "2px",
//   p: "2px 0",
//   textDecoration: "underline",
// };

export const boxStyle = {
  // w: '30%',
  maxW: ["300px", "250px", "350px", "450px"],
  minW: "250px",
  boxShadow: "2px 2px 5px hsla(0, 28%, 0%, 0.5)",
  p: ["10px", "10px", "10px", "10px"],
  borderRadius: "25px",
  bg: "#F4F4F4",
  textAlign: "center",
  alignContent: "center",
};
export const btnStyle = {
  w: "30%",
  display: "-ms-grid",
  boxShadow: "1px 1px 2px hsla(0, 28%, 0%, 0.7)",
  color: "#fff",
  bg: "#2CA1FF",
  maxW: "500px",
  minW: ["100px", "100px", "150px", "150px"],
  fontSize: ["0.7rem", "0.8rem", "0.9rem", "1rem"],
  _hover: {
    bg: "#1C75BC",
    fontWeight: "bold",
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

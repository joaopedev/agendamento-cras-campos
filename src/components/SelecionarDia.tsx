import { useContext, useEffect, useState, useMemo, useRef } from 'react';
import {
  Button,
  Box,
  Flex,
  Text,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Divider,
} from '@chakra-ui/react';
import DatePicker, {
  CalendarContainer,
  registerLocale,
} from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays, getDay, isAfter, isValid, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { AuthContext } from '../context/AuthContext';
import {
  ISchedulingModel,
  ISchedulingResponse,
} from '../interface/Schedulling';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  BloqueioAgendamentoModel,
  RegisterSchedullingModel,
} from '../types/auth-data';
import { btnStyle } from '../pages/loginPage';
import BoxHorario from './BoxHorario';
import { Cras } from '../interface/User';

// Define o locale para o DatePicker
registerLocale('pt-BR', ptBR);

// Definimos o fuso horário de Brasília
const timeZone = 'America/Sao_Paulo';

const SelecionarDia: React.FC = () => {
  /* 
    Verificamos se hoje é sexta-feira (getDay() === 5) e 
    se o horário está entre 9:00 e 23:59 (currentHour >= 9 && currentHour < 24).
    Só assim o usuário do tipo 1 pode agendar (salvo se já tiver agendamento futuro).
  */

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //     // Mock dates para teste
  // const mockDate = new Date('2025-01-11T10:00:00');
  // const currentTime = toZonedTime(mockDate, timeZone);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const currentTime = toZonedTime(new Date(), timeZone);
  const currentHour = currentTime.getHours();
  const isFriday = currentTime.getDay() === 5;
  const canUser1ScheduleNow = isFriday && currentHour >= 9 && currentHour < 24;

  // useRef para saber se o usuário do tipo 1 já tem um agendamento futuro não realizado
  const userHasFutureSchedulingRef = useRef(false);

  const [showForm, setShowForm] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [, setAgendamentoRealizado] = useState(false);

  // Importa variáveis e funções do AuthContext
  const {
    payload,
    getSchedullingBlock,
    registerSchedulling,
    getAllSchedullingCras,
    getByCpf,
    cpfData,
    getAllUsers,
  } = useContext(AuthContext);

  /* 
    Se o usuário for do tipo 1, definimos como data selecionada inicial (tomando o dia atual + 1).
    Caso seja tipo 2 ou 3, também começa em (dia atual + 1). 
    É apenas um padrão de start do calendário.
  */
  const [selectedDate, setSelectedDate] = useState<Date>(
    payload?.tipo_usuario === 1
      ? addDays(new Date(), 1)
      : addDays(new Date(), 1)
  );

  // Chakra UI para modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Estado local para armazenar agendamentos, usuários, bloqueios, etc.
  const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cpf, setCpf] = useState<string>('');
  const isMounted = useRef(true);
  const toast = useToast();
  const [funcionariosPorCras, setFuncionariosPorCras] = useState<number>();
  const [diasBloqueados, setDiasBloqueados] = useState<
    BloqueioAgendamentoModel[]
  >([]);

  // Para comparação de datas (limite de agendamento)
  const hoje = new Date();
  const maxDate =
    payload?.tipo_usuario === 1
      ? addDays(new Date(), 7)
      : addDays(new Date(), 600);

  /* 
    Verificamos se o usuário do tipo 1 tem algum agendamento futuro (status = 2 e data > hoje).
    Se tiver, userHasFutureSchedulingRef.current = true
  */
  const agendamentosFuturos = schedullingData.filter(agendamento => {
    if (typeof agendamento.data_hora === 'string' && agendamento.status === 2) {
      const dataAgendamento = toZonedTime(
        parseISO(agendamento.data_hora),
        timeZone
      );
      return (
        isValid(dataAgendamento) &&
        agendamento.usuario_id === payload?.id &&
        isAfter(dataAgendamento, hoje)
      );
    }
    return false;
  });
  userHasFutureSchedulingRef.current = agendamentosFuturos?.length > 0;

  /* 
    Se for usuário tipo 1:
      - Ou já tem agendamento futuro
      - Ou está dentro da janela de sexta entre 9h e 23:59
    Então mostra a tela de agendamento.
  */
  const showSchedulerForUser1 =
    userHasFutureSchedulingRef.current || canUser1ScheduleNow;

  // Para usuários tipo 2/3, sempre exibe (true). Para tipo 1, vemos a bool acima.
  const canShowScheduler =
    payload?.tipo_usuario === 1 ? showSchedulerForUser1 : true;

  // Cor do background no calendário, baseada no tipo de usuário
  const bgColor =
    payload?.tipo_usuario !== 1
      ? 'hsla(207, 74%, 42%, 1)'
      : 'hsla(145, 100%, 29%, 1)';

  // Busca os dias bloqueados do DB
  useEffect(() => {
    const fetchBlockDays = async () => {
      try {
        const data = await getSchedullingBlock();
        setDiasBloqueados(data.contas);
      } catch (error) {
        console.error('Erro ao buscar dias bloqueados:', error);
      }
    };
    fetchBlockDays();
  }, [getSchedullingBlock]);

  // Busca todos os usuários (para saber quantos funcionários do tipo 2 tem em cada CRAS)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        // Filtra pelo tipo_usuario = 2 (funcionário) e compara o CRAS
        setFuncionariosPorCras(
          data.contas
            .filter((c: any) => c.tipo_usuario === 2)
            .filter((c: any) => c.cras === payload?.cras).length
        );
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    fetchUsers();
  }, [getAllUsers, payload]);

  /* 
    Caso selecione sábado (6) ou domingo (0), automaticamente pula para a segunda-feira (ou pro próximo dia útil). 
    Isso impede o usuário de escolher fins de semana.
  */
  const getSelectedDay = () => {
    if (getDay(selectedDate) === 6) {
      setSelectedDate(addDays(selectedDate, 2));
      return;
    }
    if (getDay(selectedDate) === 0) {
      setSelectedDate(addDays(selectedDate, 1));
      return;
    }
  };
  getSelectedDay();

  // Busca usuário pelo CPF
  const handleGetByCpf = async () => {
    try {
      await getByCpf(cpf.replace(/\D/g, ''));
    } catch (error) {
      toast({
        title: 'Erro ao buscar usuário',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  // Configuração do form (react-hook-form)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchedullingModel>();

  // Formata o CPF dinamicamente enquanto digita
  const handleChange = (event: any) => {
    formatarCPF(event.target.value);
    setError('');
  };
  function formatarCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    return setCpf(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'));
  }

  // Submit do agendamento
  const onSubmit: SubmitHandler<RegisterSchedullingModel> = async data => {
    try {
      const adjustedDate = toZonedTime(new Date(data.data_hora), timeZone);
      await registerSchedulling({ ...data, data_hora: String(adjustedDate) });
      setAgendamentoRealizado(true);
      toast({
        title: 'Agendamento realizado com sucesso',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        variant: 'custom-success',
      });
      // Recarrega a página depois de 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast({
        title:
          'Este horário não está mais disponível, por favor escolha outro horário.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      // Recarrega também após 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  // Converte string de hora ("HH:mm") para minutos (ex: "08:00" => 480)
  const horaParaMinutos = (horaString: string): number => {
    const [horas, minutos] = horaString.split(':').map(Number);
    return horas * 60 + minutos;
  };

  // Faz a busca dos agendamentos no CRAS do usuário (payload.cras)
  useEffect(() => {
    isMounted.current = true;
    const fetchSchedullingData = async () => {
      if (payload?.cras) {
        try {
          setLoading(true);
          const response: ISchedulingResponse = await getAllSchedullingCras(
            payload.cras
          );
          if (isMounted.current) {
            setSchedullingData(response.agendamentos);
          }
        } catch (error) {
          if (isMounted.current) {
            console.error('Failed to fetch data', error);
          }
        } finally {
          if (isMounted.current) {
            setLoading(false);
          }
        }
      }
    };
    fetchSchedullingData();
    return () => {
      isMounted.current = false;
    };
  }, [payload?.cras, getAllSchedullingCras]);

  // Se encontrar dados via CPF, preenche no form
  useEffect(() => {
    if (cpfData) {
      setValue('name', cpfData?.name);
      setValue('cras', cpfData?.cras);
      setValue('usuario_id', cpfData?.id);
    }
  }, [cpfData, setValue]);

  // Lista base de horários
  const horarios = useMemo(() => {
    let baseHorarios = [
      { hora: '08:00', disponivel: true },
      // { hora: '09:00', disponivel: true },
      // { hora: '10:00', disponivel: true },
      // { hora: '11:00', disponivel: true },
      // { hora: '13:00', disponivel: true },
      // { hora: '14:00', disponivel: true },
    ];
    /* 
      Exemplo de restrições específicas por CRAS:
      - CRAS 5: limitamos até 14:30 todos os dias
      - CRAS 6: limitamos até 14:30 somente na sexta
    */
    if (payload?.cras === 5) {
      baseHorarios = baseHorarios.filter(
        horario => horaParaMinutos(horario.hora) <= horaParaMinutos('14:30')
      );
    } else if (payload?.cras === 6) {
      if (selectedDate && selectedDate.getDay() === 5) {
        baseHorarios = baseHorarios.filter(
          horario => horaParaMinutos(horario.hora) <= horaParaMinutos('14:30')
        );
      }
    }
    return baseHorarios;
  }, [payload?.cras, selectedDate]);

  // Filtra horários disponíveis, removendo os já agendados ou bloqueados
  const horariosDisponiveis = useMemo(() => {
    return horarios
      .filter(horario => {
        if (selectedDate) {
          const dataSelecionadaFormatada = format(selectedDate, 'yyyy-MM-dd');

          // Pega todos os horários agendados naquele dia (status=2)
          const horariosAgendados = schedullingData
            .filter(ag => ag?.status === 2)
            .filter(
              ag =>
                format(
                  toZonedTime(new Date(ag.data_hora), timeZone),
                  'yyyy-MM-dd'
                ) === dataSelecionadaFormatada
            )
            .map(ag => format(new Date(ag.data_hora), 'HH:mm'));

          // Conta quantos registros existem para aquele horário específico
          const countAgendados = horariosAgendados.filter(
            h => h === horario.hora
          ).length;

          // Checa se a data está bloqueada (tipo_bloqueio: diario, matutino, vespertino)
          const bloqueados = diasBloqueados
            .filter(
              bloq =>
                format(
                  toZonedTime(
                    parseISO(bloq.data as unknown as string),
                    timeZone
                  ),
                  'yyyy-MM-dd'
                ) === dataSelecionadaFormatada
            )
            .filter(h => h.cras === payload?.cras);

          const isBlocked = bloqueados.some(bloqueio => {
            if (bloqueio.tipo_bloqueio === 'diario') {
              return true;
            }
            if (
              bloqueio.tipo_bloqueio === 'matutino' &&
              horaParaMinutos(horario.hora) < 780
            ) {
              return true;
            }
            if (
              bloqueio.tipo_bloqueio === 'vespertino' &&
              horaParaMinutos(horario.hora) >= 780
            ) {
              return true;
            }
            return false;
          });

          /* 
            Só retorna 'disponível' se: 
            (quantidade agendada naquele horário < quantidade de funcionários) 
            e não é um horário 'bloqueado' 
          */
          return countAgendados < Number(funcionariosPorCras) && !isBlocked;
        }
        return false;
      })
      .map(horario => ({ ...horario, disponivel: true }));
  }, [
    horarios,
    selectedDate,
    schedullingData,
    funcionariosPorCras,
    diasBloqueados,
  ]);

  // Quando muda a data no calendário
  const handleDateChange = (date: Date) => {
    // Se já tinha um horário selecionado, setamos no novo date
    if (date && horarioSelecionado) {
      const minutos = horaParaMinutos(horarioSelecionado);
      date.setHours(Math.floor(minutos / 60));
      date.setMinutes(minutos % 60);
    }
    setSelectedDate(date);
    setAgendamentoRealizado(false);
  };

  // Se for tipo 1 e não pode mostrar o scheduler (fora da janela), mostra a mensagem de bloqueio
  if (!canShowScheduler && payload?.tipo_usuario === 1) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh' p={4}>
        <Box
          p={4}
          borderWidth='1px'
          borderRadius='md'
          bg='gray.100'
          textAlign='center'
          maxW='600px'
        >
          <Text fontWeight='bold' fontSize='xl' mb={2}>
            Agendamentos são realizados todas sextas-feiras a partir das 09:00
          </Text>
          <Text>
            Por favor, volte a acessar na próxima sexta-feira no horário entre
            09:00 e 23:59 para realizar o agendamento.
          </Text>
        </Box>
      </Flex>
    );
  }

  // Só mostra a tela de "selecionar dia" se o user tipo 1 ainda não tiver agendamento futuro
  // ou se o user for do tipo 2/3 (pois nesses sempre mostra).
  const showSelecionarDia = !userHasFutureSchedulingRef.current;

  // Render
  return (
    <>
      {(showSelecionarDia ||
        payload?.tipo_usuario === 3 ||
        payload?.tipo_usuario === 2) && (
        <Flex
          className='container__date'
          justifyContent='center'
          alignItems='center'
          gap='10px'
          pl={['0%', '30%', '25%', '20%']}
          w='100%'
          flexDir='column'
        >
          {selectedDate && (
            <Box
              className='box__cinza'
              boxShadow='2px 2px 5px hsla(0, 28%, 0%, 0.5)'
              textAlign='center'
              p={[2, 3, 4, 4]}
              borderWidth='1px'
              display={selectedDate ? 'block' : 'none'}
              borderRadius='md'
              bg='#F4F4F4'
              h='fit-content'
              alignSelf='center'
              w='80%'
            >
              <Text fontWeight='bold' fontSize={['xl', 'xl', '2xl', '3xl']}>
                AGENDAR ATENDIMENTO
              </Text>
              <Divider my={2} />
              <Flex gap={2} flexDirection='column'>
                <Box
                  flexDir={['column', 'column', 'row', 'row']}
                  mx='auto'
                  className='box__dia'
                  alignItems='center'
                  display='flex'
                  columnGap={2}
                >
                  <Text
                    fontWeight='bold'
                    fontSize={['12px', '12px', '15px', '15px']}
                  >
                    DIA SELECIONADO:
                  </Text>
                  <Box
                    alignItems='center'
                    w='min-content'
                    borderRadius={5}
                    border='1px solid #999'
                    p='1px'
                  >
                    <DatePicker
                      dateFormat='dd/MM/yyyy'
                      locale='pt-BR'
                      selected={selectedDate}
                      filterDate={date =>
                        date.getDay() !== 0 &&
                        date.getDay() !== 6 &&
                        date <= maxDate
                      }
                      onSelect={handleDateChange}
                      onChange={(date: Date) => setSelectedDate(date)}
                      minDate={addDays(new Date(), 1)}
                      className='customInput'
                      calendarContainer={({ className, children }) => (
                        <Box
                          style={{
                            borderRadius: '10px',
                            padding: '16px',
                            background: bgColor,
                            color: '#fff',
                            boxShadow: '1px 1px 10px hsla(0, 28%, 0%, 0.4)',
                          }}
                        >
                          <CalendarContainer className={className}>
                            <Text
                              style={{
                                background: bgColor,
                                padding: '4px',
                                color: 'white',
                              }}
                            >
                              Selecione um dia
                            </Text>
                            <Text style={{ position: 'relative' }}>
                              {children}
                            </Text>
                          </CalendarContainer>
                        </Box>
                      )}
                    />
                  </Box>
                </Box>
                <Divider my={1} />
                <Box className='box__esquerda' flex={1}>
                  {/* 
                    Se for sexta entre 9h e 23:59 mas não existirem horários disponíveis, 
                    mostra uma mensagem específica informando que não há horários.
                  */}
                  {isFriday &&
                  currentHour >= 9 &&
                  currentHour < 24 &&
                  horariosDisponiveis.length === 0 ? (
                    <Text
                      pb={1}
                      fontSize={['24px', '24px', '30px', '30px']}
                      fontWeight='bold'
                      color='red.500'
                    >
                      Não há <br /> horários disponíveis <br /> para este dia.
                    </Text>
                  ) : horariosDisponiveis.length > 0 ? (
                    <>
                      <Text
                        pb={1}
                        fontSize={['12px', '12px', '15px', '15px']}
                        fontWeight='bold'
                      >
                        HORÁRIOS DISPONÍVEIS
                      </Text>
                      <SimpleGrid columns={[2, null, 5]} spacing='1'>
                        {horariosDisponiveis.map(horario => (
                          <BoxHorario
                            key={horario.hora}
                            horario={horario}
                            selectedDate={selectedDate}
                            onHorarioSelect={(date: Date) => {
                              setSelectedDate(date);
                              setHorarioSelecionado(horario.hora);
                              onOpen();
                              /* 
                                Se for user tipo 1, exibimos também o formulário
                                para confirmar dados e escolher opção de serviço 
                              */
                              payload?.tipo_usuario === 1 && setShowForm(true);
                            }}
                            setValue={setValue}
                          />
                        ))}
                      </SimpleGrid>
                    </>
                  ) : (
                    /* Mensagem padrão para dia sem horários */
                    <Text
                      pb={1}
                      fontSize={['24px', '24px', '30px', '30px']}
                      fontWeight='bold'
                      color='red.500'
                    >
                      Não há horários disponíveis para esse dia. <br />
                      Utilize o calendário e acesse o próximo dia disponível
                      para verificar disponibilidade de vagas.
                    </Text>
                  )}

                  {/* Modal de confirmação e formulário de cadastro/atualização */}
                  <Modal
                    isOpen={isOpen}
                    onClose={() => {
                      onClose();
                      setShowForm(false);
                      setShowConfirmar(false);
                    }}
                    isCentered
                    size={['xs', 'sm', 'md', 'lg']}
                  >
                    <ModalOverlay />
                    <ModalContent
                      minW={['90%', '27em', '30em', '48em']}
                      textAlign='center'
                    >
                      <ModalCloseButton />
                      <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          {/* Caso user não seja tipo 1, exibe busca de CPF */}
                          {payload?.tipo_usuario !== 1 && (
                            <Flex flexDir='column' mt={4} gap={4}>
                              <Flex
                                p={0}
                                w='100%'
                                alignItems='center'
                                flexDir='column'
                                gap={2}
                              >
                                <ModalHeader fontWeight='bold'>
                                  Buscar usuário pelo CPF
                                </ModalHeader>
                                <Flex gap={1} w='80%'>
                                  <Input
                                    value={cpf}
                                    type='text'
                                    onChange={handleChange}
                                    placeholder='Digite o CPF'
                                  />
                                  <Button
                                    sx={{
                                      maxW: 'max-content',
                                      boxShadow:
                                        '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
                                      color: '#fff',
                                      bg: '#016234',
                                      minW: ['80px', '80px', '90px', '100px'],
                                      fontSize: [
                                        '0.8rem',
                                        '0.8rem',
                                        '0.9rem',
                                        '1rem',
                                      ],
                                      _hover: {
                                        bg: '#00963f',
                                        fontWeight: 'bold',
                                      },
                                    }}
                                    onClick={() => {
                                      if (cpf?.length !== 14) {
                                        setError(
                                          'O CPF deve conter exatamente 11 números.'
                                        );
                                      } else {
                                        handleGetByCpf();
                                        setShowForm(true);
                                      }
                                    }}
                                  >
                                    Buscar
                                  </Button>
                                </Flex>
                              </Flex>
                              {error && (
                                <Text fontSize={12} color='red.500'>
                                  {error}
                                </Text>
                              )}
                              {cpfData && (
                                <Box
                                  p={4}
                                  borderWidth='1px'
                                  borderRadius='md'
                                  bg='gray.100'
                                >
                                  <Text>
                                    <strong>Nome:</strong> {cpfData.name}
                                  </Text>
                                  <Text>
                                    <strong>CRAS:</strong> {Cras[cpfData.cras]}
                                  </Text>
                                </Box>
                              )}
                            </Flex>
                          )}

                          {/* Se showForm estiver true, exibe as opções e o step final de confirmação */}
                          {showForm && (
                            <>
                              <ModalHeader fontWeight='bold'>
                                Selecione uma opção para continuar:
                              </ModalHeader>
                              <Flex flexDir='column' alignItems='center'>
                                <FormControl isInvalid={!!errors.servico}>
                                  <RadioGroup
                                    onChange={value => {
                                      setSelectedOption(value as string);
                                      setShowConfirmar(true);
                                    }}
                                  >
                                    <Stack
                                      direction='row'
                                      justifyContent='space-around'
                                    >
                                      <Radio
                                        {...register('servico')}
                                        id='cadastramento'
                                        value='1'
                                        isChecked={selectedOption === '1'}
                                      >
                                        Inclusão no CadÚnico
                                      </Radio>
                                      <Radio
                                        {...register('servico')}
                                        id='atualizacao'
                                        value='2'
                                        isChecked={selectedOption === '2'}
                                      >
                                        Atualização do CadÚnico
                                      </Radio>
                                    </Stack>
                                  </RadioGroup>
                                  {payload?.tipo_usuario === 1 &&
                                    showConfirmar && (
                                      <ModalFooter justifyContent='center'>
                                        <Text>
                                          Deseja confirmar o seu agendamento
                                          para o dia{' '}
                                          <strong>
                                            {selectedDate &&
                                              format(
                                                selectedDate,
                                                'dd/MM/yyyy'
                                              )}
                                          </strong>{' '}
                                          às{' '}
                                          <strong>{horarioSelecionado}</strong>{' '}
                                          no{' '}
                                          {payload && (
                                            <strong>
                                              CRAS - {Cras[payload.cras]}?
                                            </strong>
                                          )}
                                        </Text>
                                      </ModalFooter>
                                    )}
                                </FormControl>

                                {/* Inputs escondidos para enviar via form */}
                                <Box display='none'>
                                  <FormControl isInvalid={!!errors.name}>
                                    <FormLabel htmlFor='name'>Nome</FormLabel>
                                    <Input
                                      id='name'
                                      {...register('name')}
                                      defaultValue={
                                        payload?.tipo_usuario === 1
                                          ? payload?.name
                                          : cpfData?.name
                                      }
                                    />
                                  </FormControl>
                                  <FormControl isInvalid={!!errors.data_hora}>
                                    <FormLabel htmlFor='data_hora'>
                                      Data e Hora
                                    </FormLabel>
                                    <Input
                                      id='data_hora'
                                      defaultValue={
                                        selectedDate
                                          ? format(
                                              selectedDate,
                                              'yyyy-MM-dd HH:mm'
                                            )
                                          : ''
                                      }
                                      {...register('data_hora')}
                                      readOnly
                                    />
                                  </FormControl>
                                  <FormControl isInvalid={!!errors.cras}>
                                    <FormLabel htmlFor='cras'>Cras</FormLabel>
                                    <Input
                                      id='cras'
                                      {...register('cras')}
                                      defaultValue={
                                        payload?.tipo_usuario === 1
                                          ? payload?.cras
                                          : cpfData?.cras
                                      }
                                    />
                                  </FormControl>
                                  <FormControl isInvalid={!!errors.status}>
                                    <FormLabel htmlFor='status'>
                                      Status
                                    </FormLabel>
                                    <Input
                                      id='status'
                                      {...register('status')}
                                      defaultValue={2}
                                    />
                                  </FormControl>
                                  <FormControl isInvalid={!!errors.usuario_id}>
                                    <FormLabel htmlFor='usuario_id'>
                                      Usuário ID
                                    </FormLabel>
                                    <Input
                                      id='usuario_id'
                                      {...register('usuario_id')}
                                      defaultValue={
                                        payload?.tipo_usuario === 1
                                          ? payload?.id
                                          : cpfData?.id
                                      }
                                    />
                                  </FormControl>
                                </Box>
                              </Flex>
                            </>
                          )}
                          <ModalFooter justifyContent='center'>
                            <Button
                              minW={['100px', '100px', '150px', '150px']}
                              boxShadow='1px 1px 2px hsla(0, 28%, 0%, 0.7)'
                              fontSize={['0.8rem', '0.8rem', '0.9rem', '1rem']}
                              colorScheme='red'
                              variant='solid'
                              mr={3}
                              onClick={onClose}
                            >
                              Cancelar
                            </Button>
                            {showConfirmar && (
                              <Button
                                onClick={() => {
                                  onClose();
                                  setShowForm(false);
                                  setShowConfirmar(false);
                                }}
                                sx={btnStyle}
                                type='submit'
                              >
                                Confirmar
                              </Button>
                            )}
                          </ModalFooter>
                        </form>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Box>
              </Flex>
            </Box>
          )}
        </Flex>
      )}
    </>
  );
};

export default SelecionarDia;

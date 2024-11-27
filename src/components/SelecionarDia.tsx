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
import { toZonedTime } from 'date-fns-tz'; // Importamos as funções necessárias
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

registerLocale('pt-BR', ptBR);

const timeZone = 'America/Sao_Paulo'; // Definimos o fuso horário de Brasília

const SelecionarDia: React.FC = () => {
  // Testing variables
  // const isTestMode = true; // Toggle this for testing
  // const testHour = 8; // Set the hour you want to test (0-23)
  const currentTime = toZonedTime(new Date(), timeZone);
  const currentHour = currentTime.getHours();
  // const isBeforeNineAm = currentHour < 9;
  const isBetween9pmAnd9am = currentHour >= 21 || currentHour < 9;
  const [showForm, setShowForm] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [, setAgendamentoRealizado] = useState(false);
  const {
    payload,
    getSchedullingBlock,
    registerSchedulling,
    getAllSchedullingCras,
    getByCpf,
    cpfData,
    getAllUsers,
  } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState<Date>(
    payload?.tipo_usuario === 1
      ? addDays(new Date(), 1)
      : addDays(new Date(), 1)
  );
  console.log(selectedDate);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  const hoje = new Date();
  const maxDate =
    payload?.tipo_usuario === 1
      ? addDays(new Date(), 14)
      : addDays(new Date(), 600);

  const agendamentosFuturos = schedullingData.filter(agendamento => {
    if (typeof agendamento.data_hora === 'string' && agendamento.status === 2) {
      const dataAgendamento = toZonedTime(
        parseISO(agendamento.data_hora),
        timeZone
      ); // Ajuste de fuso horário
      return (
        isValid(dataAgendamento) &&
        agendamento.usuario_id === payload?.id &&
        isAfter(dataAgendamento, hoje)
      );
    }
    return false;
  });
  const showSelecionarDia = !(agendamentosFuturos?.length > 0);

  const bgColor =
    payload?.tipo_usuario !== 1
      ? 'hsla(207, 74%, 42%, 1)'
      : 'hsla(145, 100%, 29%, 1)';

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchedullingModel>();
  const handleChange = (event: any) => {
    formatarCPF(event.target.value);
    setError('');
  };
  function formatarCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    return setCpf(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'));
  }

  const onSubmit: SubmitHandler<RegisterSchedullingModel> = async (
    data: RegisterSchedullingModel
  ) => {
    try {
      const adjustedDate = toZonedTime(new Date(data.data_hora), timeZone);

      await registerSchedulling({ ...data, data_hora: String(adjustedDate) });

      setAgendamentoRealizado(true);
      // Recarrega a página
      window.location.reload();

      // toast({
      // 	title: 'Agendamento realizado com sucesso',
      // 	duration: 5000,
      // 	isClosable: true,
      // 	position: 'top-right',
      // 	status: 'success',
      // 	variant: 'custom-success',
      // });
    } catch (error) {
      // toast({
      // 	title: 'Erro ao realizar agendamento',
      // 	description: (error as Error).message,
      // 	status: 'error',
      // 	duration: 5000,
      // 	isClosable: true,
      // 	position: 'top-right',
      // });
    }
  };

  const horaParaMinutos = (horaString: string): number => {
    const [horas, minutos] = horaString.split(':').map(Number);
    return horas * 60 + minutos;
  };

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

  useEffect(() => {
    if (cpfData) {
      setValue('name', cpfData?.name);
      setValue('cras', cpfData?.cras);
      setValue('usuario_id', cpfData?.id);
    }
  }, [cpfData, setValue]);

  const horarios = useMemo(() => {
    let baseHorarios = [
      { hora: '08:00', disponivel: true },
      { hora: '08:30', disponivel: true },
      { hora: '09:00', disponivel: true },
      { hora: '09:30', disponivel: true },
      { hora: '10:00', disponivel: true },
      { hora: '10:30', disponivel: true },
      { hora: '11:00', disponivel: true },
      { hora: '11:30', disponivel: true },
      { hora: '13:00', disponivel: true },
      { hora: '13:30', disponivel: true },
      { hora: '14:00', disponivel: true },
      { hora: '14:30', disponivel: true },
      { hora: '15:00', disponivel: true },
      { hora: '15:30', disponivel: true },
      { hora: '16:00', disponivel: true },
      { hora: '16:30', disponivel: true },
    ];

    if (payload?.cras === 5) {
      // For CRAS 5, limit time slots to '14:30' every day
      baseHorarios = baseHorarios.filter(
        horario => horaParaMinutos(horario.hora) <= horaParaMinutos('14:30')
      );
    } else if (payload?.cras === 6) {
      // For CRAS 6, limit time slots to '14:30' only on Fridays
      if (selectedDate && selectedDate.getDay() === 5) {
        baseHorarios = baseHorarios.filter(
          horario => horaParaMinutos(horario.hora) <= horaParaMinutos('14:30')
        );
      }
    }

    return baseHorarios;
  }, [payload?.cras, selectedDate]);

  const horariosDisponiveis = useMemo(() => {
    return horarios.map(horario => {
      if (selectedDate) {
        const dataSelecionadaFormatada = format(selectedDate, 'yyyy-MM-dd');
        const horariosAgendados = schedullingData
          .filter(agendamentos => agendamentos?.status === 2)
          .filter(
            agendamentos =>
              format(
                toZonedTime(new Date(agendamentos.data_hora), timeZone),
                'yyyy-MM-dd'
              ) === dataSelecionadaFormatada
          )
          .map(agendamentos =>
            format(new Date(agendamentos.data_hora), 'HH:mm')
          );

        const countAgendados = horariosAgendados.filter(
          h => h === horario.hora
        ).length;
        const bloqueados = diasBloqueados
          .filter(
            (bloqueio: BloqueioAgendamentoModel) =>
              format(
                toZonedTime(
                  parseISO(bloqueio.data as unknown as string),
                  timeZone
                ),
                'yyyy-MM-dd'
              ) === dataSelecionadaFormatada
          )
          .filter(h => h.cras === payload?.cras);

        const isBlocked = bloqueados.some(
          (bloqueio: BloqueioAgendamentoModel) => {
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
          }
        );

        return {
          ...horario,
          disponivel:
            countAgendados < Number(funcionariosPorCras) && !isBlocked,
        };
      }
      return horario;
    });
  }, [
    horarios,
    selectedDate,
    schedullingData,
    funcionariosPorCras,
    diasBloqueados,
  ]);

  const handleDateChange = (date: Date) => {
    if (date && horarioSelecionado) {
      const minutos = horaParaMinutos(horarioSelecionado);
      date.setHours(Math.floor(minutos / 60));
      date.setMinutes(minutos % 60);
    }
    setSelectedDate(date);
    setAgendamentoRealizado(false); // Resetar o estado do agendamento realizado ao mudar a data
  };

  if (loading) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <>
      {(showSelecionarDia ||
        payload?.tipo_usuario === 3 ||
        payload?.tipo_usuario === 2) && (
        <Flex
          className='container__date'
          justifyContent={'center'}
          alignItems={'center'}
          gap={'10px'}
          pl={['0%', '30%', '25%', '20%']}
          w='100%'
          flexDir={'column'}
        >
          {selectedDate && (
            <Box
              className='box__cinza'
              boxShadow='2px 2px 5px hsla(0, 28%, 0%, 0.5)'
              textAlign={'center'}
              p={[2, 3, 4, 4]}
              borderWidth='1px'
              display={selectedDate ? 'block' : 'none'}
              borderRadius='md'
              bg={'#F4F4F4'}
              h={'fit-content'}
              alignSelf={'center'}
              w={'80%'}
            >
              <Text fontWeight={'bold'} fontSize={['xl', 'xl', '2xl', '3xl']}>
                AGENDAR ATENDIMENTO
              </Text>
              <Divider my={2} />
              {
                // Exibe o card informativo antes das 9h
                // isBeforeNineAm ? (
                // Exibe o card informativo entre 21:00 e 9:00
                isBetween9pmAnd9am ? (
                  <Box
                    p={4}
                    borderWidth='1px'
                    borderRadius='md'
                    bg='gray.100'
                    mt={4}
                  >
                    <Text
                      fontWeight={'bold'}
                      fontSize={['xl', 'xl', '2xl', '3xl']}
                    >
                      Não temos vagas disponíveis, tente novamente mais tarde.
                    </Text>
                  </Box>
                ) : (
                  // Exibe o DatePicker após as 9h
                  <Flex gap={2} flexDirection={'column'}>
                    <Box
                      flexDir={['column', 'column', 'row', 'row']}
                      mx={'auto'}
                      className='box__dia'
                      alignItems={'center'}
                      display={'flex'}
                      columnGap={2}
                    >
                      <Text
                        fontWeight='bold'
                        fontSize={['12px', '12px', '15px', '15px']}
                      >
                        DIA SELECIONADO:
                      </Text>
                      <Box
                        alignItems={'center'}
                        w={'min-content'}
                        borderRadius={5}
                        border={'1px solid #999'}
                        p={'1px'}
                        // mx={'auto'}
                      >
                        <DatePicker
                          dateFormat='dd/MM/yyyy'
                          locale={'pt-BR'}
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
                              payload?.tipo_usuario === 1 && setShowForm(true);
                            }}
                            setValue={setValue}
                          />
                        ))}
                      </SimpleGrid>
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
                          textAlign={'center'}
                        >
                          <ModalCloseButton />
                          <ModalBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                              {payload?.tipo_usuario !== 1 && (
                                <Flex flexDir={'column'} mt={4} gap={4}>
                                  <Flex
                                    p={0}
                                    w={'100%'}
                                    alignItems={'center'}
                                    flexDir={'column'}
                                    gap={2}
                                  >
                                    <ModalHeader fontWeight={'bold'}>
                                      Buscar usuário pelo CPF
                                    </ModalHeader>
                                    <Flex gap={1} w={'80%'}>
                                      <Input
                                        value={cpf}
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Digite o CPF'
                                      />
                                      <Button
                                        sx={{
                                          maxW: 'max-content',
                                          display: '-ms-grid',
                                          boxShadow:
                                            '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
                                          color: '#fff',
                                          bg: '#016234',
                                          minW: [
                                            '80px',
                                            '80px',
                                            '90px',
                                            '100px',
                                          ],
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
                                        <strong>CRAS:</strong>{' '}
                                        {Cras[cpfData.cras]}
                                      </Text>
                                    </Box>
                                  )}
                                </Flex>
                              )}

                              {showForm && (
                                <>
                                  <ModalHeader fontWeight={'bold'}>
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
                                          <ModalFooter
                                            justifyContent={'center'}
                                          >
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
                                              <strong>
                                                {horarioSelecionado}
                                              </strong>{' '}
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
                                    <Box display={'none'}>
                                      <FormControl isInvalid={!!errors.name}>
                                        <FormLabel htmlFor='name'>
                                          Nome
                                        </FormLabel>
                                        <Input
                                          id='name'
                                          {...register('name')}
                                          defaultValue={
                                            payload?.tipo_usuario === 1
                                              ? payload?.name
                                              : cpfData?.name
                                          }
                                        />
                                        {errors.name && (
                                          <Text color='red.500'>
                                            {errors.name.message}
                                          </Text>
                                        )}
                                      </FormControl>
                                      <FormControl
                                        isInvalid={!!errors.data_hora}
                                      >
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
                                        {errors.data_hora && (
                                          <Text color='red.500'>
                                            {errors.data_hora.message}
                                          </Text>
                                        )}
                                      </FormControl>

                                      <FormControl isInvalid={!!errors.cras}>
                                        <FormLabel htmlFor='cras'>
                                          Cras
                                        </FormLabel>
                                        <Input
                                          id='cras'
                                          {...register('cras')}
                                          defaultValue={
                                            payload?.tipo_usuario === 1
                                              ? payload?.cras
                                              : cpfData?.cras
                                          }
                                        />

                                        {errors.cras && (
                                          <Text color='red.500'>
                                            {errors.cras.message}
                                          </Text>
                                        )}
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
                                        {errors.status && (
                                          <Text color='red.500'>
                                            {errors.status.message}
                                          </Text>
                                        )}
                                      </FormControl>
                                      <FormControl
                                        isInvalid={!!errors.usuario_id}
                                      >
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
                                        {errors.usuario_id && (
                                          <Text color='red.500'>
                                            {errors.usuario_id.message}
                                          </Text>
                                        )}
                                      </FormControl>
                                    </Box>
                                  </Flex>
                                </>
                              )}
                              <ModalFooter justifyContent={'center'}>
                                <Button
                                  minW={['100px', '100px', '150px', '150px']}
                                  boxShadow={
                                    '1px 1px 2px hsla(0, 28%, 0%, 0.7)'
                                  }
                                  fontSize={[
                                    '0.8rem',
                                    '0.8rem',
                                    '0.9rem',
                                    '1rem',
                                  ]}
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
                      <Flex mt={2} justifyContent={'center'} gap={2}>
                        <Flex gap={2} alignItems='center'>
                          <Box w={3} h={3} bg='green.500' borderRadius='50%' />
                          <Text>Horário Disponível</Text>
                        </Flex>

                        <Flex gap={2} alignItems='center'>
                          <Box w={3} h={3} bg='red.500' borderRadius='50%' />
                          <Text>Horário Indisponível</Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                )
              }
            </Box>
          )}
        </Flex>
      )}
    </>
  );
};

export default SelecionarDia;

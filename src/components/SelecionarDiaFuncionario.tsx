import 'react-datepicker/dist/react-datepicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays } from 'date-fns';
import * as React from 'react';
import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
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
} from '@chakra-ui/react';

registerLocale('pt-BR', ptBR);

const SelecionarDiaFuncionario: React.FC = () => {
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null
  );
  const maxDate = addDays(new Date(), 30);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const BoxHorario = ({
    horario,
    onOpen,
  }: {
    horario: string;
    onOpen: () => void;
  }) => {
    return (
      <Button
        bg='#2CA1FF'
        color='white'
        _hover={{ bg: '#1C75BC' }}
        onClick={() => {
          setHorarioSelecionado(horario);
          onOpen();
        }}
      >
        {horario}
      </Button>
    );
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      //data selecionada
      console.log(date);
    }
  };

  const {
    isOpen: isAtendimentoOpen,
    onOpen: onAtendimentoOpen,
    onClose: onAtendimentoClose,
  } = useDisclosure();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    let timeout: NodeJS.Timeout | null = null;

    if (isAtendimentoOpen) {
      const initialStartTime = new Date(); // Use initialStartTime

      timeout = setTimeout(() => {
        setElapsedTime(0);

        interval = setInterval(() => {
          const now = new Date();
          setElapsedTime(
            Math.floor((now.getTime() - initialStartTime.getTime()) / 1000)
          );
        }, 1000);
      }, 0);
    } else {
      clearTimeout(timeout!);
      clearInterval(interval!);
      setElapsedTime(0);
    }

    return () => {
      clearTimeout(timeout!);
      clearInterval(interval!);
    };
  }, [isAtendimentoOpen]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  return (
    <Flex
      className='container__date'
      justifyContent={'center'}
      alignItems={'center'}
      gap={'10px'}
      p={['10px', '0', '0', '0']}
      // w={['100%', '70%', '75%', '80%']}
      pl={['0%', '30%', '25%', '20%']}
      w='100%'
      flexDir={'column'}
    >
      {!selectedDate && (
        <Box
          className='selecionar__dia'
          textAlign='center'
          // mb={4}
        >
          <Text
            alignSelf={'center'}
            fontWeight={'bold'}
            fontSize={'20px'}
            textAlign={'center'}
          >
            SELECIONE UM DIA
          </Text>
        </Box>
      )}

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
          <Flex gap={'5px'} flexDirection={'column'}>
            <Box
              className='box__dia'
              alignItems={'center'}
              display={'flex'}
              p={2}
            >
              <Text
                mr={'5px'}
                fontWeight='bold'
                fontSize={['12px', '12px', '15px', '15px']}
              >
                DIA SELECIONADO:
              </Text>
              <Box
                bg='#fff'
                p={'5px'}
                flex={1}
                textAlign='center'
                borderRadius='5px'
              >
                <Text fontSize={['12px', '12px', '15px', '15px']}>
                  {selectedDate && format(selectedDate, 'dd/MM/yyyy')}
                </Text>
              </Box>
            </Box>
            <Box className='box__esquerda' flex={1}>
              <Text
                fontSize={['12px', '12px', '15px', '15px']}
                fontWeight='bold'
              >
                HORÁRIOS AGENDADOS
              </Text>
              <SimpleGrid columns={[2, null, 5]} spacing='1'>
                <BoxHorario horario='08:00' onOpen={onOpen} />
                <BoxHorario horario='09:00' onOpen={onOpen} />
                <BoxHorario horario='10:00' onOpen={onOpen} />
                <BoxHorario horario='11:00' onOpen={onOpen} />
                <BoxHorario horario='12:00' onOpen={onOpen} />
                <BoxHorario horario='13:00' onOpen={onOpen} />
                <BoxHorario horario='14:00' onOpen={onOpen} />
                <BoxHorario horario='15:00' onOpen={onOpen} />
                <BoxHorario horario='16:00' onOpen={onOpen} />
              </SimpleGrid>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={['xs', 'sm', 'md', 'lg']}
              >
                <ModalOverlay />
                <ModalContent textAlign={'center'}>
                  <ModalHeader>
                    <strong>Atendimento</strong>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <strong>Tipo:</strong> Atualização cadastral <br />
                    <strong>Nome:</strong> José Pereira Nunes <br />
                    <strong>CPF:</strong> 123.456.789-00 <br /> Marcado para o
                    dia{' '}
                    <strong>
                      {selectedDate && format(selectedDate, 'dd/MM/yyyy')}
                    </strong>{' '}
                    às <strong>{horarioSelecionado}</strong> <br />
                    <br />
                    <Box>
                      <Button
                        // colorScheme="green"
                        mt={-2}
                        bg={'#228B22'}
                        textColor={'white'}
                        onClick={() => {
                          onClose(); // Close the first modal
                          onAtendimentoOpen(); // Open the Atendimento modal
                        }}
                        _hover={{
                          bg: '#1b612e',
                        }}
                      >
                        Iniciar Atendimento
                      </Button>
                      <br />

                      <Button
                        // colorScheme="green"
                        mt={3}
                        mb={-5}
                        p={3}
                        bg={'#EE4B2B'}
                        textColor={'white'}
                        onClick={onClose}
                        _hover={{
                          bg: '#A52A2A',
                        }}
                      >
                        Ausente
                      </Button>
                    </Box>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={isAtendimentoOpen}
                onClose={onAtendimentoClose}
                isCentered
              >
                <ModalOverlay />
                <ModalContent textAlign={'center'}>
                  <ModalHeader>Atendimento em Andamento</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text fontSize='xl'>
                      Tempo Decorrido: {formatTime(elapsedTime)}
                    </Text>{' '}
                    <br />
                    <Button
                      mt={4}
                      colorScheme='red'
                      onClick={onAtendimentoClose}
                    >
                      Encerrar Atendimento
                    </Button>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>
        </Box>
      )}

      <DatePicker
        locale={'pt-BR'}
        selected={selectedDate}
        inline
        filterDate={date =>
          date.getDay() !== 0 && date.getDay() !== 6 && date <= maxDate
        }
        onSelect={handleDateChange}
        onChange={(date: Date | null) => setSelectedDate(date)}
        minDate={new Date()}
        className='customInput'
      />
    </Flex>
  );
};

export default SelecionarDiaFuncionario;

import { Flex } from '@chakra-ui/react';
import React from 'react';
import { SidebarFuncionario } from '../components/SidebarFuncionario';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HamburgerMenu } from '../components/HamburgerMenu';
import SelecionarDiaFuncionario from '../components/SelecionarDiaFuncionario';

const Agendamentos: React.FC = () => {
  return (
    <>
      <SidebarFuncionario />
      <Flex className='flex' h='100vh'>
        <HamburgerMenu />
        <SelecionarDiaFuncionario />
      </Flex>
    </>
  );
};

export default Agendamentos;

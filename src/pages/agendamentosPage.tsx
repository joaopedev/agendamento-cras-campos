import { Flex } from '@chakra-ui/react';
import React from 'react';
import { SidebarFuncionario } from '../components/SidebarFuncionario';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HamburgerMenuFuncionario } from '../components/HamburgerMenuFuncionario';
import SelecionarDiaFuncionario from '../components/SelecionarDiaFuncionario';

const Agendamentos: React.FC = () => {
  return (
    <>
      <SidebarFuncionario />
      <Flex className='flex' h='100vh'>
        <HamburgerMenuFuncionario />
        <SelecionarDiaFuncionario />
      </Flex>
    </>
  );
};

export default Agendamentos;

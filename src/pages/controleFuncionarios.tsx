import { Flex } from '@chakra-ui/react';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SelecionarDiaFuncionario from '../components/SelecionarDiaFuncionario';
import { HamburgerMenu } from '../components/HamburgerMenu';
import SidebarHome from '../components/SidebarHome';

const ControleFuncionarios: React.FC = () => {
  return (
    <>
      <SidebarHome />
      <Flex className='flex' h='100vh'>
        <HamburgerMenu />
        <SelecionarDiaFuncionario />
      </Flex>
    </>
  );
};

export default ControleFuncionarios;

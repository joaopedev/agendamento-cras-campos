import { Flex } from '@chakra-ui/react';
import React from 'react';
import { SidebarHome } from '../components/SidebarHome';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HamburgerMenu } from '../components/HamburgerMenu';
import SelecionarDia from '../components/SelecionarDia';

const SchedulingPage: React.FC = () => {
  const handleDataChange = (novaData: Date) => {
    console.log('Data selecionada:', novaData);
  };

  return (
    <Flex h='100vh'>
      <SidebarHome />
      <HamburgerMenu />
      <SelecionarDia />
    </Flex>
  );
};

export default SchedulingPage;
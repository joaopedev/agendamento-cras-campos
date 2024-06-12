import React, { useMemo } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import CrasPieChart from '../components/CrasPieChart';
import { crasData } from '../components/CrasData';
import SelecionarDiaDashboard from '../components/SelecionarDiaDashboard';
import ScrollUpButton from '../components/ScrollUpButton';
import { HamburgerMenu } from '../components/HamburgerMenu';
import SidebarHome from '../components/SidebarHome';

interface Cras {
  nome: string;
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const Dashboard: React.FC = () => {
  const totalData = useMemo(() => {
    const initialTotal = crasData[0].data.map(item => ({
      ...item,
      value: 0,
    })); // Create initialTotal from first cras data

    return crasData.reduce((acc, cras) => {
      cras.data.forEach((item, index) => {
        acc[index].value += item.value;
      });
      return acc;
    }, initialTotal);
  }, []);

  const formattedTotalData: Cras[] = [{ nome: 'Total', data: totalData }];

  return (
    <Flex h='100vh' flexDir={'column'}>
      <SidebarHome />
      <HamburgerMenu />
      <ScrollUpButton />
      <SelecionarDiaDashboard />
      <Box pl={['0%', '30%', '25%', '20%']} w='100%'>
        <CrasPieChart crasData={formattedTotalData} crasNome='Total' />
        {crasData.map(cras => (
          <CrasPieChart
            key={cras.nome}
            crasData={[cras]}
            crasNome={cras.nome}
          />
        ))}
      </Box>
    </Flex>
  );
};

export const boxStyle = {
  w: '60%',
  maxW: ['300px', '350px', '500px', '950px'],
  minW: '250px',
  boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
  p: ['20px', '20px', '30px', '40px'],
  borderRadius: '25px',
  bg: '#F4F4F4',
  textAlign: 'center',
  alignContent: 'center',
};
export const btnStyle = {
  p: '0',
  w: '30%',
  display: '-ms-grid',
  boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
  color: '#fff',
  bg: '#2CA1FF',
  maxW: '950px',
  minW: ['150px', '200px', '250px', '300px'],
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  _hover: {
    bg: '#1C75BC',
    fontWeight: 'bold',
  },
};
export default Dashboard;

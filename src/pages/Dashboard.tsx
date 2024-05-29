import React, { useMemo } from 'react';
import { Flex, Box, SimpleGrid } from '@chakra-ui/react';
import { HamburgerMenuADM } from '../components/HamburgerMenuADM';
import SidebarADM from '../components/SidebarADM';
import CrasPieChart from '../components/CrasPieChart'; // No need to import PieChartData here
import { crasData } from '../components/CrasData'; // Import data

export const Dashboard: React.FC = () => {
  const totalData = useMemo(() => {
    const initialTotal = crasData[0].data.map(item => ({ ...item, value: 0 })); // Create initialTotal from first cras data

    return crasData.reduce((acc, cras) => {
      cras.data.forEach((item, index) => {
        acc[index].value += item.value;
      });
      return acc;
    }, initialTotal);
  }, []);

  return (
    <Flex h='100vh'>
      <SidebarADM />
      <HamburgerMenuADM />
      <Box pl={['15%', '20%', '25%', '30%']} w='100%'>
        <SimpleGrid columns={[1, 2, 3]} spacing={7} mt={4}>
          <CrasPieChart crasData={totalData} crasNome='Total' />
          {crasData.map(cras => (
            <CrasPieChart
              key={cras.nome}
              crasData={cras.data}
              crasNome={cras.nome}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

// const textStyle1 = {
// 	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
// 	bg: 'white',
// 	borderRadius: '5px',
// 	p: '8px 0',
// };

// const textStyle2 = {
// 	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
// 	fontWeight: 'bold',
// 	mt: '10px',
// 	mb: '3px',
// };

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

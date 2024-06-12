import React, { useState } from 'react';
import { Flex, Text, Box, Grid, GridItem } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface Cras {
  nome: string;
  data: PieChartData[];
}

const CrasPieChart: React.FC<{
  crasData: Cras[];
  crasNome?: string;
}> = ({ crasData, crasNome }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const averagePerCras = crasData.map(cras => {
    if (cras.data.length === 0) {
      return 0; // Avoid division by zero if a CRAS has no data
    }
    return (
      cras.data.reduce((sum, entry) => sum + entry.value, 0) / cras.data.length
    );
  });

  // Simplified calculation of totalAverageAtendimentoTime:
  const totalAverageAtendimentoTime =
    averagePerCras.reduce((sum, avg) => sum + avg, 0) /
    averagePerCras.filter(avg => avg !== 0).length;

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <Box p={2} bg='gray.100' borderRadius='md'>
          <Text fontWeight='bold'>{name}:</Text>
          <Text>{value}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <Flex mt='50px' flexDir={'column'} alignItems={'center'}>
        <Text fontWeight='bold' fontSize='xl' mb={2}>
          {crasNome || 'Visão Geral'}
        </Text>
        <Flex>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <GridItem>
              <Box height='200px'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <Pie
                      data={crasData[0].data} // Access the first CRAS's data for the pie chart
                      dataKey='value'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      outerRadius={80}
                      fill='#8884d8'
                      activeIndex={
                        activeIndex !== null ? activeIndex : undefined
                      }
                      activeShape={{ fill: 'gold' }}
                    >
                      {crasData[0].data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={customTooltip} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </GridItem>
            <GridItem>
              {/* Legend with Values */}
              <Box alignItems='center'>
                <Grid
                  templateColumns='10px 1fr 1fr'
                  gap={2}
                  alignItems='center'
                  rowGap={1}
                >
                  {crasData[0].data.map((entry, index) => (
                    <React.Fragment key={entry.name}>
                      <GridItem>
                        <Box
                          w='10px'
                          h='10px'
                          borderRadius='50%'
                          bg={entry.color}
                        />
                      </GridItem>
                      <GridItem>
                        <Text fontSize='sm'>{entry.name}</Text>
                      </GridItem>
                      {/* Value Display */}
                      <GridItem>
                        <Text fontSize='sm' textAlign='right'>
                          {entry.value}
                        </Text>
                      </GridItem>
                    </React.Fragment>
                  ))}

                  {/* Extra Legend Entry (Total Average) */}
                  <GridItem colSpan={3}>
                    {' '}
                    {/* Span all columns */}
                    <Text fontWeight='bold' fontSize='sm' mt={2}>
                      Tempo médio de atendimento (Total):{' '}
                      {totalAverageAtendimentoTime.toFixed(2)}
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};

export default CrasPieChart;

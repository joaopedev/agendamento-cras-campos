import React, { useState } from 'react';
import { Flex, Text, Box, Grid, GridItem } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface PieChartData {
	name: string;
	value: number;
	color: string;
}

const CrasPieChart: React.FC<{
	crasData: PieChartData[];
	crasNome?: string;
}> = ({ crasData, crasNome }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const customTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const { name, value } = payload[0];
			return (
				<Box p={2} bg="gray.100" borderRadius="md">
					<Text fontWeight="bold">{name}:</Text>
					<Text>{value}</Text>
				</Box>
			);
		}
		return null;
	};

	return (
		<>
			<Flex mt="50px" flexDir={'column'} alignItems={'center'}>
				<Text fontWeight="bold" fontSize="xl" mb={2}>
					{crasNome || 'Visão Geral'}
				</Text>
				<Flex>
					<Grid
						// templateColumns="repeat(2, 1fr)"
						templateColumns={{
							base: '1fr', // Uma coluna em telas pequenas
							md: 'repeat(2, 1fr)', // Duas colunas em telas médias e maiores
						}}
						gap={0}
					>
						<GridItem>
							{' '}
							{/* Gráfico */} {/* Gráfico */}
							<Box
								// width="300px"
								height="200px"
							>
								<ResponsiveContainer width="100%" height="100%">
									<PieChart
										onMouseEnter={(_, index) => setActiveIndex(index)}
										onMouseLeave={() => setActiveIndex(null)}
									>
										<Pie
											data={crasData}
											dataKey="value"
											nameKey="name"
											cx="50%"
											cy="50%"
											outerRadius={80}
											fill="#8884d8"
											activeIndex={activeIndex !== null ? activeIndex : undefined}
											activeShape={{ fill: 'gold' }}
										>
											{crasData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
										</Pie>
										<Tooltip content={customTooltip} />
									</PieChart>
								</ResponsiveContainer>
							</Box>
						</GridItem>
						<GridItem alignContent={'center'}>
							{' '}
							{/* Legenda */}
							<Box alignItems={'center'}>
								<Grid
									justifySelf={'center'}
									templateColumns="10px 1fr 1fr"
									gap={2}
									alignItems="center"
									rowGap={1}
								>
									{' '}
									{/* Reduzimos o tamanho da primeira coluna e o espaçamento vertical */}
									{crasData.map(entry => (
										<React.Fragment key={entry.name}>
											<GridItem>
												<Box ml={4} w="8px" h="8px" borderRadius="50%" bg={entry.color} />{' '}
												{/* Reduzimos o tamanho do quadrado de cor */}
											</GridItem>
											<GridItem>
												<Text ml={4} fontSize="sm" whiteSpace="nowrap">
													{entry.name}
												</Text>{' '}
												{/* Diminuímos o tamanho da fonte */}
											</GridItem>
											<GridItem>
												<Text mr={4} fontSize="sm" textAlign="right">
													{entry.value}
												</Text>{' '}
												{/* Diminuímos o tamanho da fonte */}
											</GridItem>
										</React.Fragment>
									))}
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

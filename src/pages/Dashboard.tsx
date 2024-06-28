import React, { useEffect, useState, useContext } from "react";
import { Flex, Box } from "@chakra-ui/react";
import CrasPieChart, {
  PieChartData,
  CrasData,
} from "../components/CrasPieChart";
import { AuthContext } from "../context/AuthContext";
import { Cras } from "../interface/User";
import { ISchedulingModel } from "../interface/Schedulling";
import SidebarHome from "../components/SidebarHome";
import { HamburgerMenu } from "../components/HamburgerMenu";

export const Dashboard: React.FC = () => {
  const { getAllSchedulling: getSchedulling, payload } = useContext(AuthContext);
  const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>([]);
  const [crasData, setCrasData] = useState<CrasData[]>([]);
  const [totalData, setTotalData] = useState<PieChartData[]>([
    { name: "Agendamentos Pendentes", value: 0, color: "#2CA1FF" },
    { name: "Atendimentos Realizados", value: 0, color: "#38A169" },
    { name: "Ausentes", value: 0, color: "#FF5757" },
  ]);

  useEffect(() => {
    const fetchSchedullingData = async () => {
      if (payload) {
        const response = await getSchedulling();
        setSchedullingData(response.agendamentos);
      }
    };

    fetchSchedullingData();
  }, [payload, getSchedulling]);

  useEffect(() => {
    const processCrasData = () => {
      const dataByCras: { [key: number]: PieChartData[] } = {};
      const totalDataTemp = [
        { name: "Agendamentos Pendentes", value: 0, color: "#2CA1FF" },
        { name: "Atendimentos Realizados", value: 0, color: "#38A169" },
        { name: "Ausentes", value: 0, color: "#FF5757" },
      ];

      schedullingData.forEach((agendamento) => {
        if (!dataByCras[agendamento.cras]) {
          dataByCras[agendamento.cras] = [
            { name: "Agendamentos Pendentes", value: 0, color: "#2CA1FF" },
            { name: "Atendimentos Realizados", value: 0, color: "#38A169" },
            { name: "Ausentes", value: 0, color: "#FF5757" },
          ];
        }

        if (agendamento.status === 2) {
          dataByCras[agendamento.cras][0].value += 1; // Pendentes
          totalDataTemp[0].value += 1;
        }
        if (agendamento.status === 1) {
          dataByCras[agendamento.cras][1].value += 1; // Realizados
          totalDataTemp[1].value += 1;
        }
        if (agendamento.status === 3) {
          dataByCras[agendamento.cras][2].value += 1; // Ausentes
          totalDataTemp[2].value += 1;
        }
      });

      const processedData = Object.entries(dataByCras).map(([key, value]) => ({
        nome: Cras[Number(key)],
        data: value,
      }));

      setCrasData(processedData);
      setTotalData(totalDataTemp);
    };

    processCrasData();
  }, [schedullingData]);

  return (
    <Flex h="100vh" flexDir={"column"}>
      <SidebarHome />
      <HamburgerMenu />
      <Box pl={["0%", "30%", "25%", "20%"]} w="100%">
        <CrasPieChart crasData={[{ nome: "Total", data: totalData }]} crasNome="Total" />
        {crasData.map((cras) => (
          <CrasPieChart key={cras.nome} crasData={[cras]} crasNome={cras.nome} />
        ))}
      </Box>
    </Flex>
  );
};

export default Dashboard;

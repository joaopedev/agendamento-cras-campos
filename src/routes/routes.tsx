import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/loginPage";
import LoginFuncionario from "../pages/loginFuncionario";
import Home from "../pages/homePage";
import HomeADM from "../pages/homeADM";
import HomeFuncionario from "../pages/homeFuncionario";
import SchedulingPage from "../pages/SchedulingPage";
import Agendamentos from "../pages/agendamentosPage";
import Cadastro from "../pages/cadastroPage";
import Adm from "../pages/admPage";
import Dashboard from "../pages/Dashboard";
import Gerenciamento from "../pages/gerenciamento";
import PrivateRoute from "../components/PrivateRoute";
import { useAuth } from "../hook/useAuth";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login />
          }
        />
        <Route
          path="/cadastro"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Cadastro />
          }
        />
        {isAuthenticated && (
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/funcionario" element={<LoginFuncionario />} />
            <Route path="/gerenciamento" element={<Gerenciamento />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adm" element={<Adm />} />
            <Route path="/home-adm" element={<HomeADM />} />
            <Route path="/home-funcionario" element={<HomeFuncionario />} />
            <Route path="/agendamento" element={<SchedulingPage />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

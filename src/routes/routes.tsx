import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/loginPage';
import LoginFuncionario from '../pages/loginFuncionario';
import Home from '../pages/homePage';
import HomeADM from '../pages/homeADM';
import HomeFuncionario from '../pages/homeFuncionario';
import SchedulingPage from '../pages/SchedulingPage';
import Agendamentos from '../pages/agendamentosPage';
import Cadastro from '../pages/cadastroPage';
import Adm from '../pages/admPage';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/funcionario' element={<LoginFuncionario />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/adm' element={<Adm />} />
        <Route path='/home-adm' element={<HomeADM />} />
        <Route path='/home-funcionario' element={<HomeFuncionario />} />
        <Route path='/agendamento' element={<SchedulingPage />} />
        <Route path='/agendamentos' element={<Agendamentos />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

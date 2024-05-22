import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import Home from '../pages/homePage';
import HomeADM from '../pages/homeADM';
import HomeFuncionario from '../pages/homeFuncionario';
import SchedulingPage from '../pages/SchedulingPage';
import Cadastro from '../pages/cadastroPage';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home-adm' element={<HomeADM />} />
        <Route path='/home-funcionario' element={<HomeFuncionario />} />
        <Route path='/agendamento' element={<SchedulingPage />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

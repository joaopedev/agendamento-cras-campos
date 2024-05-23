import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/loginPage';
import Home from '../pages/homePage';
import HomeADM from '../pages/homeADM';
import HomeFuncionario from '../pages/homeFuncionario';
import SchedulingPage from '../pages/SchedulingPage';
import Cadastro from '../pages/cadastroPage';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        ;
        <Route path='/home-adm' element={<HomeADM />} />
        <Route path='/home-funcionario' element={<HomeFuncionario />} />
        <Route path='/agendamento' element={<SchedulingPage />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

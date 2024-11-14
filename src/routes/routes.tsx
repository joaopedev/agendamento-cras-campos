import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/loginPage';
import LoginFuncionario from '../pages/loginFuncionario';
import Home from '../pages/homePage';
import SchedulingPage from '../pages/SchedulingPage';
import Agendamentos from '../pages/controleFuncionarios';
import Cadastro from '../pages/cadastroPage';
import Adm from '../pages/admPage';
import Dashboard from '../pages/Dashboard';
import Gerenciamento from '../pages/gerenciamento';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../hook/useAuth';
import UserEdit from '../pages/UserEdit';
import Termos from '../pages/termos';
import Privacidade from '../pages/privacidade';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ? <Navigate to='/home' replace /> : <Login />
          }
        />
        <Route
          path='/cadastro'
          element={
            isAuthenticated ? <Navigate to='/home' replace /> : <Cadastro />
          }
        />{' '}
        <Route
          path='/termos'
          element={
            isAuthenticated ? <Navigate to='/home' replace /> : <Termos />
          }
        />{' '}
        <Route
          path='/privacidade'
          element={
            isAuthenticated ? <Navigate to='/home' replace /> : <Privacidade />
          }
        />{' '}
        <Route
          path='/funcionario'
          element={
            isAuthenticated ? (
              <Navigate to='/home' replace />
            ) : (
              <LoginFuncionario />
            )
          }
        />
        {isAuthenticated && (
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/gerenciamento' element={<Gerenciamento />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/adm' element={<Adm />} />
            <Route path='/agendar' element={<SchedulingPage />} />
            <Route path='/agendamentos' element={<Agendamentos />} />
            <Route path='/editar' element={<UserEdit />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

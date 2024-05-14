import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import Home from '../pages/homePage';
import SchedulingPage from '../pages/SchedulingPage';

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/agendamento" element={<SchedulingPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;

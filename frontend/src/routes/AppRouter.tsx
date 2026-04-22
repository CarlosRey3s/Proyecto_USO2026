import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';

import Dashboard from "../pages/estudiante/Dashboard";
import Reservar from "../pages/estudiante/Reservar";
import { Evaluaciones } from '../pages/estudiante/Evaluaciones';
import RealizarEvaluacion from "../pages/estudiante/RealizarEvaluacion";

import { CalendarioView } from '../pages/admin/Calendario';
import DashboardAdmin from "../pages/admin/DashboardAdmin"; 

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>

          {/* 👤 ESTUDIANTE */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reservas" element={<Reservar />} />
          <Route path="evaluaciones" element={<Evaluaciones />} />
          <Route path="realizar-evaluacion" element={<RealizarEvaluacion />} />
          <Route path="calendario" element={<CalendarioView />} />

          {/* ADMIN */}
          <Route path="admin/dashboard" element={<DashboardAdmin />} />

          {/* Redirects */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Route>
      </Routes>
    </Router>
  );
};
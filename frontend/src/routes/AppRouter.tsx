// src/routes/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import Dashboard from "../pages/Dashboard";
import Reservas from "../pages/Reservas";
import { Evaluaciones } from '../pages/Evaluaciones';
import RealizarEvaluacion from "../pages/RealizarEvaluacion";
import { CalendarioView } from '../pages/admin/Calendario'; 

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Usamos el Layout como contenedor principal */}
        <Route path="/" element={<MainLayout />}>
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="evaluaciones" element={<Evaluaciones />} />
          <Route path="realizar-evaluacion" element={<RealizarEvaluacion />} />
          <Route path="calendario" element={<CalendarioView />} />
          
          {/* Redirección por defecto al dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          {/* Fallback para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
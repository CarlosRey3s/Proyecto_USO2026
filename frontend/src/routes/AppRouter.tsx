// src/routes/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import Dashboard from "../pages/estudiante/Dashboard";
import Reservar from "../pages/estudiante/Reservar";
import { Evaluaciones } from '../pages/estudiante/Evaluaciones';
import RealizarEvaluacion from "../pages/estudiante/RealizarEvaluacion";
import { CalendarioView, InventarioView, EvaluacionesAdminView } from '../pages/admin';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Usamos el Layout como contenedor principal */}
        <Route path="/" element={<MainLayout />}>
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reservas" element={<Reservar />} />
          <Route path="evaluaciones" element={<Evaluaciones />} />
          <Route path="realizar-evaluacion" element={<RealizarEvaluacion />} />
          <Route path="calendario" element={<CalendarioView />} />
          <Route path="inventario" element={<InventarioView />} />
          <Route path="admin-evaluaciones" element={<EvaluacionesAdminView />} />
          
          {/* Redirección por defecto al dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          {/* Fallback para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
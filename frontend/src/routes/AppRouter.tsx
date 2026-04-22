// src/routes/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../pages/auth/Login';

// Pages
import Dashboard from "../pages/estudiante/Dashboard";
import Reservar from "../pages/estudiante/Reservar";
import { Evaluaciones } from '../pages/estudiante/Evaluaciones';
import RealizarEvaluacion from "../pages/estudiante/RealizarEvaluacion";
import { CalendarioView, InventarioView, EvaluacionesAdminView } from '../pages/admin';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            
            {/* Rutas comunes o de estudiante */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reservas" element={<Reservar />} />
            <Route path="evaluaciones" element={<Evaluaciones />} />
            <Route path="realizar-evaluacion" element={<RealizarEvaluacion />} />
            
            {/* Rutas de admin (podemos protegerlas más específicamente si queremos) */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="calendario" element={<CalendarioView />} />
                <Route path="inventario" element={<InventarioView />} />
                <Route path="admin-evaluaciones" element={<EvaluacionesAdminView />} />
            </Route>

            {/* Redirección por defecto al dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        {/* Fallback para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};
// src/routes/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';

// Vamos a crear este archivo en el siguiente paso
import { CalendarioView } from '../pages/admin/Calendario'; 

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Usamos el Layout como contenedor principal */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Aquí irán tus diferentes pantallas */}
          <Route path="calendario" element={<CalendarioView />} />
          
          {/* Redirección por defecto al calendario por ahora */}
          <Route index element={<Navigate to="/calendario" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
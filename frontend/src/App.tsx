import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EvaluacionesEstudiante } from './vistas/EvaluacionesEstudiante';
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/evaluaciones" element={<EvaluacionesEstudiante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

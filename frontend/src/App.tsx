import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Evaluaciones } from './pages/Evaluaciones';
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";
import RealizarEvaluacion from "./pages/RealizarEvaluacion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/evaluaciones" element={<Evaluaciones />} />
        <Route path="/realizar-evaluacion" element={<RealizarEvaluacion />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

import "../css/evaluaciones.css";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="container">

      <Sidebar />

      {/* CONTENT */}
      <div className="content">

        {/* NAVBAR */}
        <div className="navbar">
          <h2>Dashboard</h2>

          <input
            className="search-box"
            placeholder="🔍 Buscar..."
          />

          <div>Hello, Name 🔔</div>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* IZQUIERDA */}
          <div className="schedule">
            <h3>Horarios de Laboratorios</h3>

            <div className="tabs">
              <div className="tab">Horas</div>
              <div className="tab active">Lunes</div>
              <div className="tab">Martes</div>
              <div className="tab">Miércoles</div>
              <div className="tab">Jueves</div>
              <div className="tab">Viernes</div>
              <div className="tab">Sábado</div>
            </div>

            <div className="schedule-card">
              <div className="time">08:00 - 10:00</div>
              <div>
                <strong>Física</strong>
                <p>Lab 101</p>
              </div>
            </div>

            <div className="schedule-card">
              <div className="time">10:00 - 12:00</div>
              <div>
                <strong>Sistemas Digitales</strong>
                <p>Lab 203</p>
              </div>
            </div>
          </div>

          {/* DERECHA - EVALUACIONES (CORREGIDO) */}
          <div className="reservas-panel">

            <h3>Evaluaciones pendientes</h3>

            <div className="evaluacion-card">
              <h4>Sistemas Digitales</h4>
              <p>- Examen Parcial</p>
              <p className="fecha">Vence: 20 Oct (3 días)</p>
            </div>

            <div className="evaluacion-card">
              <h4>Lab Estática</h4>
              <p>- Informe de Lab 3</p>
              <p className="fecha">Vence: 22 Oct (5 días)</p>
            </div>

            <div className="evaluacion-card">
              <h4>Física</h4>
              <p>- Quiz Capítulo 4</p>
              <p className="fecha">Vence: 25 Oct (8 días)</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
import "../css/vistaEstudiante.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="menu">
          <h3>Dashboard</h3>

          <ul>
            <li className="active">Dashboard</li>

            <li onClick={() => navigate("/reservas")}>
              Reservar
            </li>

            <li>Evaluaciones</li>
            <li>Mensajes</li>
            <li>Perfil</li>
          </ul>
        </div>

        <div className="sidebar-bottom">
          Hello, Name
        </div>
      </div>

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

          {/* IZQUIERDA - HORARIOS */}
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

            {/* BLOQUES DE HORARIO */}
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

          {/* DERECHA */}
          <div className="right-panel">

            {/* EVALUACIONES */}
            <div className="card">
              <h4>Evaluaciones pendientes:</h4>

              <div className="alert">
                <p><b>Sistemas Digitales</b></p>
                <p>- Examen Parcial</p>
                <p className="red">Vence: 20 Oct (3 días)</p>
              </div>

              <div className="alert">
                <p><b>Lab Estática</b></p>
                <p>- Informe de Lab 3</p>
                <p className="red">Vence: 22 Oct (5 días)</p>
              </div>

              <div className="alert">
                <p><b>Física</b></p>
                <p>- Quiz Capítulo 4</p>
                <p className="red">Vence: 25 Oct (8 días)</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
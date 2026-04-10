import "../css/vistaEstudiante.css";

export default function Dashboard() {
  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="menu">
          <h3>Dashboard</h3>

          <ul>
            <li className="active">Dashboard</li>
            <li>Reservar</li>
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

          <input className="search-box" placeholder="🔍 Buscar..." />

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
          </div>

          {/* DERECHA */}
          <div className="right-panel">

            <div className="card">
              <h4>Tus horarios:</h4>
              <p><b>Lab Estática</b></p>
              <p>Lun | 08:00 am - 10:00 am</p>
            </div>

            <div className="card">
              <h4>Evaluaciones pendientes:</h4>
              <p><b>Lab Estática</b></p>
              <p>Evaluación 2</p>
              <p className="green">Vence: 12 Oct 2026</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
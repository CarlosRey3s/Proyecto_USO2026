import "../css/reservas.css";

export default function Reservas() {
  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="menu">
          <h3>Reservacion Estudiante</h3>

          <ul>
            <li>Dashboard</li>
            <li className="active">Reservar</li>
            <li>Evaluaciones</li>
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
          <h2>Reservación</h2>

          <input className="search-box" placeholder="🔍 Buscar..." />

          <div>Hello, Name 🔔</div>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* IZQUIERDA */}
          <div className="labs">
            <h2>Laboratorios</h2>
            <p>Selecciona un laboratorio para hacer una reserva:</p>

            <div className="lab-card">
              <h3>Laboratorio L1</h3>
              <p>Instrumentos para prácticas físicas, estáticas, etc.</p>
            </div>

            <div className="lab-card">
              <h3>Laboratorio L2</h3>
              <p>Instrumentos para prácticas físicas, estáticas, etc.</p>
            </div>

            <div className="lab-card">
              <h3>Laboratorio L3</h3>
              <p>Instrumentos para prácticas físicas, estáticas, etc.</p>
            </div>
          </div>

          {/* DERECHA */}
          <div className="reservas-panel">
            <h3>Mis reservaciones</h3>

            <div className="reserva-card">
              <h4>Proyecto de Electrónica</h4>
              <p>Fecha: 03 Agosto 2026</p>
              <p>Hora: 1:00 PM - 2:00 PM</p>
              <p>Lugar: L1 &nbsp; N° mesa: 2</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
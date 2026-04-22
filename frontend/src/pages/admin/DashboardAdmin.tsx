import "../../css/DashboardAdmin.css";

export default function DashboardAdmin() {
  return (
    <div className="content">

      {/* ===== TOP CARDS ===== */}
      <div className="main">

        <div className="panel solicitudes">
          <div className="panel-header">Solicitudes Pendientes</div>
          <div className="counter">4</div>
          <span className="panel-sub">Por Aprobar</span>
        </div>

        <div className="panel alertas">
          <div className="panel-header">Alertas de Stock Bajo</div>
          <div className="counter">12</div>
          <span className="panel-sub">Items críticos</span>
        </div>

        <div className="panel actividades">
          <div className="panel-header">Actividades de Hoy</div>
          <div className="counter">18</div>
          <span className="panel-sub">8 Clases, 7 Reservas, 3 Mant</span>
        </div>

        <div className="panel laboratorios">
          <div className="panel-header">Laboratorios Ocupados</div>
          <div className="counter">5/12</div>
          <span className="panel-sub">En uso en tiempo real</span>
        </div>

      </div>

      {/* ===== BOTTOM SECTION ===== */}
      <div className="dashboard-bottom">

        {/* GRAFICO */}
        <div className="card grafico">
          <h3>Instrumentos más ocupados en la semana</h3>

          <div className="bars">
            <div className="bar"></div>
            <div className="bar tall"></div>
            <div className="bar"></div>
            <div className="bar medium"></div>
            <div className="bar tall"></div>
          </div>
        </div>

        {/* AGENDA */}
        <div className="card agenda">
          <h3>Agenda del Día</h3>

          <ul>
            <li>09:00 am - Clase de Física Lab 1</li>
            <li>12:00 pm - Clase de Física II Lab 2</li>
            <li>12:00 pm - Clase de Física III Lab 3</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
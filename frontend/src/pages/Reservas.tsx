import "../css/reservas.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Reservas() {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className="sidebar">
        
        <div className="menu">
          <h3>Reservacion Estudiante</h3>

          <ul>
            <li onClick={() => navigate("/")}>
              Dashboard
            </li>

            <li 
              className="active"
              onClick={() => navigate("/reservas")}
            >
              Reservar
            </li>

            <li onClick={() => navigate("/evaluaciones")}>
              Evaluaciones
            </li>

            <li onClick={() => navigate("/perfil")}>
              Perfil
            </li>
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

          <input 
            className="search-box" 
            placeholder="🔍 Buscar..." 
          />

          <div>Hello, Name 🔔</div>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* IZQUIERDA */}
          <div className="labs">
            <h2>Laboratorios</h2>
            <p>Selecciona un laboratorio para hacer una reserva:</p>

            <div className="lab-card" onClick={() => setShowModal(true)}>
              <h3>Laboratorio L1</h3>
              <p>Instrumentos para prácticas físicas, estáticas, etc.</p>
            </div>

            <div className="lab-card" onClick={() => setShowModal(true)}>
              <h3>Laboratorio L2</h3>
              <p>Instrumentos para prácticas físicas, estáticas, etc.</p>
            </div>

            <div className="lab-card" onClick={() => setShowModal(true)}>
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

      {/* 🔥 MODAL (NUEVO) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>Nueva Reserva</h2>

            <div className="form-grid">

              <div>
                <label>Titulo</label>
                <input type="text" />
              </div>

              <div>
                <label>Mesa</label>
                <select>
                  <option>Mesa 1 - Disponible</option>
                </select>
              </div>

              <div>
                <label>Laboratorio</label>
                <select>
                  <option>L1</option>
                </select>
              </div>

              <div>
                <label>Fecha</label>
                <input type="date" />
              </div>

              <div>
                <label>Desde</label>
                <input type="time" />
              </div>

              <div>
                <label>Hasta</label>
                <input type="time" />
              </div>

              <div>
                <label>N° Estudiantes</label>
                <input type="number" max="5" />
              </div>

            </div>

            <textarea placeholder="Nota adicional"></textarea>

            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>
                Guardar
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
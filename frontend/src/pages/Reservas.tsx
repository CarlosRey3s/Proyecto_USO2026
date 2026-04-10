import "../css/reservas.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Reservas() {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [items, setItems] = useState<string[]>([]);

  const agregarItem = () => {
    setItems([...items, ""]);
  };

  const eliminarItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const actualizarItem = (index: number, value: string) => {
    const nuevos = [...items];
    nuevos[index] = value;
    setItems(nuevos);
  };

  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="menu">
          <h3>Reservación Estudiante</h3>

          <ul>
            <li onClick={() => navigate("/")}>Dashboard</li>
            <li className="active" onClick={() => navigate("/reservas")}>Reservar</li>
            <li onClick={() => navigate("/evaluaciones")}>Evaluaciones</li>
            <li onClick={() => navigate("/perfil")}>Perfil</li>
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

          {/* LABS */}
          <div className="labs">
            <h2>Laboratorios</h2>

            <div className="lab-card" onClick={() => setShowModal(true)}>
              <h3>L1</h3>
            </div>

            <div className="lab-card" onClick={() => setShowModal(true)}>
              <h3>L2</h3>
            </div>

            <div className="lab-card" onClick={() => setShowModal(true)}>
              <h3>L3</h3>
            </div>
          </div>

          {/* RESERVAS */}
          <div className="reservas-panel">
            <h3>Mis reservaciones</h3>

            <div className="reserva-card">
              <h4>Proyecto de Electrónica</h4>
              <p>Fecha: 03 Agosto 2026</p>
              <p>Hora: 1:00 PM - 2:00 PM</p>
              <p>Lugar: L1</p>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>Nueva Reserva</h2>

            <div className="form-grid">

              <div>
                <label>Título</label>
                <input type="text" />
              </div>

              <div>
                <label>Mesa</label>
                <select>
                  <option>Mesa 1</option>
                </select>
              </div>

              <div>
                <label>Laboratorio</label>
                <select>
                  <option>L1</option>
                  <option>L2</option>
                  <option>L3</option>
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
                <label>Personas (1 - 5)</label>
                <input type="number" min={1} max={5} defaultValue={1} />
              </div>

            </div>

            {/* 🔧 HERRAMIENTAS */}
            <div style={{ marginTop: "15px" }}>
              <label>Herramientas (opcional)</label>

              {items.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "flex", gap: "5px", marginTop: "5px" }}
                >
                  <input
                    type="text"
                    value={item}
                    placeholder="Ej: Proyector"
                    onChange={(e) => actualizarItem(index, e.target.value)}
                  />

                  <button onClick={() => eliminarItem(index)}>
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={agregarItem}
                style={{
                  marginTop: "8px",
                  background: "#FACB4B",
                  color: "#22806B",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                + Añadir ítem
              </button>
            </div>

            {/* NOTAS (AHORA AL FINAL) */}
            <textarea
              style={{ marginTop: "15px" }}
              placeholder="Notas adicionales..."
            />

            {/* BOTONES */}
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
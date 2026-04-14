import "../css/reservas.css";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

interface Reserva {
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
}

export default function Reservas() {

  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  const [reservas] = useState<Reserva[]>([
    {
      titulo: "Proyecto de Electrónica",
      fecha: "03 Agosto 2026",
      hora: "1:00 PM - 2:00 PM",
      lugar: "L1"
    },
    {
      titulo: "Robótica",
      fecha: "05 Agosto 2026",
      hora: "3:00 PM - 5:00 PM",
      lugar: "L2"
    },
    {
      titulo: "Sistemas Digitales",
      fecha: "08 Agosto 2026",
      hora: "10:00 AM - 12:00 PM",
      lugar: "L3"
    }
  ]);

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

      <Sidebar />

      <div className="content">

        <div className="navbar">
          <h2>Reservación</h2>
          <input className="search-box" placeholder="🔍 Buscar..." />
          <div>Hello, Name 🔔</div>
        </div>

        <div className="main">

          <div className="labs">
            <h2>Laboratorios</h2>
            <div className="lab-card" onClick={() => setShowModal(true)}>
              <h3>Laboratorio L1</h3>

              <div className="lab-info">
                <p>Instrumentos para prácticas Físicas, Estáticas, etc</p>
                <span className="disponibilidad">Disponible: 08:00 - 18:00</span>
              </div>
            </div>

            <div className="lab-card" onClick={() => setShowModal(true)}>
              <h3>Laboratorio L2</h3>

              <div className="lab-info">
                <p>Instrumentos para prácticas Físicas, Estáticas, etc</p>
                <span className="disponibilidad">Disponible: 08:00 - 18:00</span>
              </div>
            </div>

            <div className="lab-card" onClick={() => setShowModal(true)}>
              <h3>Laboratorio L3</h3>
              <div className="lab-info">
                <p>Instrumentos para prácticas Físicas, Estáticas, etc</p>
                <span className="disponibilidad">Disponible: 08:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* PANEL TIPO LISTA (SIN BURBUJAS) */}
          <div className="reservas-panel">
            <h3 className="titulo-reservas">Mis reservaciones</h3>

            {reservas.map((reserva, index) => (
              <div key={index} className="reserva-card">
                <h4>{reserva.titulo}</h4>
                <p>- {reserva.hora}</p>
                <p className="fecha">Vence: {reserva.fecha}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

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
                  <option>Laboratorio L1</option>
                  <option>Laboratorio L2</option>
                  <option>Laboratorio L3</option>
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

            <div style={{ marginTop: "15px" }}>
              <label>Herramientas (opcional)</label>

              {items.map((item, index) => (
                <div key={index} style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => actualizarItem(index, e.target.value)}
                  />
                  <button onClick={() => eliminarItem(index)}>X</button>
                </div>
              ))}

              <button onClick={agregarItem}>+ Añadir ítem</button>
            </div>

            <textarea placeholder="Notas adicionales..." />

            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
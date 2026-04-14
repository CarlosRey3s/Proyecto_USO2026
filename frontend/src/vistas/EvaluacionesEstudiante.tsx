import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/vistaEstudiante.css";

export const EvaluacionesEstudiante: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="menu">
          <h3>Dashboard</h3>

          <ul>
            <li onClick={() => navigate("/")}>
              Dashboard
            </li>

            <li onClick={() => navigate("/reservas")}>
              Reservar
            </li>

            <li className="active" onClick={() => navigate("/evaluaciones")}>
              Evaluaciones
            </li>

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
          <h2>Evaluaciones</h2>

          <input className="search-box" placeholder="🔍 Buscar..." />

          <div>Hello, Name 🔔</div>
        </div>

        {/* MAIN */}
        <div className="main">
          {/* IZQUIERDA */}
          <div className="schedule">
            <h2>Mis evaluaciones</h2>
            <p style={{ marginBottom: "20px" }}>Gestión de evaluaciones de laboratorios</p>

            <div className="tabs">
              <div className="tab active">Pendientes (2)</div>
              <div className="tab">Historial</div>
            </div>

            <div className="card" style={{ marginTop: "20px", borderLeft: "6px solid #FACB4B" }}>
              <p><b>12 OCT 2026</b></p>
              <h3 style={{ margin: "10px 0" }}>Laboratorio de Electrónica</h3>
              <p style={{ color: "#718096", marginBottom: "15px" }}>⏱ 10:00 am - 12:00 pm</p>
              
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ 
                  background: "#feebc8", color: "#b45309", 
                  padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "bold" 
                }}>
                  Evaluación Requerida
                </span>
                <button style={{ 
                  background: "#22806B", color: "white", 
                  padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer",
                  fontWeight: "bold"
                }}>
                  Realizar evaluación
                </button>
              </div>
            </div>
          </div>

          {/* DERECHA */}
          <div className="right-panel">
            <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "150px" }}>
              <span style={{ fontSize: "30px", marginBottom: "10px" }}>📅</span>
              <b>CALENDARIO</b>
            </div>

            <div className="card" style={{ borderLeft: "6px solid #AD868A" }}>
              <p style={{ textAlign: "center" }}>12 OCT 2026</p>
              <h4 style={{ textAlign: "center", margin: "10px 0" }}>Laboratorio de Electrónica</h4>
              <p style={{ textAlign: "center", color: "#AD868A", fontWeight: "bold" }}>Pendiente</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

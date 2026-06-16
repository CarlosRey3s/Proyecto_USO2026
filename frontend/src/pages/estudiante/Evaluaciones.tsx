import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/evaluaciones.css";
import { useAuth } from "../../context/AuthContext";
import { obtenerEncuestas } from "../../services/encuestas.service";

export const Evaluaciones: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [encuestas, setEncuestas] = useState<any[]>([]);

  useEffect(() => {
    const cargar = async () => {
      if (!token) return;
      try {
        const res = await obtenerEncuestas(token);
        const publicadas = (res.data || []).filter((e: any) => {
          if (e.estado !== 'Publicada') return false;
          
          const ahora = new Date();
          const inicio = new Date(e.fecha_inicio);
          const fin = new Date(e.fecha_fin);
          
          return ahora >= inicio && ahora <= fin;
        });
        setEncuestas(publicadas);
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, [token]);

  return (
    <div className="main" style={{ gap: "40px", padding: "30px 40px" }}>
      {/* IZQUIERDA */}
      <div className="schedule" style={{ flex: 1.5 }}>
        <h2 style={{ color: "#000", fontSize: "28px", margin: "0 0 5px 0", fontWeight: "600" }}>Mis Cuestionarios</h2>
        <p style={{ color: "#000", margin: "0 0 30px 0", fontSize: "16px" }}>Cuestionarios de retroalimentación de laboratorios</p>

        <div style={{ display: "flex", gap: "40px", marginBottom: "25px", color: "#000", fontSize: "16px" }}>
          <div style={{ fontWeight: "500", cursor: "pointer" }}>Disponibles ({encuestas.length})</div>
        </div>

        {encuestas.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {encuestas.map(encuesta => (
              <div key={encuesta.id} className="reserva-card" style={{
                position: "relative",
                background: "#FFFFFF",
                borderRadius: "15px",
                padding: "25px 35px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}>
                <h3 style={{ margin: "0", color: "#000", fontSize: "18px", fontWeight: "600" }}>{encuesta.titulo}</h3>
                <p style={{ margin: "0", color: "#555", fontSize: "16px" }}>{encuesta.laboratorio_nombre || 'General'}</p>

                <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span 
                    style={{ color: "var(--verde)", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => navigate(`/realizar-evaluacion?id=${encuesta.id}`)}
                  >
                    Llenar cuestionario →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="reserva-card" style={{
            background: "#FFFFFF",
            borderRadius: "15px",
            padding: "25px 35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px"
          }}>
            <p style={{ color: "#707EAE", fontSize: "16px", margin: 0, textAlign: "center" }}>
              No hay cuestionarios disponibles.
            </p>
          </div>
        )}
      </div>

      {/* DERECHA - panel informativo */}
      <div className="right-panel" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "40px", maxWidth: "400px" }}>
        <div style={{ background: "#D9D9D9", borderRadius: "20px", padding: "35px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", justifyContent: "center" }}>
          <h4 style={{ margin: 0, color: "#000", fontSize: "17px", fontWeight: "600", textAlign: "center" }}>Tu opinión es importante</h4>
          <p style={{ margin: 0, color: "#555", fontSize: "16px", fontWeight: "400", textAlign: "center" }}>
            Ayúdanos a mejorar las instalaciones llenando los cuestionarios de retroalimentación. <br/><br/>
            Tus respuestas son totalmente <b>anónimas</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getTitle = () => {
    if (isActive("/")) return "Dashboard";
    if (isActive("/reservas")) return "Reservación Estudiante";
    if (isActive("/evaluaciones")) return "Evaluaciones";
    return "Menú Estudiante";
  };

  return (
    <div className="sidebar">
      <div className="menu">
        <h3>{getTitle()}</h3>

        <ul>
          <li 
            className={isActive("/") ? "active" : ""} 
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Dashboard
          </li>

          <li 
            className={isActive("/reservas") ? "active" : ""} 
            onClick={() => navigate("/reservas")}
            style={{ cursor: "pointer" }}
          >
            Reservar
          </li>

          <li 
            className={isActive("/evaluaciones") ? "active" : ""} 
            onClick={() => navigate("/evaluaciones")}
            style={{ cursor: "pointer" }}
          >
            Evaluaciones
          </li>
        </ul>
      </div>

      <div className="sidebar-bottom">
        Hello, Name
      </div>
    </div>
  );
};
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search, Check, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { obtenerNotificaciones, marcarNotificacionComoLeida } from '../../services/notificaciones.service';
// import '../../css/Navbar.css'; // <-- Descomenta y ajusta esta ruta cuando crees el CSS

interface NavbarProps {
  onToggleMenu: () => void;
}

export const Navbar = ({ onToggleMenu }: NavbarProps) => {
  const location = useLocation();
  const { user, token } = useAuth();
  
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') return 'Dashboard';
    if (path === '/reservas') return 'Reservación';
    if (path === '/evaluaciones') return 'Evaluaciones';
    if (path === '/calendario') return 'Calendario';
    if (path === '/inventario') return 'Inventario';
    if (path === '/admin-evaluaciones') return 'Gestión de Evaluaciones';
    if (path === '/realizar-evaluacion') return 'Realizando Evaluación';
     if (path === '/admin/dashboard') return 'Dashboard Admin';
    return 'Proyecto USO';
  };

  const cargarNotificaciones = async () => {
    if (token && user?.rol?.toLowerCase() === 'admin') {
      try {
        const data = await obtenerNotificaciones(token);
        if (Array.isArray(data)) {
          setNotificaciones(data);
        } else {
          console.error("El backend no devolvió un arreglo:", data);
        }
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      }
    }
  };

  useEffect(() => {
    cargarNotificaciones();
  }, [token, user]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMostrarNotificaciones(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarcarLeida = async (id: number) => {
    if (!token) return;
    try {
      await marcarNotificacionComoLeida(id, token);
      setNotificaciones(notificaciones.map(n => 
        n.id === id ? { ...n, leida: 1 } : n
      ));
    } catch (error) {
      console.error("Error al marcar como leída:", error);
    }
  };

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <header className="navbar">
      
      {/* Lado Izquierdo */}
      <div className="navbar-left">
        <button className="icon-button menu-toggle" onClick={onToggleMenu}>
          <Menu size={20} strokeWidth={2} />
        </button>
        <h1 className="navbar-title">{getTitle()}</h1>
      </div>

      {/* Centro: El Buscador Protagonista */}
      <div className="navbar-center">
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            className="search-input-navbar" 
            placeholder="Buscar en todo el sistema..." 
          />
        </div>
      </div>

      {/* Lado Derecho */}
      <div className="navbar-right">
        <div className="user-info-navbar">
          <span className="user-greeting">Hola, {user?.nombres || 'Astrid'}</span>
          <div className="user-avatar-navbar">{user?.nombres ? user.nombres.charAt(0) : 'A'}</div>
        </div>
        
        <div className="notification-container" ref={dropdownRef} style={{ position: 'relative' }}>
          <button 
            className="icon-button notification-button"
            onClick={() => {
              if (!mostrarNotificaciones) {
                cargarNotificaciones();
              }
              setMostrarNotificaciones(!mostrarNotificaciones);
            }}
          >
            <Bell size={20} strokeWidth={2} />
            {noLeidas > 0 && (
              <span className="notification-badge">{noLeidas}</span>
            )}
          </button>
          
          {mostrarNotificaciones && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notificaciones</h3>
                {noLeidas > 0 && <span className="badge-count">{noLeidas} nuevas</span>}
              </div>
              <div className="notifications-list">
                {notificaciones.length === 0 ? (
                  <div className="notification-empty">No tienes notificaciones</div>
                ) : (
                  notificaciones.map(noti => (
                    <div key={noti.id} className={`notification-item ${noti.leida ? 'leida' : 'no-leida'}`}>
                      <div className="notification-icon">
                        <Info size={16} />
                      </div>
                      <div className="notification-content">
                        <h4>{noti.titulo}</h4>
                        <p>{noti.mensaje}</p>
                        <span className="notification-time">
                          {new Date(noti.fecha_creacion).toLocaleString()}
                        </span>
                      </div>
                      {!noti.leida && (
                        <button 
                          className="mark-read-btn" 
                          onClick={() => handleMarcarLeida(noti.id)}
                          title="Marcar como leída"
                        >
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
};
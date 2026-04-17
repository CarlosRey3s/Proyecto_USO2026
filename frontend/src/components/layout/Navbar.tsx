import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';

// Definimos que este componente recibe una propiedad
interface NavbarProps {
  onToggleMenu: () => void;
}

export const Navbar = ({ onToggleMenu }: NavbarProps) => {
export const Navbar = () => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') return 'Dashboard';
    if (path === '/reservas') return 'Reservación';
    if (path === '/evaluaciones') return 'Evaluaciones';
    if (path === '/calendario') return 'Calendario';
    if (path === '/inventario') return 'Inventario';
    if (path === '/realizar-evaluacion') return 'Realizando Evaluación';
    return 'Proyecto USO';
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* ¡Agregamos el evento onClick aquí! */}
        <button className="icon-button" onClick={onToggleMenu}>
        <button className="icon-button menu-toggle">
          <Menu size={28} strokeWidth={1.5} />
        </button>
        <h1 className="navbar-title">{getTitle()}</h1>
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <input 
            type="text" 
            className="search-box" 
            placeholder="🔍 Buscar..." 
          />
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <span>Hello, Name</span>
          <div className="user-avatar">N</div>
        </div>
        <button className="icon-button notification-button">
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
};
import { Menu, Bell } from 'lucide-react';

// Definimos que este componente recibe una propiedad
interface NavbarProps {
  onToggleMenu: () => void;
}

export const Navbar = ({ onToggleMenu }: NavbarProps) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* ¡Agregamos el evento onClick aquí! */}
        <button className="icon-button" onClick={onToggleMenu}>
          <Menu size={28} strokeWidth={1.5} />
        </button>
        <h1 className="navbar-title">Calendario</h1>
      </div>

      <div className="navbar-right">
        <div className="user-profile-mini"></div>
        <button className="icon-button">
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
};
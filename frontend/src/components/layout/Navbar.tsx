import { Menu, Bell } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="icon-button">
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
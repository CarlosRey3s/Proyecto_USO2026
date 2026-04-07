import React from 'react';
import { Menu, Calendar, ClipboardList, User, ChevronDown } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-avatar-container">
        <div className="avatar-circle-large"></div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-item">
          Dashboard
        </div>
        <div className="nav-item">
          Reservar
        </div>
        <div className="nav-item active">
          Evaluaciones
        </div>
        <div className="nav-item">
          Perfil
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="footer-user-info">
          <span>Hello, Name</span>
          <div className="avatar-circle-small"></div>
        </div>
        <ChevronDown size={16} />
      </div>
    </aside>
  );
};

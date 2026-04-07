import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="top-header">
      <div className="header-left">
        <Menu size={24} style={{ cursor: 'pointer' }} />
        <h1 className="header-title">Evaluaciones</h1>
      </div>
      
      <div className="header-search">
        <Search className="search-icon" size={16} />
        <input type="text" className="search-input" placeholder="" />
      </div>
      
      <div className="header-right">
        <span>Hello, Name</span>
        <div className="header-user-avatar"></div>
        <Bell size={20} style={{ cursor: 'pointer' }} />
      </div>
    </header>
  );
};

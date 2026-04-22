import { Link, useLocation } from 'react-router-dom';
// 1. Importamos los iconos que necesitamos
import { LayoutDashboard, Calendar, ClipboardList, BookOpen, Package, } from 'lucide-react';
// import '../../css/Sidebar.css'; // <-- Descomenta y ajusta esta ruta

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") return true;
    if (path !== "/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // 2. Añadimos la propiedad 'icon' a cada item
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Reservar', path: '/reservas' },
    { name: 'Evaluaciones', path: '/evaluaciones' },
    { name: 'Calendario', path: '/calendario' },
    { name: 'Inventario', path: '/inventario' },
    { name: 'Dashboard Admin', path: '/admin/dashboard' },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Reservar', path: '/reservas', icon: BookOpen },
    { name: 'Mis Evaluaciones', path: '/evaluaciones', icon: ClipboardList },
    { name: 'Gestión Evaluaciones', path: '/admin-evaluaciones', icon: ClipboardList },
    { name: 'Calendario', path: '/calendario', icon: Calendar },
    { name: 'Inventario', path: '/inventario', icon: Package },
  ];

  return (
    <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>

      {/* 3. Nueva Cabecera Compacta con Buscador */}
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <div className="sidebar-avatar">
            USO
          </div>
        </div>
      </div>

      <nav className="menu">
        <ul className="sidebar-nav">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon; // Extraemos el componente del icono

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`sidebar-link ${active ? 'active' : ''}`}
                >
                  {/* 4. Renderizamos el icono a un tamaño elegante (18px) */}
                  <Icon size={18} className="link-icon" />
                  <span className="link-text">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Parte inferior más compacta */}
      <div className="sidebar-bottom">
        <div className="user-profile-mini"></div>
        <div className="user-info">
          <span className="user-name">Hola, Astrid</span>
        </div>
      </div>
    </aside>
  );
};
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") return true;
    if (path !== "/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getTitle = () => {
    if (isActive("/dashboard")) return "Dashboard";
    if (isActive("/reservas")) return "Reservación Estudiante";
    if (isActive("/evaluaciones")) return "Evaluaciones";
    if (isActive("/calendario")) return "Calendario";
    if (isActive("/inventario")) return "Inventario";
    return "Menú Estudiante";
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Reservar', path: '/reservas' },
    { name: 'Evaluaciones', path: '/evaluaciones' },
    { name: 'Calendario', path: '/calendario' },
    { name: 'Inventario', path: '/inventario' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo-container">
        <div className="sidebar-avatar">
          USO
        </div>
      </div>

      <nav className="menu">
        <h3>{getTitle()}</h3>
        <ul className="sidebar-nav">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`sidebar-link ${active ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-bottom">
        Hello, Name
      </div>
    </aside>
  );
};
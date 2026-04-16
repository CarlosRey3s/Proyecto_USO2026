import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Reservas', path: '/reservas' },
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

      <nav>
        <ul className="sidebar-nav">
          {menuItems.map((item) => {
            // Comprobamos si la ruta actual coincide con el item para pintarlo de amarillo
            const isActive = location.pathname.includes(item.path);
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
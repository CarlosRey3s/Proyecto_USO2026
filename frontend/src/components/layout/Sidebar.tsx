import { Link, useLocation } from 'react-router-dom';

// Definimos la propiedad que recibe
interface SidebarProps {
  isOpen: boolean;
}
export const Sidebar = ({isOpen}: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Calendario', path: '/calendario' },
    { name: 'Inventario', path: '/inventario' },
    { name: 'Mensajes', path: '/mensajes' },
  ];

  return (
    //Si isOpne es falso, le regresamos la clase 'Collapsed'
   <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
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
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  BookOpen,
  Package,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  RefreshCw,
  Users,
  FlaskConical,
} from 'lucide-react';
import '../../index.css';

interface SidebarProps {
  isOpen: boolean;
  onToggle?: () => void;
  userName?: string;
  userRole?: string;
  onToggleRole?: () => void;
}

const adminMenuItems = [
  { name: 'Gestión Evaluaciones',  path: '/admin-evaluaciones', icon: ClipboardList   },
  { name: 'Calendario',            path: '/calendario',         icon: Calendar        },
  { name: 'Inventario',            path: '/inventario',         icon: Package         },
  { name: 'Laboratorios',          path: '/admin/laboratorios', icon: FlaskConical    },
  { name: 'Usuarios',              path: '/admin/usuarios',     icon: Users           },
  { name: 'Reportes',              path: '/admin/reportes',     icon: ClipboardList   },
  { name: 'Dashboard Admin',       path: '/admin/dashboard',    icon: ShieldCheck     },
];

const studentMenuItems = [
  { name: 'Dashboard',             path: '/dashboard',          icon: LayoutDashboard },
  { name: 'Reservar',              path: '/reservas',           icon: BookOpen        },
  { name: 'Mis Evaluaciones',      path: '/evaluaciones',       icon: ClipboardList   },
];

export const Sidebar = ({
  isOpen,
  onToggle,
  userName  = 'Astrid',
  userRole  = 'Administrador',
  onToggleRole,
}: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  /* Iniciales para el avatar */
  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className={`sb${!isOpen ? ' sb--collapsed' : ''}`}>

      {/* ── Toggle button ── */}
      {onToggle && (
        <button
          className="sb__toggle"
          onClick={onToggle}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* ── Header / Avatar ── */}
      <div className="sb__header">
        <div className="sb__avatar">
          {initials}
        </div>
        <div className="sb__brand">
          <span className="sb__brand-name">USO</span>
          <span className="sb__brand-sub">Laboratorios</span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="sb__divider" />

      {/* ── Navigation ── */}
      <nav className="sb__nav" aria-label="Menú principal">
        <ul className="sb__list">
          {(userRole === 'Administrador' ? adminMenuItems : studentMenuItems).map((item) => {
            const active = isActive(item.path);
            const Icon   = item.icon;

            return (
              <li key={item.name} className="sb__item">
                <Link
                  to={item.path}
                  className={`sb__link${active ? ' sb__link--active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {/* Active indicator bar */}
                  {active && <span className="sb__indicator" />}

                  <span className="sb__icon">
                    <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                  </span>

                  <span className="sb__label">{item.name}</span>

                  {/* Active dot badge */}
                  {active && <span className="sb__dot" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Bottom user section ── */}
      <div className="sb__bottom">
        <div className="sb__divider" />

        <div className="sb__user">
          <div className="sb__user-avatar">{initials}</div>
          <div className="sb__user-info">
            <span className="sb__user-name">Hola, {userName}</span>
            <span className="sb__user-role">{userRole}</span>
          </div>
          <button 
            className="sb__logout" 
            aria-label="Cambiar de rol" 
            title="Cambiar de rol"
            onClick={onToggleRole}
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};
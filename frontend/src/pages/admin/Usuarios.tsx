import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import '../../css/usuarios.css';
import { usuariosService } from '../../services/usuarios.service';
import { ModalNuevoUsuario } from '../../components/shared/ModalNuevoUsuario';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const UsuariosView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsuarios = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await usuariosService.getUsuarios();
      if (result && result.success && result.data) {
        const mappedUsers = result.data.map((u: any) => ({
          id: u.id.toString(),
          name: `${u.nombres} ${u.apellidos}`,
          email: u.correo,
          role: u.rol
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <div>
          <h2 className="usuarios-title">Administración de Usuarios</h2>
          <p className="usuarios-subtitle">Gestión de accesos y roles del sistema.</p>
        </div>
        <button className="btn-add-user" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} strokeWidth={3} /> Agregar usuario
        </button>
      </div>

      <div className="usuarios-controls">
        <select className="filter-select">
          <option value="">Todos los roles</option>
          <option value="Admin">Admin</option>
          <option value="Docente">Docente</option>
          <option value="Estudiante">Estudiante</option>
        </select>

        <div className="search-users">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Buscar usuarios" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol Actual</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} style={{textAlign: 'center'}}>Cargando usuarios...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={4} style={{textAlign: 'center'}}>No se encontraron usuarios.</td></tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td><a href={`mailto:${u.email}`} className="user-email">{u.email}</a></td>
                  <td>{u.role}</td>
                  <td>
                    <div className="action-menu-container">
                      <button 
                        className="action-button"
                        onClick={() => setActiveMenu(activeMenu === u.id ? null : u.id)}
                      >
                        <MoreVertical size={20} />
                      </button>

                      {activeMenu === u.id && (
                        <div className="actions-dropdown">
                          <button className="dropdown-item" onClick={() => setActiveMenu(null)}>
                            <Edit2 size={16} />
                            Editar
                          </button>
                          <button className="dropdown-item delete" onClick={() => setActiveMenu(null)}>
                            <Trash2 size={16} />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ModalNuevoUsuario 
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => fetchUsuarios()}
        />
      )}
    </div>
  );
};

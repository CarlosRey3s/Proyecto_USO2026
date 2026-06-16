import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import '../../css/laboratorios.css';
import { laboratoriosService } from '../../services/laboratorios.service';
import { ModalNuevoLaboratorio } from '../../components/shared/ModalNuevoLaboratorio';

interface LabItem {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  created_at: string;
}

export const LaboratoriosView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [labs, setLabs] = useState<LabItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [labToEdit, setLabToEdit] = useState<LabItem | null>(null);

  const fetchLabs = async () => {
    setIsLoading(true);
    try {
      const response = await laboratoriosService.getAllLaboratorios();
      if (response.success && response.data) {
        setLabs(response.data);
      }
    } catch (error) {
      console.error('Error fetching laboratorios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  const handleAddLab = () => {
    setLabToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditLab = (lab: LabItem) => {
    setLabToEdit(lab);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleDeleteLab = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este laboratorio?')) {
      try {
        const response = await laboratoriosService.deleteLaboratorio(id);
        if (response.success) {
          fetchLabs();
        } else {
          alert('Error al eliminar: ' + response.message);
        }
      } catch (error) {
        alert('Error de red al intentar eliminar.');
      }
    }
    setActiveMenu(null);
  };

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lab.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? lab.estado === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="labs-container">
      <div className="labs-header">
        <div>
          <h2 className="labs-title">Gestión de Laboratorios</h2>
          <p className="labs-subtitle">Administración de laboratorios actuales y futuros.</p>
        </div>
        <button className="btn-add-lab" onClick={handleAddLab}>
          <Plus size={16} strokeWidth={3} /> Agregar laboratorio
        </button>
      </div>

      <div className="labs-controls">
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <div className="search-labs">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Buscar laboratorios..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="labs-table-container">
        {isLoading ? (
          <p>Cargando laboratorios...</p>
        ) : (
          <table className="labs-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha de Creación</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredLabs.map((lab) => (
                <tr key={lab.id}>
                  <td>{lab.nombre}</td>
                  <td>{lab.descripcion || 'Sin descripción'}</td>
                  <td>{new Date(lab.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${lab.estado}`}>
                      {lab.estado}
                    </span>
                  </td>
                  <td>
                    <div className="action-menu-container">
                      <button 
                        className="action-button"
                        onClick={() => setActiveMenu(activeMenu === lab.id ? null : lab.id)}
                      >
                        <MoreVertical size={20} />
                      </button>

                      {activeMenu === lab.id && (
                        <div className="actions-dropdown">
                          <button className="dropdown-item" onClick={() => handleEditLab(lab)}>
                            <Edit2 size={16} />
                            Editar
                          </button>
                          <button className="dropdown-item delete" onClick={() => handleDeleteLab(lab.id)}>
                            <Trash2 size={16} />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <ModalNuevoLaboratorio 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => fetchLabs()} 
          labToEdit={labToEdit}
        />
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Package, Filter, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import '../../css/inventario.css';
import { useAuth } from '../../context/AuthContext';

interface InventoryItem {
  id: string;
  name: string;
  code: string;
  category: string;
  numero_cas?: string;
  laboratorio_id?: string;
  laboratory: string;
  location: string;
  unidad_medida?: string;
  stock: number;
  status: 'Disponible' | 'Agotado' | 'En Mantenimiento';
  image?: string;
}

export const InventarioView = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Estados para el reporte de problemas
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({
    itemId: '',
    itemName: '',
    tipoProblema: 'Dañado',
    descripcion: '',
    cantidad: 1
  });
  
  const [formData, setFormData] = useState({
    nombre: '',
    codigo_interno: '',
    numero_cas: '',
    categoria: '',
    laboratorio_id: '',
    ubicacion_fisica: '',
    cantidad_stock: '',
    unidad_medida: ''
  });
  
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [laboratoriosDB, setLaboratoriosDB] = useState<{id: number, nombre: string}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resInv, resLabs] = await Promise.all([
          fetch('http://localhost:4000/api/inventario'),
          fetch('http://localhost:4000/api/laboratorios')
        ]);
        
        const dataInv = await resInv.json();
        const dataLabs = await resLabs.json();
        
        if (dataInv.success) {
          setItems(dataInv.data);
        }
        if (dataLabs.success) {
          setLaboratoriosDB(dataLabs.data);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Disponible': return 'badge-success';
      case 'Agotado': return 'badge-danger';
      case 'En Mantenimiento': return 'badge-warning';
      default: return '';
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este item del inventario?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/inventario/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        
        if (data.success) {
          setItems(items.filter(item => item.id !== id));
          alert('Item eliminado correctamente');
        } else {
          alert('Error al eliminar: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión al eliminar');
      }
      setActiveMenu(null);
    }
  };

  const handleGuardarItem = async () => {
    try {
      const isEditing = !!editingId;
      const url = isEditing 
        ? `http://localhost:4000/api/inventario/${editingId}`
        : 'http://localhost:4000/api/inventario';
        
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        alert(isEditing ? 'Item actualizado exitosamente' : 'Item guardado exitosamente');
        setShowModal(false);
        window.location.reload(); // Recargar para mostrar el nuevo dato
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión');
    }
  };

  const handleReportarSubmit = async () => {
    try {
      if (!reportData.descripcion) {
        alert('Por favor, ingresa una descripción del problema.');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/inventario/${reportData.itemId}/reportar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo_problema: reportData.tipoProblema,
          descripcion: reportData.descripcion,
          cantidad: reportData.cantidad,
          usuario_id: user?.id
        })
      });
      const data = await response.json();
      
      if (data.success) {
        alert('Reporte enviado exitosamente');
        setShowReportModal(false);
        setReportData({ itemId: '', itemName: '', tipoProblema: 'Dañado', descripcion: '', cantidad: 1 });
        window.location.reload(); // Recargar para mostrar el stock actualizado
      } else {
        alert('Error al enviar reporte: ' + data.message);
      }
    } catch (error) {
      console.error('Error enviando reporte:', error);
      alert('Error de conexión al enviar reporte');
    }
  };

  const uniqueLabs = Array.from(new Set(items.map(item => item.laboratory)));

  const filteredItems = items.filter(item => 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedLab === '' || item.laboratory === selectedLab)
  );

  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <h2 className="inventario-title">Inventario</h2>
        <button className="btn-add-item" onClick={() => {
          setEditingId(null);
          setFormData({
            nombre: '',
            codigo_interno: '',
            numero_cas: '',
            categoria: '',
            laboratorio_id: '',
            ubicacion_fisica: '',
            cantidad_stock: '',
            unidad_medida: ''
          });
          setShowModal(true);
        }}>
          <Plus size={20} />
          <span>Item</span>
        </button>
      </div>

      <div className="inventario-controls">
        <div className="search-inventory">
          <Search className="search-inventory-icon" size={18} />
          <input 
            type="text" 
            placeholder="Buscar en el Inventario" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select className="filter-select">
          <option value="">Categoría</option>
          <option value="vidrieria">Vidriería</option>
          <option value="equipos">Equipos</option>
          <option value="quimicos">Químicos</option>
        </select>

        <select 
          className="filter-select" 
          value={selectedLab} 
          onChange={(e) => setSelectedLab(e.target.value)}
        >
          <option value="">Todos los laboratorios</option>
          {uniqueLabs.map(lab => (
            <option key={lab} value={lab}>{lab}</option>
          ))}
        </select>

        <select className="filter-select">
          <option value="">Ubicación</option>
          <option value="estante">Estante</option>
          <option value="almacen">Almacén</option>
          <option value="mesa">Mesa</option>
        </select>

        <select className="filter-select">
          <option value="">Estado</option>
          <option value="disponible">Disponible</option>
          <option value="agotado">Agotado</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </div>

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Categoría</th>
              <th>Laboratorio</th>
              <th>Ubicación</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="item-cell">
                    <div className="item-image">
                      {item.image ? <img src={item.image} alt={item.name} /> : <Package size={24} />}
                    </div>
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-code">Código: {item.code}</span>
                    </div>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>{item.laboratory}</td>
                <td>{item.location}</td>
                <td>{item.stock}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-menu-container">
                    <button 
                      className="action-button"
                      onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                    >
                      <MoreVertical size={20} />
                    </button>

                    {activeMenu === item.id && (
                      <div className="actions-dropdown">
                        <button className="dropdown-item" onClick={() => { 
                          setEditingId(item.id);
                          setFormData({
                            nombre: item.name || '',
                            codigo_interno: item.code || '',
                            numero_cas: item.numero_cas || '',
                            categoria: item.category || '',
                            laboratorio_id: item.laboratorio_id || '',
                            ubicacion_fisica: item.location || '',
                            cantidad_stock: item.stock ? item.stock.toString() : '',
                            unidad_medida: item.unidad_medida || ''
                          });
                          setShowModal(true); 
                          setActiveMenu(null); 
                        }}>
                          <Edit2 size={16} />
                          Editar
                        </button>
                        <button 
                          className="dropdown-item" 
                          style={{ color: '#d97706' }}
                          onClick={() => {
                            setReportData({ ...reportData, itemId: item.id, itemName: item.name });
                            setShowReportModal(true);
                            setActiveMenu(null);
                          }}
                        >
                          <AlertTriangle size={16} />
                          Reportar Problema
                        </button>
                        <button className="dropdown-item delete" onClick={() => handleDeleteItem(item.id)}>
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
      </div>

      {/* MODAL PARA AGREGAR/MODIFICAR ITEM */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Agregar/Modificar Item</h2>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                {/* COLUMNA IZQUIERDA */}
                <div className="form-column">
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label>Nombre del Item</label>
                    <input type="text" placeholder="Ej. Vaso de Precipitado" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label>Código Interno</label>
                    <input type="text" placeholder="Ej. INV-001" value={formData.codigo_interno} onChange={e => setFormData({...formData, codigo_interno: e.target.value})} />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label>N° CAS (Opcional)</label>
                    <input type="text" placeholder="Ej. 7647-01-0" value={formData.numero_cas} onChange={e => setFormData({...formData, numero_cas: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label>Categoría</label>
                    <select value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                      <option value="">Seleccione</option>
                      <option value="vidrieria">Vidriería</option>
                      <option value="equipos">Equipos</option>
                      <option value="quimicos">Químicos</option>
                    </select>
                    
                    <div className="checkbox-list">
                      <label className="checkbox-item">
                        <input type="checkbox" checked readOnly /> Clase de laboratorio Azul
                      </label>
                      <label className="checkbox-item">
                        <input type="checkbox" checked readOnly /> Reserva Verde
                      </label>
                      <label className="checkbox-item">
                        <input type="checkbox" checked readOnly /> Reserva Rojo
                      </label>
                    </div>
                  </div>
                </div>

                {/* COLUMNA DERECHA */}
                <div className="form-column">
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label>Cantidad Inicial</label>
                    <input type="number" placeholder="0" value={formData.cantidad_stock} onChange={e => setFormData({...formData, cantidad_stock: e.target.value})} />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label>Unidad de Medida</label>
                    <select value={formData.unidad_medida} onChange={e => setFormData({...formData, unidad_medida: e.target.value})}>
                      <option value="">Ej. ml, g, unidades</option>
                      <option value="unidades">Unidades</option>
                      <option value="ml">Mililitros (ml)</option>
                      <option value="g">Gramos (g)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label>Laboratorio</label>
                    <select value={formData.laboratorio_id} onChange={e => setFormData({...formData, laboratorio_id: e.target.value})}>
                      <option value="">Seleccione laboratorio</option>
                      {laboratoriosDB.map(lab => (
                        <option key={lab.id} value={lab.id}>{lab.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label>Ubicación Física</label>
                    <input type="text" placeholder="Ej. Estante A, Mesa 1" value={formData.ubicacion_fisica} onChange={e => setFormData({...formData, ubicacion_fisica: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label>Agregar Imagen</label>
                    <div className="image-upload-zone">
                      <Filter size={32} />
                      <span style={{ fontSize: '12px', marginTop: '8px' }}>Haga clic para subir</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Nota Adicional</label>
                <textarea rows={4} placeholder="Escriba notas adicionales aquí..."></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-save" onClick={handleGuardarItem}>Guardar</button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA REPORTAR PROBLEMA */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2>Reportar Problema</h2>
            </div>
            
            <div className="modal-body">
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Item a reportar</label>
                <input 
                  type="text" 
                  value={reportData.itemName} 
                  readOnly 
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Tipo de Problema</label>
                <select 
                  value={reportData.tipoProblema} 
                  onChange={e => {
                    const tipo = e.target.value;
                    setReportData({
                      ...reportData, 
                      tipoProblema: tipo,
                      cantidad: tipo === 'Agotado' ? 0 : (reportData.cantidad === 0 ? 1 : reportData.cantidad)
                    });
                  }}
                >
                  <option value="Dañado">Dañado / Roto</option>
                  <option value="Agotado">Agotado / Sin stock</option>
                  <option value="Mantenimiento">Necesita Mantenimiento</option>
                  <option value="Otro">Otro problema</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Descripción detallada</label>
                <textarea 
                  rows={4} 
                  placeholder="Por favor, describe el problema con detalle..."
                  value={reportData.descripcion}
                  onChange={e => setReportData({...reportData, descripcion: e.target.value})}
                ></textarea>
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Cantidad afectada</label>
                <input 
                  type="number" 
                  min={reportData.tipoProblema === 'Agotado' ? "0" : "1"}
                  value={reportData.cantidad}
                  onChange={e => setReportData({...reportData, cantidad: parseInt(e.target.value) || 0})}
                  disabled={reportData.tipoProblema === 'Agotado'}
                  style={{ backgroundColor: reportData.tipoProblema === 'Agotado' ? '#f3f4f6' : 'white' }}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-save" onClick={handleReportarSubmit} style={{ backgroundColor: '#eab308', color: 'white' }}>Enviar Reporte</button>
              <button className="btn-cancel" onClick={() => setShowReportModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import '../../css/inventario.css';

interface Reporte {
  id: number;
  item_id: number;
  item_nombre: string;
  item_codigo: string;
  tipo_problema: string;
  descripcion: string;
  cantidad: number;
  estado: string;
  fecha_reporte: string;
  usuario_nombre: string;
  usuario_apellido: string;
}

export const ReportesView = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const fetchReportes = async () => {
    try {
      console.log("Haciendo fetch a /api/inventario/reportes/todos...");
      const response = await fetch('http://localhost:4000/api/inventario/reportes/todos');
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      
      if (data.success) {
        setReportes(data.data);
      } else {
        console.error("El servidor devolvió un error:", data.message, data.error);
        alert("Error del servidor: " + data.message);
      }
    } catch (error) {
      console.error('Error de red al obtener reportes:', error);
      alert("Error de conexión al obtener los reportes.");
    }
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  const handleResolverReporte = async (id: number) => {
    if (window.confirm('¿Confirmas que este problema ha sido resuelto? (El stock volverá a estar disponible)')) {
      try {
        const response = await fetch(`http://localhost:4000/api/inventario/reportes/${id}/resolver`, {
          method: 'PUT'
        });
        const data = await response.json();
        if (data.success) {
          alert('Reporte resuelto exitosamente');
          fetchReportes(); // Recargar datos
        } else {
          alert('Error al resolver: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
      }
    }
  };

  const handleCambiarEstadoPrestamo = async (id: number, nuevoEstado: string) => {
    const confirmMsg = nuevoEstado === 'Entregado' 
      ? '¿Confirmas la entrega del equipo? (Se descontará del stock disponible)'
      : '¿Confirmas la devolución del equipo? (Se devolverá al stock)';

    if (window.confirm(confirmMsg)) {
      try {
        const response = await fetch(`http://localhost:4000/api/inventario/reportes/${id}/estadoPrestamo`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nuevoEstado })
        });
        const data = await response.json();
        if (data.success) {
          alert(`Préstamo marcado como ${nuevoEstado}`);
          fetchReportes();
        } else {
          alert('Error al actualizar: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
      }
    }
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === 'Resuelto') return 'badge-success';
    if (status === 'Entregado') return 'badge-info';
    if (status === 'Devuelto') return 'badge-secondary';
    return 'badge-warning'; // Pendiente
  };

  const filteredReportes = reportes.filter(reporte => {
    const nombre = reporte.item_nombre || '';
    const codigo = reporte.item_codigo || '';
    const desc = reporte.descripcion || '';
    return (
      (nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
       codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
       desc.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filtroEstado === '' || reporte.estado === filtroEstado)
    );
  });

  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <h2 className="inventario-title">Reportes de Inventario</h2>
        <p className="usuarios-subtitle">Historial de problemas reportados en los ítems</p>
      </div>

      <div className="inventario-controls">
        <div className="search-inventory">
          <Search className="search-inventory-icon" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por ítem o descripción..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="filter-select"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los Estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Resuelto">Resuelto</option>
          <option value="Entregado">Entregado</option>
          <option value="Devuelto">Devuelto</option>
        </select>
      </div>

      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ítem Afectado</th>
              <th>Problema</th>
              <th>Cant.</th>
              <th>Reportado por</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReportes.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>No hay reportes para mostrar</td>
              </tr>
            ) : (
              filteredReportes.map((reporte) => (
                <tr key={reporte.id}>
                  <td>#{reporte.id}</td>
                  <td>
                    <div className="item-cell">
                      <div className="item-info">
                        <span className="item-name">{reporte.item_nombre || 'Desconocido'}</span>
                        <span className="item-code">Cód: {reporte.item_codigo || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong>{reporte.tipo_problema}</strong>
                      <span style={{ fontSize: '12px', color: '#64748B', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={reporte.descripcion}>
                        {reporte.descripcion}
                      </span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 'bold' }}>{reporte.cantidad}</span></td>
                  <td>{reporte.usuario_nombre ? `${reporte.usuario_nombre} ${reporte.usuario_apellido}` : 'Sistema/Anónimo'}</td>
                  <td>{new Date(reporte.fecha_reporte).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(reporte.estado)}`}>
                      {reporte.estado}
                    </span>
                  </td>
                  <td>
                    {reporte.tipo_problema === 'Préstamo' ? (
                      <>
                        {reporte.estado === 'Pendiente' && (
                          <button 
                            style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                            onClick={() => handleCambiarEstadoPrestamo(reporte.id, 'Entregado')}
                          >
                            <CheckCircle size={14} /> Entregar
                          </button>
                        )}
                        {reporte.estado === 'Entregado' && (
                          <button 
                            style={{ background: 'var(--verde)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                            onClick={() => handleCambiarEstadoPrestamo(reporte.id, 'Devuelto')}
                          >
                            <CheckCircle size={14} /> Marcar Devuelto
                          </button>
                        )}
                        {reporte.estado === 'Devuelto' && (
                          <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                            <CheckCircle size={14} /> Devuelto
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        {reporte.estado === 'Pendiente' ? (
                          <button 
                            style={{ background: 'var(--verde)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                            onClick={() => handleResolverReporte(reporte.id)}
                          >
                            <CheckCircle size={14} /> Resolver
                          </button>
                        ) : (
                          <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                            <CheckCircle size={14} /> Resuelto
                          </span>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

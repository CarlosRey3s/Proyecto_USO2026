import React, { useState } from 'react';
import '../../css/ModalNuevoLaboratorio.css';
import { laboratoriosService } from '../../services/laboratorios.service';

interface ModalNuevoLaboratorioProps {
  onClose: () => void;
  onSuccess: () => void;
  labToEdit?: {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
  } | null;
}

export function ModalNuevoLaboratorio({ onClose, onSuccess, labToEdit }: ModalNuevoLaboratorioProps) {
  const [nombre, setNombre] = useState(labToEdit ? labToEdit.nombre : '');
  const [descripcion, setDescripcion] = useState(labToEdit && labToEdit.descripcion ? labToEdit.descripcion : '');
  const [estado, setEstado] = useState(labToEdit ? labToEdit.estado : 'activo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuardar = async () => {
    if (!nombre.trim()) {
      setError('El nombre del laboratorio es obligatorio');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let response;
      if (labToEdit) {
        response = await laboratoriosService.updateLaboratorio(labToEdit.id, {
          nombre,
          descripcion,
          estado
        });
      } else {
        response = await laboratoriosService.createLaboratorio({
          nombre,
          descripcion,
          estado
        });
      }

      if (response.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.message || 'Ocurrió un error al guardar el laboratorio');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSave = nombre.trim().length > 0 && !isSubmitting;

  return (
    <div className="nl-overlay">
      <div className="nl-modal">
        <div className="nl-header">
          <div>
            <div className="nl-header-title">{labToEdit ? 'Editar Laboratorio' : 'Nuevo Laboratorio'}</div>
            <div className="nl-header-sub">
              {labToEdit ? 'Modifica los datos del laboratorio' : 'Registra un nuevo espacio en el sistema'}
            </div>
          </div>
          <button className="nl-close" onClick={onClose}>×</button>
        </div>

        <div className="nl-body">
          {error && <div style={{ color: '#d32f2f', fontSize: '0.9rem' }}>{error}</div>}
          
          <div className="nl-field-group">
            <label className="nl-field-label">NOMBRE DEL LABORATORIO</label>
            <input 
              className="nl-input" 
              placeholder="Ej: Laboratorio de Redes Avanzadas" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
            />
          </div>

          <div className="nl-field-group">
            <label className="nl-field-label">DESCRIPCIÓN</label>
            <textarea 
              className="nl-textarea" 
              placeholder="Detalles sobre el uso o equipamiento general..." 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)} 
            />
          </div>

          <div className="nl-field-group">
            <label className="nl-field-label">ESTADO INICIAL</label>
            <select 
              className="nl-select" 
              value={estado} 
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div className="nl-footer">
          <button className="nl-btn-cancel" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </button>
          <button 
            className="nl-btn-save" 
            onClick={handleGuardar} 
            disabled={!canSave}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar laboratorio'}
          </button>
        </div>
      </div>
    </div>
  );
}

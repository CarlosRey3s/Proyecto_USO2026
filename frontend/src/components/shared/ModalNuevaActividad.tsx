import { X, Search, Plus } from 'lucide-react';
import '../../css/ModalNuevaActividad.css'



interface ModalNuevaActividadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalNuevaActividad = ({ isOpen, onClose }: ModalNuevaActividadProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Cabecera del Modal */}
        <div className="modal-header">
          <h2>Nueva Actividad</h2>
          <button onClick={onClose} className="btn-close">
            <X size={24} />
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="modal-body">
          <form className="actividad-form">
            
            {/* Columna Izquierda */}
            <div className="form-col">
              <div className="form-group">
                <label>Título</label>
                <input type="text" className="input-field" />
              </div>
              <div className="form-group">
                <label>Docente</label>
                <input type="text" className="input-field" />
              </div>
              <div className="form-group">
                <label>Laboratorio</label>
                <input type="text" className="input-field" />
              </div>
              <div className="form-group">
                <label>N° Estudiantes</label>
                <input type="number" className="input-field" defaultValue={0} min="0" />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="form-col">
              <div className="fecha-hora-group">
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Desde</label>
                  <input type="time" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Hasta</label>
                  <input type="time" className="input-field" />
                </div>
              </div>

              {/* Se agregó la clase mb-espacio para separar esta sección de la de abajo */}
              <div className="checkbox-group mb-espacio">
                <input type="checkbox" id="repetir" />
                <label htmlFor="repetir">Repetir Semanalmente</label>
              </div>

              <div className="form-group">
                <label>Tipo de actividad</label>
                <select className="input-field">
                  <option>Seleccione...</option>
                </select>
              </div>
            </div>

            {/* Sección Inferior (Ancho completo) */}
            <div className="form-full-width">
              <label>Agregar del Inventario (Opcional)</label>
              <div className="search-inventario">
                <Search size={18} className="search-icon" />
                <input type="text" className="input-field pl-8 search-input-wide" />
              </div>
              
              {/* Lista de items simulada */}
              <div className="items-list">
                <div className="item-row">
                  <span>Osciloscopio Digital</span>
                  <span className="status-disponible">(Disponible)</span>
                  <button type="button" className="btn-remove-item"><X size={16}/></button>
                </div>
                <div className="item-row">
                  <span>Multímetro</span>
                  <span className="status-bajo">(Stock Bajo)</span>
                  <button type="button" className="btn-remove-item"><X size={16}/></button>
                </div>
              </div>

              <button type="button" className="btn-add-item">
                <Plus size={18} /> Añadir item
              </button>

              <textarea className="input-field textarea-nota"></textarea>
            </div>

          </form>
        </div>

        {/* Footer con Botones de Acción */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-cancelar">Cancelar</button>
          <button className="btn-guardar">Guardar</button>
        </div>

      </div>
    </div>
  );
};
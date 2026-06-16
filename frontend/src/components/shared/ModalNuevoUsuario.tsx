import React, { useState } from 'react';
import '../../css/ModalNuevoLaboratorio.css';
import { usuariosService } from '../../services/usuarios.service';

interface ModalNuevoUsuarioProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalNuevoUsuario({ onClose, onSuccess }: ModalNuevoUsuarioProps) {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [expediente, setExpediente] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('Estudiante');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuardar = async () => {
    if (!nombres.trim() || !apellidos.trim() || !correo.trim() || !expediente.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await usuariosService.crearUsuario({
        nombres,
        apellidos,
        correo,
        expediente,
        password,
        rol
      });

      if (response.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.message || 'Ocurrió un error al guardar el usuario');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSave = nombres.trim() !== '' && apellidos.trim() !== '' && correo.trim() !== '' && expediente.trim() !== '' && password.trim() !== '' && !isSubmitting;

  return (
    <div className="nl-overlay">
      <div className="nl-modal">
        <div className="nl-header">
          <div>
            <div className="nl-header-title">Nuevo Usuario</div>
            <div className="nl-header-sub">Registra un nuevo usuario en el sistema</div>
          </div>
          <button className="nl-close" onClick={onClose}>×</button>
        </div>

        <div className="nl-body">
          {error && <div style={{ color: '#d32f2f', fontSize: '0.9rem', marginBottom: '10px' }}>{error}</div>}
          
          <div className="nl-field-group">
            <label className="nl-field-label">NOMBRES</label>
            <input 
              className="nl-input" 
              placeholder="Ej: Juan Carlos" 
              value={nombres} 
              onChange={(e) => setNombres(e.target.value)} 
            />
          </div>

          <div className="nl-field-group">
            <label className="nl-field-label">APELLIDOS</label>
            <input 
              className="nl-input" 
              placeholder="Ej: Pérez Gómez" 
              value={apellidos} 
              onChange={(e) => setApellidos(e.target.value)} 
            />
          </div>

          <div className="nl-field-group">
            <label className="nl-field-label">CORREO ELECTRÓNICO</label>
            <input 
              className="nl-input" 
              type="email"
              placeholder="Ej: juan@usonsonate.edu.sv" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
            />
          </div>

          <div className="nl-field-group">
            <label className="nl-field-label">EXPEDIENTE</label>
            <input 
              className="nl-input" 
              placeholder="Ej: JP18001" 
              value={expediente} 
              onChange={(e) => setExpediente(e.target.value)} 
            />
          </div>

          <div className="nl-field-group">
            <label className="nl-field-label">CONTRASEÑA</label>
            <input 
              className="nl-input" 
              type="password"
              placeholder="Min. 6 caracteres" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div className="nl-field-group">
            <label className="nl-field-label">ROL DEL USUARIO</label>
            <select 
              className="nl-select" 
              value={rol} 
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="Estudiante">Estudiante</option>
              <option value="Docente">Docente</option>
              <option value="Admin">Admin</option>
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
            {isSubmitting ? 'Guardando...' : 'Guardar usuario'}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, ClipboardList, HelpCircle, Search, Filter, ArrowLeft, MoreVertical, Eye } from 'lucide-react';
import '../../css/admin-evaluaciones.css';
import { useAuth } from '../../context/AuthContext';
import { obtenerEncuestas, crearEncuesta, eliminarEncuesta, obtenerResultados } from '../../services/encuestas.service';

interface Question {
  texto_pregunta: string;
  tipo: 'escala_1_5' | 'texto_abierto';
}

interface Encuesta {
  id: number;
  titulo: string;
  laboratorio_nombre: string | null;
  fecha_creacion: string;
  preguntas_count: number;
  estado: string;
}

export const EvaluacionesAdminView = () => {
  const { token } = useAuth();
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'results'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const [resultados, setResultados] = useState<any[]>([]);
  const [encuestaSeleccionada, setEncuestaSeleccionada] = useState<Encuesta | null>(null);

  // Formulario de creación
  const [titulo, setTitulo] = useState('');
  const [laboratorioId, setLaboratorioId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [preguntas, setPreguntas] = useState<Question[]>([]);
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [currentQuestionType, setCurrentQuestionType] = useState<'escala_1_5' | 'texto_abierto'>('escala_1_5');

  const cargarEncuestas = async () => {
    if (!token) return;
    try {
      const data = await obtenerEncuestas(token);
      setEncuestas(data.data || []);
    } catch (error) {
      console.error('Error al cargar encuestas:', error);
    }
  };

  useEffect(() => {
    cargarEncuestas();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (window.confirm('¿Estás seguro de que deseas eliminar este cuestionario?')) {
      try {
        await eliminarEncuesta(id, token);
        await cargarEncuestas();
        setActiveMenu(null);
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  const handleVerResultados = async (encuesta: Encuesta) => {
    if (!token) return;
    try {
      const res = await obtenerResultados(encuesta.id, token);
      setResultados(res.data || []);
      setEncuestaSeleccionada(encuesta);
      setViewMode('results');
      setActiveMenu(null);
    } catch (error) {
      alert('Error al obtener resultados');
    }
  };

  const handleAddQuestion = () => {
    if (!currentQuestionText) {
      alert('Por favor, escribe el enunciado de la pregunta.');
      return;
    }
    setPreguntas([...preguntas, { texto_pregunta: currentQuestionText, tipo: currentQuestionType }]);
    setCurrentQuestionText('');
  };

  const handleRemoveQuestion = (index: number) => {
    setPreguntas(preguntas.filter((_, i) => i !== index));
  };

  const handleGuardarEncuesta = async () => {
    if (!token) return;
    if (!titulo || preguntas.length === 0 || !fechaInicio || !fechaFin) {
      alert('Debes asignar un título, fechas de inicio/fin y al menos una pregunta.');
      return;
    }
    try {
      await crearEncuesta({
        titulo,
        laboratorio_id: laboratorioId || null,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        estado: 'Publicada',
        preguntas
      }, token);
      alert('Cuestionario publicado con éxito');
      setTitulo('');
      setLaboratorioId('');
      setFechaInicio('');
      setFechaFin('');
      setPreguntas([]);
      setViewMode('list');
      cargarEncuestas();
    } catch (error) {
      alert('Error al crear el cuestionario');
    }
  };

  const filteredEncuestas = encuestas.filter(e => 
    e.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- VISTA DE LISTA ---
  if (viewMode === 'list') {
    return (
      <div className="admin-eval-container">
        <div className="admin-eval-header-inventory">
          <div className="title-section">
            <h2 className="admin-eval-title">Gestión de Cuestionarios</h2>
            <p className="admin-eval-subtitle">Administra encuestas de retroalimentación del área.</p>
          </div>
          <button className="btn-add-eval" onClick={() => setViewMode('create')}>
            <Plus size={20} />
            <span>Añadir Cuestionario</span>
          </button>
        </div>

        <div className="admin-eval-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por título..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-eval-table-wrapper">
          <table className="inventory-style-table">
            <thead>
              <tr>
                <th>Cuestionario</th>
                <th>Laboratorio</th>
                <th>Fecha Modificación</th>
                <th>Preguntas</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredEncuestas.map((encuesta) => (
                <tr key={encuesta.id}>
                  <td>
                    <div className="eval-cell">
                      <div className="eval-icon">
                        <ClipboardList size={20} />
                      </div>
                      <div className="eval-info">
                        <span className="eval-name">{encuesta.titulo}</span>
                      </div>
                    </div>
                  </td>
                  <td>{encuesta.laboratorio_nombre || 'General'}</td>
                  <td>{new Date(encuesta.fecha_creacion).toLocaleDateString()}</td>
                  <td style={{ textAlign: 'center' }}>{encuesta.preguntas_count}</td>
                  <td>
                    <span className={`status-pill ${encuesta.estado.toLowerCase()}`}>
                      {encuesta.estado}
                    </span>
                  </td>
                  <td>
                    <div className="action-menu-container">
                      <button 
                        className="action-dot-btn"
                        onClick={() => setActiveMenu(activeMenu === encuesta.id ? null : encuesta.id)}
                      >
                        <MoreVertical size={20} />
                      </button>
                      
                      {activeMenu === encuesta.id && (
                        <div className="actions-dropdown">
                          <button className="dropdown-item" onClick={() => handleVerResultados(encuesta)}>
                            <Eye size={16} /> Ver Resultados
                          </button>
                          <button className="dropdown-item delete" onClick={() => handleDelete(encuesta.id)}>
                            <Trash2 size={16} /> Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEncuestas.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#64748B' }}>
                    No hay cuestionarios creados aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // --- VISTA DE RESULTADOS ---
  if (viewMode === 'results') {
    // Agrupar resultados por respuesta (por participante anónimo)
    const respuestasAgrupadas: Record<number, any[]> = {};
    resultados.forEach(res => {
      if (!respuestasAgrupadas[res.respuesta_id]) {
        respuestasAgrupadas[res.respuesta_id] = [];
      }
      respuestasAgrupadas[res.respuesta_id].push(res);
    });

    return (
      <div className="admin-eval-container">
        <div className="admin-eval-header-create">
          <button className="btn-back" onClick={() => setViewMode('list')}>
            <ArrowLeft size={18} /> Volver a la lista
          </button>
          <div style={{ marginTop: '16px' }}>
            <h2 className="admin-eval-title">Resultados: {encuestaSeleccionada?.titulo}</h2>
            <p className="admin-eval-subtitle">Revisa el feedback anónimo dejado por los estudiantes.</p>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Object.entries(respuestasAgrupadas).length === 0 ? (
            <div className="eval-card" style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#64748B' }}>Aún no hay respuestas para este cuestionario.</p>
            </div>
          ) : (
            Object.entries(respuestasAgrupadas).map(([respuestaId, detalles], idx) => (
              <div key={respuestaId} className="eval-card" style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--azul-primario)' }}>
                  Participante Anónimo #{idx + 1}
                  <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '10px', fontWeight: 'normal' }}>
                    {new Date(detalles[0].fecha_respuesta).toLocaleString()}
                  </span>
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {detalles.map((d: any, index: number) => (
                    <div key={index} style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                      <p style={{ fontWeight: '500', marginBottom: '5px' }}>{d.texto_pregunta}</p>
                      {d.tipo === 'escala_1_5' ? (
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star} style={{ color: star <= (d.valor_escala || 0) ? '#FBBF24' : '#E2E8F0', fontSize: '18px' }}>
                              ★
                            </span>
                          ))}
                          <span style={{ marginLeft: '10px', color: '#64748B', fontWeight: 'bold' }}>{d.valor_escala}/5</span>
                        </div>
                      ) : (
                        <p style={{ color: '#475569', fontStyle: 'italic', margin: 0 }}>"{d.comentario_texto}"</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // --- VISTA DE CREACIÓN ---
  return (
    <div className="admin-eval-container">
      <div className="admin-eval-header-create">
        <button className="btn-back" onClick={() => setViewMode('list')}>
          <ArrowLeft size={18} /> Volver a la lista
        </button>
        <div style={{ marginTop: '16px' }}>
          <h2 className="admin-eval-title">Nuevo Cuestionario</h2>
          <p className="admin-eval-subtitle">Diseña preguntas de escala y comentarios para obtener feedback.</p>
        </div>
      </div>

      <div className="admin-eval-grid">
        {/* PANEL IZQUIERDO */}
        <div className="eval-left-panel">
          <section className="eval-card" style={{ marginBottom: '24px' }}>
            <h3><ClipboardList size={20} /> Datos Generales</h3>
            <div className="form-grid-eval">
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Título del Cuestionario</label>
                <input 
                  type="text" 
                  placeholder="Ej. Satisfacción del Laboratorio de Redes" 
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Laboratorio (Opcional)</label>
                <select 
                  value={laboratorioId}
                  onChange={(e) => setLaboratorioId(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', width: '100%' }}
                >
                  <option value="">Todos los laboratorios</option>
                  <option value="1">Laboratorio de Redes</option>
                  <option value="2">Laboratorio de Cómputo</option>
                  <option value="3">Laboratorio de Electrónica</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fecha y Hora de Inicio</label>
                <input 
                  type="datetime-local" 
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Fecha y Hora de Fin</label>
                <input 
                  type="datetime-local" 
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="eval-card">
            <h3><HelpCircle size={20} /> Constructor de Preguntas</h3>
            <div className="question-builder-form">
              <div className="form-group">
                <label>Enunciado de la Pregunta</label>
                <textarea 
                  rows={2} 
                  placeholder="Ej. ¿Cómo calificaría el estado del equipo?"
                  value={currentQuestionText}
                  onChange={(e) => setCurrentQuestionText(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Tipo de Pregunta</label>
                <select 
                  value={currentQuestionType}
                  onChange={(e) => setCurrentQuestionType(e.target.value as any)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                >
                  <option value="escala_1_5">Escala del 1 al 5 (Estrellas)</option>
                  <option value="texto_abierto">Texto Abierto (Comentario final)</option>
                </select>
              </div>

              <button className="btn-primary-eval" onClick={handleAddQuestion}>
                <Plus size={20} /> Añadir Pregunta
              </button>
            </div>
          </section>
        </div>

        {/* PANEL DERECHO */}
        <div className="eval-right-panel">
          <section className="eval-card" style={{ position: 'sticky', top: '20px' }}>
            <h3 style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
               Resumen ({preguntas.length})
            </h3>
            
            <div className="questions-list-eval" style={{ marginTop: '16px', maxHeight: '400px', overflowY: 'auto' }}>
              {preguntas.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '14px', fontStyle: 'italic' }}>
                  No hay preguntas añadidas aún.
                </p>
              ) : (
                preguntas.map((q, idx) => (
                  <div key={idx} className="question-item-mini" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '8px', marginBottom: '8px' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: 'var(--azul-primario)' }}>{idx + 1}. {q.texto_pregunta}</p>
                      <p style={{ fontSize: '12px', margin: 0, color: '#64748B' }}>
                        {q.tipo === 'escala_1_5' ? 'Calificación (1-5)' : 'Comentario de texto'}
                      </p>
                    </div>
                    <button className="btn-delete-q" onClick={() => handleRemoveQuestion(idx)} style={{ color: 'var(--rosado)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ marginTop: '24px' }}>
              <button 
                className="btn-primary-eval" 
                style={{ width: '100%', background: 'linear-gradient(to right, var(--verde), var(--verde-oscuro))' }}
                disabled={preguntas.length === 0}
                onClick={handleGuardarEncuesta}
              >
                <Save size={18} /> Publicar Cuestionario
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

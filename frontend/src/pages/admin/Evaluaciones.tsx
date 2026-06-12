import React, { useState } from 'react';
import { Search, Filter, Star, MessageSquare, Plus, ArrowLeft, Save, Trash2, HelpCircle, Eye, User } from 'lucide-react';
import '../../css/admin-evaluaciones.css';

interface Question {
  id: number;
  text: string;
}

interface LabValuation {
  id: string;
  title: string;
  laboratory: string;
  date: string;
  status: 'Publicada' | 'Borrador';
  responses: number;
  questionsCount: number;
}

interface AnswerDetail {
  questionText: string;
  rating: number;
}

// Interfaz para las respuestas simuladas de los estudiantes
interface StudentResponse {
  id: string;
  valuationId: string;
  studentName: string;
  date: string;
  averageRating: number;
  comment: string;
  answers: AnswerDetail[];
}

export const EvaluacionesAdminView = () => {
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'results'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValuation, setSelectedValuation] = useState<LabValuation | null>(null);
  
  // Estado para el modal de detalles del estudiante
  const [selectedStudentResponse, setSelectedStudentResponse] = useState<StudentResponse | null>(null);
  
  // Lista de "Cuestionarios de Valoración" creados por el admin
  const [valuations, setValuations] = useState<LabValuation[]>([
    {
      id: '1',
      title: 'Valoración Práctica 4 - Circuitos',
      laboratory: 'Laboratorio de Electrónica',
      date: '2024-04-15',
      status: 'Publicada',
      responses: 15,
      questionsCount: 3
    },
    {
      id: '2',
      title: 'Cuestionario Fin de Ciclo',
      laboratory: 'Laboratorio de Redes',
      date: '2024-04-18',
      status: 'Publicada',
      responses: 8,
      questionsCount: 5
    }
  ]);

  // Respuestas simuladas (para demostración en la vista de resultados)
  const allResponses: StudentResponse[] = [
    { 
      id: '101', valuationId: '1', studentName: 'Juan Pérez', date: '2024-04-16', averageRating: 4.8, comment: 'Los equipos estaban excelentes.',
      answers: [
        { questionText: '¿Cómo califica el ambiente general del laboratorio?', rating: 5 },
        { questionText: '¿En qué estado se encontraban los equipos utilizados?', rating: 5 },
        { questionText: '¿Cómo valora la limpieza y el orden del área de trabajo?', rating: 4.5 }
      ]
    },
    { 
      id: '102', valuationId: '1', studentName: 'María Gómez', date: '2024-04-16', averageRating: 3.5, comment: 'Faltaban cables en mi mesa.',
      answers: [
        { questionText: '¿Cómo califica el ambiente general del laboratorio?', rating: 4 },
        { questionText: '¿En qué estado se encontraban los equipos utilizados?', rating: 2.5 },
        { questionText: '¿Cómo valora la limpieza y el orden del área de trabajo?', rating: 4 }
      ]
    },
    { 
      id: '103', valuationId: '1', studentName: 'Carlos Rodríguez', date: '2024-04-17', averageRating: 5.0, comment: 'Todo muy bien.',
      answers: [
        { questionText: '¿Cómo califica el ambiente general del laboratorio?', rating: 5 },
        { questionText: '¿En qué estado se encontraban los equipos utilizados?', rating: 5 },
        { questionText: '¿Cómo valora la limpieza y el orden del área de trabajo?', rating: 5 }
      ]
    },
    { 
      id: '104', valuationId: '2', studentName: 'Ana Martínez', date: '2024-04-19', averageRating: 4.2, comment: 'Buena práctica pero la guía era algo confusa.',
      answers: [
        { questionText: '¿Los equipos de red funcionaban correctamente?', rating: 4 },
        { questionText: '¿La velocidad de conexión era adecuada?', rating: 5 },
        { questionText: '¿El software necesario estaba instalado?', rating: 5 },
        { questionText: '¿Cómo califica la iluminación del laboratorio?', rating: 4 },
        { questionText: '¿El espacio por mesa era suficiente?', rating: 3 }
      ]
    },
    { 
      id: '105', valuationId: '2', studentName: 'Luis Fernández', date: '2024-04-20', averageRating: 2.0, comment: 'No servía el switch de la estación 4.',
      answers: [
        { questionText: '¿Los equipos de red funcionaban correctamente?', rating: 1 },
        { questionText: '¿La velocidad de conexión era adecuada?', rating: 2 },
        { questionText: '¿El software necesario estaba instalado?', rating: 3 },
        { questionText: '¿Cómo califica la iluminación del laboratorio?', rating: 2 },
        { questionText: '¿El espacio por mesa era suficiente?', rating: 2 }
      ]
    }
  ];

  const [generalInfo, setGeneralInfo] = useState({
    title: '',
    laboratory: '',
    date: '',
    description: ''
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionText, setCurrentQuestionText] = useState('');

  const filteredValuations = valuations.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.laboratory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este cuestionario?")) {
      setValuations(valuations.filter(v => v.id !== id));
    }
  };

  const handleViewResults = (val: LabValuation) => {
    setSelectedValuation(val);
    setViewMode('results');
  };

  const handleAddQuestion = () => {
    if (!currentQuestionText.trim()) {
      alert("Por favor escribe la pregunta.");
      return;
    }
    const newQuestion: Question = {
      id: Date.now(),
      text: currentQuestionText
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionText('');
  };

  const handleRemoveQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handlePublish = () => {
    if (!generalInfo.title || !generalInfo.laboratory) {
      alert("Por favor completa el título y el laboratorio.");
      return;
    }
    if (questions.length === 0) {
      alert("Debes agregar al menos una pregunta para valorar.");
      return;
    }

    const newEval: LabValuation = {
      id: Date.now().toString(),
      title: generalInfo.title,
      laboratory: generalInfo.laboratory,
      date: generalInfo.date || new Date().toISOString().split('T')[0],
      status: 'Publicada',
      responses: 0,
      questionsCount: questions.length
    };
    
    setValuations([...valuations, newEval]);
    alert("¡Cuestionario de valoración publicado exitosamente!");
    setViewMode('list');
    
    // Resetear formulario
    setGeneralInfo({ title: '', laboratory: '', date: '', description: '' });
    setQuestions([]);
  };

  const renderStars = (rating: number) => {
    // Redondeamos para visualización simple
    const roundedRating = Math.round(rating);
    return (
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={16} 
            fill={star <= roundedRating ? '#FFD700' : 'transparent'} 
            color={star <= roundedRating ? '#FFD700' : '#CBD5E1'} 
          />
        ))}
        <span style={{ marginLeft: '8px', fontSize: '14px', fontWeight: 'bold' }}>{rating.toFixed(1)}/5</span>
      </div>
    );
  };

  if (viewMode === 'create') {
    return (
      <div className="admin-eval-container">
        <div className="admin-eval-header-create">
          <button className="btn-back" onClick={() => setViewMode('list')}>
            <ArrowLeft size={18} />
            Volver a la lista
          </button>
          <div style={{ marginTop: '16px' }}>
            <h2 className="admin-eval-title">Nuevo Cuestionario de Valoración (1 a 5)</h2>
            <p className="admin-eval-subtitle">Diseña las preguntas. Los estudiantes responderán cada una con una puntuación del 1 al 5.</p>
          </div>
        </div>

        <div className="admin-eval-grid">
          {/* PANEL IZQUIERDO: CONSTRUCTOR */}
          <div className="eval-left-panel">
            <section className="eval-card" style={{ marginBottom: '24px' }}>
              <h3>Datos del Cuestionario</h3>
              <div className="form-grid-eval" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '15px' }}>
                <div className="form-group">
                  <label>Título del Cuestionario</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Evaluación del Entorno de Laboratorio" 
                    value={generalInfo.title}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, title: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div className="form-group">
                  <label>Laboratorio a Valorar</label>
                  <select 
                    value={generalInfo.laboratory}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, laboratory: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  >
                    <option value="">Seleccione Laboratorio</option>
                    <option value="Laboratorio de Redes">Laboratorio de Redes</option>
                    <option value="Laboratorio de Cómputo">Laboratorio de Cómputo</option>
                    <option value="Laboratorio de Electrónica">Laboratorio de Electrónica</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha Límite</label>
                  <input 
                    type="date" 
                    value={generalInfo.date}
                    onChange={(e) => setGeneralInfo({ ...generalInfo, date: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>
            </section>

            <section className="eval-card">
              <h3><HelpCircle size={20} /> Añadir Pregunta (Escala 1 al 5)</h3>
              <div className="question-builder-form" style={{ marginTop: '15px' }}>
                <div className="form-group">
                  <label>Pregunta a evaluar</label>
                  <textarea 
                    rows={3} 
                    placeholder="Ej. ¿Cómo califica el ambiente del laboratorio?"
                    value={currentQuestionText}
                    onChange={(e) => setCurrentQuestionText(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', resize: 'vertical' }}
                  ></textarea>
                </div>
                
                <div style={{ marginTop: '10px', background: '#F1F5F9', padding: '10px', borderRadius: '6px', fontSize: '13px', color: '#64748B' }}>
                  Nota: El estudiante responderá esta pregunta seleccionando del 1 al 5 estrellas.
                </div>

                <button 
                  className="btn-primary-eval" 
                  onClick={handleAddQuestion}
                  style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Plus size={20} /> Añadir a la lista
                </button>
              </div>
            </section>
          </div>

          {/* PANEL DERECHO: RESUMEN */}
          <div className="eval-right-panel">
            <section className="eval-card" style={{ position: 'sticky', top: '20px' }}>
              <h3 style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
                 Preguntas Agregadas ({questions.length})
              </h3>
              
              <div className="questions-list-eval" style={{ marginTop: '16px', maxHeight: '400px', overflowY: 'auto' }}>
                {questions.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '14px', fontStyle: 'italic' }}>
                    No hay preguntas añadidas aún.
                  </p>
                ) : (
                  questions.map((q, idx) => (
                    <div key={q.id} className="question-item-mini" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '12px', borderRadius: '6px', marginBottom: '10px' }}>
                      <p style={{ margin: 0, fontSize: '14px', flex: 1 }}><strong>{idx + 1}.</strong> {q.text}</p>
                      <button 
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '5px', marginLeft: '10px' }}
                        onClick={() => handleRemoveQuestion(q.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  className="btn-primary-eval" 
                  style={{ width: '100%', background: 'linear-gradient(to right, var(--verde), var(--verde-oscuro))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none', color: '#FFF', padding: '12px', borderRadius: '8px', fontWeight: 'bold' }}
                  disabled={questions.length === 0}
                  onClick={handlePublish}
                >
                  <Save size={18} /> Publicar Cuestionario
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'results' && selectedValuation) {
    const valuationResponses = allResponses.filter(r => r.valuationId === selectedValuation.id);

    return (
      <div className="admin-eval-container" style={{ position: 'relative' }}>
        <div className="admin-eval-header-create">
          <button className="btn-back" onClick={() => setViewMode('list')}>
            <ArrowLeft size={18} />
            Volver a la lista
          </button>
          <div style={{ marginTop: '16px' }}>
            <h2 className="admin-eval-title">Resultados: {selectedValuation.title}</h2>
            <p className="admin-eval-subtitle">
              Laboratorio: {selectedValuation.laboratory} | {valuationResponses.length} respuestas recibidas.
            </p>
          </div>
        </div>

        <div className="admin-eval-table-wrapper" style={{ marginTop: '20px' }}>
          <table className="inventory-style-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Fecha Respuesta</th>
                <th>Promedio de Calificación</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {valuationResponses.map((res) => (
                <tr key={res.id}>
                  <td>
                    <div className="eval-info" style={{ fontWeight: '500' }}>
                      {res.studentName}
                    </div>
                  </td>
                  <td>{res.date}</td>
                  <td>{renderStars(res.averageRating)}</td>
                  <td>
                    <button 
                      style={{ background: 'none', border: '1px solid var(--verde)', color: 'var(--verde)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold' }}
                      onClick={() => setSelectedStudentResponse(res)}
                    >
                      <User size={16} /> Ver Respuestas
                    </button>
                  </td>
                </tr>
              ))}
              {valuationResponses.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    Aún no se han recibido respuestas para este cuestionario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL DE DETALLES DEL ESTUDIANTE */}
        {selectedStudentResponse && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="modal-content" style={{ background: '#FFF', width: '90%', maxWidth: '600px', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Detalle de Valoración</h3>
                  <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>Estudiante: <strong>{selectedStudentResponse.studentName}</strong></p>
                </div>
                <button 
                  onClick={() => setSelectedStudentResponse(null)}
                  style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedStudentResponse.answers.map((answer, index) => (
                  <div key={index} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>
                      {index + 1}. {answer.questionText}
                    </p>
                    {renderStars(answer.rating)}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageSquare size={16} /> Comentario Adicional
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#14532D' }}>
                  {selectedStudentResponse.comment || <em>"Sin comentarios."</em>}
                </p>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'right' }}>
                <button 
                  onClick={() => setSelectedStudentResponse(null)}
                  style={{ background: 'var(--verde)', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- VISTA PRINCIPAL (LISTA) ---
  return (
    <div className="admin-eval-container">
      <div className="admin-eval-header-inventory">
        <div className="title-section">
          <h2 className="admin-eval-title">Cuestionarios de Valoración</h2>
          <p className="admin-eval-subtitle">Administra cuestionarios donde los estudiantes valoran aspectos del laboratorio de 1 a 5.</p>
        </div>
        <button className="btn-add-eval" onClick={() => setViewMode('create')}>
          <Plus size={20} />
          <span>Crear Cuestionario</span>
        </button>
      </div>

      <div className="admin-eval-controls">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por título o laboratorio..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-filter">
          <Filter size={18} />
          Filtrar
        </button>
      </div>

      <div className="admin-eval-table-wrapper">
        <table className="inventory-style-table">
          <thead>
            <tr>
              <th>Cuestionario</th>
              <th>Laboratorio</th>
              <th>Preguntas</th>
              <th>Respuestas recibidas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredValuations.map((val) => (
              <tr key={val.id}>
                <td>
                  <div className="eval-info" style={{ fontWeight: '500' }}>
                    {val.title}
                  </div>
                </td>
                <td>{val.laboratory}</td>
                <td style={{ textAlign: 'center' }}>{val.questionsCount}</td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--verde)' }}>{val.responses}</span>
                </td>
                <td>
                  <span className={`status-pill ${val.status.toLowerCase()}`}>
                    {val.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--verde)', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 'bold' }}
                      onClick={() => handleViewResults(val)}
                      title="Ver Resultados"
                    >
                      <Eye size={18} /> Resultados
                    </button>
                    <button 
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '5px' }}
                      onClick={() => handleDelete(val.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredValuations.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                  No se encontraron cuestionarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

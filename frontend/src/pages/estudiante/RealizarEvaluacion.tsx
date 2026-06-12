import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/realizarEvaluacion.css';
import { Star } from 'lucide-react';

interface Question {
  id: number;
  text: string;
}

const preguntasSimuladas: Question[] = [
  { id: 1, text: '¿Cómo califica el ambiente general del laboratorio?' },
  { id: 2, text: '¿En qué estado se encontraban los equipos utilizados?' },
  { id: 3, text: '¿Cómo valora la limpieza y el orden del área de trabajo?' }
];

const RealizarEvaluacion: React.FC = () => {
  const navigate = useNavigate();
  // Estado para guardar las calificaciones de cada pregunta (mapa de id -> rating)
  const [ratings, setRatings] = useState<Record<number, number>>({});
  // Estado para el hover de estrellas independiente por pregunta
  const [hoverRatings, setHoverRatings] = useState<Record<number, number>>({});
  const [comentarios, setComentarios] = useState('');
  const [finalizado, setFinalizado] = useState(false);

  const handleEnviar = () => {
    // Verificar que todas las preguntas hayan sido respondidas
    const todasRespondidas = preguntasSimuladas.every(q => ratings[q.id] && ratings[q.id] > 0);
    
    if (!todasRespondidas) {
      alert("Por favor valora todas las preguntas antes de enviar.");
      return;
    }
    // Aquí iría la lógica de envío a la API
    setFinalizado(true);
  };

  const handleRating = (questionId: number, rating: number) => {
    setRatings(prev => ({ ...prev, [questionId]: rating }));
  };

  const handleHover = (questionId: number, rating: number) => {
    setHoverRatings(prev => ({ ...prev, [questionId]: rating }));
  };

  if (finalizado) {
    return (
      <div className="evaluacion-container">
        <div className="evaluacion-card final-card fade-in">
          <div className="final-icon">✅</div>
          <h2 className="pregunta-titulo">¡Valoración Enviada!</h2>
          <p className="pregunta-texto">Tus respuestas han sido registradas. Gracias por ayudarnos a mejorar.</p>
          <div className="footer-buttons" style={{ justifyContent: 'center' }}>
            <button className="btn-continuar" onClick={() => navigate('/evaluaciones')}>
              Volver a Mis Evaluaciones
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluacion-container" style={{ padding: '20px' }}>
      <div className="evaluacion-card fade-in" style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
        <button className="btn-salir" onClick={() => navigate('/evaluaciones')} title="Salir">
          ✕
        </button>

        <h2 className="pregunta-titulo" style={{ marginTop: '20px' }}>Cuestionario de Valoración</h2>
        <p className="pregunta-texto" style={{ marginBottom: '30px' }}>
          Laboratorio de Electrónica - Práctica 4<br/>
          <span style={{ fontSize: '14px', color: '#64748B' }}>Por favor califica del 1 al 5 cada uno de los siguientes aspectos.</span>
        </p>

        <div className="questions-list" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {preguntasSimuladas.map((q, index) => {
            const currentRating = ratings[q.id] || 0;
            const currentHover = hoverRatings[q.id] || 0;
            const displayRating = currentHover || currentRating;

            return (
              <div key={q.id} className="question-item" style={{ background: '#F8FAFC', padding: '20px', borderRadius: '10px' }}>
                <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
                  {index + 1}. {q.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                  <div className="stars-container" style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={36}
                        style={{ 
                          cursor: 'pointer',
                          fill: displayRating >= star ? '#FFD700' : 'transparent',
                          color: displayRating >= star ? '#FFD700' : '#CBD5E1',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={() => handleHover(q.id, star)}
                        onMouseLeave={() => handleHover(q.id, 0)}
                        onClick={() => handleRating(q.id, star)}
                      />
                    ))}
                  </div>
                  <span style={{ color: '#64748B', fontSize: '14px', minWidth: '100px' }}>
                    {currentRating === 1 && "1 - Muy mala"}
                    {currentRating === 2 && "2 - Mala"}
                    {currentRating === 3 && "3 - Regular"}
                    {currentRating === 4 && "4 - Buena"}
                    {currentRating === 5 && "5 - Excelente"}
                    {currentRating === 0 && "Sin calificar"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="comments-section" style={{ marginTop: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Comentarios o Sugerencias (Opcional):
          </label>
          <textarea
            rows={4}
            placeholder="¿Hubo algún problema con el equipo? ¿Qué podríamos mejorar?"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              resize: 'vertical',
              fontFamily: 'inherit',
              fontSize: '14px'
            }}
          ></textarea>
        </div>

        <div className="aviso-guardado" style={{ marginTop: '30px' }}>
          <span>⚠️</span>
          <span>Asegúrate de calificar todas las preguntas antes de enviar.</span>
        </div>

        <div className="footer-buttons" style={{ marginTop: '20px' }}>
          <button 
            className="btn-continuar" 
            onClick={handleEnviar}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Enviar Respuestas
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealizarEvaluacion;

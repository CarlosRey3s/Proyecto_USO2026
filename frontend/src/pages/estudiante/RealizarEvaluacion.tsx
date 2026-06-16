import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/realizarEvaluacion.css';
import { useAuth } from '../../context/AuthContext';
import { obtenerEncuestaPorId, enviarRespuesta } from '../../services/encuestas.service';

export const RealizarEvaluacion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  
  const [encuesta, setEncuesta] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [respuestas, setRespuestas] = useState<any[]>([]);
  const [finalizado, setFinalizado] = useState(false);

  // Valor temporal para la pregunta actual
  const [valorEscala, setValorEscala] = useState<number | null>(null);
  const [comentarioTexto, setComentarioTexto] = useState<string>('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    if (!id || !token) {
      navigate('/evaluaciones');
      return;
    }

    const cargar = async () => {
      try {
        const res = await obtenerEncuestaPorId(Number(id), token);
        setEncuesta(res.data);
      } catch (error) {
        console.error(error);
        navigate('/evaluaciones');
      }
    };
    cargar();
  }, [location.search, token, navigate]);

  if (!encuesta) {
    return <div className="evaluacion-container"><p>Cargando cuestionario...</p></div>;
  }

  const preguntas = encuesta.preguntas || [];
  
  if (preguntas.length === 0) {
    return (
      <div className="evaluacion-container">
        <div className="evaluacion-card fade-in">
          <h2>Este cuestionario no tiene preguntas aún.</h2>
          <button className="btn-continuar" onClick={() => navigate('/evaluaciones')}>Volver</button>
        </div>
      </div>
    );
  }

  const currentPregunta = preguntas[currentStep];
  const progress = ((currentStep) / preguntas.length) * 100;

  const isCurrentAnswerValid = () => {
    if (currentPregunta.tipo === 'escala_1_5') {
      return valorEscala !== null;
    } else {
      return comentarioTexto.trim().length > 0;
    }
  };

  const handleNext = async () => {
    if (!isCurrentAnswerValid()) return;

    // Guardar respuesta actual en el arreglo
    const nuevaRespuesta = {
      pregunta_id: currentPregunta.id,
      valor_escala: currentPregunta.tipo === 'escala_1_5' ? valorEscala : null,
      comentario_texto: currentPregunta.tipo === 'texto_abierto' ? comentarioTexto : null
    };

    const nuevasRespuestas = [...respuestas, nuevaRespuesta];
    setRespuestas(nuevasRespuestas);

    if (currentStep < preguntas.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Limpiar temporal
      setValorEscala(null);
      setComentarioTexto('');
    } else {
      // Enviar al servidor
      try {
        if (token) {
          await enviarRespuesta(encuesta.id, nuevasRespuestas, token);
          setFinalizado(true);
        }
      } catch (error) {
        alert('Hubo un error al enviar tus respuestas');
      }
    }
  };

  if (finalizado) {
    return (
      <div className="evaluacion-container">
        <div className="evaluacion-card final-card fade-in">
          <div className="final-icon">✅</div>
          <h2 className="pregunta-titulo">¡Gracias por tu retroalimentación!</h2>
          <p className="pregunta-texto">Tus respuestas anónimas nos ayudan a mejorar el laboratorio.</p>
          <div className="footer-buttons" style={{ justifyContent: 'center' }}>
            <button className="btn-continuar" onClick={() => navigate('/evaluaciones')}>
              Volver a Cuestionarios
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluacion-container">
      <div className="evaluacion-card fade-in" key={currentStep} style={{ position: 'relative' }}>
        <button className="btn-salir" onClick={() => navigate('/evaluaciones')} title="Salir">
          ✕
        </button>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        
        <p style={{ textAlign: 'left', color: 'var(--rosado)', fontWeight: 'bold', marginBottom: '10px' }}>
          Pregunta {currentStep + 1} de {preguntas.length}
        </p>
        
        <h2 className="pregunta-titulo">{currentPregunta.texto_pregunta}</h2>
        
        {currentPregunta.tipo === 'escala_1_5' ? (
          <div>
            <p className="pregunta-texto">Califica del 1 al 5 estrellas:</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '30px 0' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setValorEscala(star)}
                  style={{
                    fontSize: '40px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: star <= (valorEscala || 0) ? '#FBBF24' : '#E2E8F0',
                    transition: 'color 0.2s'
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="pregunta-texto">Déjanos tu comentario:</p>
            <textarea
              value={comentarioTexto}
              onChange={(e) => setComentarioTexto(e.target.value)}
              placeholder="Escribe tu opinión aquí..."
              style={{
                width: '100%',
                height: '120px',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                outline: 'none',
                resize: 'none',
                fontSize: '16px',
                fontFamily: 'inherit',
                marginTop: '15px'
              }}
            />
          </div>
        )}

        <div className="aviso-guardado" style={{ marginTop: '20px' }}>
          <span>⚠️</span>
          <span>Recuerda que tus respuestas son totalmente anónimas.</span>
        </div>

        <div className="footer-buttons">
          <button 
            className="btn-continuar" 
            disabled={!isCurrentAnswerValid()}
            onClick={handleNext}
          >
            {currentStep === preguntas.length - 1 ? 'Enviar Respuestas' : 'Siguiente'}
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealizarEvaluacion;

import { useState } from 'react';
import { Search, Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Plus, Printer } from 'lucide-react';
import { Calendar, dateFnsLocalizer, type ToolbarProps, type View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'es': es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

// ── 1. AGREGAMOS A QUÉ LABORATORIO PERTENECE CADA EVENTO ──
export interface EventoLaboratorio {
  title: string;
  start: Date;
  end: Date;
  laboratorio: string; // <-- NUEVO: Para saber de qué lab es el evento
}

// Lista de todos nuestros laboratorios que existen
const LABORATORIOS_DISPONIBLES = ['Lab de Redes', 'Lab de Computo'];

// Eventos de prueba con su respectivo laboratorio asignado
const eventosPrueba: EventoLaboratorio[] = [
  {
    title: 'Clase de Cisco CCNA',
    start: new Date(2026, 3, 15, 9, 0),
    end: new Date(2026, 3, 15, 12, 0),
    laboratorio: 'Lab de Redes'
  },
  {
    title: 'Mantenimiento de Servidores',
    start: new Date(2026, 3, 16, 14, 0),
    end: new Date(2026, 3, 16, 17, 0),
    laboratorio: 'Lab de Redes'
  },
  {
    title: 'Clase de Programación III',
    start: new Date(2026, 3, 15, 13, 0),
    end: new Date(2026, 3, 15, 16, 0),
    laboratorio: 'Lab de Computo'
  }
];

const CustomToolbar = (toolbar: ToolbarProps<EventoLaboratorio>) => {
  const irAHoy = () => toolbar.onNavigate('TODAY');
  const irAtras = () => toolbar.onNavigate('PREV');
  const irAdelante = () => toolbar.onNavigate('NEXT');
  const vistaActual = toolbar.view;

  return (
    <div className="calendar-toolbar-custom">
      <div className="toolbar-left">
        <button onClick={irAHoy} className="btn-hoy">Hoy</button>
        <div className="nav-arrows">
          <button onClick={irAtras} className="btn-icon"><ChevronLeft size={20} /></button>
          <button onClick={irAdelante} className="btn-icon"><ChevronRight size={20} /></button>
        </div>
        <h2 className="toolbar-label">{toolbar.label}</h2>
      </div>

      <div className="toolbar-right">
        <button className="btn-search"><Search size={18} /></button>
        <button onClick={() => toolbar.onView('week')} className={`btn-view ${vistaActual === 'week' ? 'active' : ''}`}>Semana</button>
        <button onClick={() => toolbar.onView('month')} className={`btn-view-icon ${vistaActual === 'month' ? 'active' : ''}`}><CalendarIcon size={18} /></button>
      </div>
    </div>
  );
};

export const CalendarioView = () => {
  const [fechaActual, setFechaActual] = useState(new Date(2026, 3, 15));
  const [vistaActual, setVistaActual] = useState<View>('week');

  // ── 2. NUEVOS ESTADOS PARA LOS LABORATORIOS ──
  // Estado para saber qué laboratorios están marcados (por defecto, todos)
  const [labsActivos, setLabsActivos] = useState<string[]>(LABORATORIOS_DISPONIBLES);
  // Estado para saber si el menú está desplegado o contraído
  const [menuDesplegado, setMenuDesplegado] = useState(true);

  // ── 3. LÓGICA DE FILTRADO Y MANEJO DE CLICS ──
  // Esta función decide qué pasa cuando le damos clic a un checkbox
  const toggleLaboratorio = (nombreLab: string) => {
    setLabsActivos((prev) => {
      // Si el laboratorio ya estaba marcado, lo quitamos de la lista
      if (prev.includes(nombreLab)) {
        return prev.filter(lab => lab !== nombreLab);
      }
      // Si no estaba marcado, lo agregamos a la lista
      else {
        return [...prev, nombreLab];
      }
    });
  };

  // MAGIA DE FILTRADO: Solo le pasamos al calendario los eventos cuyo laboratorio esté en "labsActivos"
  const eventosFiltrados = eventosPrueba.filter(evento => 
    labsActivos.includes(evento.laboratorio)
  );

  return (
    <div className="calendar-page-wrapper">
      
      <div className="calendar-main-container">
        <Calendar
          localizer={localizer}
          events={eventosFiltrados} // Le pasamos la lista FILTRADA, no la original
          startAccessor="start"
          endAccessor="end"
          date={fechaActual}
          onNavigate={(nuevaFecha) => setFechaActual(nuevaFecha)}
          view={vistaActual}
          onView={(nuevaVista) => setVistaActual(nuevaVista)}
          culture="es"
          components={{ toolbar: CustomToolbar }}
          style={{ height: '100%' }}
        />
      </div>

      <div className="calendar-sidebar-right">
        <button className="btn-crear"><Plus size={20} /> Crear</button>
        <div className="mini-calendar-placeholder">Mini Calendario</div>

        {/* ── 4. UI: TARJETA DE MIS LABORATORIOS ── */}
        <div className="mis-laboratorios-card">
          
          {/* Cabecera (Ahora es un botón interactivo) */}
          <div 
            className="card-header" 
            onClick={() => setMenuDesplegado(!menuDesplegado)}
            style={{ cursor: 'pointer', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarIcon size={18} /> Mis laboratorios
            </div>
            {/* Cambiamos la flechita dependiendo de si está abierto o cerrado */}
            {menuDesplegado ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {/* Cuerpo (Solo se muestra si menuDesplegado es true) */}
          {menuDesplegado && (
            <div className="card-body">
              {LABORATORIOS_DISPONIBLES.map((lab) => (
                <label key={lab} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={labsActivos.includes(lab)} // Se marca solo si está en nuestro estado
                    onChange={() => toggleLaboratorio(lab)} // Llama a nuestra función al hacer clic
                  /> 
                  {lab}
                </label>
              ))}
            </div>
          )}

        </div>

        <button className="btn-exportar"><Printer size={20} /> Exportar</button>
      </div>
    </div>
  );
};
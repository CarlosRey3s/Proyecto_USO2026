// src/pages/admin/CalendarioView.tsx
import { Search, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Printer } from 'lucide-react';

export const CalendarioView = () => {
  return (
    <div className="flex h-full gap-6">
      
      {/* ── COLUMNA IZQUIERDA: CALENDARIO PRINCIPAL ── */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        
        {/* Controles superiores del calendario */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="bg-teal-700 text-white px-4 py-1.5 rounded-full text-sm font-medium">
              Hoy
            </button>
            <div className="flex items-center gap-2 text-gray-400">
              <button className="hover:text-gray-600"><ChevronLeft size={20} /></button>
              <button className="hover:text-gray-600"><ChevronRight size={20} /></button>
            </div>
            <h2 className="text-2xl text-gray-500 font-light ml-2">Febrero 2026</h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
              <Search size={18} />
            </button>
            <button className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium">
              Semana
            </button>
            <button className="p-2 bg-yellow-400 rounded-full text-gray-900 hover:bg-yellow-500">
              <CalendarIcon size={18} />
            </button>
          </div>
        </div>

        {/* Cuadrícula del Calendario (Placeholder) */}
        <div className="flex-1 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400">
          {/* Aquí construiremos el Grid de horas y días más adelante */}
          <p>Área del Grid del Calendario</p>
        </div>
      </div>

      {/* ── COLUMNA DERECHA: BARRA DE HERRAMIENTAS ── */}
      <div className="w-64 flex flex-col gap-4">
        
        {/* Botón Crear */}
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-4 flex items-center gap-2 rounded-md transition-colors">
          <Plus size={20} /> Crear
        </button>

        {/* Mini Calendario (Placeholder) */}
        <div className="bg-black text-white p-4 rounded-md flex justify-center items-center h-40">
          Mini Calendario
        </div>

        {/* Mis Laboratorios */}
        <div className="bg-teal-700 text-white rounded-md overflow-hidden">
          <div className="p-3 font-medium flex items-center gap-2 border-b border-teal-600">
            <CalendarIcon size={18} /> Mis laboratorios
          </div>
          <div className="p-3 space-y-2 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-teal-500" defaultChecked /> Lorem Inpus
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-teal-500" defaultChecked /> Lorem Inpus
            </label>
          </div>
        </div>

        {/* Botón Exportar */}
        <button className="w-full bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-4 flex items-center gap-2 rounded-md transition-colors mt-auto">
          <Printer size={20} /> Exportar
        </button>

      </div>
    </div>
  );
};
import React from 'react';
import { Sidebar } from '../componets/Sidebar';
import { Header } from '../componets/Header';
import '../css/evaluaciones.css';

export const EvaluacionesEstudiante: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        
        <main className="content-area">
          <header className="content-header">
            <h2 className="content-title">Mis evaluaciones</h2>
            <p className="content-subtitle">Gestión de evaluaciones de laboratorios</p>
          </header>

          <div className="tabs">
            <div className="tab active">Pendientes (2)</div>
            <div className="tab">Historial</div>
          </div>

          <div className="dashboard-grid">
            <div className="main-column">
              <div className="evaluation-card">
                <p className="card-title">12 OCT 2026</p>
                <h3 className="card-subject">Laboratorio de Electrónica</h3>
                <p className="card-time">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  10:00 am - 12:00 pm
                </p>
                <div className="card-actions">
                  <div className="status-badge orange">Evaluación Requerida</div>
                  <button className="btn-primary">Realizar evaluación</button>
                </div>
              </div>
            </div>
            
            <div className="side-column">
              <div className="widget-calendar">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: '#94a3b8', marginBottom: '15px'}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                CALENDARIO
              </div>
              
              <div className="widget-pending">
                <p className="card-title" style={{ textAlign: "center" }}>12 OCT 2026</p>
                <h3 className="card-subject" style={{ textAlign: "center", fontSize: "16px" }}>Laboratorio de Electrónica</h3>
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                  <span className="status-badge red">Pendiente</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default function Schedule() {
  return (
    <div style={{
      flex: 2,
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    }}>
      <h3 style={{ marginBottom: "20px" }}>Horarios de Laboratorios</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        {['Horas', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day, index) => (
          <button 
            key={index} 
            style={{
              backgroundColor: day === 'Lunes' ? '#d3d3d3' : 'transparent',
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: day === 'Lunes' ? 'bold' : 'normal'
            }}
          >
            {day}
          </button>

          /**/
        ))}
      </div>
      <div style={{ height: "200px", backgroundColor: "#eaeaea", borderRadius: "8px" }}>
        {/* Aquí se mostrarán los horarios */}
      </div>
    </div>
  );
}
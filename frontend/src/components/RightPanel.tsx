export default function RightPanel() {
  return (
    <div style={{
      flex: 1,
      background: "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px" }}>Tus horarios:</h4>
        <div style={{
          backgroundColor: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px"
        }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>Lab Estática</p>
          <p style={{ margin: 0 }}>Lun | 08:00 am - 10:00 am</p>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: "10px" }}>Evaluaciones pendientes:</h4>
        <div style={{
          backgroundColor: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          color: "red"
        }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>Lab Estática</p>
          <p style={{ margin: 0 }}>Evaluación 2</p>
          <p style={{ margin: 0 }}>Vence: 12 Oct 2026</p>
        </div>
      </div>
    </div>
  );
}
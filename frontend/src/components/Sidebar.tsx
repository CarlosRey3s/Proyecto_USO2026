export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#2c2c2c",
      color: "white",
      height: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <div>
        <h3 style={{ color: "#fff", marginBottom: "20px" }}>Dashboard</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px", cursor: "pointer" }}>Dashboard</li>
          <li style={{ marginBottom: "10px", cursor: "pointer" }}>Reservar</li>
          <li style={{ marginBottom: "10px", cursor: "pointer" }}>Evaluaciones</li>
          <li style={{ marginBottom: "10px", cursor: "pointer" }}>Mensajes</li>
          <li style={{ marginBottom: "10px", cursor: "pointer" }}>Perfil</li>
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "10px" }}>Hello, Name</p>
        <div style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#555",
          borderRadius: "50%",
          margin: "0 auto"
        }}></div>
      </div>
    </div>
  );
}
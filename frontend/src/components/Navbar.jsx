export default function Navbar() {
  return (
    <div style={{
      background: "#4a4a4a",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      <h2 style={{ margin: 0 }}>Dashboard</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input 
          type="text" 
          placeholder="Buscar..." 
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />
        <div style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#888",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "18px"
        }}>
          N
        </div>
      </div>
    </div>
  );
}
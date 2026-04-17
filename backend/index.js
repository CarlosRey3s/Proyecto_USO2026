const app = require('./src/server');
require('./src/config/db'); // Inicializa la conexión a la base de datos

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
});

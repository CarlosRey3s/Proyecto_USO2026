
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
//importar rutas de actividades
const actividadesRoutes = require('./routes/actividadesRoutes.js');// Middlewares
app.use(cors());
app.use(express.json()); // Permitir JSON en el cuerpo de las peticiones
app.use(morgan('dev')); // Registro de peticiones en consola

// Rutas base de prueba
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong', status: 'API is running' });
});

// Importar Rutas
const laboratorioRoutes = require('./routes/laboratorioRoutes');
const authRoutes = require('./routes/authRoutes');
const laboratoriosRoutes = require('./routes/laboratoriosRoutes');

// Uso de Rutas
app.use('/api/laboratorios', laboratoriosRoutes);
app.use('/api/auth', authRoutes);


app.use('/api/actividades', actividadesRoutes);

app.listen (30000, () => {
    console.log('Servidor corriendo en el puerto 30000');
});
module.exports = app; // <--- ¡Esto es vital!
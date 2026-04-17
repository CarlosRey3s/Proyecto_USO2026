const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permitir JSON en el cuerpo de las peticiones
app.use(morgan('dev')); // Registro de peticiones en consola

// Rutas base de prueba
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong', status: 'API is running' });
});

// Importar Rutas
const laboratorioRoutes = require('./routes/laboratorioRoutes');

// Uso de Rutas
app.use('/api/laboratorios', laboratorioRoutes);

module.exports = app;

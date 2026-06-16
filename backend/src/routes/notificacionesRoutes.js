const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/notificacionesController');
const authMiddleware = require('../middlewares/authMiddleware'); // Asegúrate de que esta ruta sea correcta

// Proteger todas las rutas de notificaciones
router.use(authMiddleware);

// Obtener notificaciones del usuario logueado
router.get('/', notificacionesController.getNotificaciones);

// Marcar notificación como leída
router.put('/:id/leer', notificacionesController.marcarComoLeida);

module.exports = router;

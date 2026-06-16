const express = require('express');
const router = express.Router();
const encuestasController = require('../controllers/encuestasController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas protegidas
router.use(authMiddleware);

// Rutas base
router.get('/', encuestasController.obtenerEncuestas);
router.post('/', encuestasController.crearEncuesta);

// Rutas de ID específico
router.get('/:id', encuestasController.obtenerEncuestaPorId);
router.delete('/:id', encuestasController.eliminarEncuesta);

// Responder a la encuesta
router.post('/:id/respuestas', encuestasController.enviarRespuesta);

// Ver resultados
router.get('/:id/resultados', encuestasController.obtenerResultados);

module.exports = router;

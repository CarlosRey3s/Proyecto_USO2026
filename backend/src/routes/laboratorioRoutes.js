const express = require('express');
const router = express.Router();
const laboratorioController = require('../controllers/laboratorioController');

/**
 * @route GET /api/laboratorios
 * @desc Obtener todos los laboratorios activos
 */
router.get('/', laboratorioController.getLaboratorios);

module.exports = router;

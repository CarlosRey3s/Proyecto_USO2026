const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// GET /api/inventario
router.get('/', inventarioController.obtenerInventario);

// POST /api/inventario
router.post('/', inventarioController.crearItem);

// POST /api/inventario/:id/reportar
router.post('/:id/reportar', inventarioController.reportarItem);

// DELETE /api/inventario/:id
router.delete('/:id', inventarioController.eliminarItem);

// PUT /api/inventario/:id
router.put('/:id', inventarioController.actualizarItem);

// GET /api/inventario/reportes/todos (para no chocar con /:id)
router.get('/reportes/todos', inventarioController.obtenerReportes);

// PUT /api/inventario/reportes/:id/resolver
router.put('/reportes/:id/resolver', inventarioController.resolverReporte);

// PUT /api/inventario/reportes/:id/estadoPrestamo
router.put('/reportes/:id/estadoPrestamo', inventarioController.cambiarEstadoPrestamo);

module.exports = router;

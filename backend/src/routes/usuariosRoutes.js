const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// GET /api/usuarios
router.get('/', usuariosController.obtenerUsuarios);

// POST /api/usuarios
router.post('/', usuariosController.crearUsuario);

module.exports = router;

const express = require('express');
const router = express.Router();
const laboratoriosContoller = require('../controllers/laboratoriosController');

router.get('/', laboratoriosContoller.getLaboratorios);

module.exports = router;

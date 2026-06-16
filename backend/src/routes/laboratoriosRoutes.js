const express = require('express');
const router = express.Router();
const laboratoriosContoller = require('../controllers/laboratoriosController');

router.get('/', laboratoriosContoller.getLaboratorios);
router.get('/todos', laboratoriosContoller.getAllLaboratorios);
router.post('/', laboratoriosContoller.createLaboratorio);
router.put('/:id', laboratoriosContoller.updateLaboratorio);
router.delete('/:id', laboratoriosContoller.deleteLaboratorio);

module.exports = router;

const laboratorioService = require('../services/laboratorioService');

/**
 * Controlador para manejar las peticiones HTTP relacionadas con laboratorios.
 */
const laboratorioController = {
  /**
   * Obtiene la lista completa de laboratorios.
   */
  getLaboratorios: async (req, res) => {
    try {
      const laboratorios = await laboratorioService.getAllLaboratorios();
      res.status(200).json({
        success: true,
        data: laboratorios
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = laboratorioController;

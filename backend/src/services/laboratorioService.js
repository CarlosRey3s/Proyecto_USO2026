const pool = require('../config/db');

/**
 * Servicio para manejar la lógica de datos de los laboratorios.
 */
const laboratorioService = {
  /**
   * Obtiene todos los laboratorios de la base de datos.
   * @returns {Promise<Array>} Lista de laboratorios.
   */
  getAllLaboratorios: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM LABORATORIOS WHERE estado = "activo"');
      return rows;
    } catch (error) {
      console.error('Error en laboratorioService.getAllLaboratorios:', error.message);
      throw new Error('Error al obtener los laboratorios desde la base de datos.');
    }
  }
};

module.exports = laboratorioService;

const db = require('../config/db');

const obtenerlaboratoriosActivos = async () => {
    //consultamos el ID y el nombre de los laboratorios activos
    const query = "SELECT id, nombre FROM LABORATORIOS WHERE estado = ?";
    const [rows] = await db.execute(query, ["activo"]);
    return rows;
};

module.exports = { obtenerlaboratoriosActivos };
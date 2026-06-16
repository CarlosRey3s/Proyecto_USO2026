const db = require('../config/db');

const obtenerlaboratoriosActivos = async () => {
    //consultamos el ID y el nombre de los laboratorios activos
    const query = "SELECT id, nombre FROM LABORATORIOS WHERE estado = ?";
    const [rows] = await db.execute(query, ["activo"]);
    return rows;
};

const obtenerTodosLaboratorios = async () => {
    const query = "SELECT * FROM LABORATORIOS";
    const [rows] = await db.execute(query);
    return rows;
};

const crearLaboratorio = async (datos) => {
    const { nombre, descripcion, estado } = datos;
    const query = "INSERT INTO LABORATORIOS (nombre, descripcion, estado) VALUES (?, ?, ?)";
    const [result] = await db.execute(query, [nombre, descripcion || null, estado || 'activo']);
    return result;
};

const actualizarLaboratorio = async (id, datos) => {
    const { nombre, descripcion, estado } = datos;
    const query = "UPDATE LABORATORIOS SET nombre=?, descripcion=?, estado=? WHERE id=?";
    const [result] = await db.execute(query, [nombre, descripcion || null, estado || 'activo', id]);
    return result;
};

const eliminarLaboratorio = async (id) => {
    const query = "DELETE FROM LABORATORIOS WHERE id=?";
    const [result] = await db.execute(query, [id]);
    return result;
};

module.exports = { obtenerlaboratoriosActivos, obtenerTodosLaboratorios, crearLaboratorio, actualizarLaboratorio, eliminarLaboratorio };
const pool = require('../config/db');

const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombres, apellidos, correo, rol, estado FROM USUARIOS');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al obtener usuarios' });
  }
};

const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {
  const { nombres, apellidos, correo, expediente, password, rol } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const estado = 'activo';

    const [result] = await pool.query(
      'INSERT INTO USUARIOS (nombres, apellidos, correo, expediente, password_hash, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombres, apellidos, correo, expediente, password_hash, rol, estado]
    );

    res.status(201).json({ success: true, message: 'Usuario creado exitosamente', data: { id: result.insertId } });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
    }
    res.status(500).json({ success: false, message: 'Error interno del servidor al crear usuario' });
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuario
};

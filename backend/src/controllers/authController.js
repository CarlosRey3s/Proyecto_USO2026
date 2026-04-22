const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // 1. Buscar al usuario por correo
    const [rows] = await pool.query('SELECT * FROM USUARIOS WHERE correo = ?', [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = rows[0];

    // 2. Verificar el rol si es necesario (el frontend lo envía)
    if (user.rol !== role) {
      return res.status(401).json({ message: 'El rol seleccionado no coincide con el usuario' });
    }

    // 3. Verificar estado activo
    if (user.estado !== 'activo') {
      return res.status(403).json({ message: 'Cuenta desactivada. Contacte al administrador.' });
    }

    // 4. Verificar contraseña
    // Nota: Si los datos de prueba no están hasheados, bcrypt.compare fallará.
    // Asumimos que están hasheados. Si no, podrías usar una comparación simple para pruebas.
    const isMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!isMatch) {
      // Para desarrollo/pruebas, si la comparación de hash falla, probamos comparación directa 
      // por si se insertaron manualmente sin hash. ELIMINAR EN PRODUCCIÓN.
      if (password !== user.password_hash) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
    }

    // 5. Generar JWT
    const token = jwt.sign(
      { id: user.id, rol: user.rol, email: user.correo },
      process.env.JWT_SECRET || 'secret_uso_2026',
      { expiresIn: '8h' }
    );

    // 6. Responder con datos del usuario y token
    res.json({
      token,
      user: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        rol: user.rol,
        correo: user.correo
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  login
};

const db = require('../config/db');

// Función interna para crear notificaciones desde otros controladores
const crearNotificacion = async (usuario_id, titulo, mensaje) => {
    try {
        const query = 'INSERT INTO NOTIFICACIONES (FK_usuario_id, titulo, mensaje) VALUES (?, ?, ?)';
        await db.query(query, [usuario_id, titulo, mensaje]);
        console.log(`Notificación creada para el usuario ${usuario_id}`);
    } catch (error) {
        console.error('Error al crear notificación:', error);
    }
};

// Función interna para notificar a todos los administradores
const notificarAdmins = async (titulo, mensaje) => {
    try {
        const [admins] = await db.query('SELECT id FROM USUARIOS WHERE rol = "admin"');
        for (const admin of admins) {
            await crearNotificacion(admin.id, titulo, mensaje);
        }
    } catch (error) {
        console.error('Error al notificar administradores:', error);
    }
};

// Obtener notificaciones para el usuario actual
const getNotificaciones = async (req, res) => {
    const userId = req.user.id; // Asumiendo que usamos el middleware authMiddleware

    try {
        const [notificaciones] = await db.query(
            'SELECT * FROM NOTIFICACIONES WHERE FK_usuario_id = ? ORDER BY fecha_creacion DESC',
            [userId]
        );
        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener notificaciones' });
    }
};

// Marcar notificación como leída
const marcarComoLeida = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Validar que la notificación le pertenezca al usuario

    try {
        const [result] = await db.query(
            'UPDATE NOTIFICACIONES SET leida = TRUE WHERE id = ? AND FK_usuario_id = ?',
            [id, userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada o no pertenece al usuario' });
        }
        res.json({ message: 'Notificación marcada como leída' });
    } catch (error) {
        console.error('Error al marcar notificación como leída:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    crearNotificacion,
    notificarAdmins,
    getNotificaciones,
    marcarComoLeida
};

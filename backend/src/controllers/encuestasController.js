const db = require('../config/db');

// Crear una nueva encuesta (Administrador)
const crearEncuesta = async (req, res) => {
    const { titulo, laboratorio_id, fecha_inicio, fecha_fin, estado, preguntas } = req.body;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Insertar la encuesta
        const [encuestaResult] = await connection.query(
            'INSERT INTO ENCUESTAS (titulo, laboratorio_id, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)',
            [titulo, laboratorio_id || null, fecha_inicio, fecha_fin, estado || 'Borrador']
        );
        const encuestaId = encuestaResult.insertId;

        // 2. Insertar las preguntas
        if (preguntas && preguntas.length > 0) {
            const values = preguntas.map((p, index) => [
                encuestaId,
                p.texto_pregunta,
                p.tipo, // 'escala_1_5' o 'texto_abierto'
                index
            ]);
            await connection.query(
                'INSERT INTO PREGUNTAS_ENCUESTA (FK_encuesta_id, texto_pregunta, tipo, orden) VALUES ?',
                [values]
            );
        }

        await connection.commit();
        res.status(201).json({ success: true, message: 'Encuesta creada exitosamente', id: encuestaId });
    } catch (error) {
        await connection.rollback();
        console.error('Error al crear encuesta:', error);
        res.status(500).json({ success: false, message: 'Error al crear la encuesta', error: error.message });
    } finally {
        connection.release();
    }
};

// Obtener todas las encuestas (Para admin, o para estudiante si están publicadas)
const obtenerEncuestas = async (req, res) => {
    try {
        // Podríamos filtrar por estado dependiendo del rol, pero dejémoslo simple por ahora
        const [encuestas] = await db.query(`
            SELECT e.*, l.nombre as laboratorio_nombre,
            (SELECT COUNT(*) FROM PREGUNTAS_ENCUESTA p WHERE p.FK_encuesta_id = e.id) as preguntas_count
            FROM ENCUESTAS e
            LEFT JOIN LABORATORIOS l ON e.laboratorio_id = l.id
            ORDER BY e.fecha_creacion DESC
        `);
        res.json({ success: true, data: encuestas });
    } catch (error) {
        console.error('Error al obtener encuestas:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

// Obtener una encuesta específica con sus preguntas (Para que el estudiante la responda)
const obtenerEncuestaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [encuestas] = await db.query('SELECT * FROM ENCUESTAS WHERE id = ?', [id]);
        if (encuestas.length === 0) return res.status(404).json({ message: 'Encuesta no encontrada' });

        const [preguntas] = await db.query('SELECT * FROM PREGUNTAS_ENCUESTA WHERE FK_encuesta_id = ? ORDER BY orden ASC', [id]);
        
        res.json({ success: true, data: { ...encuestas[0], preguntas } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la encuesta' });
    }
};

// Enviar respuesta (Estudiante)
const enviarRespuesta = async (req, res) => {
    const { id } = req.params; // ID de la encuesta
    const { respuestas } = req.body; // [{ pregunta_id: 1, valor_escala: 5, comentario_texto: null }, ...]

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Crear el registro de respuesta (Anónimo, sin ID de usuario)
        const [respuestaResult] = await connection.query(
            'INSERT INTO RESPUESTAS_ENCUESTA (FK_encuesta_id) VALUES (?)',
            [id]
        );
        const respuestaId = respuestaResult.insertId;

        // 2. Insertar los detalles
        if (respuestas && respuestas.length > 0) {
            const values = respuestas.map(r => [
                respuestaId,
                r.pregunta_id,
                r.valor_escala || null,
                r.comentario_texto || null
            ]);
            await connection.query(
                'INSERT INTO DETALLE_RESPUESTAS (FK_respuesta_encuesta_id, FK_pregunta_id, valor_escala, comentario_texto) VALUES ?',
                [values]
            );
        }

        await connection.commit();
        res.status(201).json({ success: true, message: 'Respuestas enviadas anónimamente con éxito' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ success: false, message: 'Error al guardar respuestas' });
    } finally {
        connection.release();
    }
};

// Obtener resultados (Administrador)
const obtenerResultados = async (req, res) => {
    const { id } = req.params;
    try {
        // Obtenemos los detalles de las respuestas agrupados por pregunta
        const [resultados] = await db.query(`
            SELECT 
                p.id as pregunta_id, 
                p.texto_pregunta, 
                p.tipo,
                d.valor_escala,
                d.comentario_texto,
                r.fecha_respuesta,
                r.id as respuesta_id
            FROM PREGUNTAS_ENCUESTA p
            JOIN DETALLE_RESPUESTAS d ON p.id = d.FK_pregunta_id
            JOIN RESPUESTAS_ENCUESTA r ON d.FK_respuesta_encuesta_id = r.id
            WHERE p.FK_encuesta_id = ?
            ORDER BY r.fecha_respuesta DESC, p.orden ASC
        `, [id]);

        // Transformar los datos para que sean fáciles de consumir
        // Podríamos procesarlos en el frontend, pero enviamos los datos raw
        res.json({ success: true, data: resultados });
    } catch (error) {
        console.error('Error al obtener resultados:', error);
        res.status(500).json({ success: false, message: 'Error al obtener resultados' });
    }
};

// Eliminar encuesta
const eliminarEncuesta = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM ENCUESTAS WHERE id = ?', [id]);
        res.json({ success: true, message: 'Encuesta eliminada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar' });
    }
};

module.exports = {
    crearEncuesta,
    obtenerEncuestas,
    obtenerEncuestaPorId,
    enviarRespuesta,
    obtenerResultados,
    eliminarEncuesta
};

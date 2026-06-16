const db = require('../config/db');

/*
 * Función interna para verificar si el laboratorio ya está ocupado
 */
const verificarChoqueHorario = async (fk_laboratorio, inicioDatetime, finDatetime) => {
    // Temporalmente devolvemos false para evitar bloqueos en el desarrollo 
    return false; 
};

/**
 * Función principal que llama el controlador
 */
const programarActividad = async (datosModal, idUsuarioLogueado) => { 
    const { tipo, laboratorio, fecha, desde, hasta, numPersonas, recurrencia } = datosModal; 

    // 1. Transformar las fechas y horas a formato DATETIME
    const inicioDatetime = new Date(`${fecha}T${desde}`); 
    const finDatetime = new Date(`${fecha}T${hasta}`);

    // 2. Verificar si el laboratorio está libre
    const choque = await verificarChoqueHorario(laboratorio, inicioDatetime, finDatetime);
    if(choque){
        throw new Error('El laboratorio ya está ocupado en ese horario.');
    }

    // 3. Traducción de recurrencia segura (Cubre con o sin tilde)
    let dbRecurrencia = 'no_repite';
    if(recurrencia === 'Todos los días' || recurrencia === 'Todos los dias') dbRecurrencia = 'diario';
    else if(recurrencia.includes('semana')) dbRecurrencia = 'semanal';
    else if(recurrencia.includes('mes')) dbRecurrencia = 'mensual';
    else if(recurrencia.includes('hábiles')) dbRecurrencia = 'dias_habiles';

    const connection = await db.getConnection(); // Obtenemos una conexión exclusiva
    
    try {
        await connection.beginTransaction();
        
        // --- PASO A: Insertar en la tabla padre (ACTIVIDADES) ---
        const queryBase = `
            INSERT INTO ACTIVIDADES (fk_laboratorio_id, FK_creado_por, tipo, fecha_hora_inicio, fecha_hora_fin, recurrencia) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valoresBase = [laboratorio, idUsuarioLogueado, tipo, inicioDatetime, finDatetime, dbRecurrencia];
        
        // Ejecutamos y atrapamos la respuesta completa
        const respuestaMySQL = await connection.query(queryBase, valoresBase);
        
        // Extracción eficiente y a prueba de balas del ID (¡Con la 'd' minúscula!)
        const resultadoBase = Array.isArray(respuestaMySQL) ? respuestaMySQL[0] : respuestaMySQL;
        const idGenerado = resultadoBase.insertId; 

        if (!idGenerado) {
            throw new Error("Fallo crítico: No se pudo obtener el ID de la nueva actividad.");
        }

        console.log("-> ID de actividad creado exitosamente:", idGenerado);

        // --- PASO B: Insertar en la tabla hija correspondiente ---
        if (tipo === 'clase') {
            const queryHija = `INSERT INTO ACTIVIDADES_CLASE (FK_actividad_id, materia, docente, num_estudiantes) VALUES (?, ?, ?, ?)`;
            await connection.query(queryHija, [idGenerado, datosModal.materia, datosModal.docente, numPersonas]);
            
        } else if (tipo === 'mantenimiento') {
            const queryHija = `INSERT INTO ACTIVIDADES_MANTENIMIENTO (FK_actividad_id, responsable, nota_adicional) VALUES (?, ?, ?)`;
            await connection.query(queryHija, [idGenerado, datosModal.responsable, datosModal.descripcion || null]);
            
        } else if (tipo === 'reserva') {
            const queryHija = `INSERT INTO ACTIVIDADES_RESERVA (FK_actividad_id, titulo, Fk_mesa_id, num_personas) VALUES (?, ?, ?, ?)`;
            // Pasamos null a Fk_mesa_id para evitar error de tipo de dato (el frontend manda un string)
            await connection.query(queryHija, [idGenerado, datosModal.titulo, null, numPersonas]);
            
            // Si hay equipos solicitados, registrarlos como Préstamo en el inventario
            if (datosModal.equipos && datosModal.equipos.length > 0) {
                const queryPrestamo = `
                    INSERT INTO REPORTES_INVENTARIO (FK_item_id, FK_usuario_id, tipo_problema, descripcion, cantidad, estado)
                    VALUES (?, ?, 'Préstamo', ?, ?, 'Pendiente')
                `;
                const descripcionReserva = `Solicitado para reserva: ${datosModal.titulo}`;
                
                for (const equipo of datosModal.equipos) {
                    await connection.query(queryPrestamo, [
                        equipo.id, 
                        idUsuarioLogueado, 
                        descripcionReserva, 
                        equipo.cantidadRequerida || 1
                    ]);
                }
            }
        }

        // 4. Confirmamos la transacción
        await connection.commit(); 
        return { exito: true, mensaje: 'Actividad programada exitosamente', id: idGenerado };

    } catch (error) {
        // 5. Si algo falla arriba, deshacemos todo
        await connection.rollback(); 
        console.error('Error al programar actividad:', error);
        throw new Error('Error al programar la actividad. Por favor, inténtalo de nuevo.');
    } finally {
        // 6. Pase lo que pase, devolvemos la conexión
        if (connection) connection.release(); 
    }
};

const obtenerActividades = async () => {
    const connection = await db.getConnection();
    try{
        const query = `
           SELECT 
                A.id, 
                CASE 
                    WHEN A.tipo = 'clase' THEN AC.materia
                    WHEN A.tipo = 'reserva' THEN AR.titulo
                    WHEN A.tipo = 'mantenimiento' THEN 'Mantenimiento Preventivo'
                    ELSE 'Actividad'
                END AS title, 
                A.fecha_hora_inicio AS start, 
                A.fecha_hora_fin AS end, 
                A.tipo,
                A.fk_laboratorio_id,
                AC.materia, 
                AC.docente, 
                AC.num_estudiantes AS clase_estudiantes,
                AM.responsable, 
                AM.nota_adicional AS mant_descripcion,
                AR.titulo AS reserva_titulo,
                AR.Fk_mesa_id,
                AR.num_personas AS reserva_personas
            FROM 
                ACTIVIDADES A
            LEFT JOIN 
                ACTIVIDADES_CLASE AC ON A.id = AC.FK_actividad_id
            LEFT JOIN 
                ACTIVIDADES_MANTENIMIENTO AM ON A.id = AM.FK_actividad_id
            LEFT JOIN 
                ACTIVIDADES_RESERVA AR ON A.id = AR.FK_actividad_id;
        `;
        const [actividades] = await connection.query(query);
        return actividades;
    } catch (error) {
        console.error('Error al obtener actividades:', error);
        throw new Error('Error al obtener las actividades. Por favor, inténtalo de nuevo.');
    }finally {
        if (connection) connection.release();
    }

}
module.exports = { programarActividad, obtenerActividades };
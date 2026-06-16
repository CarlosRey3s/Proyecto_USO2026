const db = require('../config/db');

const obtenerInventario = async () => {
    const connection = await db.getConnection();
    try {
        const query = `
            SELECT 
                i.id,
                i.nombre AS name,
                i.codigo_interno AS code,
                i.numero_cas,
                i.categoria AS category,
                i.FK_laboratorio_id AS laboratorio_id,
                l.nombre AS laboratory,
                i.ubicacion_fisica AS location,
                i.unidad_medida,
                i.cantidad_stock AS stock,
                i.imagen_url AS image
            FROM 
                ITEMS_INVENTARIO i
            LEFT JOIN 
                LABORATORIOS l ON i.FK_laboratorio_id = l.id
            ORDER BY 
                i.id DESC;
        `;
        const [items] = await connection.query(query);
        
        // Mapear el status en base al stock
        const mappedItems = items.map(item => ({
            ...item,
            id: String(item.id),
            stock: Number(item.stock),
            status: Number(item.stock) > 0 ? 'Disponible' : 'Agotado'
        }));
        
        return mappedItems;
    } catch (error) {
        console.error('Error al obtener inventario:', error);
        throw new Error('Error al obtener el inventario de la base de datos.');
    } finally {
        if (connection) connection.release();
    }
};

const crearItem = async (datosItem) => {
    const { 
        nombre, 
        codigo_interno, 
        numero_cas, 
        categoria, 
        laboratorio_id, 
        ubicacion_fisica, 
        cantidad_stock, 
        unidad_medida 
    } = datosItem;

    const connection = await db.getConnection();
    try {
        const query = `
            INSERT INTO ITEMS_INVENTARIO (
                nombre, codigo_interno, numero_cas, categoria, 
                FK_laboratorio_id, ubicacion_fisica, cantidad_stock, unidad_medida
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            nombre, 
            codigo_interno || null, 
            numero_cas || null, 
            categoria, 
            laboratorio_id || null, 
            ubicacion_fisica || null, 
            cantidad_stock || 0, 
            unidad_medida || null
        ];
        
        const [resultado] = await connection.query(query, valores);
        return { success: true, id: resultado.insertId };
    } catch (error) {
        console.error('Error al crear item:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const reportarItem = async (id, datosReporte) => {
    const { tipo_problema, descripcion, cantidad, usuario_id } = datosReporte;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Crear tabla si no existe (por si acaso no está en la base de datos)
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS REPORTES_INVENTARIO (
                id INT AUTO_INCREMENT PRIMARY KEY,
                FK_item_id INT NOT NULL,
                FK_usuario_id INT,
                tipo_problema VARCHAR(50) NOT NULL,
                descripcion TEXT NOT NULL,
                cantidad DECIMAL(10,2) DEFAULT 1,
                estado VARCHAR(20) DEFAULT 'Pendiente',
                fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (FK_item_id) REFERENCES ITEMS_INVENTARIO(id) ON DELETE CASCADE,
                FOREIGN KEY (FK_usuario_id) REFERENCES USUARIOS(id) ON DELETE SET NULL
            )
        `;
        await connection.query(createTableQuery);

        // 1. Verificar si hay stock suficiente
        const checkStockQuery = 'SELECT cantidad_stock FROM ITEMS_INVENTARIO WHERE id = ?';
        const [stockRows] = await connection.query(checkStockQuery, [id]);
        
        if (stockRows.length === 0) {
            throw new Error('El item no existe.');
        }

        const stockActual = parseFloat(stockRows[0].cantidad_stock);
        const cantReportada = parseFloat(cantidad !== undefined && cantidad !== null ? cantidad : 1);

        if (cantReportada > stockActual) {
            throw new Error(`La cantidad reportada (${cantReportada}) supera el stock actual (${stockActual}).`);
        }

        // 2. Insertar el reporte
        const insertQuery = `
            INSERT INTO REPORTES_INVENTARIO (FK_item_id, FK_usuario_id, tipo_problema, descripcion, cantidad)
            VALUES (?, ?, ?, ?, ?)
        `;
        const valores = [id, usuario_id || null, tipo_problema, descripcion, cantReportada];
        const [resultadoInsert] = await connection.query(insertQuery, valores);

        // 3. Descontar stock
        const updateStockQuery = 'UPDATE ITEMS_INVENTARIO SET cantidad_stock = cantidad_stock - ? WHERE id = ?';
        await connection.query(updateStockQuery, [cantReportada, id]);

        await connection.commit();
        return { success: true, reporteId: resultadoInsert.insertId };
    } catch (error) {
        await connection.rollback();
        console.error('Error al guardar el reporte:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const eliminarItem = async (id) => {
    const connection = await db.getConnection();
    try {
        const query = 'DELETE FROM ITEMS_INVENTARIO WHERE id = ?';
        const [resultado] = await connection.query(query, [id]);
        return resultado;
    } catch (error) {
        console.error('Error al eliminar item:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const actualizarItem = async (id, datosItem) => {
    const { 
        nombre, codigo_interno, numero_cas, categoria, 
        laboratorio_id, ubicacion_fisica, cantidad_stock, unidad_medida 
    } = datosItem;

    const connection = await db.getConnection();
    try {
        const query = `
            UPDATE ITEMS_INVENTARIO SET
                nombre = ?, codigo_interno = ?, numero_cas = ?, categoria = ?, 
                FK_laboratorio_id = ?, ubicacion_fisica = ?, cantidad_stock = ?, unidad_medida = ?
            WHERE id = ?
        `;
        const valores = [
            nombre, codigo_interno || null, numero_cas || null, categoria, 
            laboratorio_id || null, ubicacion_fisica || null, cantidad_stock || 0, unidad_medida || null, id
        ];
        
        const [resultado] = await connection.query(query, valores);
        return resultado;
    } catch (error) {
        console.error('Error al actualizar item:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const obtenerReportes = async () => {
    const connection = await db.getConnection();
    try {
        const query = `
            SELECT 
                r.id,
                r.FK_item_id as item_id,
                i.nombre AS item_nombre,
                i.codigo_interno AS item_codigo,
                r.tipo_problema,
                r.descripcion,
                r.cantidad,
                r.estado,
                r.fecha_reporte,
                u.nombres AS usuario_nombre,
                u.apellidos AS usuario_apellido
            FROM 
                REPORTES_INVENTARIO r
            LEFT JOIN ITEMS_INVENTARIO i ON r.FK_item_id = i.id
            LEFT JOIN USUARIOS u ON r.FK_usuario_id = u.id
            ORDER BY 
                r.fecha_reporte DESC
        `;
        const [rows] = await connection.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener reportes:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const resolverReporte = async (reporteId) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Obtener el reporte para saber la cantidad y el item
        const getQuery = 'SELECT FK_item_id, cantidad, estado FROM REPORTES_INVENTARIO WHERE id = ?';
        const [reportRows] = await connection.query(getQuery, [reporteId]);

        if (reportRows.length === 0) {
            throw new Error('Reporte no encontrado');
        }

        const reporte = reportRows[0];
        
        if (reporte.estado === 'Resuelto') {
            throw new Error('El reporte ya fue resuelto previamente');
        }

        // Marcar reporte como resuelto
        const updateReporteQuery = 'UPDATE REPORTES_INVENTARIO SET estado = ? WHERE id = ?';
        await connection.query(updateReporteQuery, ['Resuelto', reporteId]);

        // Devolver la cantidad al stock
        const updateStockQuery = 'UPDATE ITEMS_INVENTARIO SET cantidad_stock = cantidad_stock + ? WHERE id = ?';
        await connection.query(updateStockQuery, [reporte.cantidad, reporte.FK_item_id]);

        await connection.commit();
        return { success: true, message: 'Reporte resuelto y stock devuelto exitosamente' };
    } catch (error) {
        await connection.rollback();
        console.error('Error al resolver reporte:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const cambiarEstadoPrestamo = async (reporteId, nuevoEstado) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const getQuery = 'SELECT FK_item_id, cantidad, estado FROM REPORTES_INVENTARIO WHERE id = ?';
        const [reportRows] = await connection.query(getQuery, [reporteId]);

        if (reportRows.length === 0) {
            throw new Error('Préstamo no encontrado');
        }

        const prestamo = reportRows[0];
        
        if (prestamo.estado === nuevoEstado) {
            throw new Error(`El préstamo ya está en estado ${nuevoEstado}`);
        }

        // Marcar estado del préstamo
        const updateReporteQuery = 'UPDATE REPORTES_INVENTARIO SET estado = ? WHERE id = ?';
        await connection.query(updateReporteQuery, [nuevoEstado, reporteId]);

        // Si se entrega, se resta del stock disponible
        if (nuevoEstado === 'Entregado' && prestamo.estado === 'Pendiente') {
            const updateStockQuery = 'UPDATE ITEMS_INVENTARIO SET cantidad_stock = cantidad_stock - ? WHERE id = ?';
            await connection.query(updateStockQuery, [prestamo.cantidad, prestamo.FK_item_id]);
        }
        
        // Si se devuelve, se suma de nuevo al stock
        if (nuevoEstado === 'Devuelto' && prestamo.estado === 'Entregado') {
            const updateStockQuery = 'UPDATE ITEMS_INVENTARIO SET cantidad_stock = cantidad_stock + ? WHERE id = ?';
            await connection.query(updateStockQuery, [prestamo.cantidad, prestamo.FK_item_id]);
        }

        await connection.commit();
        return { success: true, message: `Préstamo marcado como ${nuevoEstado}` };
    } catch (error) {
        await connection.rollback();
        console.error('Error al cambiar estado de préstamo:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = { obtenerInventario, crearItem, reportarItem, eliminarItem, actualizarItem, obtenerReportes, resolverReporte, cambiarEstadoPrestamo };

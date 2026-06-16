const inventarioService = require('../services/inventarioService');
const { notificarAdmins } = require('./notificacionesController');

const obtenerInventario = async (req, res) => {
    try {
        const inventario = await inventarioService.obtenerInventario();
        res.status(200).json({
            success: true,
            data: inventario
        });
    } catch (error) {
        console.error('Error al obtener el inventario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el inventario',
            error: error.message
        });
    }
};

const crearItem = async (req, res) => {
    try {
        const datosItem = req.body;
        const resultado = await inventarioService.crearItem(datosItem);
        res.status(201).json({
            success: true,
            message: 'Item creado exitosamente',
            data: resultado
        });
    } catch (error) {
        console.error('Error al crear el item:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el item',
            error: error.message
        });
    }
};

const reportarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_problema, descripcion, cantidad, usuario_id } = req.body;
        
        const resultado = await inventarioService.reportarItem(id, { tipo_problema, descripcion, cantidad, usuario_id });
        
        // Notificar a los administradores
        const tituloNotificacion = tipo_problema.toLowerCase().includes('prestamo') ? 'Nueva Reserva de Inventario' : 'Alerta de Item Reportado';
        await notificarAdmins(tituloNotificacion, `Se ha registrado un: ${tipo_problema}. Descripción: ${descripcion}. Cantidad: ${cantidad}`);

        res.status(201).json({
            success: true,
            message: 'Reporte creado exitosamente',
            data: resultado
        });
    } catch (error) {
        console.error('Error al reportar el item:', error);
        res.status(400).json({ // Cambiado a 400 por si es error de validación
            success: false,
            message: error.message || 'Error al reportar el item',
            error: error.message
        });
    }
};

const eliminarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await inventarioService.eliminarItem(id);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Item eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar el item:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el item',
            error: error.message
        });
    }
};

const actualizarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const datosItem = req.body;
        const resultado = await inventarioService.actualizarItem(id, datosItem);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Item actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar el item:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el item',
            error: error.message
        });
    }
};

const obtenerReportes = async (req, res) => {
    try {
        const reportes = await inventarioService.obtenerReportes();
        res.status(200).json({ success: true, data: reportes });
    } catch (error) {
        console.error('Error al obtener reportes:', error);
        res.status(500).json({ success: false, message: 'Error al obtener reportes', error: error.message });
    }
};

const resolverReporte = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await inventarioService.resolverReporte(id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al resolver reporte', error: error.message });
    }
};

const cambiarEstadoPrestamo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevoEstado } = req.body;
        const resultado = await inventarioService.cambiarEstadoPrestamo(id, nuevoEstado);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cambiar estado', error: error.message });
    }
};

module.exports = { obtenerInventario, crearItem, reportarItem, eliminarItem, actualizarItem, obtenerReportes, resolverReporte, cambiarEstadoPrestamo };

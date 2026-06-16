const laboratoriosservices = require('../services/laboratoriosServices');

const getLaboratorios = async (req, res) => {
    try{
        const laboratorios = await laboratoriosservices.obtenerlaboratoriosActivos();

        res.status(200).json({
            success: true,
            data: laboratorios
        });
    }catch(error){
        console.error('Error al obtener los laboratorios activos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los laboratorios activos'
        })
    }
};

const getAllLaboratorios = async (req, res) => {
    try{
        const laboratorios = await laboratoriosservices.obtenerTodosLaboratorios();

        res.status(200).json({
            success: true,
            data: laboratorios
        });
    }catch(error){
        console.error('Error al obtener todos los laboratorios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener todos los laboratorios'
        })
    }
};

const createLaboratorio = async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
        }

        const result = await laboratoriosservices.crearLaboratorio({ nombre, descripcion, estado });

        res.status(201).json({
            success: true,
            message: 'Laboratorio creado correctamente',
            data: { id: result.insertId, nombre, descripcion, estado }
        });
    } catch (error) {
        console.error('Error al crear laboratorio:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear laboratorio'
        });
    }
};

const updateLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
        }

        await laboratoriosservices.actualizarLaboratorio(id, { nombre, descripcion, estado });

        res.status(200).json({
            success: true,
            message: 'Laboratorio actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar laboratorio:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar laboratorio'
        });
    }
};

const deleteLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        await laboratoriosservices.eliminarLaboratorio(id);

        res.status(200).json({
            success: true,
            message: 'Laboratorio eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar laboratorio:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar laboratorio'
        });
    }
};

module.exports = { getLaboratorios, getAllLaboratorios, createLaboratorio, updateLaboratorio, deleteLaboratorio };
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
module.exports = { getLaboratorios };
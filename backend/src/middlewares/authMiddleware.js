const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 1. Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Si no hay middleware real en otras partes, permitimos un fallback para que no crashee o le pasamos req.user = null
        // Pero para seguridad es mejor devolver 401
        return res.status(401).json({ message: 'No hay token de autorización' });
    }

    let token = authHeader.split(' ')[1];
    
    // Limpiar posibles comillas dobles que vengan desde el frontend
    token = token.replace(/^"|"$/g, '');

    try {
        // 2. Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_uso_2026');
        
        // 3. Añadir los datos del usuario a req.user
        req.user = decoded; // { id, rol, email, iat, exp }
        
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        return res.status(403).json({ message: 'Token inválido o expirado', error: error.message });
    }
};

module.exports = authMiddleware;

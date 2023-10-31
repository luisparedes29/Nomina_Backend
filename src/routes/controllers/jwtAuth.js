const jwt = require('jsonwebtoken');


const validateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).send('No existe un token de autenticación');
        return;
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.secret);
        req.user = decodedToken;
        next(); // Continuar con la verificación de roles en checkRole
    } catch (error) {
        console.log(error)
        res.status(403).send('El token no es válido. Por lo tanto, no tienes permiso para acceder a esta ruta.');
    }
};

// Middleware para verificar roles dinámicos
const checkRole = (requiredRole) => (req, res, next) => {
    if (req.user && req.user.data.role === requiredRole) {
        next(); // El rol coincide, permite el acceso.
    } else {
        res.status(403).send('No tienes permiso para acceder a esta ruta.');
    }
};

module.exports = { validateToken, checkRole };

const jwt = require('jsonwebtoken');


const validateToken = async (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    // if (!token) {
    //     res.status(401).send('No existe un token de autenticación');
    //     return;
    // }

    // try {
    //     const decodedToken = await jwt.verify(token, process.env.secret);
    //     req.user = decodedToken;
    //     next(); // Continuar con la verificación de roles en checkRole
    // } catch (error) {
    //     console.log(error)
    //     res.status(403).send('El token no es válido. Por lo tanto, no tienes permiso para acceder a esta ruta.');
    // }
    next();
};

// Middleware para verificar roles dinámicos
const checkRole = (requiredRole) => (req, res, next) => {
    // * Roles: super-admin | admin | user *
    // if (!req.user) return res.status(400).send('No se encontrararon los datos del usuario logueado.')
    // const role = req.user.data.role
    // const isSuperAdmin = role === "super-admin"
    // const isAdmin = role === "admin"
    // if (
    //     // *El "Super admin" puede hacer todo, el admin puede continuar si el rol no es "Super admin", y el usuario puede continuar solo si se requiere ese rol*
    //     role === requiredRole ||
    //     (isSuperAdmin ||
    //     (role !== "super-admin" && isAdmin))
    // ) {
    //     next(); // El rol coincide, permite el acceso.
    // } else {
    //     res.status(403).send('No tienes permiso para acceder a esta ruta.');
    // }
    next()
};

module.exports = { validateToken, checkRole };

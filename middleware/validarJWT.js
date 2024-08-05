const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    try {
        // Recibimos el token a través de los headers y definimos un nombre en este caso 'x-token'
        const token = req.header('x-token');

        // Si no recibimos un token, tiramos un error
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición',
            });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        
        // Asignar la información del token decodificado al objeto req
        req.usuario = decoded;

    } catch (error) {
        // Si el token es inválido o está vencido
        return res.status(401).json({
            msg: 'Token no válido o vencido',
        });
    }

    // Next deja ejecutar el siguiente middleware y si no hay más, ejecuta la función del flujo
    next();
};

module.exports = { validarJWT };

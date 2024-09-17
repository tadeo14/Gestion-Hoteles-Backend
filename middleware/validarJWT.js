const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    try {
        
        const token = req.header('x-token');

       
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición',
            });
        }

      
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        
       
        req.usuario = decoded;

    } catch (error) {
        
        return res.status(401).json({
            msg: 'Token no válido o vencido',
        });
    }


    next();
};

module.exports = { validarJWT };

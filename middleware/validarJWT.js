const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  
  try {
    
      //recibimos el token atravez de los header y definimos un nombre en este caso le puse x-token
    const token = req.header('x-token');

      //si no recibimos un token, ejemplo lo borraron del localstorage tiramos un error
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        });
    }
    
    const verificarToken = jwt.verify(token, process.env.SECRET_JWT);

      
  } catch (error) {
      //si el token es invalida cae aca, en caso de que este vencido
      return res.status(401).json({
          msg: 'Token vencido',
      });
  }  
    //Next deja ejecutar el siguiente middleware y si no hay mas ejecuta la funcion del flujo  
    next();

};


module.exports = { validarJWT };
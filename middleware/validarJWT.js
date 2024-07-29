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
    console.log(verificarToken);



      
  } catch (error) {
      console.log(error);
  }
  
  
    


};


module.exports = { validarJWT };
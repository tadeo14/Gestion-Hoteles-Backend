const express = require("express");
const routerAuth = express.Router();
const { crearUsuario, loginUsuario } = require("../controllers/authControllers");
const { validarJWT } = require("../middleware/validarJWT");

// Creación de los endpoints para gestionar la autenticación de usuarios
routerAuth.post('/registro', crearUsuario);
routerAuth.post('/login', loginUsuario);

// Aplicar validarJWT a rutas que requieren autenticación
routerAuth.use(validarJWT);

// Ejemplo de una ruta que requiere autenticación
routerAuth.get('/perfil', (req, res) => {
    res.json({
        msg: 'Perfil del usuario autenticado',
        usuario: req.usuario
    });
});

module.exports = routerAuth;

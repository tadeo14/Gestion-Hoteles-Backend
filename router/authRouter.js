const express = require("express");
const routerAuth = express.Router();
const { crearUsuario, loginUsuario } = require("../controllers/authControllers");
const { validarJWT } = require("../middleware/validarJWT");


routerAuth.post('/registro', crearUsuario);
routerAuth.post('/login', loginUsuario);


routerAuth.use(validarJWT);


routerAuth.get('/perfil', (req, res) => {
    res.json({
        msg: 'Perfil del usuario autenticado',
        usuario: req.usuario
    });
});

module.exports = routerAuth;

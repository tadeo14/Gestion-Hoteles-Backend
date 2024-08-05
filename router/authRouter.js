const express = require("express");
const routerAuth = express.Router();
const { crearUsuario, loginUsuario } = require("../controllers/authControllers");
const { validarJWT } = require("../middleware/validarJWT");

//Creacion de los endpoints para gestionar la autenticacion de usuarios
routerAuth.post('/registro',crearUsuario);
routerAuth.post('/login',loginUsuario);



module.exports = routerAuth;

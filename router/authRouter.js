const express = require("express");
const routerAuth = express.Router();
const { crearUsuario, loginUsuario } = require("../controllers/authControllers");

routerAuth.post('/login', loginUsuario);

routerAuth.post('/registro', crearUsuario);
    

module.exports = routerAuth;

const express = require("express");
const usuarioModel = require('../models/usuario-model.js');
const { crearUsuario } = require("../controllers/authControllers.js");
const routerAuth = express.Router();


routerAuth.post('/login', (req, res) => {
    res.send('login');
});

routerAuth.post('/registro', crearUsuario);




    

module.exports = routerAuth;

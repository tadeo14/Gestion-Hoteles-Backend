const express = require("express");
const usuarioModel = require('../models/usuario-model.js');
const routerAuth = express.Router();

routerAuth.post('/login', (req, res) => {
    res.send('login');
});

routerAuth.post('/registro', (req, res) => {
    
    
    //validaciones
    
    console.log(req.body);
              
    

    res.send('usuario creado');
});




    

module.exports = routerAuth;

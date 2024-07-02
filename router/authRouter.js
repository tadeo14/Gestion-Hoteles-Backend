const express = require("express");
const routerAuth = express.Router();
const usuarioModel = require('../models/usuario-model');

routerAuth.post('/login', (req, res) => {
    res.send('login');
});

routerAuth.post('/registro', (req, res) => {
    
    const { name, edad, email, password } = req.body;

    //validaciones 
    if (name === "" || edad === "" || email === "" || password === "") {
        res.send('Todos los campos son obligatorios');
    }
			
    const usuario = new usuarioModel(req.body);
    console.log(usuario);
    res.send('usuario creado');
});
    //validaciones
    





    

module.exports = routerAuth;

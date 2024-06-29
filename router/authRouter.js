const express = require("express");
const usuarioModel = require('../models/usuario-model.js');
const routerAuth = express.Router();

routerAuth.post('/login', (req, res) => {
    res.send('login');
});

routerAuth.post('/registro', async (req, res) => {
    
    const { name, edad, email, password } = req.body;

    //validaciones 
    if (name === '' || edad === '' || email === '' || password === '') {
        res.send('Todos los campos son obligatorios');
    }
    
    const usuario = new usuarioModel(req.body);
    console.log(usuario);            
    
    await usuario.sabe();

    res.send('usuario creado');
});




    

module.exports = routerAuth;

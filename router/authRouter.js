const express = require("express");
const routerAuth = express.Router();
const usuarioModel = require('../models/usuario-model');

routerAuth.post('/login', (req, res) => {
    res.send('login');
});

routerAuth.post('/registro', async (req, res) => {
    
    const { name, edad, email, password } = req.body;

    //validaciones 
    if (name === "" || edad === "" || email === "" || password === "") {
        res.send('Todos los campos son obligatorios');
    }
			
    const usuario = new usuarioModel (req.body);

    //guardamos en la base de datos
    await usuario.save();


    res.send('usuario creado');
});
    //validaciones
    





    

module.exports = routerAuth;

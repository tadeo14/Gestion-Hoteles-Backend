const express = require("express");
const routerAuth = express.Router ();



routerAuth.get('/saludo', (req, res) => {
    res.send ('Hola saludos desde el backend');
});


routerAuth.post('/crearUsuario', (req, res) => {
    res.send('Usuario creado'); 
});

routerAuth.delete('/borrarElemento', (req, res) => {
    res.send('Usuario eliminado');
});

routerAuth.put('/editar', (req, res) => {
    res.send('Usuario editado');
});


module.exports = routerAuth;  //se utiliza la variable definida 
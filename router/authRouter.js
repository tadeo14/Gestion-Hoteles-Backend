const express = require("express");
const routerAuth = express.Router();
const { crearUsuario } = require("../controllers/authControllers");

routerAuth.post('/login', (req, res) => {
    res.send('login');
});

routerAuth.post('/registro', crearUsuario);
    

module.exports = routerAuth;

const express = require("express");
const routerAuth = express.Router();

routerAuth.post('/login', (req, res) => {
    res.send('login');
});

routerAuth.post('/registro', (req, res) => {
    console.log(req.body.name);
    res.send('usuario creado');
});

module.exports = routerAuth;

const express = require("express");
const routerAuth = express.Router ();



routerAuth.post('login', (req, res) => {
    res.send('login');
});

routerAuth.post('registro', (req, res) => {
    res.send('registro');
});

module.exports = routerAuth;  //se utiliza la variable definida 
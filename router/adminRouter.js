const express = require("express");
const routerAdmin = express.Router();

routerAdmin.post('/login', loginUsuario);

    

module.exports = routerAdmin;
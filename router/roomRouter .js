const express = require("express");
const { realizarReserva, cancelarReserva, listadoReservas } = require("../controllers/roomControlles");
const { validarJWT } = require("../middleware/validarJWT");
const routerRoom = express.Router();

//? Creacion de los endpoints para gestionar las habitaciones 


routerRoom.post('/reservas', realizarReserva);

routerRoom.delete('/reservas/:reservaId', cancelarReserva);

routerRoom.get('/listadoReservas', listadoReservas);

module.exports = routerRoom;

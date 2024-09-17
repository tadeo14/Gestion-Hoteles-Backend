const express = require("express");
const { realizarReserva, cancelarReserva, listadoReservas, listadoReservasUsuario } = require("../controllers/roomControlles");
const { validarJWT } = require("../middleware/validarJWT");
const routerRoom = express.Router();




routerRoom.post('/reservas', realizarReserva);

routerRoom.delete('/reservas/:reservaId', cancelarReserva);

routerRoom.get('/listadoReservas', listadoReservas);

routerRoom.get('/listadoReservas/:usuarioId',  listadoReservasUsuario);



module.exports = routerRoom;

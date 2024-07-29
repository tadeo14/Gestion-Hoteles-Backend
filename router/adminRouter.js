const express = require("express");
const { crearHabitacion, listaUsuarios,listaHabitaciones, editarHabitacion, eliminarHabitacion } = require("../controllers/adminControllers");
const { validarJWT } = require("../middleware/validarJWT");
const routerAdmin = express.Router();

//? Creacion de los endpoints para gestionar las habitaciones 
routerAdmin.get('/habitaciones',validarJWT, listaHabitaciones);


routerAdmin.post('/crearHabitacion',validarJWT,crearHabitacion);
routerAdmin.put('/editarHabitacion',validarJWT,editarHabitacion);
routerAdmin.delete('/eliminarHabitacion/:id',validarJWT,eliminarHabitacion);
routerAdmin.get('/usuarios',validarJWT,listaUsuarios);


module.exports = routerAdmin;

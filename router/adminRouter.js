const express = require("express");
const { crearHabitacion,listaHabitaciones, editarHabitacion, eliminarHabitacion } = require("../controllers/adminControllers");
const routerAdmin = express.Router();

//Creacion de los endpoints para gestionar las habitaciones 
routerAdmin.get('/habitaciones', listaHabitaciones);

//Creacion de los endpoints para gestionar las habitaciones 
routerAdmin.get('/habitaciones', listaHabitaciones);

routerAdmin.post('/crearHabitacion',crearHabitacion);
routerAdmin.put('/editarHabitacion',editarHabitacion);
routerAdmin.delete('/eliminarHabitacion/:id',eliminarHabitacion);


module.exports = routerAdmin;

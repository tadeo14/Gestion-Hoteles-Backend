const express = require("express");
const { crearHabitacion, listaUsuarios,listaHabitaciones,eliminarUsuario,  editarHabitacion, eliminarHabitacion, editarUsuario } = require("../controllers/adminControllers");
const { validarJWT } = require("../middleware/validarJWT");
const routerAdmin = express.Router();

 
routerAdmin.get('/habitaciones',validarJWT, listaHabitaciones);


routerAdmin.post('/crearHabitacion',validarJWT,crearHabitacion);
routerAdmin.put('/editarHabitacion',validarJWT,editarHabitacion);
routerAdmin.delete('/eliminarHabitacion/:id',validarJWT,eliminarHabitacion);
routerAdmin.get('/usuarios',validarJWT,listaUsuarios);

routerAdmin.put('/editarUsuario', validarJWT, editarUsuario);
routerAdmin.delete('/eliminarUsuario/:id',eliminarUsuario);



module.exports = routerAdmin;

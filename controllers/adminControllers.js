const habitacionModel = require("../models/habitacion-model");
const usuarioModel = require("../models/usuario-model");


const crearHabitacion = async (req,res) => {
    try {
         // obtenemos los valores que envió en frontend
        const {numero,tipo,precio,disponibilidad,imagen} = req.body;
        
        // validaciones
        if (numero === "" || tipo === "" || precio === "" || disponibilidad === "") {
            res.status(400).json({
                msg :'Todos los campos numero, tipo, precio y disponibilidad son obligatorios',
            });
            }

        // analizamos si el numero de habitacion ya existe
        let habitacion = await habitacionModel.findOne({ numero });
        if (habitacion) {
            return res.status(400).json({
                mensaje:'La habitacion con ese numero ya existe',
            });
            }
        
        // si todo está OK guardamos la habitacion creada en la base de datos
        habitacion = new habitacionModel(req.body);
        await habitacion.save();
        res.status(201).json({
            msg:'Habitación creada con éxito'
        })
    
    } catch (error) {
        res.status(500).json({
            msg:'Error, por favor contactarse con el administrador'
        })
    }
};


const listaUsuarios = async(req,res) => {
    try {
        const listaUsuarios = await usuarioModel.find();
        res.status(200).json({
            msg: 'Lista de usuarios enviada',
            listaUsuarios
        })
    } catch (error) {
        res.status(500).json({
            msg:'Error, por favor contactarse con el administrador'
        })
    }
}



module.exports = {crearHabitacion,listaUsuarios};
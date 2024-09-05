const habitacionModel = require("../models/habitacion-model");
const usuarioModel = require("../models/usuario-model");
const bcrypt = require('bcrypt');


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



const listaHabitaciones = async (req, res) => {
    try {
        
        //traemos el listado de habitaciones
        const habitaciones = await habitacionModel.find();

        res.status(200).json({
            msg: 'lista de productos enviada',
            habitaciones,
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador',
        });
    }
    

};

const editarHabitacion = async (req, res) => {
    try {
        //creamos una variable para reemplzar el req.body
        const {numero,tipo,precio, _id} = req.body;
        //validaciones 
        if (numero === "" || tipo === "" || precio === "" ) {
            res.status(400).json({
                msg: 'Todos los campos numero, tipo, precio y disponibilidad son obligatorios',
            });
            }

        //verificamos si el id existe 
        const habitacionEditar = await habitacionModel.findById(_id);

        //verificamos que el id exista
        if (!habitacionEditar) {
            return res.status(400).json({
                msg: 'Habitación no encontrada',
            });
        }

      

        //editamos la habitacion
        await habitacionModel.findByIdAndUpdate(_id,req.body);
              
        
        res.status(200).json({
            msg: 'producto editado',
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador',
        });
    }
};

const eliminarHabitacion = async (req, res) => {
    try {
        //verificamos si el id existe
        const habitacionEliminar = await habitacionModel.findById(req.params.id);

        //verificamos que el id este eliminado
        if (!habitacionEliminar) {
            return res.status(400).json({
                msg: 'Habitación no encontrada',
            });
        }

        //buscamos el id especificado y lo eliminamos
       await habitacionModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            msg: 'Habitación eliminada',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador',
        });
    }
};

const editarUsuario = async (req, res) => {
    try {
        // Desestructuramos los datos recibidos en la solicitud
        const { nombre, email, contraseña, _id } = req.body;

        // Validaciones
        if (!nombre || !email || !contraseña) {
            return res.status(400).json({
                msg: 'Todos los campos nombre, email y contraseña son obligatorios',
            });
        }

        // Verificamos si el usuario con el ID proporcionado existe
        const usuarioEditar = await usuarioModel.findById(_id);

        if (!usuarioEditar) {
            return res.status(400).json({
                msg: 'Usuario no encontrado',
            });
        }

        // Si hay una nueva contraseña, la encriptamos
        const salt = bcrypt.genSaltSync(10);
        const contraseñaEncriptada = bcrypt.hashSync(contraseña, salt);

        // Actualizamos los datos del usuario, incluida la contraseña encriptada
        await usuarioModel.findByIdAndUpdate(_id, {
            nombre,
            email,
            contraseña: contraseñaEncriptada
        });

        // Respuesta exitosa
        res.status(200).json({
            msg: 'Usuario editado correctamente',
        });

    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador',
        });
    }
};

const eliminarUsuario  =  (req, res) => {
    //eliminar usuario
    
    res.status(200).json({
        msg: 'eliminar usuario',
    })
};

module.exports = {eliminarUsuario, editarUsuario, crearHabitacion,listaHabitaciones, editarHabitacion, eliminarHabitacion,listaUsuarios};

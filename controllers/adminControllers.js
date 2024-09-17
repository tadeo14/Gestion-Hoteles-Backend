const habitacionModel = require("../models/habitacion-model");
const usuarioModel = require("../models/usuario-model");
const bcrypt = require('bcrypt');

const crearHabitacion = async (req, res) => {
    try {
        const { numero, tipo, precio, disponibilidad, imagen } = req.body;

        if (numero === "" || tipo === "" || precio === "" || disponibilidad === "") {
            res.status(400).json({
                msg: 'Todos los campos numero, tipo, precio y disponibilidad son obligatorios',
            });
        }

        let habitacion = await habitacionModel.findOne({ numero });
        if (habitacion) {
            return res.status(400).json({
                mensaje: 'La habitacion con ese numero ya existe',
            });
        }

        habitacion = new habitacionModel(req.body);
        await habitacion.save();
        res.status(201).json({
            msg: 'Habitación creada con éxito'
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador'
        });
    }
};

const listaUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await usuarioModel.find();
        res.status(200).json({
            msg: 'Lista de usuarios enviada',
            listaUsuarios
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador'
        });
    }
};

const listaHabitaciones = async (req, res) => {
    try {
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
        const { numero, tipo, precio, _id } = req.body;

        if (numero === "" || tipo === "" || precio === "") {
            res.status(400).json({
                msg: 'Todos los campos numero, tipo, precio y disponibilidad son obligatorios',
            });
        }

        const habitacionEditar = await habitacionModel.findById(_id);

        if (!habitacionEditar) {
            return res.status(400).json({
                msg: 'Habitación no encontrada',
            });
        }

        await habitacionModel.findByIdAndUpdate(_id, req.body);

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
        const habitacionEliminar = await habitacionModel.findById(req.params.id);

        if (!habitacionEliminar) {
            return res.status(400).json({
                msg: 'Habitación no encontrada',
            });
        }

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
        const { nombre, email, contraseña, _id } = req.body;

        if (!nombre || !email || !contraseña) {
            return res.status(400).json({
                msg: 'Todos los campos nombre, email y contraseña son obligatorios',
            });
        }

        const usuarioEditar = await usuarioModel.findById(_id);

        if (!usuarioEditar) {
            return res.status(400).json({
                msg: 'Usuario no encontrado',
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const contraseñaEncriptada = bcrypt.hashSync(contraseña, salt);

        await usuarioModel.findByIdAndUpdate(_id, {
            nombre,
            email,
            contraseña: contraseñaEncriptada
        });

        res.status(200).json({
            msg: 'Usuario editado correctamente',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador',
        });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminar = await usuarioModel.findById(req.params.id);

        if (!usuarioEliminar) {
            return res.status(400).json({
                msg: 'Usuario no encontrada',
            });
        }

        await usuarioModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            msg: 'Usuario eliminada',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador',
        });
    }
};

module.exports = { eliminarUsuario, editarUsuario, crearHabitacion, listaHabitaciones, editarHabitacion, eliminarHabitacion, listaUsuarios };

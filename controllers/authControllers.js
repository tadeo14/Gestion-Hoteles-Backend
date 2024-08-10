const usuarioModel = require("../models/usuario-model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;

        if (nombre === "" || email === "" || contraseña === "") {
            return res.status(400).json({
                msg: 'Todos los campos son obligatorios',
            });
        }

        let usuario = await usuarioModel.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                mensaje: 'Ya existe un usuario con ese email',
            });
        }

        usuario = new usuarioModel(req.body);

        const salt = bcrypt.genSaltSync(10);
        usuario.contraseña = bcrypt.hashSync(contraseña, salt);
        console.log(usuario);

        await usuario.save();

        res.status(201).json({
            msg: 'Usuario creado con éxito',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, por favor contactarse con el administrador',
        });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        if (email === "" || contraseña === "") {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios",
            });
        }

        let usuario = await usuarioModel.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                mensaje: "Email inválido",
            });
        }

        const validarPassword = bcrypt.compareSync(contraseña, usuario.contraseña);
        if (!validarPassword) {
            return res.status(400).json({
                mensaje: "Contraseña incorrecta",
            });
        }

        const payload = {
            id: usuario._id,  // Incluyendo el ID del usuario en el payload del token
            name: usuario.nombre,
            rol: usuario.rol,
        };

        const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '3h' });

        res.status(200).json({
            msg: 'Login exitoso',
            token,
            rol: usuario.rol,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contactarse con un administrador',
        });
    }
};

module.exports = { crearUsuario, loginUsuario };

const usuarioModel = require("../models/usuario-model");
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
    
    try {
        const { name, edad, email, password } = req.body;

    //validaciones 
    if (name === "" || edad === "" || email === "" || password === "") {
        res.status(400).json({
            msg :'Todos los campos son obligatorios',
            
        });
        }
        //Analizamos si el usuario no fue registrado con email
        let usuario = await usuarioModel.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                mensaje:'El usuario registrado ya existe',
            });
        }


        usuario = new usuarioModel(req.body);
        
        const salt = bcrypt.genSaltSync(10); //le da la robustes a nuestro numero
        usuario.password = bcrypt.hashSync(password, salt);
        console.log(usuario);
        

        //guardamos en la base de datos
        await usuario.save();


        res.status(201).json({
            msg: 'usuario creado',
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Contactarse con un administrador',
        })
    }
    
    
};

const loginUsuario = (req, res) => {
    res.send('login');
}


module.exports = { crearUsuario, loginUsuario };
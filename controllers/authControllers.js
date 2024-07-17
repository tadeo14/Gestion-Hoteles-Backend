const usuarioModel = require("../models/usuario-model");
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
    
    try {
        const { name, edad, email, password } = req.body;

    //validaciones 
    if (name === "" || edad === "" || email === "" || password === "") {
        res.json({
            msg :'Todos los campos son obligatorios',
            
        });
        }
        //Analizamos si el usuario no fue registrado con email
        let usuario = await usuarioModel.findOne({ email });
        if (usuario) {
            return res.json({
                mensaje:'El usuario registrado ya existe',
            });
        }


        usuario = new usuarioModel(req.body);
        
        const salt = bcrypt.genSaltSync(10); //le da la robustes a nuestro numero
        const hash = bcrypt.hashSync(password, salt);
        

        //guardamos en la base de datos
        await usuario.save();


        res.json({
            msg: 'usuario creado',
        });
        
    } catch (error) {
        console.log(error);
    }
    
    
};

module.exports = { crearUsuario };
const usuarioModel = require("../models/usuario-model");

const crearUsuario = async (req, res) => {
    
    try {
        const { name, edad, email, password } = req.body;

    //validaciones 
    if (name === "" || edad === "" || email === "" || password === "") {
        res.send('Todos los campos son obligatorios');
        }
        //Analizamos si el usuario no fue registrado con email
        let usuario = await usuarioModel.findOne({ email });
        console.log(usuario);
			
     usuario = new usuarioModel(req.body);

    //guardamos en la base de datos
    await usuario.save();


        res.send('usuario creado');
        
    } catch (error) {
        console.log(error);
    }
    
    
};

module.exports = { crearUsuario };
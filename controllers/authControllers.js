const usuarioModel = require("../models/usuario-model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
    
    try {
        const { nombre,email,contraseña } = req.body;

    //validaciones 
    if (nombre === "" || email === "" || contraseña === "") {
        res.status(400).json({
            msg :'Todos los campos son obligatorios',
        });
        }

        //Analizamos si el usuario no fue registrado con email
        let usuario = await usuarioModel.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                mensaje:'Ya existe un usuario con ese email',
            });
        }

        // si todo OK, guardamos el usuario en la base de datos
        usuario = new usuarioModel(req.body);
        
        const salt = bcrypt.genSaltSync(10); //le da la robustes a nuestro numero
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
        })
    }
};

const loginUsuario = async (req, res) => {
    try {
      const { email, contraseña } = req.body;
  
      // Validaciones
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
  
      // Validamos password, vamos a comparar la contraseña del correo que encontre con la que ingreso el usuario
      const validarPassword = bcrypt.compareSync(contraseña, usuario.contraseña);
      if (!validarPassword) {
        return res.status(400).json({
          mensaje: "Contraseña incorrecta",
        });
      }
        
        //creamos un objeto el cual definimos los datos que queremos guardar en el token,
        const payload = {
            name: usuario.name,
            rol: usuario.rol,
        };
        //creamos el token
        const token = jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '3h',
        });

        console.log(token);



        res.status(200).json({
            mensaje: "Login exitoso",
          });
        } catch (error) {
          res.status(500).json({
            mensaje: "Contactarse con un administrador",
          });
        }
      };
      
      // Exporta ambas funciones
      module.exports = { crearUsuario, loginUsuario };
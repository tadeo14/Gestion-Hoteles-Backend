const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        default: 'Usuario'
    }
});
				
module.exports = model('Usuarios', UsuarioSchema);
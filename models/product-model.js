const { Schema, model } = require ('mongoose');

const ProductSchema = Schema({
    nameProduct: {
        type: String,
        required: true,
    },
	
    numeroSerie: {
        type: Number,
        unique: true,
    },

    stock: {
        type: Boolean,
        required: true,
    },
	
    precio: {
        type: Number,
        required: true,
    }
});
				
module.exports = model('Producto', ProductSchema);
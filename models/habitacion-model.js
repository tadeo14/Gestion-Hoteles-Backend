const { Schema, model } = require ('mongoose');

const HabitacionSchema = Schema({
   numero:{
    type: Number,
    required: true,
    unique: true
   },
   tipo:{
    type: String,
    required: true
   },
   precio:{
    type: Number,
    required: true,
   },
   disponibilidad: {
    type: [Date],
    default: [],
    required: true
   },
   imagen: {
    type: String,
    required: false
   }
});
				
module.exports = model('Habitaciones', HabitacionSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservaSchema = new Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  habitacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
});

module.exports = mongoose.model('Reserva', ReservaSchema);

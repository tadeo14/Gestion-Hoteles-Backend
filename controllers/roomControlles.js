const habitacionModel = require("../models/habitacion-model");
const reservaModel = require("../models/reserva-model");



//realizar reserva
const realizarReserva = async (req, res) => {
    const { usuarioId, habitacionId, fechaInicio, fechaFin } = req.body;

    if (!usuarioId || !habitacionId || !fechaInicio || !fechaFin) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    try {
        const habitacion = await habitacionModel.findById(habitacionId);
        if (!habitacion) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        // Verificar disponibilidad
        const reservasConflictivas = await reservaModel.find({
            habitacion: habitacionId,
            $or: [
                { fechaInicio: { $lt: fechaFin, $gte: fechaInicio } },
                { fechaFin: { $gt: fechaInicio, $lte: fechaFin } },
                { fechaInicio: { $lte: fechaInicio }, fechaFin: { $gte: fechaFin } },
            ],
        });

        if (reservasConflictivas.length > 0) {
            return res.status(400).json({ message: 'La habitación no está disponible para las fechas seleccionadas' });
        }

        const nuevaReserva = new reservaModel({
            usuario: usuarioId,
            habitacion: habitacionId,
            fechaInicio,
            fechaFin,
        });

        await nuevaReserva.save();
        res.status(201).json({ message: 'Reserva creada exitosamente', reserva: nuevaReserva });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reserva', error : error.message });
    }
};
const listadoReservasUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    
    // Aquí filtrarías las reservas basadas en el usuarioId
    const reservas = await reservaModel.find({ usuario: usuarioId });

    if (!reservas) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontraron reservas para este usuario'
        });
    }

    res.json({
        ok: true,
        listadoReservas: reservas
    });
};
// Cancelar reserva
const cancelarReserva = async (req, res) => {
    const { reservaId } = req.params; // Usaremos el ID de la reserva en la URL para identificarla

    if (!reservaId) {
        return res.status(400).json({ message: 'ID de reserva requerido' });
    }

    try {
        // Buscar y eliminar la reserva
        const reservaEliminada = await reservaModel.findByIdAndDelete(reservaId);

        if (!reservaEliminada) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        res.status(200).json({ message: 'Reserva cancelada exitosamente', reserva: reservaEliminada });
    } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        res.status(500).json({ message: 'Error al cancelar la reserva', error: error.message });
    }
};
const listadoReservasUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    
    // Aquí filtrarías las reservas basadas en el usuarioId
    const reservas = await reservaModel.find({ usuario: usuarioId });

    if (!reservas) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontraron reservas para este usuario'
        });
    }

    res.json({
        ok: true,
        listadoReservas: reservas
    });
};


const listadoReservas = async(req,res) => {
    try {
        const listadoReservas = await reservaModel.find();
        res.status(200).json({
            msg: 'Lista de reservas enviada',
            listadoReservas
        })
    } catch (error) {
        res.status(500).json({
            msg:'Error, por favor contactarse con el administrador'
        })
    }
}

//cancelar reserva

module.exports = { realizarReserva, cancelarReserva, listadoReservas, listadoReservasUsuario };

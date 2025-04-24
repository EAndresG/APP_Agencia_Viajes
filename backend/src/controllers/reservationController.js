const Reservation = require('../models/Reservation');

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservas', error });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reserva', error });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { package_id, total_price } = req.body; // Datos enviados desde el frontend
    const user_id = req.user.id; // Obtener el ID del usuario autenticado desde el token

    const newReservation = await Reservation.create({
      userId: user_id,
      packageId: package_id,
      totalPrice: total_price,
      peopleCount: 1, // Por defecto, 1 persona
      travelDate: new Date(), // Fecha actual como ejemplo
    });

    res.status(201).json({ message: "Reservación creada con éxito", newReservation });
  } catch (error) {
    console.error("Error al crear la reservación:", error);
    res.status(500).json({ message: "Error al crear la reservación", error });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, people, status, amount } = req.body;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    await reservation.update({ date, people, status, amount });
    res.status(200).json({ message: 'Reserva actualizada con éxito', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reserva', error });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    await reservation.destroy();
    res.status(200).json({ message: 'Reserva eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reserva', error });
  }
};
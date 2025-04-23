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
    const { userId, packageId, date, people, status, amount } = req.body;

    const newReservation = await Reservation.create({
      userId,
      packageId,
      date,
      people,
      status,
      amount,
    });

    res.status(201).json({ message: 'Reserva creada con éxito', newReservation });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error });
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
// Importar el modelo de reservas
const Reservation = require('../models/Reservation');

// Controlador para obtener todas las reservas
exports.getReservations = async (req, res) => {
  try {
    // Obtener todas las reservas desde la base de datos
    const reservations = await Reservation.findAll();
    // Responder con la lista de reservas
    res.status(200).json(reservations);
  } catch (error) {
    // Manejo de errores al obtener las reservas
    res.status(500).json({ message: 'Error al obtener las reservas', error });
  }
};

// Controlador para obtener una reserva por su ID
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la reserva desde los parámetros de la solicitud
    const reservation = await Reservation.findByPk(id); // Buscar la reserva por su ID
    if (!reservation) {
      // Si no se encuentra la reserva, responder con un error 404
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    // Responder con los datos de la reserva
    res.status(200).json(reservation);
  } catch (error) {
    // Manejo de errores al obtener la reserva
    res.status(500).json({ message: 'Error al obtener la reserva', error });
  }
};

// Controlador para crear una nueva reserva
exports.createReservation = async (req, res) => {
  try {
    const { package_id, total_price } = req.body; // Datos enviados desde el frontend
    const user_id = req.user.id; // Obtener el ID del usuario autenticado desde el token

    // Crear una nueva reserva en la base de datos
    const newReservation = await Reservation.create({
      userId: user_id,
      packageId: package_id,
      totalPrice: total_price,
      peopleCount: 1, // Por defecto, 1 persona
      travelDate: new Date(), // Fecha actual como ejemplo
    });

    // Responder con éxito y devolver la reserva creada
    res.status(201).json({ message: "Reservación creada con éxito", newReservation });
  } catch (error) {
    // Manejo de errores al crear la reserva
    console.error("Error al crear la reservación:", error);
    res.status(500).json({ message: "Error al crear la reservación", error });
  }
};

// Controlador para actualizar una reserva existente
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la reserva desde los parámetros de la solicitud
    const { date, people, status, amount } = req.body; // Datos a actualizar

    // Buscar la reserva por su ID
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      // Si no se encuentra la reserva, responder con un error 404
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Actualizar los datos de la reserva
    await reservation.update({ date, people, status, amount });
    // Responder con éxito y devolver la reserva actualizada
    res.status(200).json({ message: 'Reserva actualizada con éxito', reservation });
  } catch (error) {
    // Manejo de errores al actualizar la reserva
    res.status(500).json({ message: 'Error al actualizar la reserva', error });
  }
};

// Controlador para eliminar una reserva
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la reserva desde los parámetros de la solicitud

    // Buscar la reserva por su ID
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      // Si no se encuentra la reserva, responder con un error 404
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Eliminar el registro de la reserva
    await reservation.destroy();
    // Responder con éxito
    res.status(200).json({ message: 'Reserva eliminada con éxito' });
  } catch (error) {
    // Manejo de errores al eliminar la reserva
    res.status(500).json({ message: 'Error al eliminar la reserva', error });
  }
};
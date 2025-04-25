// Importar el modelo de reseñas
const Review = require('../models/Review');

// Controlador para obtener todas las reseñas
exports.getReviews = async (req, res) => {
  try {
    // Obtener todas las reseñas desde la base de datos
    const reviews = await Review.findAll();
    // Responder con la lista de reseñas
    res.status(200).json(reviews);
  } catch (error) {
    // Manejo de errores al obtener las reseñas
    res.status(500).json({ message: 'Error al obtener las reseñas', error });
  }
};

// Controlador para obtener una reseña por su ID
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la reseña desde los parámetros de la solicitud
    const review = await Review.findByPk(id); // Buscar la reseña por su ID
    if (!review) {
      // Si no se encuentra la reseña, responder con un error 404
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    // Responder con los datos de la reseña
    res.status(200).json(review);
  } catch (error) {
    // Manejo de errores al obtener la reseña
    res.status(500).json({ message: 'Error al obtener la reseña', error });
  }
};

// Controlador para crear una nueva reseña
exports.createReview = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { userId, packageId, rating, comment } = req.body;

    // Crear una nueva reseña en la base de datos
    const newReview = await Review.create({ userId, packageId, rating, comment });
    // Responder con éxito y devolver la reseña creada
    res.status(201).json({ message: 'Reseña creada con éxito', newReview });
  } catch (error) {
    // Manejo de errores al crear la reseña
    res.status(500).json({ message: 'Error al crear la reseña', error });
  }
};

// Controlador para actualizar una reseña existente
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la reseña desde los parámetros de la solicitud
    const { rating, comment } = req.body; // Datos a actualizar

    // Buscar la reseña por su ID
    const review = await Review.findByPk(id);
    if (!review) {
      // Si no se encuentra la reseña, responder con un error 404
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    // Actualizar los datos de la reseña
    await review.update({ rating, comment });
    // Responder con éxito y devolver la reseña actualizada
    res.status(200).json({ message: 'Reseña actualizada con éxito', review });
  } catch (error) {
    // Manejo de errores al actualizar la reseña
    res.status(500).json({ message: 'Error al actualizar la reseña', error });
  }
};

// Controlador para eliminar una reseña
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la reseña desde los parámetros de la solicitud

    // Buscar la reseña por su ID
    const review = await Review.findByPk(id);
    if (!review) {
      // Si no se encuentra la reseña, responder con un error 404
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    // Eliminar el registro de la reseña
    await review.destroy();
    // Responder con éxito
    res.status(200).json({ message: 'Reseña eliminada con éxito' });
  } catch (error) {
    // Manejo de errores al eliminar la reseña
    res.status(500).json({ message: 'Error al eliminar la reseña', error });
  }
};
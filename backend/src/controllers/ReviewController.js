const Review = require('../models/Review');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas', error });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reseña', error });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { userId, packageId, rating, comment } = req.body;

    const newReview = await Review.create({ userId, packageId, rating, comment });
    res.status(201).json({ message: 'Reseña creada con éxito', newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña', error });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    await review.update({ rating, comment });
    res.status(200).json({ message: 'Reseña actualizada con éxito', review });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña', error });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    await review.destroy();
    res.status(200).json({ message: 'Reseña eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña', error });
  }
};
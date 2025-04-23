const Guide = require('../models/Guide');

exports.getGuides = async (req, res) => {
  try {
    const guides = await Guide.findAll();
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los guías', error });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const { id } = req.params;
    const guide = await Guide.findByPk(id);
    if (!guide) {
      return res.status(404).json({ message: 'Guía no encontrado' });
    }
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el guía', error });
  }
};

exports.createGuide = async (req, res) => {
  try {
    const { userId, specialty, location, languages, bio, photo } = req.body;

    const newGuide = await Guide.create({ userId, specialty, location, languages, bio, photo });
    res.status(201).json({ message: 'Guía creado con éxito', newGuide });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el guía', error });
  }
};

exports.updateGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const { specialty, location, languages, bio, photo } = req.body;

    const guide = await Guide.findByPk(id);
    if (!guide) {
      return res.status(404).json({ message: 'Guía no encontrado' });
    }

    await guide.update({ specialty, location, languages, bio, photo });
    res.status(200).json({ message: 'Guía actualizado con éxito', guide });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el guía', error });
  }
};

exports.deleteGuide = async (req, res) => {
  try {
    const { id } = req.params;

    const guide = await Guide.findByPk(id);
    if (!guide) {
      return res.status(404).json({ message: 'Guía no encontrado' });
    }

    await guide.destroy();
    res.status(200).json({ message: 'Guía eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el guía', error });
  }
};
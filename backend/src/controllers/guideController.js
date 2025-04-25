// Importar el modelo de guías
const Guide = require('../models/Guide');

// Controlador para obtener todos los guías
exports.getGuides = async (req, res) => {
  try {
    // Obtener todos los registros de guías desde la base de datos
    const guides = await Guide.findAll();
    // Responder con la lista de guías
    res.status(200).json(guides);
  } catch (error) {
    // Manejo de errores al obtener los guías
    res.status(500).json({ message: 'Error al obtener los guías', error });
  }
};

// Controlador para obtener un guía por su ID
exports.getGuideById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del guía desde los parámetros de la solicitud
    const guide = await Guide.findByPk(id); // Buscar el guía por su ID
    if (!guide) {
      // Si no se encuentra el guía, responder con un error 404
      return res.status(404).json({ message: 'Guía no encontrado' });
    }
    // Responder con los datos del guía
    res.status(200).json(guide);
  } catch (error) {
    // Manejo de errores al obtener el guía
    res.status(500).json({ message: 'Error al obtener el guía', error });
  }
};

// Controlador para crear un nuevo guía
exports.createGuide = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { userId, specialty, location, languages, bio, photo } = req.body;

    // Crear un nuevo registro de guía en la base de datos
    const newGuide = await Guide.create({ userId, specialty, location, languages, bio, photo });
    // Responder con éxito y devolver el guía creado
    res.status(201).json({ message: 'Guía creado con éxito', newGuide });
  } catch (error) {
    // Manejo de errores al crear el guía
    res.status(500).json({ message: 'Error al crear el guía', error });
  }
};

// Controlador para actualizar un guía existente
exports.updateGuide = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del guía desde los parámetros de la solicitud
    const { specialty, location, languages, bio, photo } = req.body; // Datos a actualizar

    const guide = await Guide.findByPk(id); // Buscar el guía por su ID
    if (!guide) {
      // Si no se encuentra el guía, responder con un error 404
      return res.status(404).json({ message: 'Guía no encontrado' });
    }

    // Actualizar los datos del guía
    await guide.update({ specialty, location, languages, bio, photo });
    // Responder con éxito y devolver el guía actualizado
    res.status(200).json({ message: 'Guía actualizado con éxito', guide });
  } catch (error) {
    // Manejo de errores al actualizar el guía
    res.status(500).json({ message: 'Error al actualizar el guía', error });
  }
};

// Controlador para eliminar un guía
exports.deleteGuide = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del guía desde los parámetros de la solicitud

    const guide = await Guide.findByPk(id); // Buscar el guía por su ID
    if (!guide) {
      // Si no se encuentra el guía, responder con un error 404
      return res.status(404).json({ message: 'Guía no encontrado' });
    }

    // Eliminar el registro del guía
    await guide.destroy();
    // Responder con éxito
    res.status(200).json({ message: 'Guía eliminado con éxito' });
  } catch (error) {
    // Manejo de errores al eliminar el guía
    res.status(500).json({ message: 'Error al eliminar el guía', error });
  }
};
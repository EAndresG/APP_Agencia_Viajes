const { Calificacion } = require('../models');

exports.calificar = async (req, res) => {
  try {
    const { puntuacion, comentario } = req.body;
    const nueva = await Calificacion.create({
      id_usuario: req.usuario.id,
      id_paquete: req.params.id,
      puntuacion,
      comentario
    });
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al calificar' });
  }
};

exports.listarCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.findAll({ where: { id_paquete: req.params.id } });
    res.json(calificaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar calificaciones' });
  }
};

const { Paquete, Usuario } = require('../models');

exports.crearPaquete = async (req, res) => {
  if (req.usuario.rol !== 'agencia') return res.status(403).json({ error: 'Solo agencias pueden crear paquetes' });

  try {
    const { titulo, descripcion, precio, destino } = req.body;
    const nuevo = await Paquete.create({
      titulo,
      descripcion,
      precio,
      destino,
      id_agencia: req.usuario.id
    });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear paquete' });
  }
};

exports.listarPaquetes = async (req, res) => {
  try {
    const paquetes = await Paquete.findAll({
      include: { model: Usuario, attributes: ['nombre'], as: 'Usuario' }
    });
    res.json(paquetes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener paquetes' });
  }
};

exports.verPaquete = async (req, res) => {
  try {
    const paquete = await Paquete.findByPk(req.params.id);
    if (!paquete) return res.status(404).json({ error: 'Paquete no encontrado' });
    res.json(paquete);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar paquete' });
  }
};

exports.eliminarPaquete = async (req, res) => {
  try {
    const paquete = await Paquete.findByPk(req.params.id);
    if (!paquete) return res.status(404).json({ error: 'Paquete no encontrado' });
    if (req.usuario.id !== paquete.id_agencia) return res.status(403).json({ error: 'No autorizado' });

    await paquete.destroy();
    res.json({ mensaje: 'Paquete eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar paquete' });
  }
};

exports.obtenerPaquetes = (req, res) => {
  res.json({ mensaje: 'Lista de paquetes' });
};

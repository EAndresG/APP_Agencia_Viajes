const Paquete = require('../models/paquete.model');

exports.getPaquetes = async (req, res) => {
  try {
    const paquetes = await Paquete.find().populate('guia');
    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener paquetes' });
  }
};

exports.createPaquete = async (req, res) => {
  try {
    const paquete = new Paquete(req.body);
    await paquete.save();
    res.status(201).json(paquete);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear paquete' });
  }
};

exports.updatePaquete = async (req, res) => {
  try {
    const paquete = await Paquete.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(paquete);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar paquete' });
  }
};

exports.deletePaquete = async (req, res) => {
  try {
    await Paquete.findByIdAndDelete(req.params.id);
    res.json({ message: 'Paquete eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar paquete' });
  }
};
const { Articulo } = require('../models');

exports.obtenerArticulos = async (req, res) => {
    const articulos = await Articulo.findAll();
    res.json(articulos);
};

exports.crearArticulo = async (req, res) => {
    const nuevo = await Articulo.create({ ...req.body, UsuarioId: req.user.id });
    res.json(nuevo);
};

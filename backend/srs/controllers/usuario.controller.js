// Obtener un usuario por ID
exports.obtenerUsuario = (req, res) => {
    const id = req.params.id;
    res.json({ mensaje: `Mostrando usuario con ID ${id}` });
  };
  
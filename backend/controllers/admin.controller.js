// Listar todos los usuarios
exports.listarUsuarios = (req, res) => {
    res.json({ mensaje: 'Listado de usuarios (solo admin)' });
  };
  
  // Modificar un usuario
  exports.modificarUsuario = (req, res) => {
    const id = req.params.id;
    res.json({ mensaje: `Usuario ${id} modificado correctamente.` });
  };
  
  // Eliminar un usuario
  exports.eliminarUsuario = (req, res) => {
    const id = req.params.id;
    res.json({ mensaje: `Usuario ${id} eliminado correctamente.` });
  };
  
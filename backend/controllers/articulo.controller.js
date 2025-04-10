// Lista de artículos
exports.obtenerArticulos = (req, res) => {
    res.json({ mensaje: 'Listado de artículos turísticos' });
  };
  
  // Publicar un nuevo artículo
  exports.publicarArticulo = (req, res) => {
    const { titulo, contenido } = req.body;
    res.json({ mensaje: `Artículo "${titulo}" publicado correctamente.` });
  };
  
const { Usuario, Administrador, Articulo, Calificacion, Paquete } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol
    });
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol },
      secret,
      { expiresIn }
    );
    res.json({ token, usuario: { id: usuario.id_usuario, rol: usuario.rol, nombre: usuario.nombre } });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Registro de usuario
exports.registerUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol: rol || 'usuario', // Por defecto, rol "usuario"
    });
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
};

// Registro de paquete
exports.registerPaquete = async (req, res) => {
  try {
    const { titulo, descripcion, precio, destino, id_agencia } = req.body;
    const nuevoPaquete = await Paquete.create({
      titulo,
      descripcion,
      precio,
      destino,
      id_agencia,
    });
    res.status(201).json({ mensaje: 'Paquete registrado correctamente', paquete: nuevoPaquete });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar paquete', detalle: error.message });
  }
};

// Registro de artículo
exports.registerArticulo = async (req, res) => {
  try {
    const { titulo, contenido, imagen_destacada, id_autor } = req.body;
    const nuevoArticulo = await Articulo.create({
      titulo,
      contenido,
      imagen_destacada,
      id_autor,
    });
    res.status(201).json({ mensaje: 'Artículo registrado correctamente', articulo: nuevoArticulo });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar artículo', detalle: error.message });
  }
};

// Registro de calificación
exports.registerCalificacion = async (req, res) => {
  try {
    const { id_usuario, id_paquete, puntuacion, comentario } = req.body;
    const nuevaCalificacion = await Calificacion.create({
      id_usuario,
      id_paquete,
      puntuacion,
      comentario,
    });
    res.status(201).json({ mensaje: 'Calificación registrada correctamente', calificacion: nuevaCalificacion });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar calificación', detalle: error.message });
  }
};

// Registro de administrador
exports.registerAdministrador = async (req, res) => {
  try {
    const { id_usuario, nivel_permiso } = req.body;
    const nuevoAdmin = await Administrador.create({
      id_usuario,
      nivel_permiso,
    });
    res.status(201).json({ mensaje: 'Administrador registrado correctamente', administrador: nuevoAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar administrador', detalle: error.message });
  }
};
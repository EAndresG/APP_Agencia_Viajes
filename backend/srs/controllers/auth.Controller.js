const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, contraseña, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const usuario = new Usuario({ nombre, apellido, email, telefono, contraseña: hashedPassword, rol });
    await usuario.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const { isValidEmail, isValidPassword } = require('../utils/helpers');

if (!isValidEmail(email)) {
  return res.status(400).json({ error: 'Correo electrónico no válido' });
}

if (!isValidPassword(contraseña)) {
  return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
}
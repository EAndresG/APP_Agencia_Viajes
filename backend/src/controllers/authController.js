const User = require('../models/User');
const Guide = require('../models/Guide');
const Admin = require('../models/Admin'); // Importar el modelo Admin
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, userType, acceptTerms } = req.body;

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      userType,
      acceptTerms,
    });

    // Si el usuario es un administrador, crear un registro en la tabla admins
    if (userType === 'admin') {
      await Admin.create({
        userId: newUser.id, // Relacionar con el ID del usuario recién creado
      });
    }

    // Si el usuario es un guía, crear un registro en la tabla guides
    if (userType === 'guide') {
      const { description, identification } = req.body;
      await Guide.create({
        userId: newUser.id,
        description,
        identification,
      });
    }

    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token, userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ where: { email, userType: 'admin' } });
    if (!user) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión como administrador:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};
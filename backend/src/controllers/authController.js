// Importar modelos y dependencias necesarias
const User = require('../models/User'); // Modelo de usuarios
const Guide = require('../models/Guide'); // Modelo de guías
const Admin = require('../models/Admin'); // Modelo de administradores
const bcrypt = require('bcrypt'); // Para encriptar y comparar contraseñas
const jwt = require("jsonwebtoken"); // Para generar y verificar tokens JWT

// Controlador para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, userType, acceptTerms } = req.body;

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      userType,
      acceptTerms,
    });

    // Si el usuario es un administrador, crear un registro en la tabla de administradores
    if (userType === 'admin') {
      await Admin.create({
        userId: newUser.id, // Relacionar con el ID del usuario recién creado
      });
    }

    // Si el usuario es un guía, crear un registro en la tabla de guías
    if (userType === 'guide') {
      const { description, identification } = req.body;
      await Guide.create({
        userId: newUser.id,
        description,
        identification,
      });
    }

    // Responder con éxito
    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

// Controlador para iniciar sesión de un usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: '1d', // El token expira en 1 día
    });

    // Responder con el token y el tipo de usuario
    res.status(200).json({ message: 'Inicio de sesión exitoso', token, userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Controlador para iniciar sesión de un administrador
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al administrador en la base de datos
    const admin = await User.findOne({ where: { email, userType: "admin" } });
    if (!admin) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: admin.id, userType: admin.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // El token expira en 1 día
    );

    // Responder con el token y los datos del administrador
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
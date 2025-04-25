// Importar el modelo de usuarios
const User = require('../models/User');

// Controlador para obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    // Obtener todos los registros de usuarios desde la base de datos
    const users = await User.findAll();
    // Responder con la lista de usuarios
    res.status(200).json(users);
  } catch (error) {
    // Manejo de errores al obtener los usuarios
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la solicitud
    const user = await User.findByPk(id); // Buscar el usuario por su ID
    if (!user) {
      // Si no se encuentra el usuario, responder con un error 404
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Responder con los datos del usuario
    res.status(200).json(user);
  } catch (error) {
    // Manejo de errores al obtener el usuario
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario autenticado
    const { firstName, lastName, phone } = req.body; // Datos enviados desde el frontend

    // Buscar el usuario por su ID
    const user = await User.findByPk(userId);
    if (!user) {
      // Si no se encuentra el usuario, responder con un error 404
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    await user.save();

    // Responder con éxito y devolver el usuario actualizado
    res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    // Manejo de errores al actualizar el usuario
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la solicitud

    // Buscar el usuario por su ID
    const user = await User.findByPk(id);
    if (!user) {
      // Si no se encuentra el usuario, responder con un error 404
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminar el registro del usuario
    await user.destroy();
    // Responder con éxito
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    // Manejo de errores al eliminar el usuario
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

// Controlador para obtener el usuario autenticado
exports.getCurrentUser = async (req, res) => {
  try {
    // Buscar el usuario autenticado por su ID y seleccionar solo los campos necesarios
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'userType'], // Selecciona los campos necesarios
    });

    if (!user) {
      // Si no se encuentra el usuario, responder con un error 404
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Responder con los datos del usuario autenticado
    res.status(200).json(user);
  } catch (error) {
    // Manejo de errores al obtener el usuario autenticado
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
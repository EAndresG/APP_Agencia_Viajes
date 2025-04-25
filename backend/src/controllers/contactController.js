// Importar el modelo de mensajes de contacto
const ContactMessage = require("../models/contactMessage");

// Controlador para crear un nuevo mensaje de contacto
exports.createMessage = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { name, email, message } = req.body;

    // Crear un nuevo mensaje en la base de datos
    const newMessage = await ContactMessage.create({ name, email, message });

    // Responder con éxito y devolver el mensaje creado
    res.status(201).json({ message: "Mensaje enviado con éxito", newMessage });
  } catch (error) {
    // Manejo de errores en caso de fallo al guardar el mensaje
    console.error("Error al guardar el mensaje:", error);
    res.status(500).json({ message: "Error al guardar el mensaje", error });
  }
};
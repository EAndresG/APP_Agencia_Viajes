const ContactMessage = require("../models/contactMessage");

exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Crear un nuevo mensaje en la base de datos
    const newMessage = await ContactMessage.create({ name, email, message });

    res.status(201).json({ message: "Mensaje enviado con éxito", newMessage });
  } catch (error) {
    console.error("Error al guardar el mensaje:", error);
    res.status(500).json({ message: "Error al guardar el mensaje", error });
  }
};
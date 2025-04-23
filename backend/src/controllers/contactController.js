const ContactMessage = require('../models/contactMessage');

exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los mensajes', error });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el mensaje', error });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await ContactMessage.create({ name, email, message });
    res.status(201).json({ message: 'Mensaje enviado con éxito', newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el mensaje', error });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    await message.destroy();
    res.status(200).json({ message: 'Mensaje eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el mensaje', error });
  }
};
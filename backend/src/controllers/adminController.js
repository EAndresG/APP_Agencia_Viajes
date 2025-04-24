const User = require("../models/User");

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findByPk(req.user.id, {
      attributes: ["id", "firstName", "lastName", "email", "phone", "userType"], // Selecciona los campos necesarios
    });

    if (!admin || admin.userType !== "admin") {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Error al obtener el perfil del administrador:", error);
    res.status(500).json({ message: "Error al obtener el perfil del administrador" });
  }
};
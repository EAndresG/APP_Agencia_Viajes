// Controlador para obtener el perfil del administrador
exports.getAdminProfile = async (req, res) => {
  try {
    // Datos ficticios del administrador (simulados, no obtenidos de una base de datos)
    const admin = {
      id: 1, // ID del administrador
      firstName: "Admin", // Nombre del administrador
      lastName: "User", // Apellido del administrador
      email: "admin@example.com", // Correo electrónico del administrador
      userType: "admin", // Tipo de usuario (administrador)
    };

    // Responder con los datos del administrador
    res.status(200).json(admin);
  } catch (error) {
    // Manejo de errores en caso de fallo al obtener el perfil
    console.error("Error al obtener el perfil del administrador:", error);
    res.status(500).json({ message: "Error al obtener el perfil del administrador" });
  }
};
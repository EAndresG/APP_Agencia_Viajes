exports.getAdminProfile = async (req, res) => {
  try {
    // Datos ficticios del administrador
    const admin = {
      id: 1,
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      userType: "admin",
    };

    res.status(200).json(admin);
  } catch (error) {
    console.error("Error al obtener el perfil del administrador:", error);
    res.status(500).json({ message: "Error al obtener el perfil del administrador" });
  }
};
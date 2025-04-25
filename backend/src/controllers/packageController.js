// Importar el modelo de paquetes
const Package = require('../models/Package');

// Controlador para obtener todos los paquetes
exports.getPackages = async (req, res) => {
  try {
    // Obtener todos los registros de paquetes desde la base de datos
    const packages = await Package.findAll();
    // Responder con la lista de paquetes
    res.status(200).json(packages);
  } catch (error) {
    // Manejo de errores al obtener los paquetes
    console.error('Error al obtener los paquetes:', error);
    res.status(500).json({ message: 'Error al obtener los paquetes', error });
  }
};

// Controlador para obtener un paquete por su ID
exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del paquete desde los parámetros de la URL
    const package = await Package.findByPk(id); // Buscar el paquete por ID

    if (!package) {
      // Si no se encuentra el paquete, responder con un error 404
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    // Responder con los datos del paquete
    res.status(200).json(package);
  } catch (error) {
    // Manejo de errores al obtener el paquete
    console.error("Error al obtener el paquete:", error);
    res.status(500).json({ message: 'Error al obtener el paquete', error });
  }
};

// Controlador para crear un nuevo paquete
exports.createPackage = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { guideId, name, location, price, capacity, duration, description, longDescription, itinerary } = req.body;

    // Crear un nuevo registro de paquete en la base de datos
    const newPackage = await Package.create({
      guideId,
      name,
      location,
      price,
      capacity,
      duration,
      description,
      longDescription,
      itinerary,
    });

    // Responder con éxito y devolver el paquete creado
    res.status(201).json({ message: 'Paquete creado con éxito', newPackage });
  } catch (error) {
    // Manejo de errores al crear el paquete
    console.error('Error al crear el paquete:', error);
    res.status(500).json({ message: 'Error al crear el paquete', error });
  }
};

// Controlador para actualizar un paquete existente
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del paquete desde los parámetros de la URL
    const { name, location, price, capacity, duration, description, longDescription, itinerary } = req.body;

    // Buscar el paquete por su ID
    const package = await Package.findByPk(id);
    if (!package) {
      // Si no se encuentra el paquete, responder con un error 404
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    // Actualizar los datos del paquete
    await package.update({
      name,
      location,
      price,
      capacity,
      duration,
      description,
      longDescription,
      itinerary,
    });

    // Responder con éxito y devolver el paquete actualizado
    res.status(200).json({ message: 'Paquete actualizado con éxito', package });
  } catch (error) {
    // Manejo de errores al actualizar el paquete
    res.status(500).json({ message: 'Error al actualizar el paquete', error });
  }
};

// Controlador para eliminar un paquete
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del paquete desde los parámetros de la URL

    // Buscar el paquete por su ID
    const package = await Package.findByPk(id);
    if (!package) {
      // Si no se encuentra el paquete, responder con un error 404
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    // Eliminar el registro del paquete
    await package.destroy();
    // Responder con éxito
    res.status(200).json({ message: 'Paquete eliminado con éxito' });
  } catch (error) {
    // Manejo de errores al eliminar el paquete
    res.status(500).json({ message: 'Error al eliminar el paquete', error });
  }
};

// Controlador para contar el total de paquetes
exports.countPackages = async (req, res) => {
  try {
    // Contar todos los registros de paquetes en la base de datos
    const totalPackages = await Package.count();
    // Responder con el total de paquetes
    res.status(200).json({ totalPackages });
  } catch (error) {
    // Manejo de errores al contar los paquetes
    console.error('Error al contar los paquetes:', error);
    res.status(500).json({ message: 'Error al contar los paquetes', error });
  }
};
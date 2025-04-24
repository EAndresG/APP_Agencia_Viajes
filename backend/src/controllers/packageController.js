const Package = require('../models/Package');

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.findAll(); // Obtener todos los paquetes desde la base de datos
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error al obtener los paquetes:', error);
    res.status(500).json({ message: 'Error al obtener los paquetes', error });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del paquete desde los parámetros de la URL
    const package = await Package.findByPk(id); // Buscar el paquete por ID

    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    res.status(200).json(package); // Devolver los datos del paquete
  } catch (error) {
    console.error("Error al obtener el paquete:", error);
    res.status(500).json({ message: 'Error al obtener el paquete', error });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const { guideId, name, location, price, capacity, duration, description, longDescription, itinerary } = req.body;

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

    res.status(201).json({ message: 'Paquete creado con éxito', newPackage });
  } catch (error) {
    console.error('Error al crear el paquete:', error);
    res.status(500).json({ message: 'Error al crear el paquete', error });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price, capacity, duration, description, longDescription, itinerary } = req.body;

    const package = await Package.findByPk(id);
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

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
    res.status(200).json({ message: 'Paquete actualizado con éxito', package });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el paquete', error });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const package = await Package.findByPk(id);
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    await package.destroy();
    res.status(200).json({ message: 'Paquete eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paquete', error });
  }
};
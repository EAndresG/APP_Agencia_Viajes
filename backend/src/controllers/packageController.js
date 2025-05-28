// packageController.js
const Package = require('../models/Package');

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error al obtener los paquetes:', error);
    res.status(500).json({ message: 'Error al obtener los paquetes', error });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPackage = await Package.findByPk(id);              // ← renombrada
    if (!foundPackage) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    res.status(200).json(foundPackage);
  } catch (error) {
    console.error('Error al obtener el paquete:', error);
    res.status(500).json({ message: 'Error al obtener el paquete', error });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const { name, location, price, capacity, duration, description, longDescription, itinerary } = req.body;

    // Obtener la ruta de la imagen cargada
    const imagePath = req.file ? `/images/${req.file.filename}` : null;

    // Crear el paquete con la imagen asociada
    const newPackage = await Package.create({
      name,
      location,
      price,
      capacity,
      duration,
      description,
      longDescription,
      itinerary,
      image: imagePath, // Guardar la ruta de la imagen
    });

    res.status(201).json({ message: "Paquete creado con éxito", newPackage });
  } catch (error) {
    console.error("Error al crear el paquete:", error);
    res.status(500).json({ message: "Error al crear el paquete" });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price, capacity, duration, description, longDescription, itinerary } = req.body;
    const foundPackage = await Package.findByPk(id);              // ← renombrada
    if (!foundPackage) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    await foundPackage.update({ name, location, price, capacity, duration, description, longDescription, itinerary });
    res.status(200).json({ message: 'Paquete actualizado con éxito', foundPackage });
  } catch (error) {
    console.error('Error al actualizar el paquete:', error);
    res.status(500).json({ message: 'Error al actualizar el paquete', error });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPackage = await Package.findByPk(id);             // ← renombrada
    if (!foundPackage) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    await foundPackage.destroy();
    res.status(200).json({ message: 'Paquete eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el paquete:', error);
    res.status(500).json({ message: 'Error al eliminar el paquete', error });
  }
};

exports.countPackages = async (req, res) => {
  try {
    const totalPackages = await Package.count();
    res.status(200).json({ totalPackages });
  } catch (error) {
    console.error('Error al contar los paquetes:', error);
    res.status(500).json({ message: 'Error al contar los paquetes', error });
  }
};

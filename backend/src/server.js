require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


const sequelize = require("./src/config/database");
const models = require("./src/models");

const app = express();

// Middlewares
app.use(morgan("dev")); // Registrar solicitudes HTTP
app.use(cors());
app.use(express.json());

// Sincronizar modelos con la base de datos
sequelize
  .sync({ alter: true }) // Cambia a `force: true` si deseas reiniciar las tablas (¡Cuidado con la pérdida de datos!)
  .then(() => console.log("Modelos sincronizados con la base de datos."))
  .catch((error) => console.error("Error al sincronizar los modelos:", error));

// Rutas
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes); // Registrar las rutas de usuarios

const packageRoutes = require('./src/routes/packageRoutes');
app.use('/api/packages', packageRoutes); // Registrar las rutas de paquetes

//Ruta para las reservaciones
const reservationRoutes = require('./src/routes/reservationRoutes');
app.use('/api/reservations', reservationRoutes);

const adminRoutes = require("./src/routes/adminRoutes"); // Importar las rutas de administrador
// Registrar las rutas de administrador
app.use("/api/admin", adminRoutes);

const contactRoutes = require("./src/routes/contactRoutes");
app.use("/api/contact", contactRoutes); // Registrar las rutas de contacto

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// Servir archivos estáticos desde la carpeta "public"
app.use("/images", express.static(path.join(__dirname, "public/images")));


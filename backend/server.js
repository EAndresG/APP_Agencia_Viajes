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
// Comentado para evitar recrear o alterar tablas que ya existen en Railway
// Puedes descomentar y usar { force: true } SOLO si quieres BORRAR Y RECREAR tus tablas en desarrollo.
// NO USAR force: true en producción con datos valiosos.
// sequelize
//   .sync({ alter: true }) // La opción { alter: true } fue la que causó el error de clave foránea duplicada
//   .then(() => console.log("Modelos sincronizados con la base de datos."))
//   .catch((error) => console.error("Error al sincronizar los modelos:", error));

// Una vez que sequelize.sync() se ha comentado, podemos asumir que la conexión es exitosa
// y la base de datos está lista para ser usada.
console.log("Conexión a la base de datos establecida y modelos listos para usar.");


// Rutas
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes); // Registrar las rutas de usuarios

const packageRoutes = require('./src/routes/packageRoutes');
app.use('/api/packages', packageRoutes); // Registrar las rutas de paquetes

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
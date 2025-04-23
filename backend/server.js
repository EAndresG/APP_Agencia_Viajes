require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middlewares
app.use(morgan("dev")); // Registrar solicitudes HTTP
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

describe("Pruebas de las rutas de autenticación", () => {
  it("Debe registrar un nuevo usuario", async () => {
    const response = await request(app).post("/auth/register").send({
      firstName: "Carlos",
      lastName: "Gutiérrez",
      email: `carlos${Date.now()}@example.com`, // Generar un correo único
      password: "123456",
      phone: "1234567890", // Opcional
      acceptTerms: true, // Opcional
    });

    console.log(response.body); // Inspeccionar la respuesta de la API

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Usuario registrado con éxito");
  });

  it("Debe iniciar sesión con credenciales válidas", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "carlos@example.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Debe fallar al iniciar sesión con credenciales inválidas", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "carlos@example.com",
      password: "incorrecto",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Contraseña incorrecta");
  });
});
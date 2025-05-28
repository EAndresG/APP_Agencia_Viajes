const request = require("supertest");
const express = require("express");
const packageRoutes = require("../routes/packageRoutes");
const verifyToken = require("../middlewares/authMiddleware"); // ✅ Importar sin desestructurar

// Mock del middleware de autenticación
jest.mock("../middlewares/authMiddleware", () => jest.fn((req, res, next) => next())); // ✅ Simulación correcta

// Crear una aplicación de prueba
const app = express();
app.use(express.json());
app.use("/api/packages", packageRoutes);

describe("Pruebas de las rutas de paquetes", () => {
  let packageId; // Variable para almacenar el ID del paquete creado

  it("Debe crear un nuevo paquete", async () => {
    const response = await request(app).post("/api/packages").send({
      name: "Paquete de prueba",
      location: "Cartagena",
      price: 500.0,
      capacity: 10,
      duration: "3 días",
      description: "Un paquete turístico de prueba",
      longDescription: "Este es un paquete turístico detallado para Cartagena.",
      itinerary: "Día 1: Llegada. Día 2: Tour. Día 3: Salida.",
    });

    expect(response.status).toBe(201);
    expect(response.body.newPackage).toHaveProperty("id");  // Corrección: acceder a newPackage
    packageId = response.body.newPackage.id;  // Actualización del packageId
  });

  it("Debe obtener todos los paquetes", async () => {
    const response = await request(app).get("/api/packages");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Debe obtener un paquete por ID", async () => {
    const response = await request(app).get(`/api/packages/${packageId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", packageId);
    expect(response.body).toHaveProperty("name", "Paquete de prueba");
  });

  it("Debe actualizar un paquete existente", async () => {
    const response = await request(app).put(`/api/packages/${packageId}`).send({
      name: "Paquete actualizado",
      location: "Bogotá",
      price: 600.0,
      capacity: 15,
      duration: "4 días",
      description: "Un paquete turístico actualizado",
      longDescription: "Este es un paquete turístico detallado para Bogotá.",
      itinerary: "Día 1: Llegada. Día 2: Tour. Día 3: Actividades. Día 4: Salida.",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Paquete actualizado con éxito");
  });

  it("Debe eliminar un paquete existente", async () => {
    const response = await request(app).delete(`/api/packages/${packageId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Paquete eliminado con éxito");
  });

  it("Debe contar el número total de paquetes", async () => {
    const response = await request(app).get("/api/packages/count");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalPackages");  // Cambio de "total" a "totalPackages"
    expect(response.body.totalPackages).toBeGreaterThanOrEqual(0);  // Cambio aquí también
  });
});

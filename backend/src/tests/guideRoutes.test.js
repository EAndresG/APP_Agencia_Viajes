// src/tests/guideRoutes.test.js
const request = require("supertest");
const express = require("express");
const guideRoutes = require("../routes/guideRoutes");

// Mock del middleware de autenticación para que siempre pase
jest.mock("../middlewares/authMiddleware", () =>
  // mockea la exportación por defecto como función middleware
  jest.fn((req, res, next) => next())
);

const app = express();
app.use(express.json());
app.use("/api/guides", guideRoutes);

describe("Pruebas de las rutas de guías", () => {
  let guideId;

  it("Debe crear un nuevo guía", async () => {
    const response = await request(app)
      .post("/api/guides")
      .send({
        userId: 1,
        specialty: "Tour Guide",
        location: "Cartagena",
        languages: ["Español", "Inglés"],
        bio: "Guía turístico con 5 años de experiencia.",
        photo: "url_foto.jpg",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Guía creado con éxito");
    expect(response.body.newGuide).toHaveProperty("id");
    expect(response.body.newGuide).toHaveProperty("userId", 1);
    guideId = response.body.newGuide.id;
  });

  it("Debe obtener todos los guías", async () => {
    const response = await request(app).get("/api/guides");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Debe obtener un guía por ID", async () => {
    const response = await request(app).get(`/api/guides/${guideId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", guideId);
    expect(response.body).toHaveProperty("userId", 1);
  });

  it("Debe actualizar un guía existente", async () => {
    const response = await request(app)
      .put(`/api/guides/${guideId}`)
      .send({
        specialty: "Tour Leader",
        location: "Bogotá",
        languages: ["Español", "Francés"],
        bio: "Guía especializado en aventuras extremas.",
        photo: "new_url_foto.jpg",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Guía actualizado con éxito");
  });

  it("Debe eliminar un guía existente", async () => {
    const response = await request(app).delete(`/api/guides/${guideId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Guía eliminado con éxito");
  });
});

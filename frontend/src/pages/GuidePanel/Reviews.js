import React from "react";
import { Card, Table, Badge, ProgressBar, Button } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const ResenasPage = () => {
  // Datos de ejemplo para las reseñas
  const reseñas = [
    {
      id: 1,
      paquete: "Cartagena - Ciudad Amurallada",
      cliente: "Carlos Rodríguez",
      fecha: "10 Abr. 2025",
      calificacion: 5,
      comentario: "Excelente experiencia, el hotel superó nuestras expectativas.",
      estado: "Publicado",
    },
    {
      id: 2,
      paquete: "San Andrés - All Inclusive",
      cliente: "María López",
      fecha: "05 Abr. 2025",
      calificacion: 4,
      comentario: "Muy buen servicio, solo que la playa estaba un poco llena.",
      estado: "Publicado",
    },
    {
      id: 3,
      paquete: "Medellín - Ciudad de la Eterna Primavera",
      cliente: "Juan Pérez",
      fecha: "28 Mar. 2025",
      calificacion: 3,
      comentario: "Buen tour pero el guía llegó tarde.",
      estado: "Pendiente",
    },
    {
      id: 4,
      paquete: "Santa Marta y Tayrona",
      cliente: "Ana Martínez",
      fecha: "15 Mar. 2025",
      calificacion: 5,
      comentario: "Increíble paisaje y atención personalizada. Lo recomiendo 100%.",
      estado: "Publicado",
    },
  ];

  // Estadísticas de reseñas
  const stats = {
    total: 47,
    promedio: 4.3,
    publicadas: 42,
    pendientes: 5,
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-grow-1">
        {/* Header */}
        <Header title="Reseñas" />

        <div className="container-fluid px-4 py-4">
          <h1 className="mt-4 mb-4">Reseñas</h1>

          {/* Estadísticas rápidas */}
          <div className="row mb-4">
            <div className="col-md-3">
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <h2 className="mb-0">{stats.total}</h2>
                  <p className="text-muted mb-0">Reseñas Totales</p>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-3">
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <h2 className="mb-0">{stats.promedio}</h2>
                  <p className="text-muted mb-0">Calificación Promedio</p>
                  <div className="mt-2">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < Math.floor(stats.promedio) ? "text-warning" : "text-muted"
                        }`}
                      ></i>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-3">
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <h2 className="mb-0">{stats.publicadas}</h2>
                  <p className="text-muted mb-0">Publicadas</p>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-3">
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <h2 className="mb-0">{stats.pendientes}</h2>
                  <p className="text-muted mb-0">Pendientes</p>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Tabla de reseñas */}
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Últimas Reseñas</h5>
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Paquete</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Calificación</th>
                    <th>Comentario</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reseñas.map((resena) => (
                    <tr key={resena.id}>
                      <td>{resena.paquete}</td>
                      <td>{resena.cliente}</td>
                      <td>{resena.fecha}</td>
                      <td>{resena.calificacion}</td> {/* Mostrar calificación como número */}
                      <td>
                        <div
                          className="text-truncate"
                          style={{ maxWidth: "200px" }}
                          title={resena.comentario}
                        >
                          {resena.comentario}
                        </div>
                      </td>
                      <td>
                        <Badge bg={resena.estado === "Publicado" ? "success" : "warning"}>
                          {resena.estado}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResenasPage;
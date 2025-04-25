/**Esta página esta diseña para una versión mejorada de 
 * la actual web, agregando funciones nuevas a la dashboard del guia. 
 * De momento no esta siendo usada en la web*/

import React, { useState } from "react";
import { Card, Table, Modal, Button } from "react-bootstrap";
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
    },
    {
      id: 2,
      paquete: "San Andrés - All Inclusive",
      cliente: "María López",
      fecha: "05 Abr. 2025",
      calificacion: 4,
      comentario: "Muy buen servicio, solo que la playa estaba un poco llena.",
    },
    {
      id: 3,
      paquete: "Medellín - Ciudad de la Eterna Primavera",
      cliente: "Juan Pérez",
      fecha: "28 Mar. 2025",
      calificacion: 3,
      comentario: "Buen tour pero el guía llegó tarde.",
    },
    {
      id: 4,
      paquete: "Santa Marta y Tayrona",
      cliente: "Ana Martínez",
      fecha: "15 Mar. 2025",
      calificacion: 5,
      comentario: "Increíble paisaje y atención personalizada. Lo recomiendo 100%.",
    },
  ];

  // Estadísticas de reseñas
  const stats = {
    total: 47,
    promedio: 4.3,
    publicadas: 42,
  };

  // Estado para el modal
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para abrir el modal con los detalles de la reseña
  const handleRowClick = (resena) => {
    setSelectedReview(resena);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReview(null);
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
            <div className="col-md-4">
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <h2 className="mb-0">{stats.total}</h2>
                  <p className="text-muted mb-0">Reseñas Totales</p>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
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
            <div className="col-md-4">
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <h2 className="mb-0">{stats.publicadas}</h2>
                  <p className="text-muted mb-0">Publicadas</p>
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
                  </tr>
                </thead>
                <tbody>
                  {reseñas.map((resena) => (
                    <tr key={resena.id} onClick={() => handleRowClick(resena)} style={{ cursor: "pointer" }}>
                      <td>{resena.paquete}</td>
                      <td>{resena.cliente}</td>
                      <td>{resena.fecha}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          <span>{resena.calificacion}</span>
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-truncate"
                          style={{ maxWidth: "200px" }}
                          title={resena.comentario}
                        >
                          {resena.comentario}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Modal para mostrar detalles de la reseña */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Reseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReview && (
            <>
              <h5>Paquete: {selectedReview.paquete}</h5>
              <p>
                <strong>Cliente:</strong> {selectedReview.cliente}
              </p>
              <p>
                <strong>Fecha:</strong> {selectedReview.fecha}
              </p>
              <p>
                <strong>Calificación:</strong>{" "}
                <span className="d-flex align-items-center">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  {selectedReview.calificacion}
                </span>
              </p>
              <p>
                <strong>Comentario:</strong> {selectedReview.comentario}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResenasPage;
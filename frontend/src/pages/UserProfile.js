import React, { useState } from "react";
import { Card, Row, Col, Button, Form, Badge } from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Carlos Gutiérrez",
    email: "carlos.guia@ejemplo.com",
    phone: "+57 300 123 4567",
    reservations: [
      {
        id: 1,
        packageName: "Cartagena - Ciudad Amurallada",
        date: "2025-04-15",
        status: "Confirmado",
      },
      {
        id: 2,
        packageName: "San Andrés - All Inclusive",
        date: "2025-05-10",
        status: "Pendiente",
      },
    ],
  };

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [reservations, setReservations] = useState(user.reservations);

  const handleSaveChanges = () => {
    // Aquí puedes enviar los datos actualizados al backend
    console.log("Datos guardados:", { name, phone });
    alert("Cambios guardados correctamente.");
  };

  const handleDeleteReservation = (id) => {
    const updatedReservations = reservations.filter((reservation) => reservation.id !== id);
    setReservations(updatedReservations);
    alert("Reserva eliminada correctamente.");
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-5">Mi Perfil</h1>
        <Row>
          {/* Información del perfil */}
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Foto de perfil"
                  className="rounded-circle mb-3"
                  width="150"
                  height="150"
                />
                <h3>{user.name}</h3>
                <p className="text-muted">{user.email}</p>
                <p className="text-muted">
                  <i className="bi bi-telephone me-2"></i>
                  {user.phone}
                </p>
                <Button variant="outline-primary" className="mt-3">
                  Cambiar Foto
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Formulario para editar datos */}
          <Col md={8}>
            <Card className="shadow-sm mb-4">
              <Card.Header>
                <h5 className="mb-0">Editar Información</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleSaveChanges}>
                    Guardar Cambios
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Reservas */}
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Mis Reservas</h5>
                <Button variant="outline-primary" onClick={() => navigate("/packages")}>
                  <i className="bi bi-plus-circle me-2"></i>Agregar Reserva
                </Button>
              </Card.Header>
              <Card.Body>
                {reservations.length > 0 ? (
                  <ul className="list-group">
                    {reservations.map((reservation) => (
                      <li
                        key={reservation.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <h6 className="mb-0">{reservation.packageName}</h6>
                          <small className="text-muted">Fecha: {reservation.date}</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <Badge
                            bg={
                              reservation.status === "Confirmado"
                                ? "success"
                                : reservation.status === "Cancelada"
                                ? "danger"
                                : "warning"
                            }
                            className="text-uppercase me-3"
                          >
                            {reservation.status}
                          </Badge>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteReservation(reservation.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No tienes reservas aún.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
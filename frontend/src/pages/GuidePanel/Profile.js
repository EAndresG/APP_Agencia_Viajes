import React, { useState } from "react";
import { Card, Row, Col, Badge, Button, Form } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const PerfilPage = () => {
  // Datos del guía turístico
  const guia = {
    nombre: "Carlos Gutiérrez",
    especialidad: "Tours culturales e históricos",
    ubicacion: "Cartagena, Colombia",
    email: "carlos.guia@ejemplo.com",
    telefono: "+57 300 123 4567",
    idiomas: ["Español", "Inglés", "Francés"],
    biografia:
      "Guía turístico certificado con amplia experiencia en tours culturales por la ciudad amurallada de Cartagena. Apasionado por la historia y cultura local.",
    foto: "https://via.placeholder.com/150",
  };

  // Estados para manejar los datos editables
  const [especialidad, setEspecialidad] = useState(guia.especialidad);
  const [ubicacion, setUbicacion] = useState(guia.ubicacion);
  const [telefono, setTelefono] = useState(guia.telefono);
  const [idiomas, setIdiomas] = useState(guia.idiomas);
  const [biografia, setBiografia] = useState(guia.biografia);

  const handleAddIdioma = (e) => {
    e.preventDefault();
    const nuevoIdioma = e.target.idioma.value.trim();
    if (nuevoIdioma && !idiomas.includes(nuevoIdioma)) {
      setIdiomas([...idiomas, nuevoIdioma]);
      e.target.reset();
    }
  };

  const handleRemoveIdioma = (idioma) => {
    setIdiomas(idiomas.filter((i) => i !== idioma));
  };

  const handleSaveChanges = () => {
    // Aquí puedes enviar los datos actualizados al backend
    console.log("Datos guardados:", { especialidad, ubicacion, telefono, idiomas, biografia });
    alert("Cambios guardados correctamente.");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-grow-1">
        {/* Header */}
        <Header title="Mi Perfil" />

        <div className="container-fluid px-4 py-4">
          <Row>
            {/* Información del perfil */}
            <Col md={4}>
              <Card className="shadow-sm mb-4">
                <Card.Body className="text-center">
                  <img
                    src={guia.foto}
                    alt="Foto de perfil"
                    className="rounded-circle mb-3"
                    width="150"
                    height="150"
                  />
                  <h3>{guia.nombre}</h3>
                  <p className="text-muted">{especialidad}</p>

                  <div className="text-start">
                    <p>
                      <i className="bi bi-geo-alt me-2"></i> {ubicacion}
                    </p>
                    <p>
                      <i className="bi bi-envelope me-2"></i> {guia.email}
                    </p>
                    <p>
                      <i className="bi bi-phone me-2"></i> {telefono}
                    </p>
                    <p>
                      <i className="bi bi-translate me-2"></i> Idiomas:
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {idiomas.map((idioma, index) => (
                        <Badge key={index} bg="info" className="text-white">
                          {idioma}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
                      <Form.Label>Especialidad</Form.Label>
                      <Form.Control
                        type="text"
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Ubicación</Form.Label>
                      <Form.Control
                        type="text"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Idiomas</Form.Label>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {idiomas.map((idioma, index) => (
                          <Badge
                            key={index}
                            bg="info"
                            className="d-flex align-items-center"
                          >
                            {idioma}
                            <Button
                              variant="link"
                              className="text-white ms-2 p-0"
                              onClick={() => handleRemoveIdioma(idioma)}
                              style={{ fontSize: "0.8rem" }}
                            >
                              <i className="bi bi-x"></i>
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <Form onSubmit={handleAddIdioma}>
                        <div className="input-group">
                          <Form.Control
                            type="text"
                            placeholder="Añadir idioma"
                            name="idioma"
                          />
                          <Button type="submit" variant="primary">
                            Añadir
                          </Button>
                        </div>
                      </Form>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Biografía</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={biografia}
                        onChange={(e) => setBiografia(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
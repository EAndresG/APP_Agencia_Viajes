// Importar dependencias necesarias
import React, { useState, useEffect } from "react"; // Manejo de estado y efectos secundarios
import { Card, Row, Col, Button, Form } from "react-bootstrap"; // Componentes de Bootstrap
import Navbar from "../components/Navbar/Navbar"; // Componente de la barra de navegación
import Footer from "../components/Footer/Footer"; // Componente del pie de página
import { useNavigate } from "react-router-dom"; // Navegación entre rutas
import API_BASE_URL from "../apiConfig"; // URL base del backend

// Componente principal para la página de perfil del usuario
const UserProfile = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Estados para manejar los datos del usuario
  const [user, setUser] = useState(null); // Datos del usuario
  const [name, setName] = useState(""); // Nombre completo del usuario
  const [phone, setPhone] = useState(""); // Teléfono del usuario

  // Obtener los datos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
      if (!token) {
        navigate("/login"); // Redirigir al login si no hay token
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los encabezados
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Guardar los datos del usuario
          setName(userData.firstName + " " + userData.lastName); // Nombre completo
          setPhone(userData.phone || ""); // Teléfono
        } else {
          console.error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Manejar la actualización de los datos del usuario
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      return;
    }

    try {
      const [firstName, lastName] = name.split(" "); // Dividir el nombre completo en nombre y apellido
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviar el token en los encabezados
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user); // Actualizar el estado con los datos del usuario
        alert("Información actualizada correctamente.");
      } else {
        alert("Error al actualizar la información.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("Error al actualizar la información.");
    }
  };

  // Mostrar un mensaje mientras se cargan los datos del usuario
  if (!user) {
    return <p className="text-center mt-5">Cargando datos del usuario...</p>;
  }

  return (
    <>
      <Navbar /> {/* Barra de navegación */}
      <div className="container py-5">
        <h1 className="text-center mb-5">Mi Perfil</h1>
        <Row>
          {/* Información del perfil */}
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  alt="Foto de perfil"
                  className="rounded-circle mb-3"
                  width="150"
                  height="150"
                />
                <h3>{name}</h3>
                <p className="text-muted">{user.email}</p>
                <p className="text-muted">
                  <i className="bi bi-telephone me-2"></i>
                  {phone}
                </p>
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
      </div>
      <Footer /> {/* Pie de página */}
    </>
  );
};

export default UserProfile; // Exportar el componente para usarlo en otras partes de la aplicación
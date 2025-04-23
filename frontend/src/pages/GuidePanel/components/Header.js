"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../apiConfig"; // Asegúrate de que esta URL esté configurada correctamente

const Header = ({ title }) => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirigir al login si no hay token
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const userData = await response.json();
        setUser(userData); // Guardar los datos del usuario en el estado
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        localStorage.removeItem("token"); // Eliminar el token si hay un error
        navigate("/login"); // Redirigir al login
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token del localStorage
    navigate("/login"); // Redirigir al login
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          <h1 className="h3 mb-0">{title}</h1>

          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://v0.dev/placeholder.svg?height=32&width=32"
                  alt="Perfil"
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                />
                <span>{user ? `${user.firstName} ${user.lastName}` : "Cargando..."}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <Link className="dropdown-item" to="/guide/profile">
                    <i className="bi bi-person me-2"></i>Mi Perfil
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

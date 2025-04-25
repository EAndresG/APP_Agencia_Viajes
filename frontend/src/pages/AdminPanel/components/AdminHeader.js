"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { useState } from "react"; // Manejo de estado
import { Link, useNavigate } from "react-router-dom"; // Navegación entre rutas

// Componente Header para el panel de administración
const Header = ({ title }) => {
  // Estado con datos ficticios del administrador
  const [admin] = useState({ firstName: "Admin", lastName: "User" });
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Manejar el cierre de sesión
  const handleLogout = () => {
    navigate("/admin/login"); // Redirigir al login de administrador
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Título dinámico del encabezado */}
          <h1 className="h3 mb-0">{title}</h1>

          {/* Menú desplegable del administrador */}
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* Imagen de perfil del administrador */}
                <img
                  src="https://v0.dev/placeholder.svg?height=32&width=32"
                  alt="Perfil"
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                />
                {/* Nombre del administrador */}
                <span>{`${admin.firstName} ${admin.lastName}`}</span>
              </button>

              {/* Opciones del menú desplegable */}
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <hr className="dropdown-divider" /> {/* Separador */}
                </li>
                <li>
                  {/* Botón para cerrar sesión */}
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

export default Header; // Exportar el componente para usarlo en otras partes de la aplicación

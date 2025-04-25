"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { Link, useLocation } from "react-router-dom"; // Navegación entre rutas y obtención de la ubicación actual

// Componente principal para la barra lateral
const Sidebar = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual

  // Función para verificar si un enlace está activo
  const isActive = (path) => {
    return location.pathname.startsWith(path); // Retorna true si la ruta actual comienza con el path especificado
  };

  return (
    <div className="bg-dark text-white d-flex flex-column" style={{ width: "250px", minHeight: "100vh" }}>
      {/* Encabezado de la barra lateral */}
      <div className="d-flex align-items-center justify-content-center py-4 border-bottom border-secondary">
        <Link to="/" className="text-decoration-none">
          <h4 className="mb-0 font-script text-white">Private Holidays</h4>
        </Link>
      </div>

      {/* Enlaces de navegación */}
      <div className="py-3 flex-grow-1">
        <ul className="nav flex-column">
          {/* Enlace al Dashboard */}
          <li className="nav-item">
            <Link
              to="/guide/dashboard"
              className={`nav-link px-3 py-2 ${isActive("/guide/dashboard") ? "active bg-primary bg-opacity-25" : "text-white"}`}
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </Link>
          </li>

          {/* Enlace a Mis Paquetes */}
          <li className="nav-item">
            <Link
              to="/guide/packages"
              className={`nav-link px-3 py-2 ${isActive("/guide/packages") ? "active bg-primary bg-opacity-25" : "text-white"}`}
            >
              <i className="bi bi-collection me-2"></i>
              Mis Paquetes
            </Link>
          </li>
        </ul>
      </div>

      {/* Botón para cerrar sesión */}
      <div className="mt-auto p-3 border-top border-secondary">
        <Link to="/" className="btn btn-outline-light w-100">
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; // Exportar el componente para usarlo en otras partes de la aplicación


"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { useState, useEffect } from "react"; // Manejo de estado y efectos secundarios
import { Link, useNavigate } from "react-router-dom"; // Navegación entre rutas
import API_BASE_URL from "../../../apiConfig"; // URL base del backend

// Componente principal del encabezado
const Header = ({ title }) => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
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

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    navigate("/login"); // Redirigir al login
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Título del encabezado */}
          <h1 className="h3 mb-0">{title}</h1>

          {/* Menú desplegable del usuario */}
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* Imagen de perfil del usuario */}
                <img
                  src="https://v0.dev/placeholder.svg?height=32&width=32"
                  alt="Perfil"
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                />
                {/* Nombre del usuario o mensaje de carga */}
                <span>{user ? `${user.firstName} ${user.lastName}` : "Cargando..."}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <hr className="dropdown-divider" />
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

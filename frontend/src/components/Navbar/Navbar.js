// Importar dependencias necesarias
import { Link, useNavigate } from "react-router-dom"; // Navegación entre rutas
import { useState, useEffect } from "react"; // Manejo de estado y efectos secundarios
import API_BASE_URL from "../../apiConfig"; // URL base de la API

const Navbar = () => {
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para almacenar los datos del usuario autenticado
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Obtener los datos del usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
      if (!token) return; // Si no hay token, no hacer nada

      try {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los encabezados
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Guardar los datos del usuario en el estado
          setIsAuthenticated(true); // Marcar al usuario como autenticado
        } else {
          // Si el token no es válido, eliminarlo
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        localStorage.removeItem("token"); // Eliminar el token en caso de error
      }
    };

    fetchUser();
  }, []);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    setIsAuthenticated(false); // Cambiar el estado a no autenticado
    setUser(null); // Limpiar los datos del usuario
    navigate("/"); // Redirigir al usuario a la página Home
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div className="container">
        {/* Logo a la izquierda */}
        <Link className="navbar-brand" to="/">
          <h1 className="h3 mb-0 font-script">Private Holidays</h1>
        </Link>

        {/* Botón hamburguesa para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces del navbar */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/packages">
                Paquetes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/contact">
                Contacto
              </Link>
            </li>

            {/* Mostrar "Iniciar Sesión" o el menú del usuario */}
            {!isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link text-uppercase" to="/login">
                  <i className="bi bi-person me-1"></i> Iniciar Sesión
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>{user?.firstName || "Usuario"}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/userprofile">
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
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

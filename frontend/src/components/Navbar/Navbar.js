import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Cambiar a `false` si el usuario no está autenticado
  const user = {
    name: "Carlos",
    profileImage: "https://v0.dev/placeholder.svg?height=32&width=32",
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión (limpiar tokens, etc.)
    setIsAuthenticated(false); // Cambiar el estado a no autenticado
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
                  className="btn btn-light dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user.profileImage}
                    alt="Perfil"
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                  <span>{user.name}</span>
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

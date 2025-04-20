import { Link } from "react-router-dom";

const Navbar = () => {
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
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/login">
                 <i className="bi bi-person me-1"></i> Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

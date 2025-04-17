import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div className="container">
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
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
              <Link className="nav-link text-uppercase" to="/experiences">
                Experiencias
              </Link>
            </li>
          </ul>

          <Link className="navbar-brand mx-auto d-none d-lg-block" to="/">
            <h1 className="h3 mb-0 font-script">Private Holidays</h1>
          </Link>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/faq">
                Preguntas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/contact">
                Contacto
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link className="btn btn-outline-primary" to="/login">
                <i className="bi bi-person me-1"></i> Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo visible en móviles */}
        <Link className="navbar-brand d-lg-none" to="/">
          <h1 className="h4 mb-0 font-script">Private Holidays</h1>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

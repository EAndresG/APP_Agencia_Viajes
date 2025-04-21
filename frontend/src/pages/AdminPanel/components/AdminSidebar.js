import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Función para verificar si un enlace está activo
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-dark text-white d-flex flex-column" style={{ width: "250px", minHeight: "100vh" }}>
      <div className="d-flex align-items-center justify-content-center py-4 border-bottom border-secondary">
        <Link to="/" className="text-decoration-none">
          <h4 className="mb-0 font-script text-white">Private Holidays</h4>
        </Link>
      </div>

      <div className="p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center">
          <img
            src="https://v0.dev/placeholder.svg?height=50&width=50"
            alt="Perfil"
            className="rounded-circle me-2"
            width="50"
            height="50"
          />
          <div>
            <h6 className="mb-0">Carlos Gutiérrez</h6>
            <small className="text-muted">Administrador</small>
          </div>
        </div>
      </div>

      <div className="py-3 flex-grow-1">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/admin/dashboard"
              className={`nav-link px-3 py-2 ${isActive("/admin/dashboard") ? "active bg-primary bg-opacity-25" : "text-white"}`}
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/packages"
              className={`nav-link px-3 py-2 ${isActive("/admin/packages") ? "active bg-primary bg-opacity-25" : "text-white"}`}
            >
              <i className="bi bi-collection me-2"></i>
              Paquetes
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/reservations"
              className={`nav-link px-3 py-2 ${isActive("/admin/reservations") ? "active bg-primary bg-opacity-25" : "text-white"}`}
            >
              <i className="bi bi-calendar-check me-2"></i>
              Reservas
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/reviews"
              className={`nav-link px-3 py-2 ${isActive("/admin/reviews") ? "active bg-primary bg-opacity-25" : "text-white"}`}
            >
              <i className="bi bi-star me-2"></i>
              Reseñas
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/manage-users"
              className={`nav-link px-3 py-2 ${isActive("/admin/manage-users") ? "active bg-primary bg-opacity-25" : "text-white"}`}
            >
              <i className="bi bi-people me-2"></i>
              Usuarios
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/profile"
              className={`nav-link px-3 py-2 ${isActive("/admin/profile") ? "active bg-primary bg-opacity-25" : "text-white"}`}
            >
              <i className="bi bi-person me-2"></i>
              Mi Perfil
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-auto p-3 border-top border-secondary">
        <Link to="/" className="btn btn-outline-light w-100">
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;


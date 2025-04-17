"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const Header = ({ title }) => {
  const [showNotifications, setShowNotifications] = useState(false)

  // Datos de ejemplo para notificaciones
  const notifications = [
    {
      id: 1,
      type: "reservation",
      message: "Nueva reserva para Cartagena - Ciudad Amurallada",
      time: "Hace 5 minutos",
      read: false,
    },
    {
      id: 2,
      type: "review",
      message: "Nueva reseña de 5 estrellas para San Andrés - All Inclusive",
      time: "Hace 2 horas",
      read: false,
    },
    {
      id: 3,
      type: "system",
      message: "Su paquete Medellín ha sido aprobado por el administrador",
      time: "Hace 1 día",
      read: true,
    },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          <h1 className="h3 mb-0">{title}</h1>

          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <button
                className="btn btn-light position-relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="bi bi-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications.filter((n) => !n.read).length}
                </span>
              </button>

              {showNotifications && (
                <div
                  className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow-sm"
                  style={{ width: "320px", zIndex: 1000 }}
                >
                  <div className="d-flex justify-content-between align-items-center px-3 pb-2 border-bottom">
                    <h6 className="mb-0">Notificaciones</h6>
                    <Link to="/guide/notifications" className="text-decoration-none small">
                      Ver todas
                    </Link>
                  </div>
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-3 py-2 border-bottom ${!notification.read ? "bg-light" : ""}`}
                      >
                        <div className="d-flex">
                          <div className="me-2">
                            <i
                              className={`bi ${
                                notification.type === "reservation"
                                  ? "bi-calendar-check text-primary"
                                  : notification.type === "review"
                                    ? "bi-star-fill text-warning"
                                    : "bi-info-circle text-info"
                              }`}
                            ></i>
                          </div>
                          <div>
                            <p className="mb-0 small">{notification.message}</p>
                            <small className="text-muted">{notification.time}</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
                <span>Carlos</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <Link className="dropdown-item" to="/guide/profile">
                    <i className="bi bi-person me-2"></i>Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/guide/settings">
                    <i className="bi bi-gear me-2"></i>Configuración
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout">
                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

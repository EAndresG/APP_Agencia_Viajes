"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom" // Importar useNavigate

const Header = ({ title }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate() // Inicializar useNavigate

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

  const handleLogout = () => {
    // Aquí puedes agregar lógica adicional para cerrar sesión, como limpiar tokens
    navigate("/") // Redirigir a la página Home
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          <h1 className="h3 mb-0">{title}</h1>

          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              {/* Botón de notificaciones eliminado */}
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
                  <Link className="dropdown-item" to="/admin/profile">
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
  )
}

export default Header

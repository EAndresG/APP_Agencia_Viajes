"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const [admin] = useState({ firstName: "Admin", lastName: "User" }); // Datos ficticios del administrador
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login"); // Redirigir al login
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          <h1 className="h3 mb-0">{title}</h1>

          <div className="d-flex align-items-center">
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
                <span>{`${admin.firstName} ${admin.lastName}`}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
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
  );
};

export default Header;

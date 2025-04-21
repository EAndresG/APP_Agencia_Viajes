import React from "react";
import Sidebar from "./components/AdminSidebar";
import Header from "./components/AdminHeader";

const AdminProfile = () => {
  const admin = {
    nombre: "Carlos Gutiérrez",
    email: "admin@ejemplo.com",
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header title="Mi Perfil" role="Admin" />
        <div className="container-fluid px-4 py-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Información del Administrador</h5>
              <p><strong>Nombre:</strong> {admin.nombre}</p>
              <p><strong>Email:</strong> {admin.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
/**Esta página esta diseña para una versión mejorada de 
 * la actual web, agregando funciones nuevas a la dashboard del admin. 
 * De momento no esta siendo usada en la web*/

// Importar dependencias necesarias
import React from "react";
import Sidebar from "./components/AdminSidebar"; // Componente del menú lateral
import Header from "./components/AdminHeader"; // Componente del encabezado

// Componente principal para mostrar el perfil del administrador
const AdminProfile = () => {
  // Datos ficticios del administrador (se pueden reemplazar con datos dinámicos en el futuro)
  const admin = {
    nombre: "Carlos Gutiérrez", // Nombre del administrador
    email: "admin@ejemplo.com", // Correo electrónico del administrador
  };

  return (
    <div className="d-flex">
      <Sidebar /> {/* Menú lateral */}

      <div className="flex-grow-1">
        <Header title="Mi Perfil" role="Admin" /> {/* Encabezado con el título y rol */}

        <div className="container-fluid px-4 py-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Información del Administrador</h5>
              {/* Mostrar la información del administrador */}
              <p>
                <strong>Nombre:</strong> {admin.nombre}
              </p>
              <p>
                <strong>Email:</strong> {admin.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile; // Exportar el componente para usarlo en otras partes de la aplicación
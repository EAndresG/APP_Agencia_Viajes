"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import React, { useState, useEffect } from "react"; // Manejo de estado y efectos secundarios
import { Table, Badge, Pagination } from "react-bootstrap"; // Componentes de Bootstrap
import Sidebar from "./components/AdminSidebar"; // Componente del menú lateral
import Header from "./components/AdminHeader"; // Componente del encabezado
import API_BASE_URL from "../../apiConfig"; // URL base de la API

// Componente principal para gestionar usuarios
const ManageUsers = () => {
  // Estado para almacenar los usuarios obtenidos del backend
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [filterRole, setFilterRole] = useState("all"); // Filtro de roles: todos, usuarios, guías, administradores

  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para mostrar detalles

  // Paginación
  const [currentPageUsers, setCurrentPageUsers] = useState(1); // Página actual
  const usersPerPage = 3; // Número de usuarios por página

  // Obtener usuarios desde el backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
        const response = await fetch(`${API_BASE_URL}/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();
        setUsers(
          data.map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`, // Nombre completo del usuario
            email: user.email, // Correo electrónico
            role: user.userType === "admin" ? "Administrador" : user.userType === "guide" ? "Guía" : "Usuario", // Rol del usuario
            status: "Activo", // Estado del usuario (puede ajustarse según la lógica del backend)
          }))
        );
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filtrar usuarios según el término de búsqueda y el rol seleccionado
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  // Aplicar paginación a los usuarios filtrados
  const indexOfLastUser = currentPageUsers * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPagesUsers = Math.ceil(filteredUsers.length / usersPerPage); // Calcular el número total de páginas

  return (
    <div className="d-flex">
      <Sidebar /> {/* Menú lateral */}

      <div className="flex-grow-1">
        <Header title="Gestionar Usuarios" /> {/* Encabezado */}

        <div className="container-fluid px-4 py-4">
          {/* Barra de búsqueda y filtro */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <div className="row align-items-center">
                {/* Barra de búsqueda */}
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Buscar por nombre o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                {/* Filtro de roles */}
                <div className="col-md-6 d-flex justify-content-md-end">
                  <select
                    className="form-select"
                    style={{ width: "auto" }}
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                  >
                    <option value="all">Todos</option>
                    <option value="Usuario">Usuarios</option>
                    <option value="Guía">Guías</option>
                    <option value="Administrador">Administradores</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Usuarios y Guías */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Usuarios y Guías</h5>
            </div>
            <div className="card-body">
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} onClick={() => setSelectedUser(user)} style={{ cursor: "pointer" }}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Badge bg="success">{user.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Paginación para Usuarios y Guías */}
              <Pagination className="justify-content-center mt-3">
                {[...Array(totalPagesUsers).keys()].map((page) => (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPageUsers}
                    onClick={() => setCurrentPageUsers(page + 1)}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers; // Exportar el componente para usarlo en otras partes de la aplicación
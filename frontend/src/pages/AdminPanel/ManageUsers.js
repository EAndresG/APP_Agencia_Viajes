"use client";

import React, { useState, useEffect } from "react";
import { Table, Badge, Pagination } from "react-bootstrap";
import Sidebar from "./components/AdminSidebar";
import Header from "./components/AdminHeader";
import API_BASE_URL from "../../apiConfig";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all"); // Filtro: all, Usuario, Guía

  const [selectedUser, setSelectedUser] = useState(null); // Estado para la tarjeta flotante de usuarios

  // Paginación para Usuarios y Guías
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const usersPerPage = 3;

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
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.userType === "admin" ? "Administrador" : user.userType === "guide" ? "Guía" : "Usuario",
            status: "Activo", // Puedes ajustar esto según tu lógica
          }))
        );
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filtrar usuarios según búsqueda y rol
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

  const totalPagesUsers = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header title="Gestionar Usuarios" />

        <div className="container-fluid px-4 py-4">
          {/* Barra de búsqueda y filtro */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <div className="row align-items-center">
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
                    <option value="Administrador">Administradores</option> {/* Nueva opción */}
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

export default ManageUsers;
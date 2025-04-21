"use client";

import React, { useState } from "react";
import { Table, Badge, Pagination } from "react-bootstrap";
import Sidebar from "./components/AdminSidebar";
import Header from "./components/AdminHeader";

const ManageUsers = () => {
  // Datos de ejemplo para los usuarios
  const [users, setUsers] = useState([
    { id: 1, name: "Carlos Gutiérrez", email: "carlos@example.com", role: "Guía", status: "Pendiente", experience: "5 años", specialties: ["Historia", "Cultura"], identification: "12345678" },
    { id: 2, name: "María López", email: "maria@example.com", role: "Usuario", status: "Activo" },
    { id: 3, name: "Juan Pérez", email: "juan@example.com", role: "Guía", status: "Aceptado", experience: "3 años", specialties: ["Naturaleza"], identification: "87654321" },
    { id: 4, name: "Ana Martínez", email: "ana@example.com", role: "Usuario", status: "Activo" },
    { id: 5, name: "Luis Gómez", email: "luis@example.com", role: "Guía", status: "Rechazado", experience: "10 años", specialties: ["Aventura", "Deportes"], identification: "11223344" },
  ]);

  // Datos de ejemplo para los mensajes enviados desde la página de contacto
  const [messages, setMessages] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", message: "¿Pueden darme más información sobre los paquetes turísticos?", date: "20 Abr, 2025" },
    { id: 2, name: "Ana Martínez", email: "ana@example.com", message: "Tengo problemas para registrarme como guía turístico.", date: "18 Abr, 2025" },
    { id: 3, name: "Luis Gómez", email: "luis@example.com", message: "¿Cuáles son los métodos de pago disponibles?", date: "15 Abr, 2025" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all"); // Filtro: all, Usuario, Guía

  // Estado para controlar la tarjeta flotante de usuarios
  const [selectedUser, setSelectedUser] = useState(null);

  // Estado para controlar la tarjeta flotante de mensajes
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Paginación para Usuarios y Guías
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const usersPerPage = 3;

  const indexOfLastUser = currentPageUsers * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPagesUsers = Math.ceil(users.length / usersPerPage);

  // Paginación para Mensajes
  const [currentPageMessages, setCurrentPageMessages] = useState(1);
  const messagesPerPage = 3;

  const indexOfLastMessage = currentPageMessages * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  const totalPagesMessages = Math.ceil(messages.length / messagesPerPage);

  // Filtrar usuarios según búsqueda y rol
  const filteredUsers = currentUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  // Cambiar el estado de un guía
  const handleChangeStatus = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

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
                    <th>Experiencia</th>
                    <th>Especialidades</th>
                    <th>Identificación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} onClick={() => setSelectedUser(user)} style={{ cursor: "pointer" }}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Badge
                          bg={
                            user.status === "Aceptado"
                              ? "success"
                              : user.status === "Pendiente"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td>{user.experience || "N/A"}</td>
                      <td>{user.specialties?.join(", ") || "N/A"}</td>
                      <td>{user.identification || "N/A"}</td>
                      <td>
                        {user.role === "Guía" && (
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeStatus(user.id, "Aceptado");
                              }}
                              disabled={user.status === "Aceptado"}
                            >
                              <i className="bi bi-check-circle"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeStatus(user.id, "Rechazado");
                              }}
                              disabled={user.status === "Rechazado"}
                            >
                              <i className="bi bi-x-circle"></i>
                            </button>
                          </div>
                        )}
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

          {/* Tabla de Mensajes */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Mensajes de Contacto</h5>
            </div>
            <div className="card-body">
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Mensaje</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMessages.map((message) => (
                    <tr
                      key={message.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <td>{message.id}</td>
                      <td>{message.name}</td>
                      <td>{message.email}</td>
                      <td className="text-truncate" style={{ maxWidth: "200px" }}>
                        {message.message}
                      </td>
                      <td>{message.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Paginación para Mensajes */}
              <Pagination className="justify-content-center mt-3">
                {[...Array(totalPagesMessages).keys()].map((page) => (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPageMessages}
                    onClick={() => setCurrentPageMessages(page + 1)}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta flotante de detalles del usuario */}
      {selectedUser && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
        >
          <div className="card shadow-lg" style={{ width: "400px" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Detalles del Usuario</h5>
              <button className="btn-close" onClick={() => setSelectedUser(null)}></button>
            </div>
            <div className="card-body">
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Nombre:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Rol:</strong> {selectedUser.role}</p>
              <p><strong>Estado:</strong> {selectedUser.status}</p>
              {selectedUser.role === "Guía" && (
                <>
                  <p><strong>Experiencia:</strong> {selectedUser.experience}</p>
                  <p><strong>Especialidades:</strong> {selectedUser.specialties?.join(", ")}</p>
                  <p><strong>Identificación:</strong> {selectedUser.identification}</p>
                </>
              )}
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tarjeta flotante de detalles del mensaje */}
      {selectedMessage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
        >
          <div className="card shadow-lg" style={{ width: "400px" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Detalles del Mensaje</h5>
              <button className="btn-close" onClick={() => setSelectedMessage(null)}></button>
            </div>
            <div className="card-body">
              <p><strong>Nombre:</strong> {selectedMessage.name}</p>
              <p><strong>Email:</strong> {selectedMessage.email}</p>
              <p><strong>Fecha:</strong> {selectedMessage.date}</p>
              <p><strong>Mensaje:</strong></p>
              <p>{selectedMessage.message}</p>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={() => setSelectedMessage(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
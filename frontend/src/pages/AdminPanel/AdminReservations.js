/**Esta página esta diseña para una versión mejorada de 
 * la actual web, agregando funciones nuevas a la dashboard del admin. 
 * De momento no esta siendo usada en la web*/

"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { useState } from "react"; // Manejo de estado
import { Link } from "react-router-dom"; // Navegación entre rutas
import Sidebar from "./components/AdminSidebar"; // Componente del menú lateral
import Header from "./components/AdminHeader"; // Componente del encabezado

// Componente principal para gestionar reservas
const Reservations = () => {
  // Estados para manejar búsqueda, filtros y paginación
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [filterStatus, setFilterStatus] = useState("all"); // Filtro de estado (todos, confirmadas, pendientes, canceladas)
  const [dateRange, setDateRange] = useState({ start: "", end: "" }); // Rango de fechas
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const reservationsPerPage = 5; // Límite de reservas por página

  // Datos de ejemplo para las reservas (pueden ser reemplazados con datos dinámicos del backend)
  const [reservations, setReservations] = useState([
    {
      id: 1,
      packageName: "Cartagena - Ciudad Amurallada", // Nombre del paquete
      packageId: 1, // ID del paquete
      customerName: "Carlos Rodríguez", // Nombre del cliente
      customerEmail: "carlos@example.com", // Email del cliente
      customerPhone: "+57 300 123 4567", // Teléfono del cliente
      date: "2025-04-15", // Fecha de inicio de la reserva
      endDate: "2025-04-19", // Fecha de finalización de la reserva
      people: 2, // Número de personas
      status: "pending", // Estado de la reserva
      amount: 1095, // Monto total de la reserva
      paymentMethod: "Tarjeta de crédito", // Método de pago
      createdAt: "2025-03-10", // Fecha de creación de la reserva
    },
    {
      id: 2,
      packageName: "San Andrés - All Inclusive",
      packageId: 2,
      customerName: "María López",
      customerEmail: "maria@example.com",
      customerPhone: "+57 310 987 6543",
      date: "2025-04-20",
      endDate: "2025-04-26",
      people: 4,
      status: "pending",
      amount: 3200,
      paymentMethod: "Transferencia bancaria",
      createdAt: "2025-03-12",
    },
    {
      id: 3,
      packageName: "Medellín - Ciudad de la Eterna Primavera",
      packageId: 3,
      customerName: "Juan Pérez",
      customerEmail: "juan@example.com",
      customerPhone: "+57 320 456 7890",
      date: "2025-05-01",
      endDate: "2025-05-05",
      people: 3,
      status: "confirmed",
      amount: 2400,
      paymentMethod: "Efectivo",
      createdAt: "2025-03-15",
    },
  ]);

  // Filtrar reservas según búsqueda, estado y rango de fechas
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus;

    const matchesDateRange =
      (!dateRange.start || new Date(reservation.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(reservation.date) <= new Date(dateRange.end));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Calcular reservas para la página actual
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirstReservation, indexOfLastReservation);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función para cambiar el estado de una reserva
  const handleChangeStatus = (id, newStatus) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status: newStatus } : reservation
      )
    );
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="d-flex">
      <Sidebar /> {/* Menú lateral */}

      <div className="flex-grow-1">
        <Header title="Reservas" /> {/* Encabezado */}

        <div className="container-fluid px-4 py-4">
          <div className="card border-0 shadow-sm">
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
                      placeholder="Buscar por paquete, cliente o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                {/* Filtro de estado */}
                <div className="col-md-6 d-flex justify-content-md-end">
                  <select
                    className="form-select me-2"
                    style={{ width: "auto" }}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">Todos los estados</option>
                    <option value="confirmed">Confirmadas</option>
                    <option value="pending">Pendientes</option>
                    <option value="cancelled">Canceladas</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>ID</th>
                      <th>Paquete</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Personas</th>
                      <th>Estado</th>
                      <th>Monto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>#{reservation.id}</td>
                        <td>
                          <Link to={`/package/${reservation.packageId}`} className="text-decoration-none">
                            {reservation.packageName}
                          </Link>
                        </td>
                        <td>
                          <div>{reservation.customerName}</div>
                          <small className="text-muted">{reservation.customerEmail}</small>
                        </td>
                        <td>
                          <div>{formatDate(reservation.date)}</div>
                          <small className="text-muted">
                            {reservation.people} {reservation.people === 1 ? "persona" : "personas"}
                          </small>
                        </td>
                        <td>{reservation.people}</td>
                        <td>
                          <span
                            className={`badge ${
                              reservation.status === "confirmed"
                                ? "bg-success"
                                : reservation.status === "pending"
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                          >
                            {reservation.status === "confirmed"
                              ? "Confirmada"
                              : reservation.status === "pending"
                              ? "Pendiente"
                              : "Cancelada"}
                          </span>
                        </td>
                        <td>${reservation.amount}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleChangeStatus(reservation.id, "confirmed")}
                              disabled={reservation.status === "confirmed"}
                            >
                              <i className="bi bi-check-circle"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleChangeStatus(reservation.id, "cancelled")}
                              disabled={reservation.status === "cancelled"}
                            >
                              <i className="bi bi-x-circle"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-white py-3">
              <div className="row align-items-center">
                <div className="col-md-6 text-md-start text-center mb-2 mb-md-0">
                  <span>
                    Mostrando {currentReservations.length} de {filteredReservations.length} reservas
                  </span>
                </div>
                <div className="col-md-6">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-md-end justify-content-center mb-0">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Anterior
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations; // Exportar el componente para usarlo en otras partes de la aplicación

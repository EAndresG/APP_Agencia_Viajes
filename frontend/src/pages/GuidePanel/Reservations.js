"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  // Datos de ejemplo para las reservas
  const reservations = [
    {
      id: 1,
      packageName: "Cartagena - Ciudad Amurallada",
      packageId: 1,
      customerName: "Carlos Rodríguez",
      customerEmail: "carlos@example.com",
      customerPhone: "+57 300 123 4567",
      date: "2025-04-15",
      endDate: "2025-04-19",
      people: 2,
      status: "confirmed",
      amount: 1095,
      paymentMethod: "Tarjeta de crédito",
      createdAt: "2025-03-10",
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
      date: "2025-05-05",
      endDate: "2025-05-07",
      people: 2,
      status: "confirmed",
      amount: 800,
      paymentMethod: "PayPal",
      createdAt: "2025-03-15",
    },
    {
      id: 4,
      packageName: "Santa Marta y Tayrona",
      packageId: 4,
      customerName: "Ana Martínez",
      customerEmail: "ana@example.com",
      customerPhone: "+57 315 789 0123",
      date: "2025-05-12",
      endDate: "2025-05-15",
      people: 3,
      status: "pending",
      amount: 1450,
      paymentMethod: "Tarjeta de crédito",
      createdAt: "2025-03-20",
    },
    {
      id: 5,
      packageName: "Cartagena - Ciudad Amurallada",
      packageId: 1,
      customerName: "Pedro Gómez",
      customerEmail: "pedro@example.com",
      customerPhone: "+57 300 987 6543",
      date: "2025-06-10",
      endDate: "2025-06-14",
      people: 2,
      status: "cancelled",
      amount: 1095,
      paymentMethod: "Tarjeta de crédito",
      createdAt: "2025-03-25",
    },
  ]

  // Filtrar reservas según búsqueda, estado y fechas
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus

    const matchesDateRange =
      (!dateRange.start || new Date(reservation.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(reservation.date) <= new Date(dateRange.end))

    return matchesSearch && matchesStatus && matchesDateRange
  })

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header title="Reservas" />

        <div className="container-fluid px-4 py-4">
          <div className="card border-0 shadow-sm">
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
                      placeholder="Buscar por paquete, cliente o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
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
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#filterCollapse"
                    aria-expanded="false"
                    aria-controls="filterCollapse"
                  >
                    <i className="bi bi-funnel me-1"></i> Filtros
                  </button>
                </div>
              </div>

              <div className="collapse mt-3" id="filterCollapse">
                <div className="card card-body border">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Fecha de inicio</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Fecha de fin</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      />
                    </div>
                  </div>
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
                    {filteredReservations.map((reservation) => (
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
                            <Link
                              to={`/guide/reservations/${reservation.id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <button className="btn btn-sm btn-outline-secondary">
                              <i className="bi bi-printer"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
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
                    Mostrando {filteredReservations.length} de {reservations.length} reservas
                  </span>
                </div>
                <div className="col-md-6">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-md-end justify-content-center mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1">
                          Anterior
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Siguiente
                        </a>
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
  )
}

export default Reservations

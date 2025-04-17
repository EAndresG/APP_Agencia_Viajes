import { Link } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

const Dashboard = () => {
  // Datos de ejemplo para el dashboard
  const stats = {
    totalPackages: 12,
    activePackages: 8,
    totalReservations: 47,
    pendingReservations: 5,
    totalEarnings: 8750,
    viewsLastMonth: 1243,
  }

  // Datos de ejemplo para las últimas reservas
  const latestReservations = [
    {
      id: 1,
      packageName: "Cartagena - Ciudad Amurallada",
      customerName: "Carlos Rodríguez",
      date: "15 Abr, 2025",
      people: 2,
      status: "Confirmada",
      amount: 1095,
    },
    {
      id: 2,
      packageName: "San Andrés - All Inclusive",
      customerName: "María López",
      date: "20 Abr, 2025",
      people: 4,
      status: "Pendiente",
      amount: 3200,
    },
    {
      id: 3,
      packageName: "Medellín - Ciudad de la Eterna Primavera",
      customerName: "Juan Pérez",
      date: "05 May, 2025",
      people: 2,
      status: "Confirmada",
      amount: 800,
    },
    {
      id: 4,
      packageName: "Santa Marta y Tayrona",
      customerName: "Ana Martínez",
      date: "12 May, 2025",
      people: 3,
      status: "Pendiente",
      amount: 1450,
    },
  ]

  // Datos de ejemplo para los paquetes populares
  const popularPackages = [
    {
      id: 1,
      name: "Cartagena - Ciudad Amurallada",
      views: 342,
      reservations: 18,
      rating: 4.9,
    },
    {
      id: 2,
      name: "San Andrés - All Inclusive",
      views: 287,
      reservations: 15,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Medellín - Ciudad de la Eterna Primavera",
      views: 215,
      reservations: 9,
      rating: 4.8,
    },
  ]

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header title="Dashboard" />

        <div className="container-fluid px-4 py-4">
          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <i className="bi bi-collection text-primary fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Paquetes Totales</h6>
                      <h3 className="mb-0">{stats.totalPackages}</h3>
                      <small className="text-success">
                        <i className="bi bi-arrow-up"></i> {stats.activePackages} activos
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-success bg-opacity-10 p-3 rounded">
                        <i className="bi bi-calendar-check text-success fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Reservas Totales</h6>
                      <h3 className="mb-0">{stats.totalReservations}</h3>
                      <small className="text-warning">
                        <i className="bi bi-clock"></i> {stats.pendingReservations} pendientes
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-info bg-opacity-10 p-3 rounded">
                        <i className="bi bi-currency-dollar text-info fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Ganancias Totales</h6>
                      <h3 className="mb-0">${stats.totalEarnings}</h3>
                      <small className="text-muted">Este año</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-warning bg-opacity-10 p-3 rounded">
                        <i className="bi bi-eye text-warning fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Vistas</h6>
                      <h3 className="mb-0">{stats.viewsLastMonth}</h3>
                      <small className="text-muted">Último mes</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Latest Reservations */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Últimas Reservas</h5>
                    <Link to="/guide/reservations" className="btn btn-sm btn-outline-primary">
                      Ver todas
                    </Link>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>Paquete</th>
                          <th>Cliente</th>
                          <th>Fecha</th>
                          <th>Personas</th>
                          <th>Estado</th>
                          <th>Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestReservations.map((reservation) => (
                          <tr key={reservation.id}>
                            <td>{reservation.packageName}</td>
                            <td>{reservation.customerName}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.people}</td>
                            <td>
                              <span
                                className={`badge ${
                                  reservation.status === "Confirmada"
                                    ? "bg-success"
                                    : reservation.status === "Pendiente"
                                      ? "bg-warning"
                                      : "bg-danger"
                                }`}
                              >
                                {reservation.status}
                              </span>
                            </td>
                            <td>${reservation.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Packages */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Paquetes Populares</h5>
                    <Link to="/guide/packages" className="btn btn-sm btn-outline-primary">
                      Ver todos
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {popularPackages.map((pkg) => (
                      <li key={pkg.id} className="list-group-item px-0 py-3 border-bottom">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{pkg.name}</h6>
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <i className="bi bi-eye text-muted me-1"></i>
                                <small className="text-muted">{pkg.views} vistas</small>
                              </div>
                              <div>
                                <i className="bi bi-calendar-check text-muted me-1"></i>
                                <small className="text-muted">{pkg.reservations} reservas</small>
                              </div>
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-star-fill text-warning me-1"></i>
                              <span>{pkg.rating}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card border-0 shadow-sm mt-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Acciones Rápidas</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/guide/packages/create" className="btn btn-primary">
                      <i className="bi bi-plus-circle me-2"></i>Crear Nuevo Paquete
                    </Link>
                    <Link to="/guide/reservations" className="btn btn-outline-primary">
                      <i className="bi bi-calendar-check me-2"></i>Gestionar Reservas
                    </Link>
                    <Link to="/guide/profile" className="btn btn-outline-secondary">
                      <i className="bi bi-person me-2"></i>Actualizar Perfil
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

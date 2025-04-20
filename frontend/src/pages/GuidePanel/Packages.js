"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const packagesPerPage = 5 // Límite de paquetes por página

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Cartagena - Ciudad Amurallada",
      location: "Colombia",
      price: 1095,
      status: "active",
      featured: true,
      reservations: 18,
      rating: 4.9,
      created: "10 Ene, 2025",
      image: "https://v0.dev/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      name: "San Andrés - All Inclusive",
      location: "Colombia",
      price: 1500,
      status: "active",
      featured: true,
      reservations: 15,
      rating: 4.7,
      created: "15 Ene, 2025",
      image: "https://v0.dev/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      name: "Medellín - Ciudad de la Eterna Primavera",
      location: "Colombia",
      price: 800,
      status: "active",
      featured: false,
      reservations: 9,
      rating: 4.8,
      created: "20 Ene, 2025",
      image: "https://v0.dev/placeholder.svg?height=100&width=150",
    },
    {
      id: 4,
      name: "Santa Marta y Tayrona",
      location: "Colombia",
      price: 950,
      status: "active",
      featured: false,
      reservations: 12,
      rating: 4.5,
      created: "25 Ene, 2025",
      image: "https://v0.dev/placeholder.svg?height=100&width=150",
    },
    {
      id: 5,
      name: "Eje Cafetero - Experiencia del Café",
      location: "Colombia",
      price: 1200,
      status: "draft",
      featured: false,
      reservations: 0,
      rating: 0,
      created: "01 Feb, 2025",
      image: "https://v0.dev/placeholder.svg?height=100&width=150",
    },
    {
      id: 6,
      name: "Bogotá - Tour Cultural",
      location: "Colombia",
      price: 600,
      status: "inactive",
      featured: false,
      reservations: 3,
      rating: 4.2,
      created: "05 Feb, 2025",
      image: "https://v0.dev/placeholder.svg?height=100&width=150",
    },
    {
      id: 7,
      name: "Amazonas - Aventura en la Selva",
      location: "Colombia",
      price: 1400,
      status: "active",
      featured: true,
      reservations: 20,
      rating: 4.9,
      created: "10 Feb, 2025",
      image: "https://v0.dev/placeholder.svg?height=100&width=150",
    },
  ])

  // Filtrar paquetes según búsqueda y estado
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || pkg.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Calcular paquetes para la página actual
  const indexOfLastPackage = currentPage * packagesPerPage
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage)

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage)

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Función para eliminar un paquete de la lista
  const handleDeletePackage = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este paquete?")
    if (confirmDelete) {
      setPackages(packages.filter((pkg) => pkg.id !== id))
    }
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header title="Mis Paquetes" />

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
                      placeholder="Buscar paquetes..."
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
                    <option value="active">Activos</option>
                    <option value="draft">Borradores</option>
                    <option value="inactive">Inactivos</option>
                  </select>
                  <Link to="/guide/packages/create" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-1"></i> Nuevo Paquete
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Paquete</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Reservas</th>
                      <th>Calificación</th>
                      <th>Creado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPackages.map((pkg) => (
                      <tr key={pkg.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={pkg.image || "/placeholder.svg"}
                              alt={pkg.name}
                              className="rounded me-3"
                              width="60"
                              height="40"
                              style={{ objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="mb-0">{pkg.name}</h6>
                              <small className="text-muted">{pkg.location}</small>
                              {pkg.featured && <span className="badge bg-warning text-dark ms-2">Destacado</span>}
                            </div>
                          </div>
                        </td>
                        <td>${pkg.price}</td>
                        <td>
                          <span
                            className={`badge ${
                              pkg.status === "active"
                                ? "bg-success"
                                : pkg.status === "draft"
                                ? "bg-secondary"
                                : "bg-danger"
                            }`}
                          >
                            {pkg.status === "active" ? "Activo" : pkg.status === "draft" ? "Borrador" : "Inactivo"}
                          </span>
                        </td>
                        <td>{pkg.reservations}</td>
                        <td>
                          {pkg.rating > 0 ? (
                            <div className="d-flex align-items-center">
                              <i className="bi bi-star-fill text-warning me-1"></i>
                              <span>{pkg.rating}</span>
                            </div>
                          ) : (
                            <span className="text-muted">Sin reseñas</span>
                          )}
                        </td>
                        <td>{pkg.created}</td>
                        <td>
                          <div className="btn-group">
                            <Link to={`/guide/packages/edit/${pkg.id}`} className="btn btn-sm btn-outline-primary">
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <Link
                              to={`/guide/packages/details/${pkg.id}`} // Cambiado para redirigir a PackageDetails
                              target="_blank"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeletePackage(pkg.id)}
                            >
                              <i className="bi bi-trash"></i>
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
                    Mostrando {currentPackages.length} de {filteredPackages.length} paquetes
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
  )
}

export default Packages

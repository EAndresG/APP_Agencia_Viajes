"use client"

import { useState } from "react"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import { Link } from "react-router-dom"

const Packages = () => {
  const [priceRange, setPriceRange] = useState(5000)

  // Datos de ejemplo para los paquetes
  const packages = [
    {
      id: 1,
      name: "Cartagena",
      location: "Colombia",
      price: 700,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["PLAYA", "CULTURAL", "RELAX"],
      description: "Disfruta de las hermosas playas y la rica historia colonial de esta joya del Caribe colombiano.",
    },
    {
      id: 2,
      name: "San Andrés",
      location: "Colombia",
      price: 500,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["PLAYA", "RELAX", "AVENTURA"],
      description: "Paraíso caribeño con aguas cristalinas perfectas para el buceo y deportes acuáticos.",
    },
    {
      id: 3,
      name: "Medellín",
      location: "Colombia",
      price: 400,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["URBANO", "CULTURAL", "NATURALEZA"],
      description: "La ciudad de la eterna primavera te espera con su clima perfecto y su vibrante cultura.",
    },
    {
      id: 4,
      name: "Santa Marta",
      location: "Colombia",
      price: 1200,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["PLAYA", "AVENTURA", "NATURALEZA"],
      description: "Descubre la magia donde la Sierra Nevada se encuentra con el mar Caribe.",
    },
    {
      id: 5,
      name: "Eje Cafetero",
      location: "Colombia",
      price: 1500,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["NATURALEZA", "CULTURAL", "GASTRONOMÍA"],
      description: "Sumérgete en la cultura del café colombiano entre montañas y paisajes verdes.",
    },
    {
      id: 6,
      name: "Bogotá",
      location: "Colombia",
      price: 730,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["URBANO", "CULTURAL", "GASTRONOMÍA"],
      description: "La capital colombiana te ofrece una mezcla única de historia, arte y modernidad.",
    },
  ]

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="position-relative">
        <div
          className="bg-image"
          style={{
            backgroundImage: "url('https://v0.dev/placeholder.svg?height=400&width=1200')",
            height: "400px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#0099cc",
          }}
        >
          <div className="container h-100 d-flex align-items-center">
            <div className="text-white">
              <h1 className="display-4 fw-bold">Nuestros Paquetes</h1>
              <p className="lead">Encuentra tu destino ideal para tus próximas vacaciones</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="card shadow border-0 mb-5">
            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Selecciona tu destino:</label>
                  <select className="form-select">
                    <option value="">Todos los destinos</option>
                    <option value="cartagena">Cartagena</option>
                    <option value="san-andres">San Andrés</option>
                    <option value="medellin">Medellín</option>
                    <option value="santa-marta">Santa Marta</option>
                    <option value="eje-cafetero">Eje Cafetero</option>
                    <option value="bogota">Bogotá</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Selecciona la fecha:</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Precio máximo: ${priceRange}</label>
                  <input
                    type="range"
                    className="form-range"
                    min="100"
                    max="5000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  />
                  <div className="form-check mt-2">
                    <input className="form-check-input" type="checkbox" id="taxIncluded" />
                    <label className="form-check-label" htmlFor="taxIncluded">
                      Incluir impuestos
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-primary px-4">
                  <i className="bi bi-funnel me-2"></i>Más filtros
                </button>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="me-2">Ordenar por:</span>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-secondary btn-sm">
                  Precio
                </button>
                <button type="button" className="btn btn-outline-secondary btn-sm">
                  Nombre
                </button>
                <button type="button" className="btn btn-outline-secondary btn-sm">
                  Popularidad
                </button>
              </div>
            </div>
            <div>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-secondary btn-sm">
                  <i className="bi bi-grid-3x3-gap"></i>
                </button>
                <button type="button" className="btn btn-outline-secondary btn-sm active">
                  <i className="bi bi-grid-3x3"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="row g-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm package-card">
                  <div className="position-relative">
                    <img
                      src={pkg.image || "/placeholder.svg"}
                      className="card-img-top"
                      alt={pkg.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 end-0 bg-warning text-white m-2 px-2 py-1 rounded-pill">
                      <i className="bi bi-star-fill me-1"></i>
                      <small>TOP</small>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0">{pkg.name}</h5>
                      <span className="badge bg-primary rounded-pill">${pkg.price}</span>
                    </div>
                    <p className="text-muted small mb-3">
                      <i className="bi bi-geo-alt me-1"></i>
                      {pkg.location}
                    </p>
                    <div className="mb-3">
                      {pkg.tags.map((tag, index) => (
                        <span key={index} className="badge bg-light text-dark me-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="card-text small">{pkg.description}</p>
                  </div>
                  <div className="card-footer bg-white border-0 pt-0">
                    <Link to={`/package/${pkg.id}`} className="btn btn-outline-primary w-100">
                      Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="mt-5">
            <ul className="pagination justify-content-center">
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
      </section>

      <Footer />
    </>
  )
}

export default Packages

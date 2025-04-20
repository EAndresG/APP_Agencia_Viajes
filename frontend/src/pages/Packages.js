"use client";

import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState(5000);
  const [searchDestination, setSearchDestination] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 6; // Número de paquetes por página

  // Datos de ejemplo para los paquetes
  const packages = [
    {
      id: 1,
      name: "Cartagena",
      location: "Colombia",
      price: 700,
      rating: 4.8,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["PLAYA", "CULTURAL", "RELAX"],
      description: "Disfruta de las hermosas playas y la rica historia colonial de esta joya del Caribe colombiano.",
    },
    {
      id: 2,
      name: "San Andrés",
      location: "Colombia",
      price: 500,
      rating: 4.5,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["PLAYA", "RELAX", "AVENTURA"],
      description: "Paraíso caribeño con aguas cristalinas perfectas para el buceo y deportes acuáticos.",
    },
    {
      id: 3,
      name: "Medellín",
      location: "Colombia",
      price: 400,
      rating: 4.7,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["URBANO", "CULTURAL", "NATURALEZA"],
      description: "La ciudad de la eterna primavera te espera con su clima perfecto y su vibrante cultura.",
    },
    {
      id: 4,
      name: "Santa Marta",
      location: "Colombia",
      price: 1200,
      rating: 4.9,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["PLAYA", "AVENTURA", "NATURALEZA"],
      description: "Descubre la magia donde la Sierra Nevada se encuentra con el mar Caribe.",
    },
    {
      id: 5,
      name: "Eje Cafetero",
      location: "Colombia",
      price: 1500,
      rating: 4.6,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["NATURALEZA", "CULTURAL", "GASTRONOMÍA"],
      description: "Sumérgete en la cultura del café colombiano entre montañas y paisajes verdes.",
    },
    {
      id: 6,
      name: "Bogotá",
      location: "Colombia",
      price: 730,
      rating: 4.4,
      image: "https://v0.dev/placeholder.svg?height=300&width=400",
      tags: ["URBANO", "CULTURAL", "GASTRONOMÍA"],
      description: "La capital colombiana te ofrece una mezcla única de historia, arte y modernidad.",
    },
    // Agrega más paquetes para probar la paginación
  ];

  // Filtrar paquetes según los criterios seleccionados
  const handleFilter = () => {
    let filtered = packages.filter(
      (pkg) =>
        (searchDestination === "" || pkg.name.toLowerCase().includes(searchDestination.toLowerCase())) &&
        pkg.price <= priceRange
    );

    // Ordenar los paquetes según la opción seleccionada
    if (sortOption === "priceAsc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredPackages(filtered);
    setCurrentPage(1); // Reiniciar a la primera página después de aplicar filtros
  };

  // Redirigir a la página de detalles del paquete
  const handlePackageClick = (id) => {
    navigate(`/package/${id}`);
  };

  // Obtener los paquetes para la página actual
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = (filteredPackages.length > 0 ? filteredPackages : packages).slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar destino"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                  />
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
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Ordenar por:</label>
                  <select
                    className="form-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="priceAsc">Precio: Más barato</option>
                    <option value="priceDesc">Precio: Más caro</option>
                    <option value="rating">Mejor calificación</option>
                    <option value="name">Nombre</option>
                  </select>
                </div>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-primary px-4" onClick={handleFilter}>
                  <i className="bi bi-funnel me-2"></i>Aplicar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="row g-4">
            {currentPackages.map((pkg) => (
              <div key={pkg.id} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 shadow-sm package-card"
                  onClick={() => handlePackageClick(pkg.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="position-relative">
                    <img
                      src={pkg.image || "/placeholder.svg"}
                      className="card-img-top"
                      alt={pkg.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 end-0 bg-warning text-white m-2 px-2 py-1 rounded-pill">
                      <i className="bi bi-star-fill me-1"></i>
                      <small>{pkg.rating}</small>
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
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {Array.from(
                  { length: Math.ceil((filteredPackages.length > 0 ? filteredPackages : packages).length / packagesPerPage) },
                  (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                      onClick={() => paginate(i + 1)}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="page-link">{i + 1}</span>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Packages;

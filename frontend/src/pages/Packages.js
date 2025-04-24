"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../apiConfig";

const Packages = () => {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]); // Estado para almacenar los paquetes desde el backend
  const [priceRange, setPriceRange] = useState(5000);
  const [searchDestination, setSearchDestination] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 6; // Número de paquetes por página

  // Obtener los paquetes desde el backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/packages`); // Solicitud al backend
        if (!response.ok) {
          throw new Error("Error al obtener los paquetes");
        }
        const data = await response.json();
        console.log("Paquetes obtenidos:", data); // Verificar los datos en la consola
        setPackages(data); // Guardar los paquetes en el estado
      } catch (error) {
        console.error("Error al cargar los paquetes:", error);
        alert("No se pudieron cargar los paquetes.");
      }
    };

    fetchPackages();
  }, []);

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

  // Redirigir a Facebook
  const handleReserve = (pkg) => {
    const facebookUrl = "https://www.facebook.com";
    window.open(facebookUrl, "_blank"); // Abrir Facebook en una nueva pestaña
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
                <div className="card h-100 border-0 shadow-sm package-card" style={{ cursor: "pointer" }}>
                  <div className="position-relative">
                    <img
                      src={pkg.image || "https://caracol.com.co/resizer/18egm6xhey1MYHQHjQII4yjqtpg=/arc-photo-prisaradioco/arc2-prod/public/7FZMP2BT3VAORPXCB2YTAAERRY.jpg"}
                      className="card-img-top"
                      alt={pkg.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 end-0 bg-warning text-white m-2 px-2 py-1 rounded-pill">
                      <i className="bi bi-star-fill me-1"></i>
                      <small>{pkg.rating || "N/A"}</small>
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
                    <p className="card-text small">{pkg.description}</p>
                    <button
                      className="btn btn-success w-100 mt-3"
                      onClick={() => handleReserve(pkg)}
                    >
                      Reservar
                    </button>
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

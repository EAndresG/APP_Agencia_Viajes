"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { useState, useEffect } from "react"; // Manejo de estado y efectos secundarios
import Navbar from "../components/Navbar/Navbar"; // Componente de la barra de navegación
import Footer from "../components/Footer/Footer"; // Componente del pie de página
import { useNavigate } from "react-router-dom"; // Navegación entre rutas
import API_BASE_URL from "../apiConfig"; // URL base del backend

// Componente principal para mostrar y gestionar los paquetes turísticos
const Packages = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Estados para manejar datos, filtros y paginación
  const [packages, setPackages] = useState([]); // Lista de paquetes obtenidos del backend
  const [priceRange, setPriceRange] = useState(5000); // Rango de precio máximo
  const [searchDestination, setSearchDestination] = useState(""); // Destino buscado
  const [sortOption, setSortOption] = useState(""); // Opción de ordenamiento
  const [filteredPackages, setFilteredPackages] = useState([]); // Lista de paquetes filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
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

  // Redirigir a Facebook y actualizar el contador de reservas
  const handleReserve = (pkg) => {
    const facebookUrl = "https://www.facebook.com";
    window.open(facebookUrl, "_blank"); // Abrir Facebook en una nueva pestaña

    // Incrementar el contador de reservas en localStorage
    const currentCount = parseInt(localStorage.getItem("totalReservations") || "0", 10);
    localStorage.setItem("totalReservations", currentCount + 1);

    // Sumar el precio del paquete a las ganancias totales en localStorage
    const currentEarnings = parseFloat(localStorage.getItem("totalEarnings") || "0");
    localStorage.setItem("totalEarnings", currentEarnings + pkg.price);
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
      <Navbar /> {/* Barra de navegación */}

      {/* Hero Banner */}
      <section className="position-relative">
        <div
          className="bg-image"
          style={{
            backgroundImage: "url('https://www.infobae.com/new-resizer/-jOmFdccGnyJDnHw9PbeKe-y1po=/arc-anglerfish-arc2-prod-infobae/public/EJ4Y4ODTOFDOVJXKP4RLBRBUUI.jpg')",
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

      {/* Filtros de búsqueda */}
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

          {/* Grid de paquetes */}
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

          {/* Paginación */}
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

      <Footer /> {/* Pie de página */}
    </>
  );
};

export default Packages; // Exportar el componente para usarlo en otras partes de la aplicación

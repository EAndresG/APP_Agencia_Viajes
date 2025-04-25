/**Esta página este hecha para enseñar más a detalle los paquetes que se encuentran en la web
 * de momento no esta uso pensando en una versión mejorada de la web
 */

"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { useState, useEffect } from "react"; // Manejo de estado y efectos secundarios
import { Link, useParams, useNavigate } from "react-router-dom"; // Navegación entre rutas y obtención de parámetros
import Navbar from "../components/Navbar/Navbar"; // Componente de la barra de navegación
import Footer from "../components/Footer/Footer"; // Componente del pie de página

// Componente principal para mostrar los detalles de un paquete turístico
const PackageDetail = () => {
  const { id } = useParams(); // Obtener el ID del paquete desde la URL
  const navigate = useNavigate(); // Hook para redirigir al usuario
  const [packageData, setPackageData] = useState(null); // Estado para almacenar los datos del paquete
  const [activeTab, setActiveTab] = useState("description"); // Pestaña activa
  const [activeImage, setActiveImage] = useState(0); // Imagen activa en la galería
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Obtener los datos del paquete desde el backend
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/packages/${id}`); // Solicitud al backend
        if (!response.ok) {
          throw new Error("Error al obtener los datos del paquete");
        }
        const data = await response.json();
        setPackageData(data); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error al cargar el paquete:", error);
        alert("No se pudo cargar el paquete.");
        navigate("/packages"); // Redirigir si hay un error
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchPackage();
  }, [id, navigate]);

  // Mostrar un mensaje mientras se cargan los datos
  if (loading) {
    return <p className="text-center py-5">Cargando...</p>;
  }

  // Mostrar un mensaje si no se encuentran datos del paquete
  if (!packageData) {
    return <p className="text-center py-5">No se encontró el paquete.</p>;
  }

  return (
    <>
      <Navbar /> {/* Barra de navegación */}

      <div className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                Inicio
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/packages" className="text-decoration-none">
                Paquetes
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {packageData.name}
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-8">
            {/* Galería de imágenes */}
            <div className="position-relative mb-4">
              <img
                src={packageData.images?.[activeImage] || "/placeholder.svg"}
                alt={packageData.name}
                className="img-fluid rounded shadow-sm w-100"
                style={{ height: "400px", objectFit: "cover" }}
              />
            </div>

            {/* Título y detalles básicos del paquete */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h1 className="h2 mb-2">{packageData.name}</h1>
                  <p className="text-muted mb-2">
                    <i className="bi bi-geo-alt me-1"></i>
                    {packageData.location}
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-2">
                      <i className="bi bi-star-fill text-warning"></i>
                      <span className="ms-1">{packageData.rating || "N/A"}</span>
                    </div>
                    <span className="text-muted">({packageData.reviews || 0} reseñas)</span>
                  </div>
                </div>
                <div className="text-end">
                  <div className="h3 text-primary mb-0">${packageData.price}</div>
                  <small className="text-muted">por persona</small>
                </div>
              </div>
            </div>

            {/* Características del paquete */}
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-people fs-4 me-2 text-primary"></i>
                  <div>
                    <div className="small text-muted">Capacidad</div>
                    <div>{packageData.capacity} personas</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar-event fs-4 me-2 text-primary"></i>
                  <div>
                    <div className="small text-muted">Duración</div>
                    <div>{packageData.duration}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle fs-4 me-2 text-primary"></i>
                  <div>
                    <div className="small text-muted">Cancelación</div>
                    <div>Gratuita hasta 7 días antes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pestañas de contenido */}
            <div className="mb-4">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "description" ? "active" : ""}`}
                    onClick={() => setActiveTab("description")}
                  >
                    Descripción
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "itinerary" ? "active" : ""}`}
                    onClick={() => setActiveTab("itinerary")}
                  >
                    Itinerario
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "includes" ? "active" : ""}`}
                    onClick={() => setActiveTab("includes")}
                  >
                    Incluye
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "policies" ? "active" : ""}`}
                    onClick={() => setActiveTab("policies")}
                  >
                    Políticas
                  </button>
                </li>
              </ul>

              <div className="p-4 border border-top-0 rounded-bottom">
                {activeTab === "description" && (
                  <div dangerouslySetInnerHTML={{ __html: packageData.longDescription }}></div>
                )}
                {activeTab === "itinerary" && (
                  <div dangerouslySetInnerHTML={{ __html: packageData.itinerary }}></div>
                )}
                {activeTab === "includes" && (
                  <ul className="list-group list-group-flush">
                    {packageData.includes?.map((item, index) => (
                      <li key={index} className="list-group-item px-0">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "policies" && (
                  <div dangerouslySetInnerHTML={{ __html: packageData.policies }}></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer /> {/* Pie de página */}
    </>
  );
};

export default PackageDetail; // Exportar el componente para usarlo en otras partes de la aplicación

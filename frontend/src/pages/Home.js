// Importar dependencias necesarias
import React, { useState, useEffect } from "react"; // Manejo de estado y efectos secundarios
import Navbar from "../components/Navbar/Navbar"; // Componente de la barra de navegación
import Footer from "../components/Footer/Footer"; // Componente del pie de página
import { Link } from "react-router-dom"; // Navegación entre rutas
import API_BASE_URL from "../apiConfig"; // URL base del backend

// Componente principal para la página de inicio
const Home = () => {
  const [packages, setPackages] = useState([]); // Estado para almacenar los paquetes

  // Obtener los paquetes desde el backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/packages`);
        if (response.ok) {
          const data = await response.json();
          setPackages(data); // Guardar los paquetes en el estado
        } else {
          console.error("Error al obtener los paquetes");
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <>
      <Navbar /> {/* Barra de navegación */}

      {/* Hero Banner */}
      <section className="position-relative">
        <div
          className="bg-image"
          style={{
            backgroundImage: "url('https://www.infobae.com/new-resizer/-jOmFdccGnyJDnHw9PbeKe-y1po=/arc-anglerfish-arc2-prod-infobae/public/EJ4Y4ODTOFDOVJXKP4RLBRBUUI.jpg')",
            height: "600px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container h-100 d-flex align-items-center">
            <div className="text-white">
              <h1 className="display-3 fw-bold text-uppercase">Disfruta la libertad</h1>
              <p className="lead">Explora los mejores destinos turísticos con nosotros</p>
            </div>
          </div>
        </div>

        {/* Formulario de búsqueda */}
        <div className="container position-relative">
          <div
            className="card shadow position-absolute start-50 translate-middle"
            style={{ top: "550px", width: "90%", maxWidth: "800px" }}
          >
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-geo-alt"></i>
                    </span>
                    <input type="text" className="form-control border-start-0" placeholder="¿Dónde vas?" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-calendar"></i>
                    </span>
                    <input type="text" className="form-control border-start-0" placeholder="25 Sept 2025" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-people"></i>
                    </span>
                    <input type="text" className="form-control border-start-0" placeholder="2 Personas" />
                  </div>
                </div>
                <div className="col-md-2">
                  <Link
                    to="/packages"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-search me-2"></i> Buscar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideas para vacaciones */}
      <section className="py-5 mt-5 bg-light">
        <div className="container pt-5">
          <h2 className="text-center mb-5 display-6">Descubre ideas para tus vacaciones</h2>
          <div className="row g-4">
            {/* Artículo 1 */}
            <div className="col-md-4">
              <Link to="/article1" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 overflow-hidden vacation-card">
                  <img
                    src="https://media.admagazine.com/photos/618a5e91532cae908aaf29d4/master/w_2560%2Cc_limit/92316.jpg"
                    className="card-img-top"
                    alt="Ahorro para viajes"
                  />
                  <div className="card-body text-center p-4">
                    <h5 className="card-title text-dark">Consejos para ahorrar para tus viajes</h5>
                    <p className="card-text text-muted mt-2">
                      Aprende cómo planificar y ahorrar para hacer realidad tus sueños de viajar.
                    </p>
                    <div className="mt-3 text-primary">
                      Ver artículo <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Artículo 2 */}
            <div className="col-md-4">
              <Link to="/article2" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 overflow-hidden vacation-card">
                  <img
                    src="https://cuidateplus.marca.com/sites/default/files/styles/natural/public/cms/2022-07/viajar-solo.jpg.webp?itok=5QMb8Oi6"
                    className="card-img-top"
                    alt="Viajar solo"
                  />
                  <div className="card-body text-center p-4">
                    <h5 className="card-title text-dark">Consejos para viajar solo</h5>
                    <p className="card-text text-muted mt-2">
                      Descubre cómo disfrutar de una experiencia única y segura al viajar solo.
                    </p>
                    <div className="mt-3 text-primary">
                      Ver artículo <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Artículo 3 */}
            <div className="col-md-4">
              <Link to="/article3" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 overflow-hidden vacation-card">
                  <img
                    src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/v1/guides/section_image/blavomfn3isievxessys"
                    className="card-img-top"
                    alt="Temporadas para viajar"
                  />
                  <div className="card-body text-center p-4">
                    <h5 className="card-title text-dark">Las mejores temporadas para viajar</h5>
                    <p className="card-text text-muted mt-2">
                      Aprende cuándo es el mejor momento para viajar según tus objetivos y destino.
                    </p>
                    <div className="mt-3 text-primary">
                      Ver artículo <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Paquetes de viajes */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-6">Paquetes de viajes</h2>
          <div className="row g-4">
            {packages.slice(0, 4).map((pkg) => (
              <div key={pkg.id} className="col-lg-6">
                <div className="card border-0 shadow-sm mb-4">
                  <div className="row g-0">
                    <div className="col-md-5">
                      <div className="position-relative h-100">
                        <img
                          src={
                            pkg.image ||
                            "https://caracol.com.co/resizer/18egm6xhey1MYHQHjQII4yjqtpg=/arc-photo-prisaradioco/arc2-prod/public/7FZMP2BT3VAORPXCB2YTAAERRY.jpg"
                          }
                          className="img-fluid h-100 w-100 object-fit-cover"
                          alt={pkg.name}
                        />
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="card-body p-4">
                        <h5 className="card-title mb-3">{pkg.name}</h5>
                        <p className="card-text">{pkg.description}</p>
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-geo-alt text-primary me-2"></i>
                          <small className="text-muted">{pkg.location || "Ubicación no disponible"}</small>
                        </div>
                        <Link to="https://www.facebook.com" target="_blank" className="btn btn-primary">
                          Reservar ahora
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/packages" className="btn btn-outline-primary">
              Ver todos los paquetes
            </Link>
          </div>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-6">¿Por qué elegirnos?</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4 text-center">
              <div
                className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="bi bi-gift text-white fs-3"></i>
              </div>
              <h5 className="mb-3">Paquetes a medida</h5>
              <p className="text-muted">Creamos experiencias personalizadas según tus preferencias y presupuesto.</p>
            </div>
            <div className="col-md-4 text-center">
              <div
                className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="bi bi-award text-white fs-3"></i>
              </div>
              <h5 className="mb-3">Experiencia de calidad</h5>
              <p className="text-muted">
                Trabajamos con los mejores proveedores para garantizar experiencias excepcionales.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div
                className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="bi bi-headset text-white fs-3"></i>
              </div>
              <h5 className="mb-3">Servicio exquisito</h5>
              <p className="text-muted">Nuestro equipo está disponible 24/7 para asistirte durante todo tu viaje.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer /> {/* Pie de página */}
    </>
  );
};

export default Home; // Exportar el componente para usarlo en otras partes de la aplicación

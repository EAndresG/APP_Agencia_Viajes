import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="position-relative">
        <div
          className="bg-image"
          style={{
            backgroundImage: "url('https://v0.dev/placeholder.svg?height=600&width=1200')",
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

        {/* Search Form Overlay */}
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

      {/* Vacation Ideas */}
      <section className="py-5 mt-5 bg-light">
        <div className="container pt-5">
          <h2 className="text-center mb-5 display-6">Descubre ideas para tus vacaciones</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <Link to="/packages" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 overflow-hidden vacation-card">
                  <img src="https://v0.dev/placeholder.svg?height=200&width=400" className="card-img-top" alt="Playa" />
                  <div className="card-body text-center p-4">
                    <h5 className="card-title text-dark">Escapadas a la playa</h5>
                    <p className="card-text text-muted mt-2">Descubre los mejores destinos de playa para relajarte</p>
                    <div className="mt-3 text-primary">
                      Ver paquetes <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/packages" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 overflow-hidden vacation-card">
                  <img
                    src="https://v0.dev/placeholder.svg?height=200&width=400"
                    className="card-img-top"
                    alt="Grupo de amigos"
                  />
                  <div className="card-body text-center p-4">
                    <h5 className="card-title text-dark">Vacaciones en grupo</h5>
                    <p className="card-text text-muted mt-2">Las mejores experiencias para disfrutar con amigos</p>
                    <div className="mt-3 text-primary">
                      Ver paquetes <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/packages" className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100 overflow-hidden vacation-card">
                  <img
                    src="https://v0.dev/placeholder.svg?height=200&width=400"
                    className="card-img-top"
                    alt="Ciudad"
                  />
                  <div className="card-body text-center p-4">
                    <h5 className="card-title text-dark">Escapadas urbanas</h5>
                    <p className="card-text text-muted mt-2">Explora las ciudades más fascinantes del mundo</p>
                    <div className="mt-3 text-primary">
                      Ver paquetes <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Locations */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-6">Destinos recientes</h2>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm mb-4">
                <div className="row g-0">
                  <div className="col-md-5">
                    <div className="position-relative h-100">
                      <img
                        src="https://v0.dev/placeholder.svg?height=300&width=300"
                        className="img-fluid h-100 w-100 object-fit-cover"
                        alt="Thula 5"
                      />
                      <div className="position-absolute bottom-0 start-0 p-3">
                        <div className="d-flex gap-2">
                          <span className="badge bg-light text-dark">Wifi</span>
                          <span className="badge bg-light text-dark">Piscina</span>
                          <span className="badge bg-light text-dark">Spa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-3">Thula 5</h5>
                      <p className="card-text">
                        Thula 5 se encuentra en la playa, a solo 5 km del centro, donde encontrarás tiendas y
                        restaurantes locales.
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-2">
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                        </div>
                        <small className="text-muted">5.0 (32 reseñas)</small>
                      </div>
                      <Link to="/articulo" className="btn btn-primary">
                        Reservar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm mb-4">
                <div className="row g-0">
                  <div className="col-md-5">
                    <div className="position-relative h-100">
                      <img
                        src="https://v0.dev/placeholder.svg?height=300&width=300"
                        className="img-fluid h-100 w-100 object-fit-cover"
                        alt="Montage Kapalua"
                      />
                      <div className="position-absolute bottom-0 start-0 p-3">
                        <div className="d-flex gap-2">
                          <span className="badge bg-light text-dark">Wifi</span>
                          <span className="badge bg-light text-dark">Piscina</span>
                          <span className="badge bg-light text-dark">Spa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-3">Montage Kapalua</h5>
                      <p className="card-text">
                        Ubicado junto a una playa privada, este resort de lujo ofrece vistas panorámicas al océano.
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-2">
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                        </div>
                        <small className="text-muted">5.0 (48 reseñas)</small>
                      </div>
                      <Link to="/articulo" className="btn btn-primary">
                        Reservar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm mb-4">
                <div className="row g-0">
                  <div className="col-md-5">
                    <div className="position-relative h-100">
                      <img
                        src="https://v0.dev/placeholder.svg?height=300&width=300"
                        className="img-fluid h-100 w-100 object-fit-cover"
                        alt="Casa Del Agua"
                      />
                      <div className="position-absolute bottom-0 start-0 p-3">
                        <div className="d-flex gap-2">
                          <span className="badge bg-light text-dark">Wifi</span>
                          <span className="badge bg-light text-dark">Piscina</span>
                          <span className="badge bg-light text-dark">Spa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-3">Casa Del Agua</h5>
                      <p className="card-text">
                        Esta villa frente al mar cuenta con una piscina privada y acceso directo a la playa.
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-2">
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                        </div>
                        <small className="text-muted">5.0 (27 reseñas)</small>
                      </div>
                      <Link to="/articulo" className="btn btn-primary">
                        Reservar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm mb-4">
                <div className="row g-0">
                  <div className="col-md-5">
                    <div className="position-relative h-100">
                      <img
                        src="https://v0.dev/placeholder.svg?height=300&width=300"
                        className="img-fluid h-100 w-100 object-fit-cover"
                        alt="Casa Jaguar"
                      />
                      <div className="position-absolute bottom-0 start-0 p-3">
                        <div className="d-flex gap-2">
                          <span className="badge bg-light text-dark">Wifi</span>
                          <span className="badge bg-light text-dark">Piscina</span>
                          <span className="badge bg-light text-dark">Spa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-3">Casa Jaguar</h5>
                      <p className="card-text">
                        Rodeada de exuberante vegetación tropical, esta villa ofrece privacidad y lujo en un entorno
                        natural.
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-2">
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                        </div>
                        <small className="text-muted">5.0 (19 reseñas)</small>
                      </div>
                      <Link to="/articulo" className="btn btn-primary">
                        Reservar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/packages" className="btn btn-outline-primary px-4 py-2">
              Ver todos los paquetes <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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

      <Footer />
    </>
  )
}

export default Home

"use client";

import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);
  const [rating, setRating] = useState(0);
  const [showSummary, setShowSummary] = useState(false); // Estado para mostrar la tarjeta flotante de reserva
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // Estado para mostrar la tarjeta flotante de inicio de sesión

  // Simulación de usuario autenticado
  const isAuthenticated = false; // Cambiar a `true` si el usuario está autenticado

  // Datos de ejemplo para el paquete actual
  const packageData = {
    id: 1,
    name: "Cartagena - Ciudad Amurallada",
    location: "Colombia",
    price: 1095,
    rating: 4.9,
    reviews: 32,
    capacity: "2-4 personas",
    duration: "5 días / 4 noches",
    includes: ["Alojamiento", "Desayunos", "Traslados", "Tour guiado"],
    amenities: [
      { icon: "bi-wifi", name: "Wi-Fi gratis" },
      { icon: "bi-water", name: "Piscina" },
      { icon: "bi-cup-hot", name: "Desayuno incluido" },
      { icon: "bi-geo-alt", name: "Ubicación céntrica" },
      { icon: "bi-shield-check", name: "Cancelación gratuita" },
      { icon: "bi-car-front", name: "Traslados incluidos" },
    ],
    tags: ["PLAYA", "CULTURAL", "RELAX"],
    description:
      "Disfruta de una experiencia inolvidable en la hermosa ciudad de Cartagena. Este paquete incluye alojamiento en un hotel boutique ubicado en el corazón de la Ciudad Amurallada, a pocos pasos de los principales atractivos turísticos. Podrás recorrer las calles empedradas, visitar el Castillo de San Felipe y disfrutar de la vibrante vida nocturna de la ciudad.",
    longDescription: `
      <p>Cartagena de Indias, declarada Patrimonio de la Humanidad por la UNESCO, es una de las joyas del Caribe colombiano. Sus calles coloniales, sus fortificaciones y su rica historia la convierten en un destino imperdible.</p>
      
      <p>Nuestro paquete incluye:</p>
      <ul>
        <li>4 noches de alojamiento en hotel boutique en la Ciudad Amurallada</li>
        <li>Desayunos diarios</li>
        <li>Traslados aeropuerto-hotel-aeropuerto</li>
        <li>Tour guiado por la Ciudad Amurallada</li>
        <li>Visita al Castillo de San Felipe</li>
        <li>Tarde libre para disfrutar de las playas</li>
        <li>Cena de despedida en restaurante típico</li>
      </ul>
      
      <p>El hotel cuenta con piscina en la terraza, desde donde podrás disfrutar de vistas panorámicas de la ciudad mientras te relajas después de un día de exploración.</p>
      
      <p>La ubicación privilegiada te permitirá acceder fácilmente a restaurantes, bares, tiendas y los principales puntos de interés de la ciudad colonial.</p>
    `,
    itinerary: `
      <h5>Día 1: Llegada a Cartagena</h5>
      <p>Recepción en el aeropuerto y traslado al hotel. Check-in y tiempo libre para explorar los alrededores.</p>
      
      <h5>Día 2: Tour Ciudad Amurallada</h5>
      <p>Desayuno en el hotel. Tour guiado por la Ciudad Amurallada, visitando la Plaza de los Coches, Plaza de la Aduana, Plaza de Bolívar y la Catedral. Tarde libre.</p>
      
      <h5>Día 3: Castillo de San Felipe</h5>
      <p>Desayuno en el hotel. Visita al Castillo de San Felipe de Barajas, la fortificación más grande construida por los españoles en América. Tarde libre para disfrutar de las playas.</p>
      
      <h5>Día 4: Día libre</h5>
      <p>Desayuno en el hotel. Día libre para actividades personales. Recomendamos visitar las Islas del Rosario (tour opcional). Cena de despedida en restaurante típico.</p>
      
      <h5>Día 5: Regreso</h5>
      <p>Desayuno en el hotel. Check-out y traslado al aeropuerto para tomar el vuelo de regreso.</p>
    `,
    policies: `
      <h5>Política de cancelación</h5>
      <p>Cancelación gratuita hasta 7 días antes de la llegada. Cancelaciones posteriores tendrán un cargo del 50% del valor total.</p>
      
      <h5>Check-in / Check-out</h5>
      <p>Check-in: 3:00 PM / Check-out: 11:00 AM</p>
      
      <h5>Niños y camas adicionales</h5>
      <p>Niños menores de 5 años: gratis compartiendo cama con los padres. Niños de 6 a 12 años: 50% de descuento.</p>
      
      <h5>Mascotas</h5>
      <p>No se permiten mascotas.</p>
    `,
    images: [
      "https://v0.dev/placeholder.svg?height=500&width=800",
      "https://v0.dev/placeholder.svg?height=500&width=800&text=Habitación",
      "https://v0.dev/placeholder.svg?height=500&width=800&text=Piscina",
      "https://v0.dev/placeholder.svg?height=500&width=800&text=Restaurante",
      "https://v0.dev/placeholder.svg?height=500&width=800&text=Vista",
    ],
    host: {
      name: "Viajes Colombia",
      rating: 4.8,
      reviews: 156,
      image: "https://v0.dev/placeholder.svg?height=100&width=100",
      response: "98%",
      responseTime: "en menos de una hora",
    },
    reviewsList: [
      {
        userName: "Juan Pérez",
        userImage: "https://v0.dev/placeholder.svg?height=50&width=50",
        date: "2023-08-01",
        comment: "Excelente experiencia, muy recomendado.",
        rating: 5,
      },
      {
        userName: "Ana Gómez",
        userImage: "https://v0.dev/placeholder.svg?height=50&width=50",
        date: "2023-07-15",
        comment: "Todo estuvo perfecto, volvería a contratar.",
        rating: 4,
      },
    ],
  };

  // Datos de ejemplo para paquetes recomendados
  const recommendedPackages = [
    {
      id: 2,
      name: "San Andrés - All Inclusive",
      location: "Colombia",
      price: 1500,
      image: "https://v0.dev/placeholder.svg?height=200&width=300",
      rating: 4.7,
      reviews: 28,
      duration: "7 días / 6 noches",
    },
    {
      id: 3,
      name: "Santa Marta y Tayrona",
      location: "Colombia",
      price: 950,
      image: "https://v0.dev/placeholder.svg?height=200&width=300",
      rating: 4.5,
      reviews: 42,
      duration: "4 días / 3 noches",
    },
    {
      id: 4,
      name: "Medellín - Ciudad de la Eterna Primavera",
      location: "Colombia",
      price: 800,
      image: "https://v0.dev/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 36,
      duration: "3 días / 2 noches",
    },
  ];

  const handleReserve = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true); // Mostrar tarjeta flotante si no está autenticado
    } else {
      setShowSummary(true); // Mostrar resumen de reserva si está autenticado
    }
  };

  const handleLeaveReview = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true); // Mostrar tarjeta flotante si no está autenticado
    } else {
      alert("Formulario para dejar una reseña"); // Aquí iría la lógica para dejar una reseña
    }
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false); // Ocultar tarjeta flotante
  };

  const handleCloseSummary = () => {
    setShowSummary(false); // Ocultar la tarjeta flotante de reserva
  };

  return (
    <>
      <Navbar />

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
            {/* Image Gallery */}
            <div className="position-relative mb-4">
              <img
                src={packageData.images[activeImage] || "/placeholder.svg"}
                alt={packageData.name}
                className="img-fluid rounded shadow-sm w-100"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="position-absolute top-50 start-0 translate-middle-y">
                <button
                  className="btn btn-light rounded-circle mx-2 shadow"
                  onClick={() => setActiveImage((prev) => (prev === 0 ? packageData.images.length - 1 : prev - 1))}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </div>
              <div className="position-absolute top-50 end-0 translate-middle-y">
                <button
                  className="btn btn-light rounded-circle mx-2 shadow"
                  onClick={() => setActiveImage((prev) => (prev === packageData.images.length - 1 ? 0 : prev + 1))}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
              <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                <div className="d-flex gap-2">
                  {packageData.images.map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-sm ${activeImage === index ? "btn-primary" : "btn-light"} rounded-circle`}
                      onClick={() => setActiveImage(index)}
                    >
                      <span className="visually-hidden">Imagen {index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
              {packageData.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className={`img-thumbnail cursor-pointer ${activeImage === index ? "border-primary" : ""}`}
                  style={{ width: "100px", height: "70px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>

            {/* Package Title and Basic Info */}
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
                      <span className="ms-1">{packageData.rating}</span>
                    </div>
                    <span className="text-muted">({packageData.reviews} reseñas)</span>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {packageData.tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-end">
                  <div className="h3 text-primary mb-0">${packageData.price}</div>
                  <small className="text-muted">por persona</small>
                </div>
              </div>
            </div>

            {/* Package Features */}
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-people fs-4 me-2 text-primary"></i>
                  <div>
                    <div className="small text-muted">Capacidad</div>
                    <div>{packageData.capacity}</div>
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

            {/* Amenities */}
            <div className="row g-3 mb-4">
              {packageData.amenities.map((amenity, index) => (
                <div key={index} className="col-md-4 col-6">
                  <div className="d-flex align-items-center">
                    <i className={`bi ${amenity.icon} me-2 text-primary`}></i>
                    <span>{amenity.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
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
                {activeTab === "itinerary" && <div dangerouslySetInnerHTML={{ __html: packageData.itinerary }}></div>}
                {activeTab === "includes" && (
                  <ul className="list-group list-group-flush">
                    {packageData.includes.map((item, index) => (
                      <li key={index} className="list-group-item px-0">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "policies" && <div dangerouslySetInnerHTML={{ __html: packageData.policies }}></div>}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-5">
              <h3 className="mb-4">Reseñas</h3>
              <div className="row g-4">
                {/* Mostrar reseñas existentes */}
                {packageData.reviewsList && packageData.reviewsList.length > 0 ? (
                  packageData.reviewsList.map((review, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={review.userImage || "/placeholder.svg"}
                              alt={review.userName}
                              className="rounded-circle me-3"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="mb-0">{review.userName}</h6>
                              <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                            </div>
                          </div>
                          <p className="mb-2">{review.comment}</p>
                          <div className="d-flex align-items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                              <i key={i} className="bi bi-star text-muted me-1"></i>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No hay reseñas aún. Sé el primero en dejar una reseña.</p>
                )}
              </div>

              {/* Formulario para agregar una nueva reseña */}
              <div className="mt-5">
                <h4 className="mb-3">Deja tu reseña</h4>
                <div className="card border-0 shadow-sm p-4">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="review-comment" className="form-label">
                        Tu comentario
                      </label>
                      <textarea
                        id="review-comment"
                        className="form-control"
                        rows="3"
                        placeholder="Escribe tu reseña aquí..."
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Calificación</label>
                      <div className="d-flex align-items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`btn btn-link p-0 ${star <= rating ? "text-warning" : "text-muted"}`}
                            onClick={() => setRating(star)}
                          >
                            <i className={`bi ${star <= rating ? "bi-star-fill" : "bi-star"}`}></i>
                          </button>
                        ))}
                      </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleLeaveReview}>
                      Enviar reseña
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Booking Card */}
            <div className="card shadow-sm mb-4 sticky-top" style={{ top: "20px", zIndex: 10 }}>
              <div className="card-body">
                <h5 className="card-title mb-4">Reserva este paquete</h5>

                <div className="mb-3">
                  <label htmlFor="travel-date" className="form-label">
                    Fecha de viaje
                  </label>
                  <input type="date" className="form-control" id="travel-date" />
                </div>

                <div className="mb-3">
                  <label htmlFor="travelers" className="form-label">
                    Número de viajeros
                  </label>
                  <select className="form-select" id="travelers">
                    <option value="1">1 persona</option>
                    <option value="2" selected>
                      2 personas
                    </option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                  </select>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Precio base</span>
                    <span>${packageData.price} x 2</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Impuestos y tasas</span>
                    <span>$190</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${packageData.price * 2 + 190}</span>
                  </div>
                </div>

                <button className="btn btn-primary w-100 mb-3" onClick={handleReserve}>
                  Reservar ahora
                </button>
              </div>
            </div>

            {/* Guide Information Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Conoce a tu guía</h5>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Guía"
                    className="rounded-circle me-3"
                    width="80"
                    height="80"
                  />
                  <div>
                    <h6 className="mb-0">Carlos Gutiérrez</h6>
                    <small className="text-muted">Tours culturales e históricos</small>
                  </div>
                </div>
                <p className="mb-2">
                  <i className="bi bi-geo-alt me-2 text-primary"></i> Cartagena, Colombia
                </p>
                <p className="mb-2">
                  <i className="bi bi-translate me-2 text-primary"></i> Idiomas: Español, Inglés, Francés
                </p>
                <p className="text-muted">
                  Guía turístico certificado con amplia experiencia en tours culturales por la ciudad amurallada de Cartagena. Apasionado por la historia y cultura local.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Packages */}
        <div className="mt-5">
          <h3 className="mb-4">Paquetes recomendados</h3>
          <div className="row g-4">
            {recommendedPackages.map((pkg) => (
              <div key={pkg.id} className="col-md-4">
                <Link to={`/package/${pkg.id}`} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm package-card">
                    <img
                      src={pkg.image || "/placeholder.svg"}
                      className="card-img-top"
                      alt={pkg.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title">{pkg.name}</h5>
                        <span className="badge bg-primary rounded-pill">${pkg.price}</span>
                      </div>
                      <p className="text-muted small mb-2">
                        <i className="bi bi-geo-alt me-1"></i>
                        {pkg.location}
                      </p>
                      <p className="text-muted small mb-2">
                        <i className="bi bi-calendar-event me-1"></i>
                        {pkg.duration}
                      </p>
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          <i className="bi bi-star-fill text-warning"></i>
                          <span className="ms-1">{pkg.rating}</span>
                        </div>
                        <span className="text-muted small">({pkg.reviews} reseñas)</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tarjeta flotante de resumen */}
      {showSummary && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
        >
          <div className="card shadow-lg" style={{ width: "400px" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Resumen de la Reserva</h5>
              <button className="btn-close" onClick={handleCloseSummary}></button>
            </div>
            <div className="card-body">
              <p><strong>Paquete:</strong> {packageData.name}</p>
              <p><strong>Ubicación:</strong> {packageData.location}</p>
              <p><strong>Precio:</strong> ${packageData.price} por persona</p>
              <p><strong>Duración:</strong> {packageData.duration}</p>
              <p><strong>Capacidad:</strong> {packageData.capacity}</p>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleCloseSummary}>
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tarjeta flotante de inicio de sesión */}
      {showLoginPrompt && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
        >
          <div className="card shadow-lg" style={{ width: "400px" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Inicia sesión</h5>
              <button className="btn-close" onClick={handleCloseLoginPrompt}></button>
            </div>
            <div className="card-body">
              <p>Debes iniciar sesión para realizar esta acción.</p>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Ir a Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PackageDetail;
